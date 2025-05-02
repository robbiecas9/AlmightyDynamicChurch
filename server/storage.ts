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
  
  // Forward CMS Content methods to cms-storage
  async getCmsContent(id: number): Promise<CmsContent | undefined> {
    const { cmsStorage } = require('./cms-storage');
    return cmsStorage.getCmsContent(id);
  }
  
  async getCmsContentByType(type: string): Promise<CmsContent[]> {
    const { cmsStorage } = require('./cms-storage');
    return cmsStorage.getCmsContentByType(type);
  }
  
  async createCmsContent(content: InsertCmsContent): Promise<CmsContent> {
    const { cmsStorage } = require('./cms-storage');
    return cmsStorage.createCmsContent(content);
  }
  
  async updateCmsContent(id: number, content: Partial<InsertCmsContent>): Promise<CmsContent | undefined> {
    const { cmsStorage } = require('./cms-storage');
    return cmsStorage.updateCmsContent(id, content);
  }
  
  async deleteCmsContent(id: number): Promise<boolean> {
    const { cmsStorage } = require('./cms-storage');
    return cmsStorage.deleteCmsContent(id);
  }
  
  // Forward Belief methods to cms-storage
  async getBelief(id: number): Promise<Belief | undefined> {
    const { cmsStorage } = require('./cms-storage');
    return cmsStorage.getBelief(id);
  }
  
  async getAllBeliefs(): Promise<Belief[]> {
    const { cmsStorage } = require('./cms-storage');
    return cmsStorage.getAllBeliefs();
  }
  
  async getActiveBeliefs(): Promise<Belief[]> {
    const { cmsStorage } = require('./cms-storage');
    return cmsStorage.getActiveBeliefs();
  }
  
  async createBelief(belief: InsertBelief): Promise<Belief> {
    const { cmsStorage } = require('./cms-storage');
    return cmsStorage.createBelief(belief);
  }
  
  async updateBelief(id: number, belief: Partial<InsertBelief>): Promise<Belief | undefined> {
    const { cmsStorage } = require('./cms-storage');
    return cmsStorage.updateBelief(id, belief);
  }
  
  async deleteBelief(id: number): Promise<boolean> {
    const { cmsStorage } = require('./cms-storage');
    return cmsStorage.deleteBelief(id);
  }
  
  // Forward Meeting methods to cms-storage
  async getMeeting(id: number): Promise<Meeting | undefined> {
    const { cmsStorage } = require('./cms-storage');
    return cmsStorage.getMeeting(id);
  }
  
  async getAllMeetings(): Promise<Meeting[]> {
    const { cmsStorage } = require('./cms-storage');
    return cmsStorage.getAllMeetings();
  }
  
  async getActiveMeetings(): Promise<Meeting[]> {
    const { cmsStorage } = require('./cms-storage');
    return cmsStorage.getActiveMeetings();
  }
  
  async createMeeting(meeting: InsertMeeting): Promise<Meeting> {
    const { cmsStorage } = require('./cms-storage');
    return cmsStorage.createMeeting(meeting);
  }
  
  async updateMeeting(id: number, meeting: Partial<InsertMeeting>): Promise<Meeting | undefined> {
    const { cmsStorage } = require('./cms-storage');
    return cmsStorage.updateMeeting(id, meeting);
  }
  
  async deleteMeeting(id: number): Promise<boolean> {
    const { cmsStorage } = require('./cms-storage');
    return cmsStorage.deleteMeeting(id);
  }
}

export const storage = new MemStorage();
