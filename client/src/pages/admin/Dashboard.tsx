import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest, getQueryFn } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

interface ContentItem {
  id: number;
  type: string;
  title: string | null;
  subtitle: string | null;
  content: string | null;
  imageUrl: string | null;
  buttonText: string | null;
  buttonLink: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface Belief {
  id: number;
  title: string;
  summary: string;
  content: string;
  scripture: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface Meeting {
  id: number;
  title: string;
  day: string;
  time: string;
  location: string | null;
  description: string | null;
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const Dashboard = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("content");
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [selectedBelief, setSelectedBelief] = useState<Belief | null>(null);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  
  // Fetch content
  const { data: heroContent = [] } = useQuery({
    queryKey: ["/api/cms/content/hero"],
    queryFn: getQueryFn({ on401: "returnNull" })
  });
  
  const { data: pastorMessage = [] } = useQuery({
    queryKey: ["/api/cms/content/pastor_message"],
    queryFn: getQueryFn({ on401: "returnNull" })
  });
  
  const { data: scriptureBanner = [] } = useQuery({
    queryKey: ["/api/cms/content/scripture_banner"],
    queryFn: getQueryFn({ on401: "returnNull" })
  });
  
  // Fetch beliefs
  const { data: beliefs = [] } = useQuery({
    queryKey: ["/api/beliefs"],
    queryFn: getQueryFn({ on401: "returnNull" })
  });
  
  // Fetch meetings
  const { data: meetings = [] } = useQuery({
    queryKey: ["/api/meetings"],
    queryFn: getQueryFn({ on401: "returnNull" })
  });
  
  // Mutations for updating content
  const updateContentMutation = useMutation({
    mutationFn: async (content: Partial<ContentItem>) => {
      if (!selectedContent) throw new Error("No content selected");
      return apiRequest(`/api/cms/content/${selectedContent.id}`, "PUT", content);
    },
    onSuccess: () => {
      toast({
        title: "Content updated",
        description: "Your changes have been saved."
      });
      queryClient.invalidateQueries({ queryKey: ["/api/cms/content"] });
      setSelectedContent(null);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update content. Please try again.",
        variant: "destructive"
      });
      console.error("Error updating content:", error);
    }
  });
  
