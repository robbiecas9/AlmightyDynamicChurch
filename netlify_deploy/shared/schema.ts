import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

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
