import { beliefData } from "@/lib/church-data";
import { 
  type User, type InsertUser, 
  type ContactFormData, type ContactSubmission, 
  type CmsContent, type InsertCmsContent, 
  type Belief, type InsertBelief, 
  type Meeting, type InsertMeeting 
} from "@shared/schema";

// Interface for CMS storage operations
export interface ICmsStorage {
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

// In-memory CMS storage implementation
export class MemCmsStorage implements ICmsStorage {
  private cmsContent: Map<number, CmsContent>;
  private beliefs: Map<number, Belief>;
  private meetings: Map<number, Meeting>;
  
  cmsContentId: number;
  beliefId: number;
  meetingId: number;

  constructor() {
    this.cmsContent = new Map();
    this.beliefs = new Map();
    this.meetings = new Map();
    
    this.cmsContentId = 1;
    this.beliefId = 1;
    this.meetingId = 1;
    
    // Seed initial data
    this.seedInitialData();
  }
  
  // Seed initial data for the website
  private seedInitialData() {
    try {
      // Seed beliefs data from existing data
      beliefData.forEach(belief => {
        const seedBelief: InsertBelief = {
          title: belief.title,
          summary: belief.summary,
          content: belief.content,
          scripture: belief.scripture,
          sortOrder: belief.id,
          isActive: true
        };
        this.createBelief(seedBelief);
      });
      
      // Add default CMS content
      const defaultContent = [
        {
          type: "hero",
          title: "ALMIGHTY GOD WORSHIP CHURCH",
          subtitle: "BIBLE COLLEGE JUNCTION, PUTHENCRUZ, ERNAKULAM DIST, KERALA",
          content: "FOLLOW JESUS FOR PEACE AND ETERNAL LIFE",
          imageUrl: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57",
          buttonText: "Join Our Worship",
          buttonLink: "#meetings",
          sortOrder: 1,
          isActive: true
        },
        {
          type: "pastor_message",
          title: "Message From Our Pastor",
          subtitle: "Rev. P.A. Thomas",
          content: "We believe in the gospel of Jesus Christ and its power to transform lives. We invite you to join us in worship and experience the love and grace of God.",
          imageUrl: "https://images.unsplash.com/photo-1594895976542-50ab4fe79efd",
          sortOrder: 1,
          isActive: true
        },
        {
          type: "scripture_banner",
          title: "",
          content: "Jesus said to him, \"I am the way, and the truth, and the life. No one comes to the Father except through me.\"",
          subtitle: "John 14:6",
          sortOrder: 1,
          isActive: true
        }
      ];
      
      // Add each content item to the CMS
      defaultContent.forEach(content => {
        this.createCmsContent(content as InsertCmsContent);
      });
    } catch (error) {
      console.error("Error seeding initial data:", error);
    }
  }

  // CMS Content methods
  async getCmsContent(id: number): Promise<CmsContent | undefined> {
    return this.cmsContent.get(id);
  }
  
  async getCmsContentByType(type: string): Promise<CmsContent[]> {
    return Array.from(this.cmsContent.values())
      .filter(content => content.type === type && content.isActive);
  }
  
  async createCmsContent(content: InsertCmsContent): Promise<CmsContent> {
    const id = this.cmsContentId++;
    const now = new Date();
    const newContent: CmsContent = {
      id,
      type: content.type,
      title: content.title ?? null,
      subtitle: content.subtitle ?? null,
      content: content.content ?? null,
      imageUrl: content.imageUrl ?? null,
      buttonText: content.buttonText ?? null,
      buttonLink: content.buttonLink ?? null,
      sortOrder: content.sortOrder ?? 0,
      isActive: content.isActive ?? true,
      createdAt: now,
      updatedAt: now
    };
    this.cmsContent.set(id, newContent);
    return newContent;
  }
  
  async updateCmsContent(id: number, content: Partial<InsertCmsContent>): Promise<CmsContent | undefined> {
    const existingContent = await this.getCmsContent(id);
    if (!existingContent) return undefined;
    
    const updatedContent: CmsContent = {
      id: existingContent.id,
      type: content.type ?? existingContent.type,
      title: content.title ?? existingContent.title,
      subtitle: content.subtitle ?? existingContent.subtitle,
      content: content.content ?? existingContent.content,
      imageUrl: content.imageUrl ?? existingContent.imageUrl,
      buttonText: content.buttonText ?? existingContent.buttonText,
      buttonLink: content.buttonLink ?? existingContent.buttonLink,
      sortOrder: content.sortOrder ?? existingContent.sortOrder,
      isActive: content.isActive ?? existingContent.isActive,
      createdAt: existingContent.createdAt,
      updatedAt: new Date()
    };
    
    this.cmsContent.set(id, updatedContent);
    return updatedContent;
  }
  