  // Mutation for updating beliefs
  const updateBeliefMutation = useMutation({
    mutationFn: async (belief: Partial<Belief>) => {
      if (!selectedBelief) throw new Error("No belief selected");
      return apiRequest(`/api/beliefs/${selectedBelief.id}`, "PUT", belief);
    },
    onSuccess: () => {
      toast({
        title: "Belief updated",
        description: "Your changes have been saved."
      });
      queryClient.invalidateQueries({ queryKey: ["/api/beliefs"] });
      setSelectedBelief(null);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update belief. Please try again.",
        variant: "destructive"
      });
      console.error("Error updating belief:", error);
    }
  });
  
  // Mutation for updating meetings
  const updateMeetingMutation = useMutation({
    mutationFn: async (meeting: Partial<Meeting>) => {
      if (!selectedMeeting) throw new Error("No meeting selected");
      return apiRequest(`/api/meetings/${selectedMeeting.id}`, "PUT", meeting);
    },
    onSuccess: () => {
      toast({
        title: "Meeting updated",
        description: "Your changes have been saved."
      });
      queryClient.invalidateQueries({ queryKey: ["/api/meetings"] });
      setSelectedMeeting(null);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update meeting. Please try again.",
        variant: "destructive"
      });
      console.error("Error updating meeting:", error);
    }
  });
  
  // Handle content form submission
  const handleContentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedContent) return;
    
    updateContentMutation.mutate({
      title: selectedContent.title,
      subtitle: selectedContent.subtitle,
      content: selectedContent.content,
      imageUrl: selectedContent.imageUrl,
      buttonText: selectedContent.buttonText,
      buttonLink: selectedContent.buttonLink,
      isActive: selectedContent.isActive,
    });
  };
  
  // Handle belief form submission
  const handleBeliefSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBelief) return;
    
    updateBeliefMutation.mutate({
      title: selectedBelief.title,
      summary: selectedBelief.summary,
      content: selectedBelief.content,
      scripture: selectedBelief.scripture,
      isActive: selectedBelief.isActive,
    });
  };
  
  // Handle meeting form submission
  const handleMeetingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMeeting) return;
    
    updateMeetingMutation.mutate({
      title: selectedMeeting.title,
      day: selectedMeeting.day,
      time: selectedMeeting.time,
      location: selectedMeeting.location,
      description: selectedMeeting.description,
      isActive: selectedMeeting.isActive,
    });
  };

  const ContentSection = () => {
    if (!heroContent || !pastorMessage || !scriptureBanner) {
      return <div>Loading content...</div>;
    }
    
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Website Content</h2>
        <p>Edit the main content sections of your website.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Hero Section Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
              <CardDescription>Main homepage banner</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="truncate">{heroContent[0]?.title || "No title"}</p>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => setSelectedContent(heroContent[0])}
                variant="outline"
              >
                Edit Content
              </Button>
            </CardFooter>
          </Card>
          
          {/* Pastor Message Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Pastor's Message</CardTitle>
              <CardDescription>Message from the church pastor</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="truncate">{pastorMessage[0]?.title || "No title"}</p>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => setSelectedContent(pastorMessage[0])}
                variant="outline"
              >
                Edit Content
              </Button>
            </CardFooter>
          </Card>
          
          {/* Scripture Banner Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Scripture Banner</CardTitle>
              <CardDescription>Featured scripture passage</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="truncate">{scriptureBanner[0]?.content || "No content"}</p>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => setSelectedContent(scriptureBanner[0])}
                variant="outline"
              >
                Edit Content
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {selectedContent && (
          <div className="bg-gray-50 p-6 rounded-lg mt-8">
            <h3 className="text-xl font-semibold mb-4">Edit {selectedContent.type.replace('_', ' ')}</h3>
            <form onSubmit={handleContentSubmit} className="space-y-4">
              {selectedContent.title !== null && (
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={selectedContent.title || ''}
                    onChange={(e) => setSelectedContent({
                      ...selectedContent,
                      title: e.target.value
                    })}
                  />
                </div>
              )}
              
              {selectedContent.subtitle !== null && (
                <div>
                  <Label htmlFor="subtitle">Subtitle</Label>
                  <Input
                    id="subtitle"
                    value={selectedContent.subtitle || ''}
                    onChange={(e) => setSelectedContent({
                      ...selectedContent,
                      subtitle: e.target.value
                    })}
                  />
                </div>
              )}
              
              {selectedContent.content !== null && (
                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={selectedContent.content || ''}
                    rows={5}
                    onChange={(e) => setSelectedContent({
                      ...selectedContent,
                      content: e.target.value
                    })}
                  />
                </div>
              )}
              
              {selectedContent.imageUrl !== null && (
                <div>
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input
                    id="imageUrl"
                    value={selectedContent.imageUrl || ''}
                    onChange={(e) => setSelectedContent({
                      ...selectedContent,
                      imageUrl: e.target.value
                    })}
                  />
                </div>
              )}
              
              {selectedContent.buttonText !== null && (
                <div>
                  <Label htmlFor="buttonText">Button Text</Label>
                  <Input
                    id="buttonText"
                    value={selectedContent.buttonText || ''}
                    onChange={(e) => setSelectedContent({
                      ...selectedContent,
                      buttonText: e.target.value
                    })}
                  />
                </div>
              )}
              
              {selectedContent.buttonLink !== null && (
                <div>
                  <Label htmlFor="buttonLink">Button Link</Label>
                  <Input
                    id="buttonLink"
                    value={selectedContent.buttonLink || ''}
                    onChange={(e) => setSelectedContent({
                      ...selectedContent,
                      buttonLink: e.target.value
                    })}
                  />
                </div>
              )}
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setSelectedContent(null)}>Cancel</Button>
                <Button type="submit" disabled={updateContentMutation.isPending}>
                  {updateContentMutation.isPending ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  };
  
  const BeliefsSection = () => {
    if (!beliefs) {
      return <div>Loading beliefs...</div>;
    }
    
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Our Beliefs</h2>
        <p>Manage the church's statement of beliefs shown on the website.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {beliefs.map((belief: Belief) => (
            <Card key={belief.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{belief.title}</CardTitle>
                <CardDescription className="line-clamp-2">{belief.summary}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">{belief.scripture}</p>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => setSelectedBelief(belief)}
                  variant="outline"
                >
                  Edit Belief
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {selectedBelief && (
          <div className="bg-gray-50 p-6 rounded-lg mt-8">
            <h3 className="text-xl font-semibold mb-4">Edit Belief</h3>
            <form onSubmit={handleBeliefSubmit} className="space-y-4">
              <div>
                <Label htmlFor="beliefTitle">Title</Label>
                <Input
                  id="beliefTitle"
                  value={selectedBelief.title}
                  onChange={(e) => setSelectedBelief({
                    ...selectedBelief,
                    title: e.target.value
                  })}
                />
              </div>
              
              <div>
                <Label htmlFor="beliefSummary">Summary</Label>
                <Textarea
                  id="beliefSummary"
                  value={selectedBelief.summary}
                  rows={2}
                  onChange={(e) => setSelectedBelief({
                    ...selectedBelief,
                    summary: e.target.value
                  })}
                />
              </div>
              
              <div>
                <Label htmlFor="beliefContent">Content</Label>
                <Textarea
                  id="beliefContent"
                  value={selectedBelief.content}
                  rows={5}
                  onChange={(e) => setSelectedBelief({
                    ...selectedBelief,
                    content: e.target.value
                  })}
                />
              </div>
              
              <div>
                <Label htmlFor="beliefScripture">Scripture Reference</Label>
                <Input
                  id="beliefScripture"
                  value={selectedBelief.scripture}
                  onChange={(e) => setSelectedBelief({
                    ...selectedBelief,
                    scripture: e.target.value
                  })}
                />
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setSelectedBelief(null)}>Cancel</Button>
                <Button type="submit" disabled={updateBeliefMutation.isPending}>
                  {updateBeliefMutation.isPending ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  };
  
  const MeetingsSection = () => {
    if (!meetings) {
      return <div>Loading meetings...</div>;
    }
    
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Worship Services & Meetings</h2>
        <p>Manage the church's worship services and meeting schedule.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {meetings.map((meeting: Meeting) => (
            <Card key={meeting.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{meeting.title}</CardTitle>
                <CardDescription>{meeting.day} at {meeting.time}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">{meeting.location}</p>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => setSelectedMeeting(meeting)}
                  variant="outline"
                >
                  Edit Meeting
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {selectedMeeting && (
          <div className="bg-gray-50 p-6 rounded-lg mt-8">
            <h3 className="text-xl font-semibold mb-4">Edit Meeting</h3>
            <form onSubmit={handleMeetingSubmit} className="space-y-4">
              <div>
                <Label htmlFor="meetingTitle">Title</Label>
                <Input
                  id="meetingTitle"
                  value={selectedMeeting.title}
                  onChange={(e) => setSelectedMeeting({
                    ...selectedMeeting,
                    title: e.target.value
                  })}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="meetingDay">Day</Label>
                  <Input
                    id="meetingDay"
                    value={selectedMeeting.day}
                    onChange={(e) => setSelectedMeeting({
                      ...selectedMeeting,
                      day: e.target.value
                    })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="meetingTime">Time</Label>
                  <Input
                    id="meetingTime"
                    value={selectedMeeting.time}
                    onChange={(e) => setSelectedMeeting({
                      ...selectedMeeting,
                      time: e.target.value
                    })}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="meetingLocation">Location</Label>
                <Input
                  id="meetingLocation"
                  value={selectedMeeting.location || ''}
                  onChange={(e) => setSelectedMeeting({
                    ...selectedMeeting,
                    location: e.target.value
                  })}
                />
              </div>
              
              <div>
                <Label htmlFor="meetingDescription">Description</Label>
                <Textarea
                  id="meetingDescription"
                  value={selectedMeeting.description || ''}
                  rows={3}
                  onChange={(e) => setSelectedMeeting({
                    ...selectedMeeting,
                    description: e.target.value
                  })}
                />
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setSelectedMeeting(null)}>Cancel</Button>
                <Button type="submit" disabled={updateMeetingMutation.isPending}>
                  {updateMeetingMutation.isPending ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Church Website CMS</h1>
        <p className="text-gray-600">Manage your church website content in one place</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="content">Website Content</TabsTrigger>
          <TabsTrigger value="beliefs">Our Beliefs</TabsTrigger>
          <TabsTrigger value="meetings">Worship Services</TabsTrigger>
        </TabsList>
        
        <TabsContent value="content" className="mt-6">
          <ContentSection />
        </TabsContent>
        
        <TabsContent value="beliefs" className="mt-6">
          <BeliefsSection />
        </TabsContent>
        
        <TabsContent value="meetings" className="mt-6">
          <MeetingsSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;