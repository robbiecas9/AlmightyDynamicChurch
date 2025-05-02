import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactFormSchema, insertCmsContentSchema, insertBeliefSchema, insertMeetingSchema } from "@shared/schema";
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
  // ----- CMS Content Routes -----
  
  // Get content by type (e.g. hero, pastor_message, etc.)
  app.get("/api/cms/content/:type", async (req, res) => {
    try {
      const { type } = req.params;
      const content = await storage.getCmsContentByType(type);
      res.status(200).json(content);
    } catch (error) {
      handleError(error, res, "content lookup");
    }
  });
  
  // Create new CMS content
  app.post("/api/cms/content", async (req, res) => {
    try {
      const validatedData = insertCmsContentSchema.parse(req.body);
      const content = await storage.createCmsContent(validatedData);
      res.status(201).json(content);
    } catch (error) {
      handleError(error, res, "content creation");
    }
  });
  
  // Update CMS content
  app.put("/api/cms/content/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const validatedData = insertCmsContentSchema.partial().parse(req.body);
      const updatedContent = await storage.updateCmsContent(id, validatedData);
      
      if (!updatedContent) {
        return res.status(404).json({ message: "Content not found" });
      }
      
      res.status(200).json(updatedContent);
    } catch (error) {
      handleError(error, res, "content update");
    }
  });
  
  // Delete CMS content
  app.delete("/api/cms/content/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const success = await storage.deleteCmsContent(id);
      if (!success) {
        return res.status(404).json({ message: "Content not found" });
      }
      
      res.status(200).json({ message: "Content deleted successfully" });
    } catch (error) {
      handleError(error, res, "content deletion");
    }
  });
  
  // ----- Beliefs Routes -----
  
  // Get all beliefs
  app.get("/api/beliefs", async (req, res) => {
    try {
      const beliefs = await storage.getAllBeliefs();
      res.status(200).json(beliefs);
    } catch (error) {
      handleError(error, res, "beliefs lookup");
    }
  });
  
  // Get active beliefs only
  app.get("/api/beliefs/active", async (req, res) => {
    try {
      const beliefs = await storage.getActiveBeliefs();
      res.status(200).json(beliefs);
    } catch (error) {
      handleError(error, res, "active beliefs lookup");
    }
  });
  
  // Get a specific belief
  app.get("/api/beliefs/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const belief = await storage.getBelief(id);
      if (!belief) {
        return res.status(404).json({ message: "Belief not found" });
      }
      
      res.status(200).json(belief);
    } catch (error) {
      handleError(error, res, "belief lookup");
    }
  });
  
  // Create new belief
  app.post("/api/beliefs", async (req, res) => {
    try {
      const validatedData = insertBeliefSchema.parse(req.body);
      const belief = await storage.createBelief(validatedData);
      res.status(201).json(belief);
    } catch (error) {
      handleError(error, res, "belief creation");
    }
  });
  
  // Update belief
  app.put("/api/beliefs/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const validatedData = insertBeliefSchema.partial().parse(req.body);
      const updatedBelief = await storage.updateBelief(id, validatedData);
      
      if (!updatedBelief) {
        return res.status(404).json({ message: "Belief not found" });
      }
      
      res.status(200).json(updatedBelief);
    } catch (error) {
      handleError(error, res, "belief update");
    }
  });
  
  // Delete belief
  app.delete("/api/beliefs/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const success = await storage.deleteBelief(id);
      if (!success) {
        return res.status(404).json({ message: "Belief not found" });
      }
      
      res.status(200).json({ message: "Belief deleted successfully" });
    } catch (error) {
      handleError(error, res, "belief deletion");
    }
  });
  
  // ----- Meetings Routes -----
  
  // Get all meetings
  app.get("/api/meetings", async (req, res) => {
    try {
      const meetings = await storage.getAllMeetings();
      res.status(200).json(meetings);
    } catch (error) {
      handleError(error, res, "meetings lookup");
    }
  });
  
  // Get active meetings only
  app.get("/api/meetings/active", async (req, res) => {
    try {
      const meetings = await storage.getActiveMeetings();
      res.status(200).json(meetings);
    } catch (error) {
      handleError(error, res, "active meetings lookup");
    }
  });
  
  // Get a specific meeting
  app.get("/api/meetings/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const meeting = await storage.getMeeting(id);
      if (!meeting) {
        return res.status(404).json({ message: "Meeting not found" });
      }
      
      res.status(200).json(meeting);
    } catch (error) {
      handleError(error, res, "meeting lookup");
    }
  });
  
  // Create new meeting
  app.post("/api/meetings", async (req, res) => {
    try {
      const validatedData = insertMeetingSchema.parse(req.body);
      const meeting = await storage.createMeeting(validatedData);
      res.status(201).json(meeting);
    } catch (error) {
      handleError(error, res, "meeting creation");
    }
  });
  
  // Update meeting
  app.put("/api/meetings/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const validatedData = insertMeetingSchema.partial().parse(req.body);
      const updatedMeeting = await storage.updateMeeting(id, validatedData);
      
      if (!updatedMeeting) {
        return res.status(404).json({ message: "Meeting not found" });
      }
      
      res.status(200).json(updatedMeeting);
    } catch (error) {
      handleError(error, res, "meeting update");
    }
  });
  
  // Delete meeting
  app.delete("/api/meetings/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const success = await storage.deleteMeeting(id);
      if (!success) {
        return res.status(404).json({ message: "Meeting not found" });
      }
      
      res.status(200).json({ message: "Meeting deleted successfully" });
    } catch (error) {
      handleError(error, res, "meeting deletion");
    }
  });
  
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
