import { users, type User, type InsertUser, type ContactFormData, type ContactSubmission, type CmsContent, type InsertCmsContent, type Belief, type InsertBelief, type Meeting, type InsertMeeting } from "@shared/schema";
import { beliefData } from "@/lib/church-data";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact methods
  createContactSubmission(data: ContactFormData): Promise<ContactSubmission>;
  
  // CMS Content methods
  getCmsContent(id: number): Promise<CmsContent | undefined>;
  getCmsContentByType(type: string): Promise<CmsContent[]>;
  createCmsContent(content: InsertCmsContent): Promise<CmsContent>;
  updateCmsContent(id: number, content: Partial<InsertCmsContent>): Promise<CmsContent | undefined>;
  deleteCmsContent(id: number): Promise<boolean>;
  
  // Belief methods
  getBelief(id: number): Promise<Belief | undefined>;
  getAllBeliefs(): Promise<Belief[]>;
  getActiveBeliefs(): Promise<Belief[]>;
  createBelief(belief: InsertBelief): Promise<Belief>;
  updateBelief(id: number, belief: Partial<InsertBelief>): Promise<Belief | undefined>;
  deleteBelief(id: number): Promise<boolean>;
  
  // Meeting methods
  getMeeting(id: number): Promise<Meeting | undefined>;
  getAllMeetings(): Promise<Meeting[]>;
  getActiveMeetings(): Promise<Meeting[]>;
  createMeeting(meeting: InsertMeeting): Promise<Meeting>;
  updateMeeting(id: number, meeting: Partial<InsertMeeting>): Promise<Meeting | undefined>;
  deleteMeeting(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactSubmissions: Map<number, ContactSubmission>;
  currentId: number;
  contactSubmissionId: number;

  constructor() {
    this.users = new Map();
    this.contactSubmissions = new Map();
    this.currentId = 1;
    this.contactSubmissionId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async createContactSubmission(data: ContactFormData): Promise<ContactSubmission> {
    const id = this.contactSubmissionId++;
    const submission: ContactSubmission = { 
      ...data, 
      id, 
      phone: data.phone || null,
      createdAt: new Date() 
    };
    this.contactSubmissions.set(id, submission);
    return submission;
  }
}

export const storage = new MemStorage();
