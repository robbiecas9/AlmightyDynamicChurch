import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactFormSchema } from "@shared/schema";
import { z } from "zod";

// Error handler utility
const handleError = (error: unknown, res: Response, context: string) => {
  if (error instanceof z.ZodError) {
    return res.status(400).json({ 
      message: `Invalid ${context} data`, 
      errors: error.errors 
    });
  }
  
  console.error(`Error processing ${context}:`, error);
  res.status(500).json({ message: `Failed to process ${context}` });
};

export async function registerRoutes(app: Express): Promise<Server> {
  // ----- Contact Form Submission -----
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate request data
      const validatedData = contactFormSchema.parse(req.body);
      
      // Store the contact submission (in-memory storage)
      const submission = await storage.createContactSubmission(validatedData);
      
      // Return success response
      res.status(200).json({ 
        message: "Message received successfully", 
        id: submission.id 
      });
    } catch (error) {
      handleError(error, res, "contact form");
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
