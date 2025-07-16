import { Request, Response, NextFunction } from "express";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { sendUserApprovedEmail } from "./email";
import { 
  adminRegistrationSchema, 
  adminLoginSchema, 
  forgotPasswordSchema, 
  resetPasswordSchema 
} from "@shared/schema";
import { z } from "zod";
import "./types";

const scryptAsync = promisify(scrypt);

// Password hashing utilities
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

export async function comparePasswords(supplied: string, stored: string): Promise<boolean> {
  try {
    // Handle both scrypt (hash.salt) and pbkdf2 (salt:hash) formats
    if (stored.includes('.')) {
      // Scrypt format: hash.salt
      const [hashed, salt] = stored.split(".");
      const hashedBuf = Buffer.from(hashed, "hex");
      const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
      return timingSafeEqual(hashedBuf, suppliedBuf);
    } else if (stored.includes(':')) {
      // PBKDF2 format: salt:hash - need to check against pbkdf2 hash
      const [salt, hash] = stored.split(':');
      const crypto = require('crypto');
      const testHash = crypto.pbkdf2Sync(supplied, salt, 1000, 64, 'sha512').toString('hex');
      return hash === testHash;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Password comparison error:', error);
    return false;
  }
}

// Generate secure random token
export function generateResetToken(): string {
  return randomBytes(32).toString("hex");
}

// Middleware to check if user is authenticated
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session?.userId) {
    return res.status(401).json({ error: "Authentication required" });
  }
  next();
}

// Middleware to check if user is approved admin
export async function requireApprovedAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.session?.userId) {
    return res.status(401).json({ error: "Authentication required" });
  }

  try {
    const user = await storage.getUser(req.session.userId);
    if (!user || !user.isApproved) {
      return res.status(403).json({ error: "Admin approval required" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}



// Auth route handlers
export async function handleRegister(req: Request, res: Response) {
  try {
    const validatedData = adminRegistrationSchema.parse(req.body);
    
    // Check if username or email already exists
    const existingUser = await storage.getUserByUsername(validatedData.username);
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const existingEmail = await storage.getUserByEmail(validatedData.email);
    if (existingEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(validatedData.password);
    const newUser = await storage.createUser({
      username: validatedData.username,
      email: validatedData.email,
      password: hashedPassword,
    });

    // Don't auto-login new users - they need approval first
    res.status(201).json({ 
      message: "Registration successful. Please wait for admin approval.",
      userId: newUser.id 
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function handleLogin(req: Request, res: Response) {
  try {
    const validatedData = adminLoginSchema.parse(req.body);
    
    const user = await storage.getUserByUsername(validatedData.username);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isValidPassword = await comparePasswords(validatedData.password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if (!user.isApproved) {
      return res.status(403).json({ error: "Account pending approval" });
    }

    // Set session
    req.session.userId = user.id;
    
    // Explicitly save session and return response
    req.session.save((err) => {
      if (err) {
        console.error("Session save error:", err);
        return res.status(500).json({ error: "Session save failed" });
      }
      
      // Return user without password in the format the client expects
      const { password, resetToken, resetTokenExpiry, ...userWithoutPassword } = user;
      res.json({ 
        success: true,
        user: userWithoutPassword,
        token: 'session-based', // Client expects a token field
        authenticated: true
      });
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function handleLogout(req: Request, res: Response) {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({ error: "Could not log out" });
    }
    res.json({ message: "Logged out successfully" });
  });
}

export async function handleGetCurrentUser(req: Request, res: Response) {
  if (!req.session?.userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const user = await storage.getUser(req.session.userId);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Return user without sensitive fields
    const { password, resetToken, resetTokenExpiry, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword });
  } catch (error) {
    console.error("Get current user error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function handleForgotPassword(req: Request, res: Response) {
  try {
    const validatedData = forgotPasswordSchema.parse(req.body);
    
    const user = await storage.getUserByEmail(validatedData.email);
    if (!user) {
      // Don't reveal if email exists or not
      return res.json({ message: "If the email exists, a reset link has been sent." });
    }

    const resetToken = generateResetToken();
    const expiry = new Date(Date.now() + 3600000); // 1 hour from now
    
    await storage.setResetToken(validatedData.email, resetToken, expiry);
    
    // In a real app, you would send an email here
    // For now, we'll just return the token (remove in production!)
    res.json({ 
      message: "If the email exists, a reset link has been sent.",
      resetToken // Remove this in production!
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    console.error("Forgot password error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function handleResetPassword(req: Request, res: Response) {
  try {
    const validatedData = resetPasswordSchema.parse(req.body);
    
    const user = await storage.getUserByResetToken(validatedData.token);
    if (!user || !user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
      return res.status(400).json({ error: "Invalid or expired reset token" });
    }

    const hashedPassword = await hashPassword(validatedData.password);
    await storage.resetPassword(validatedData.token, hashedPassword);
    
    res.json({ message: "Password reset successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    console.error("Reset password error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function handleGetPendingUsers(req: Request, res: Response) {
  try {
    const pendingUsers = await storage.getPendingUsers();
    // Remove sensitive fields
    const sanitizedUsers = pendingUsers.map(user => {
      const { password, resetToken, resetTokenExpiry, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
    res.json(sanitizedUsers);
  } catch (error) {
    console.error("Get pending users error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function handleApproveUser(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const approverId = req.session.userId;
    
    if (!approverId) {
      return res.status(401).json({ error: "Authentication required" });
    }

    // Get user details before approval
    const user = await storage.getUser(parseInt(userId));
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await storage.approveUser(parseInt(userId), approverId);
    
    // Send approval email notification
    try {
      await sendUserApprovedEmail(user.email, user.username);
    } catch (emailError) {
      console.error("Failed to send approval email:", emailError);
      // Don't fail the approval if email fails
    }
    
    res.json({ message: "User approved successfully" });
  } catch (error) {
    console.error("Approve user error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}