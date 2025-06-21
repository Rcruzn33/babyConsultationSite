#!/usr/bin/env node

/**
 * Database Administration Script
 * Simple command-line tool for managing the baby sleep consulting database
 */

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { eq } from "drizzle-orm";

if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL environment variable is required");
  process.exit(1);
}

const client = postgres(process.env.DATABASE_URL);
const db = drizzle(client);

async function showStats() {
  try {
    const stats = await Promise.all([
      db.execute("SELECT COUNT(*) as count FROM contacts"),
      db.execute("SELECT COUNT(*) as count FROM consultations"),
      db.execute("SELECT COUNT(*) as count FROM blog_posts"),
      db.execute("SELECT COUNT(*) as count FROM testimonials"),
      db.execute("SELECT COUNT(*) as count FROM contacts WHERE responded = false"),
      db.execute("SELECT COUNT(*) as count FROM consultations WHERE status = 'pending'"),
      db.execute("SELECT COUNT(*) as count FROM testimonials WHERE approved = false"),
    ]);

    console.log("\n📊 Database Statistics");
    console.log("=====================");
    console.log(`Total Contacts: ${stats[0].rows[0].count}`);
    console.log(`Total Consultations: ${stats[1].rows[0].count}`);
    console.log(`Total Blog Posts: ${stats[2].rows[0].count}`);
    console.log(`Total Testimonials: ${stats[3].rows[0].count}`);
    console.log("\n📋 Pending Items");
    console.log("================");
    console.log(`Unread Contacts: ${stats[4].rows[0].count}`);
    console.log(`Pending Consultations: ${stats[5].rows[0].count}`);
    console.log(`Pending Testimonials: ${stats[6].rows[0].count}`);
  } catch (error) {
    console.error("❌ Error fetching stats:", error.message);
  }
}

async function listContacts() {
  try {
    const result = await db.execute(`
      SELECT id, name, email, subject, responded, created_at 
      FROM contacts 
      ORDER BY created_at DESC 
      LIMIT 10
    `);
    
    console.log("\n📬 Recent Contacts");
    console.log("==================");
    result.rows.forEach(contact => {
      const status = contact.responded ? "✅" : "📮";
      console.log(`${status} [${contact.id}] ${contact.name} - ${contact.subject}`);
      console.log(`   📧 ${contact.email} | ${new Date(contact.created_at).toLocaleDateString()}`);
    });
  } catch (error) {
    console.error("❌ Error listing contacts:", error.message);
  }
}

async function listConsultations() {
  try {
    const result = await db.execute(`
      SELECT id, parent_name, email, consultation_type, status, created_at 
      FROM consultations 
      ORDER BY created_at DESC 
      LIMIT 10
    `);
    
    console.log("\n🗓️  Recent Consultations");
    console.log("========================");
    result.rows.forEach(consultation => {
      const statusIcon = consultation.status === 'pending' ? "⏳" : 
                        consultation.status === 'confirmed' ? "✅" : "📋";
      console.log(`${statusIcon} [${consultation.id}] ${consultation.parent_name} - ${consultation.consultation_type}`);
      console.log(`   📧 ${consultation.email} | Status: ${consultation.status} | ${new Date(consultation.created_at).toLocaleDateString()}`);
    });
  } catch (error) {
    console.error("❌ Error listing consultations:", error.message);
  }
}

async function backup() {
  try {
    const timestamp = new Date().toISOString().split('T')[0];
    console.log(`\n💾 Creating backup for ${timestamp}`);
    console.log("Run this command to create a backup:");
    console.log(`pg_dump "${process.env.DATABASE_URL}" > backup_${timestamp}.sql`);
  } catch (error) {
    console.error("❌ Error creating backup:", error.message);
  }
}

async function testConnection() {
  try {
    await db.execute("SELECT 1");
    console.log("✅ Database connection successful");
    
    const result = await db.execute(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    console.log("\n📋 Available Tables:");
    result.rows.forEach(row => {
      console.log(`   • ${row.table_name}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
  }
}

function showHelp() {
  console.log(`
🍼 Baby Sleep Consulting Database Admin Tool

Usage: node db-admin.js [command]

Commands:
  stats       Show database statistics
  contacts    List recent contact submissions
  consults    List recent consultation bookings
  backup      Show backup command
  test        Test database connection
  help        Show this help message

Examples:
  node db-admin.js stats
  node db-admin.js contacts
  node db-admin.js backup

Environment Variables Required:
  DATABASE_URL    PostgreSQL connection string
`);
}

async function main() {
  const command = process.argv[2] || 'help';
  
  switch (command) {
    case 'stats':
      await showStats();
      break;
    case 'contacts':
      await listContacts();
      break;
    case 'consults':
    case 'consultations':
      await listConsultations();
      break;
    case 'backup':
      await backup();
      break;
    case 'test':
      await testConnection();
      break;
    case 'help':
    default:
      showHelp();
      break;
  }
  
  await client.end();
}

main().catch(error => {
  console.error("❌ Script error:", error.message);
  process.exit(1);
});