import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertConsultationSchema, insertBlogPostSchema, insertTestimonialSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Contact form submission
  app.post("/api/contacts", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.json({ success: true, contact });
    } catch (error) {
      console.error(`Contact creation error: ${error}`);
      res.status(400).json({ error: "Invalid contact data" });
    }
  });

  // Get all contacts (admin only)
  app.get("/api/contacts", async (_req, res) => {
    try {
      const contacts = await storage.getAllContacts();
      res.json(contacts);
    } catch (error) {
      console.error(`Get contacts error: ${error}`);
      res.status(500).json({ error: "Failed to fetch contacts" });
    }
  });

  // Update contact status (admin only)
  app.patch("/api/contacts/:id", async (req, res) => {
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

  // Consultation booking
  app.post("/api/consultations", async (req, res) => {
    try {
      const validatedData = insertConsultationSchema.parse(req.body);
      const consultation = await storage.createConsultation(validatedData);
      res.json({ success: true, consultation });
    } catch (error) {
      console.error(`Consultation creation error: ${error}`);
      res.status(400).json({ error: "Invalid consultation data" });
    }
  });

  // Get all consultations (admin only)
  app.get("/api/consultations", async (_req, res) => {
    try {
      const consultations = await storage.getAllConsultations();
      res.json(consultations);
    } catch (error) {
      console.error(`Get consultations error: ${error}`);
      res.status(500).json({ error: "Failed to fetch consultations" });
    }
  });

  // Update consultation status (admin only)
  app.patch("/api/consultations/:id", async (req, res) => {
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

  app.post("/api/blog", async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(validatedData);
      res.json({ success: true, post });
    } catch (error) {
      console.error(`Create blog post error: ${error}`);
      res.status(400).json({ error: "Invalid blog post data" });
    }
  });

  app.patch("/api/blog/:id", async (req, res) => {
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

  // Testimonials
  app.get("/api/testimonials", async (req, res) => {
    try {
      const approvedOnly = req.query.approved === "true";
      const testimonials = approvedOnly 
        ? await storage.getApprovedTestimonials()
        : await storage.getAllTestimonials();
      res.json(testimonials);
    } catch (error) {
      console.error(`Get testimonials error: ${error}`);
      res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  });

  app.post("/api/testimonials", async (req, res) => {
    try {
      const validatedData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(validatedData);
      res.json({ success: true, testimonial });
    } catch (error) {
      console.error(`Create testimonial error: ${error}`);
      res.status(400).json({ error: "Invalid testimonial data" });
    }
  });

  app.patch("/api/testimonials/:id/approve", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.approveTestimonial(id);
      res.json({ success: true });
    } catch (error) {
      console.error(`Approve testimonial error: ${error}`);
      res.status(500).json({ error: "Failed to approve testimonial" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
