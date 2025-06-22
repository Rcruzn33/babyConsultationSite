/**
 * Bootstrap script to create the first admin user
 * Run with: node create-admin.js
 */

const { drizzle } = require("drizzle-orm/postgres-js");
const postgres = require("postgres");
const { users } = require("./shared/schema.ts");
const { scrypt, randomBytes } = require("crypto");
const { promisify } = require("util");
const readline = require("readline");

const scryptAsync = promisify(scrypt);

async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const buf = await scryptAsync(password, salt, 64);
  return `${buf.toString("hex")}.${salt}`;
}

function createReadlineInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

function question(rl, query) {
  return new Promise(resolve => rl.question(query, resolve));
}

function hiddenQuestion(rl, query) {
  return new Promise(resolve => {
    process.stdout.write(query);
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    
    let password = '';
    
    process.stdin.on('data', function(char) {
      char = char + '';
      
      switch(char) {
        case '\n':
        case '\r':
        case '\u0004':
          process.stdin.setRawMode(false);
          process.stdin.pause();
          process.stdout.write('\n');
          resolve(password);
          break;
        case '\u0003':
          process.exit();
          break;
        case '\u007f':
        case '\b':
          if (password.length > 0) {
            password = password.slice(0, -1);
            process.stdout.write('\b \b');
          }
          break;
        default:
          password += char;
          process.stdout.write('*');
          break;
      }
    });
  });
}

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL environment variable is required");
    process.exit(1);
  }

  console.log("🚀 Admin User Creation Tool");
  console.log("=============================");

  const client = postgres(process.env.DATABASE_URL);
  const db = drizzle(client);

  try {
    // Check if any admin users already exist
    const existingUsers = await db.select().from(users);
    const approvedAdmins = existingUsers.filter(u => u.isApproved);
    
    if (approvedAdmins.length > 0) {
      console.log("⚠️  Approved admin users already exist:");
      approvedAdmins.forEach(admin => {
        console.log(`   - ${admin.username} (${admin.email})`);
      });
      console.log("\nYou can create additional admins through the web interface.");
      return;
    }

    const rl = createReadlineInterface();

    console.log("\n📝 Creating your first admin user...\n");

    const username = await question(rl, "Username: ");
    if (!username || username.length < 3) {
      console.error("❌ Username must be at least 3 characters long");
      process.exit(1);
    }

    const email = await question(rl, "Email: ");
    if (!email || !email.includes('@')) {
      console.error("❌ Please provide a valid email address");
      process.exit(1);
    }

    // Check if username or email already exists
    const existingUser = existingUsers.find(u => 
      u.username === username || u.email === email
    );
    if (existingUser) {
      console.error("❌ Username or email already exists");
      process.exit(1);
    }

    const password = await hiddenQuestion(rl, "Password: ");
    if (!password || password.length < 6) {
      console.error("❌ Password must be at least 6 characters long");
      process.exit(1);
    }

    const confirmPassword = await hiddenQuestion(rl, "Confirm password: ");
    if (password !== confirmPassword) {
      console.error("❌ Passwords do not match");
      process.exit(1);
    }

    rl.close();

    console.log("\n🔐 Creating admin user...");

    const hashedPassword = await hashPassword(password);
    
    const [newUser] = await db.insert(users).values({
      username,
      email,
      password: hashedPassword,
      role: "admin",
      isApproved: true, // Auto-approve the first admin
      approvedBy: null,
      approvedAt: new Date(),
    }).returning();

    console.log("✅ Admin user created successfully!");
    console.log(`   Username: ${newUser.username}`);
    console.log(`   Email: ${newUser.email}`);
    console.log(`   Status: Approved`);
    console.log("\n🎉 You can now log in at /admin/auth");
    
  } catch (error) {
    console.error("❌ Error creating admin user:", error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main().catch(console.error);