  async deleteCmsContent(id: number): Promise<boolean> {
    return this.cmsContent.delete(id);
  }
  
  // Belief methods
  async getBelief(id: number): Promise<Belief | undefined> {
    return this.beliefs.get(id);
  }
  
  async getAllBeliefs(): Promise<Belief[]> {
    return Array.from(this.beliefs.values())
      .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  }
  
  async getActiveBeliefs(): Promise<Belief[]> {
    return Array.from(this.beliefs.values())
      .filter(belief => belief.isActive)
      .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  }
  
  async createBelief(belief: InsertBelief): Promise<Belief> {
    const id = this.beliefId++;
    const now = new Date();
    const newBelief: Belief = {
      id,
      title: belief.title,
      summary: belief.summary,
      content: belief.content,
      scripture: belief.scripture,
      sortOrder: belief.sortOrder ?? 0,
      isActive: belief.isActive ?? true,
      createdAt: now,
      updatedAt: now
    };
    this.beliefs.set(id, newBelief);
    return newBelief;
  }
  
  async updateBelief(id: number, belief: Partial<InsertBelief>): Promise<Belief | undefined> {
    const existingBelief = await this.getBelief(id);
    if (!existingBelief) return undefined;
    
    const updatedBelief: Belief = {
      id: existingBelief.id,
      title: belief.title ?? existingBelief.title,
      content: belief.content ?? existingBelief.content,
      summary: belief.summary ?? existingBelief.summary,
      scripture: belief.scripture ?? existingBelief.scripture,
      sortOrder: belief.sortOrder ?? existingBelief.sortOrder,
      isActive: belief.isActive ?? existingBelief.isActive,
      createdAt: existingBelief.createdAt,
      updatedAt: new Date()
    };
    
    this.beliefs.set(id, updatedBelief);
    return updatedBelief;
  }
  
  async deleteBelief(id: number): Promise<boolean> {
    return this.beliefs.delete(id);
  }
  
  // Meeting methods
  async getMeeting(id: number): Promise<Meeting | undefined> {
    return this.meetings.get(id);
  }
  
  async getAllMeetings(): Promise<Meeting[]> {
    return Array.from(this.meetings.values())
      .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  }
  
  async getActiveMeetings(): Promise<Meeting[]> {
    return Array.from(this.meetings.values())
      .filter(meeting => meeting.isActive)
      .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  }
  
  async createMeeting(meeting: InsertMeeting): Promise<Meeting> {
    const id = this.meetingId++;
    const now = new Date();
    const newMeeting: Meeting = {
      id,
      title: meeting.title,
      day: meeting.day,
      time: meeting.time,
      location: meeting.location ?? null,
      description: meeting.description ?? null,
      sortOrder: meeting.sortOrder ?? 0,
      isActive: meeting.isActive ?? true,
      createdAt: now,
      updatedAt: now
    };
    this.meetings.set(id, newMeeting);
    return newMeeting;
  }
  
  async updateMeeting(id: number, meeting: Partial<InsertMeeting>): Promise<Meeting | undefined> {
    const existingMeeting = await this.getMeeting(id);
    if (!existingMeeting) return undefined;
    
    const updatedMeeting: Meeting = {
      id: existingMeeting.id,
      title: meeting.title ?? existingMeeting.title,
      day: meeting.day ?? existingMeeting.day,
      time: meeting.time ?? existingMeeting.time,
      location: meeting.location ?? existingMeeting.location,
      description: meeting.description ?? existingMeeting.description,
      sortOrder: meeting.sortOrder ?? existingMeeting.sortOrder,
      isActive: meeting.isActive ?? existingMeeting.isActive,
      createdAt: existingMeeting.createdAt,
      updatedAt: new Date()
    };
    
    this.meetings.set(id, updatedMeeting);
    return updatedMeeting;
  }
  
  async deleteMeeting(id: number): Promise<boolean> {
    return this.meetings.delete(id);
  }
}

// Create and export a singleton instance of CMS storage
export const cmsStorage = new MemCmsStorage();
