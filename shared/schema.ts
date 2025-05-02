import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const contactFormSchema = createInsertSchema(contactSubmissions).pick({
  name: true,
  email: true,
  phone: true,
  message: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;

// Type definitions for static content
export interface Belief {
  id: number;
  title: string;
  summary: string;
  content: string;
  scripture: string;
}

export interface Meeting {
  id: number;
  title: string;
  day: string;
  time: string;
  location: string;
  description?: string;
}
