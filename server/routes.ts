import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import path from "path";
import fs from "fs";
import { storage } from "./storage";
import { sendContactNotificationEmail } from "./email";
import { insertContactSchema, insertConsultationSchema, insertBlogPostSchema, insertTestimonialSchema } from "@shared/schema";
import {
  handleRegister,
  handleLogin,
  handleLogout,
  handleGetCurrentUser,
  handleForgotPassword,
  handleResetPassword,
  handleGetPendingUsers,
  handleApproveUser,
  requireApprovedAdmin
} from "./auth";
import "./types";

// Configure multer for file uploads
const uploadDir = path.join(process.cwd(), "client", "public", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  }),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.post("/api/auth/register", handleRegister);
  app.post("/api/auth/login", handleLogin);
  app.post("/api/auth/logout", handleLogout);
  app.get("/api/auth/me", handleGetCurrentUser);
  app.post("/api/auth/forgot-password", handleForgotPassword);
  app.post("/api/auth/reset-password", handleResetPassword);
  
  // Admin management routes (require approved admin)
  app.get("/api/admin/pending-users", requireApprovedAdmin, handleGetPendingUsers);
  app.post("/api/admin/approve-user/:userId", requireApprovedAdmin, handleApproveUser);
  app.get("/api/admin/users", requireApprovedAdmin, async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      // Remove passwords from response
      const safeUsers = users.map(({ password, resetToken, resetTokenExpiry, ...user }) => user);
      res.json(safeUsers);
    } catch (error) {
      console.error("Get users error:", error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });
  app.patch("/api/admin/users/:id", requireApprovedAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      await storage.updateUser(id, updates);
      res.json({ success: true });
    } catch (error) {
      console.error("Update user error:", error);
      res.status(500).json({ error: "Failed to update user" });
    }
  });
  app.delete("/api/admin/users/:id", requireApprovedAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const currentUserId = req.session.userId;
      
      // Prevent self-deletion
      if (id === currentUserId) {
        return res.status(400).json({ error: "Cannot delete your own account" });
      }
      
      await storage.deleteUser(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Delete user error:", error);
      res.status(500).json({ error: "Failed to delete user" });
    }
  });

  // File upload endpoint
  app.post("/api/upload", upload.single('image'), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
      
      const fileUrl = `/uploads/${req.file.filename}`;
      res.json({ success: true, url: fileUrl });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ error: "Failed to upload file" });
    }
  });

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Contact form submission
  app.post("/api/contacts", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      
      // Send notification email to all admin users with contact management permissions
      try {
        const adminUsers = await storage.getAllUsers();
        const notificationPromises = adminUsers
          .filter(user => user.canManageContacts && user.isApproved)
          .map(admin => 
            sendContactNotificationEmail(admin.email, contact.name, contact.email, contact.subject)
          );
        
        await Promise.all(notificationPromises);
      } catch (emailError) {
        console.error("Failed to send contact notification emails:", emailError);
        // Don't fail the contact submission if email fails
      }
      
      res.json({ success: true, contact });
    } catch (error) {
      console.error(`Contact creation error: ${error}`);
      res.status(400).json({ error: "Invalid contact data" });
    }
  });

  // Get all contacts (admin only)
  app.get("/api/contacts", requireApprovedAdmin, async (_req, res) => {
    try {
      const contacts = await storage.getAllContacts();
      res.json(contacts);
    } catch (error) {
      console.error(`Get contacts error: ${error}`);
      res.status(500).json({ error: "Failed to fetch contacts" });
    }
  });

  // Update contact status (admin only)
  app.patch("/api/contacts/:id", requireApprovedAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { responded } = req.body;
      await storage.updateContactStatus(id, responded);
      res.json({ success: true });
    } catch (error) {
      console.error(`Update contact error: ${error}`);
      res.status(500).json({ error: "Failed to update contact" });
    }
  });

  // Delete contact (admin only)
  app.delete("/api/contacts/:id", requireApprovedAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteContact(id);
      res.json({ success: true });
    } catch (error) {
      console.error(`Delete contact error: ${error}`);
      res.status(500).json({ error: "Failed to delete contact" });
    }
  });

  // Consultation booking
  app.post("/api/consultations", async (req, res) => {
    try {
      const validatedData = insertConsultationSchema.parse(req.body);
      const consultation = await storage.createConsultation(validatedData);
      res.json({ success: true, consultation });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        console.error('Consultation validation error:', error.errors);
        res.status(400).json({ error: "Invalid consultation data", details: error.errors });
      } else {
        console.error(`Consultation creation error: ${error}`);
        res.status(500).json({ error: "Failed to create consultation" });
      }
    }
  });

  // Get all consultations (admin only)
  app.get("/api/consultations", requireApprovedAdmin, async (_req, res) => {
    try {
      const consultations = await storage.getAllConsultations();
      res.json(consultations);
    } catch (error) {
      console.error(`Get consultations error: ${error}`);
      res.status(500).json({ error: "Failed to fetch consultations" });
    }
  });

  // Update consultation status (admin only)
  app.patch("/api/consultations/:id", requireApprovedAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status, notes } = req.body;
      await storage.updateConsultationStatus(id, status, notes);
      res.json({ success: true });
    } catch (error) {
      console.error(`Update consultation error: ${error}`);
      res.status(500).json({ error: "Failed to update consultation" });
    }
  });

  // Delete consultation (admin only)
  app.delete("/api/consultations/:id", requireApprovedAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteConsultation(id);
      res.json({ success: true });
    } catch (error) {
      console.error(`Delete consultation error: ${error}`);
      res.status(500).json({ error: "Failed to delete consultation" });
    }
  });

  // Delete consultation (admin only)
  app.delete("/api/consultations/:id", requireApprovedAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteConsultation(id);
      res.json({ success: true });
    } catch (error) {
      console.error(`Delete consultation error: ${error}`);
      res.status(500).json({ error: "Failed to delete consultation" });
    }
  });

  // Blog posts
  app.get("/api/blog", async (req, res) => {
    try {
      const publishedOnly = req.query.published === "true";
      const posts = await storage.getAllBlogPosts(publishedOnly);
      res.json(posts);
    } catch (error) {
      console.error(`Get blog posts error: ${error}`);
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error(`Get blog post error: ${error}`);
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });

  app.post("/api/blog", requireApprovedAdmin, async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(validatedData);
      res.json({ success: true, post });
    } catch (error) {
      console.error(`Create blog post error: ${error}`);
      res.status(400).json({ error: "Invalid blog post data" });
    }
  });

  app.patch("/api/blog/:id", requireApprovedAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      await storage.updateBlogPost(id, updates);
      res.json({ success: true });
    } catch (error) {
      console.error(`Update blog post error: ${error}`);
      res.status(500).json({ error: "Failed to update blog post" });
    }
  });

  app.delete("/api/blog/:id", requireApprovedAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteBlogPost(id);
      res.json({ success: true });
    } catch (error) {
      console.error(`Delete blog post error: ${error}`);
      res.status(500).json({ error: "Failed to delete blog post" });
    }
  });

  // Testimonials
  app.get("/api/testimonials", async (req, res) => {
    try {
      const approvedOnly = req.query.approved === "true";
      const isAdminRequest = req.query.approved !== "true";
      
      if (isAdminRequest) {
        // Require admin auth for getting all testimonials
        const authResult = await new Promise<boolean>((resolve) => {
          requireApprovedAdmin(req, res, (err) => {
            resolve(!err);
          });
        });
        if (!authResult) return;
      }
      
      const testimonials = approvedOnly 
        ? await storage.getApprovedTestimonials()
        : await storage.getAllTestimonials();
      res.json(testimonials);
    } catch (error) {
      console.error(`Get testimonials error: ${error}`);
      res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  });

  app.post("/api/testimonials", requireApprovedAdmin, async (req, res) => {
    try {
      const validatedData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(validatedData);
      res.json({ success: true, testimonial });
    } catch (error) {
      console.error(`Create testimonial error: ${error}`);
      res.status(400).json({ error: "Invalid testimonial data" });
    }
  });

  app.patch("/api/testimonials/:id/approve", requireApprovedAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.approveTestimonial(id);
      res.json({ success: true });
    } catch (error) {
      console.error(`Approve testimonial error: ${error}`);
      res.status(500).json({ error: "Failed to approve testimonial" });
    }
  });

  app.patch("/api/testimonials/:id/unpublish", requireApprovedAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.unpublishTestimonial(id);
      res.json({ success: true });
    } catch (error) {
      console.error(`Unpublish testimonial error: ${error}`);
      res.status(500).json({ error: "Failed to unpublish testimonial" });
    }
  });

  app.delete("/api/testimonials/:id", requireApprovedAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteTestimonial(id);
      res.json({ success: true });
    } catch (error) {
      console.error(`Delete testimonial error: ${error}`);
      res.status(500).json({ error: "Failed to delete testimonial" });
    }
  });

  // Add support for client-side routing - serve React app for non-API routes
  app.get(['/admin', '/admin/*', '/about', '/services', '/blog', '/blog/*', '/contact', '/privacy-policy', '/terms-of-service'], (req, res, next) => {
    // Let the catch-all handler in vite.ts handle this
    next();
  });

  const httpServer = createServer(app);
  return httpServer;
}
