import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { eq } from "drizzle-orm";
import { 
  User, InsertUser, Contact, InsertContact, Consultation, InsertConsultation,
  BlogPost, InsertBlogPost, Testimonial, InsertTestimonial,
  users, contacts, consultations, blogPosts, testimonials
} from "@shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required");
}

const client = postgres(process.env.DATABASE_URL);
const db = drizzle(client);

export interface IStorage {
  // User management
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<void>;
  approveUser(userId: number, approvedById: number): Promise<void>;
  getPendingUsers(): Promise<User[]>;
  getAllUsers(): Promise<User[]>;
  deleteUser(id: number): Promise<void>;
  setResetToken(email: string, token: string, expiry: Date): Promise<void>;
  getUserByResetToken(token: string): Promise<User | undefined>;
  resetPassword(token: string, newPassword: string): Promise<void>;
  
  // Contact management
  createContact(contact: InsertContact): Promise<Contact>;
  getAllContacts(): Promise<Contact[]>;
  updateContactStatus(id: number, responded: boolean): Promise<void>;
  deleteContact(id: number): Promise<void>;
  
  // Consultation management
  createConsultation(consultation: InsertConsultation): Promise<Consultation>;
  getAllConsultations(): Promise<Consultation[]>;
  updateConsultationStatus(id: number, status: string, notes?: string): Promise<void>;
  deleteConsultation(id: number): Promise<void>;
  
  // Blog management
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  getAllBlogPosts(publishedOnly?: boolean): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  updateBlogPost(id: number, updates: Partial<InsertBlogPost>): Promise<void>;
  deleteBlogPost(id: number): Promise<void>;
  
  // Testimonial management
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  getApprovedTestimonials(): Promise<Testimonial[]>;
  getAllTestimonials(): Promise<Testimonial[]>;
  approveTestimonial(id: number): Promise<void>;
  unpublishTestimonial(id: number): Promise<void>;
  deleteTestimonial(id: number): Promise<void>;
}

export class PostgresStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async updateUser(id: number, updates: Partial<User>): Promise<void> {
    await db.update(users).set(updates).where(eq(users.id, id));
  }

  async approveUser(userId: number, approvedById: number): Promise<void> {
    await db.update(users).set({ 
      isApproved: true, 
      approvedBy: approvedById, 
      approvedAt: new Date() 
    }).where(eq(users.id, userId));
  }

  async getPendingUsers(): Promise<User[]> {
    return await db.select().from(users).where(eq(users.isApproved, false)).orderBy(users.createdAt);
  }

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users).orderBy(users.createdAt);
  }

  async deleteUser(id: number): Promise<void> {
    await db.delete(users).where(eq(users.id, id));
  }

  async setResetToken(email: string, token: string, expiry: Date): Promise<void> {
    await db.update(users).set({ 
      resetToken: token, 
      resetTokenExpiry: expiry 
    }).where(eq(users.email, email));
  }

  async getUserByResetToken(token: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.resetToken, token)).limit(1);
    return result[0];
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    await db.update(users).set({ 
      password: newPassword, 
      resetToken: null, 
      resetTokenExpiry: null 
    }).where(eq(users.resetToken, token));
  }

  // Contact methods
  async createContact(contact: InsertContact): Promise<Contact> {
    const result = await db.insert(contacts).values(contact).returning();
    return result[0];
  }

  async getAllContacts(): Promise<Contact[]> {
    return await db.select().from(contacts).orderBy(contacts.createdAt);
  }

  async updateContactStatus(id: number, responded: boolean): Promise<void> {
    await db.update(contacts).set({ responded }).where(eq(contacts.id, id));
  }

  async deleteContact(id: number): Promise<void> {
    await db.delete(contacts).where(eq(contacts.id, id));
  }

  // Consultation methods
  async createConsultation(consultation: InsertConsultation): Promise<Consultation> {
    // Handle date conversion if preferredDate is a string
    const consultationData = {
      ...consultation,
      preferredDate: consultation.preferredDate instanceof Date 
        ? consultation.preferredDate 
        : consultation.preferredDate 
          ? new Date(consultation.preferredDate) 
          : null
    };
    
    const result = await db.insert(consultations).values(consultationData).returning();
    return result[0];
  }

  async getAllConsultations(): Promise<Consultation[]> {
    return await db.select().from(consultations).orderBy(consultations.createdAt);
  }

  async updateConsultationStatus(id: number, status: string, notes?: string): Promise<void> {
    const updates: any = { status };
    if (notes !== undefined) updates.notes = notes;
    await db.update(consultations).set(updates).where(eq(consultations.id, id));
  }

  async deleteConsultation(id: number): Promise<void> {
    await db.delete(consultations).where(eq(consultations.id, id));
  }

  // Blog methods
  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const result = await db.insert(blogPosts).values(post).returning();
    return result[0];
  }

async getAllBlogPosts(publishedOnly = false): Promise<BlogPost[]> {
  try {
    console.log(`Storage: getAllBlogPosts called with publishedOnly=${publishedOnly}`);
    if (publishedOnly) {
      const result = await db.select().from(blogPosts).where(eq(blogPosts.published, true)).orderBy(blogPosts.createdAt);
      console.log(`Storage: Found ${result.length} published blog posts`);
      return result;
    }
    const result = await db.select().from(blogPosts).orderBy(blogPosts.createdAt);
    console.log(`Storage: Found ${result.length} total blog posts`);
    return result;
  } catch (error) {
    console.error(`Storage: getAllBlogPosts error:`, error);
    throw error;
  }
}

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const result = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
    return result[0];
  }

  async updateBlogPost(id: number, updates: Partial<InsertBlogPost>): Promise<void> {
    await db.update(blogPosts).set({ ...updates, updatedAt: new Date() }).where(eq(blogPosts.id, id));
  }

  // Testimonial methods
  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const result = await db.insert(testimonials).values(testimonial).returning();
    return result[0];
  }

  async getApprovedTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials).where(eq(testimonials.approved, true)).orderBy(testimonials.createdAt);
  }

async getApprovedTestimonials(): Promise<Testimonial[]> {
  try {
    console.log(`Storage: getApprovedTestimonials called`);
    const result = await db.select().from(testimonials).where(eq(testimonials.approved, true)).orderBy(testimonials.createdAt);
    console.log(`Storage: Found ${result.length} approved testimonials`);
    return result;
  } catch (error) {
    console.error(`Storage: getApprovedTestimonials error:`, error);
    throw error;
  }
}

  async approveTestimonial(id: number): Promise<void> {
    await db.update(testimonials).set({ approved: true }).where(eq(testimonials.id, id));
  }

  async unpublishTestimonial(id: number): Promise<void> {
    await db.update(testimonials).set({ approved: false }).where(eq(testimonials.id, id));
  }

  async deleteTestimonial(id: number): Promise<void> {
    await db.delete(testimonials).where(eq(testimonials.id, id));
  }

  async deleteBlogPost(id: number): Promise<void> {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
  }
}

export const storage = new PostgresStorage();
