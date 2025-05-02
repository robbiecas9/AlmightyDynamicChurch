import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactFormSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
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
      if (error instanceof z.ZodError) {
        // Validation error
        return res.status(400).json({ 
          message: "Invalid form data", 
          errors: error.errors 
        });
      }
      
      // Generic error
      console.error("Error processing contact form:", error);
      res.status(500).json({ message: "Failed to process contact form" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
