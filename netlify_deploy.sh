#!/bin/bash

# Create deployment directory
mkdir -p netlify_deploy

# Copy only the necessary files for a static frontend deployment
cp -r client netlify_deploy/
cp -r attached_assets netlify_deploy/
cp netlify.toml netlify_deploy/
cp netlify_package.json netlify_deploy/package.json
cp postcss.config.js netlify_deploy/
cp tailwind.config.ts netlify_deploy/
cp components.json netlify_deploy/

# Create a minimal shared directory with only the types needed by the frontend
mkdir -p netlify_deploy/shared
cat > netlify_deploy/shared/schema.ts << 'EOL'
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
EOL

# Create a simplified tsconfig.json for the frontend
cat > netlify_deploy/tsconfig.json << 'EOL'
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./client/src/*"],
      "@shared/*": ["./shared/*"],
      "@assets/*": ["./attached_assets/*"]
    }
  },
  "include": ["client/src", "shared"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
EOL

# Create tsconfig.node.json for vite
cat > netlify_deploy/tsconfig.node.json << 'EOL'
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
EOL

# Create a Netlify-specific vite.config.ts
cat > netlify_deploy/vite.config.ts << 'EOL'
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Config for Netlify static deployment
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve("./client/src"),
      "@shared": path.resolve("./shared"),
      "@assets": path.resolve("./attached_assets"),
    },
  },
  root: path.resolve("./client"),
  // Configure build to output to dist directory
  build: {
    outDir: path.resolve("./dist"),
    emptyOutDir: true,
  },
});
EOL

# Create a simplified version of the server to handle form submissions via Netlify functions
mkdir -p netlify_deploy/netlify/functions

# Create the contact form Netlify function
cat > netlify_deploy/netlify/functions/contact-form.js << 'EOL'
exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const data = JSON.parse(event.body);
    
    // Simple validation
    if (!data.name || !data.email || !data.message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Name, email, and message are required" })
      };
    }

    // Here you would typically send this data to an email service or database
    // For now, we'll just return success
    
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: "Message received successfully", 
        id: Date.now() // Generate a dummy ID
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to process contact form" })
    };
  }
};
EOL

# Create a modified version of the ContactSection component for Netlify form handling
mkdir -p netlify_deploy/client/src/components/sections
cat > netlify_deploy/client/src/components/sections/ContactSection.tsx << 'EOL'
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Church, 
  Phone, 
  Mail, 
  Globe 
} from "lucide-react";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      // For Netlify, use the built-in form handling
      const formData = new FormData();
      formData.append("form-name", "contact");
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      
      await fetch("/", {
        method: "POST",
        body: formData,
      });
      
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We will get back to you soon.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error Sending Message",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="animate-fade-in-down">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary text-center mb-12 animate-fade-in-down animate-delay-1">
            Contact Us
          </h2>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/2 animate-fade-in-down animate-delay-2">
              <div className="bg-white rounded-lg shadow-lg p-8 h-full">
                <h3 className="text-2xl font-heading font-bold text-primary mb-6">
                  Church Address
                </h3>

                <div className="space-y-4 mb-8">
                  <div className="flex">
                    <div className="text-secondary mr-4">
                      <Church className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold">ALMIGHTY GOD FELLOWSHIP</h4>
                      <p>BIBLE COLLEGE JUNCTION,</p>
                      <p>PUTHENCRUZ, ERNAKULAM DIST,</p>
                      <p>KERALA, INDIA</p>
                      <p>PINCODE: 682308</p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="text-secondary mr-4">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p>+91 9447218226</p>
                      <p>+91 9633638226</p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="text-secondary mr-4">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p>almightygf@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="text-secondary mr-4">
                      <Globe className="h-5 w-5" />
                    </div>
                    <div>
                      <p>www.almightygodfellowship.com</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.9584382075383!2d76.396777!3d9.886889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwNTMnMTIuOCJOIDc2wrAyMycwOC40IkU!5e0!3m2!1sen!2sin!4v1622644862548!5m2!1sen!2sin"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="Church Location Map"
                  ></iframe>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 animate-fade-in-down animate-delay-3">
              <div className="bg-white rounded-lg shadow-lg p-8 h-full">
                <h3 className="text-2xl font-heading font-bold text-primary mb-6">
                  Get In Touch
                </h3>

                {/* Hidden form for Netlify */}
                <form name="contact" data-netlify="true" hidden>
                  <input type="text" name="name" />
                  <input type="email" name="email" />
                  <input type="tel" name="phone" />
                  <textarea name="message"></textarea>
                </form>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-netlify="true" name="contact">
                    {/* Netlify form detection field */}
                    <input type="hidden" name="form-name" value="contact" />
                    
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your Name"
                              {...field}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your Email"
                              {...field}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your Phone"
                              {...field}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Your Message"
                              {...field}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                              rows={5}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
EOL

# Create a church-data.ts file with all the static data
mkdir -p netlify_deploy/client/src/lib
cat > netlify_deploy/client/src/lib/church-data.ts << 'EOL'
import { Belief, Meeting } from "@shared/schema";

export interface HeroContent {
  title: string;
  subtitle: string;
  content: string;
  imageUrl: string;
  buttonText: string;
  buttonLink: string;
}

export interface PastorMessageContent {
  title: string;
  subtitle: string;
  content: string;
  name: string;
  position: string;
  imageUrl: string;
}

export interface ScriptureBannerContent {
  content: string;
  reference: string;
}

export interface BibleImageContent {
  content: string;
  reference: string;
  imageUrl: string;
  buttonText: string;
  buttonLink: string;
}

export const heroContent: HeroContent = {
  title: "Welcome to Almighty God Fellowship",
  subtitle: "A place of love, faith, and community",
  content: "We are a community of believers committed to serving God and spreading His love. Join us in worship as we grow together in faith and fellowship.",
  imageUrl: "/church-building.jpg",
  buttonText: "Join Us",
  buttonLink: "#meetings",
};

export const pastorMessageContent: PastorMessageContent = {
  title: "A Message from Our Pastor",
  subtitle: "Walking together in faith",
  content: "Dear brothers and sisters in Christ, it is with joy that I welcome you to Almighty God Fellowship. Our church is built on the foundation of God's unchanging love and the timeless truths of His Word. We believe that every person is valuable in God's sight and has a special place in His plan. As we worship together, study His Word, and serve our community, we grow closer to Him and to one another. Whether you are exploring faith for the first time or seeking a church home, we invite you to join us on this journey of faith, hope, and love.",
  name: "Pastor Thomas Jacob",
  position: "Senior Pastor",
  imageUrl: "/pastor.jpg",
};

export const scriptureBannerContent: ScriptureBannerContent = {
  content: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
  reference: "John 3:16",
};

export const bibleImageContent: BibleImageContent = {
  content: "Your word is a lamp for my feet, a light on my path.",
  reference: "Psalm 119:105",
  imageUrl: "/bible-study.jpg",
  buttonText: "Join Bible Study",
  buttonLink: "#meetings",
};

export const meetingData: Meeting[] = [
  {
    id: 1,
    title: "Sunday Worship",
    day: "Sunday",
    time: "10:00 AM - 12:00 PM",
    location: "Main Sanctuary",
    description: "Our main worship service with praise, prayer, and teaching from God's Word.",
  },
  {
    id: 2,
    title: "Bible Study",
    day: "Wednesday",
    time: "7:00 PM - 8:30 PM",
    location: "Fellowship Hall",
    description: "Midweek Bible study and prayer meeting for spiritual growth and fellowship.",
  },
  {
    id: 3,
    title: "Youth Group",
    day: "Friday",
    time: "6:30 PM - 8:30 PM",
    location: "Youth Center",
    description: "A time for teenagers to connect, worship, and grow in their faith together.",
  },
  {
    id: 4,
    title: "Children's Church",
    day: "Sunday",
    time: "10:00 AM - 11:30 AM",
    location: "Children's Wing",
    description: "Fun, engaging Bible lessons and activities for children ages 4-12.",
  },
  {
    id: 5,
    title: "Prayer Meeting",
    day: "Tuesday",
    time: "6:00 AM - 7:00 AM",
    location: "Prayer Room",
    description: "Early morning prayer gathering to start the day with God.",
  },
  {
    id: 6,
    title: "Women's Fellowship",
    day: "Saturday",
    time: "4:00 PM - 5:30 PM",
    location: "Fellowship Hall",
    description: "A time for women to gather for fellowship, study, and prayer.",
  },
  {
    id: 7,
    title: "Men's Fellowship",
    day: "Saturday",
    time: "7:00 AM - 8:30 AM",
    location: "Fellowship Hall",
    description: "Breakfast, Bible study, and fellowship for men of all ages.",
  },
  {
    id: 8,
    title: "Choir Practice",
    day: "Thursday",
    time: "7:00 PM - 8:30 PM",
    location: "Choir Room",
    description: "Rehearsal for our worship choir. New voices are always welcome!",
  },
];

export const beliefData: Belief[] = [
  {
    id: 1,
    title: "The Bible",
    summary: "God's infallible Word",
    content: "We believe the Bible is the inspired, infallible Word of God and our final authority for faith and practice. It is without error in its original manuscripts and contains everything we need for salvation and godly living.",
    scripture: "2 Timothy 3:16-17 - All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness, so that the servant of God may be thoroughly equipped for every good work.",
  },
  {
    id: 2,
    title: "God",
    summary: "Trinity: Father, Son, and Holy Spirit",
    content: "We believe in one God, eternally existing in three persons: Father, Son, and Holy Spirit. Each person of the Trinity is fully God, sharing the same divine attributes yet distinct in person.",
    scripture: "Matthew 28:19 - Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit.",
  },
  {
    id: 3,
    title: "Jesus Christ",
    summary: "Fully God and fully human",
    content: "We believe Jesus Christ is fully God and fully human. He was born of a virgin, lived a sinless life, performed miracles, died on the cross for our sins, was bodily resurrected, ascended to heaven, and will return to judge the living and the dead.",
    scripture: "John 1:14 - The Word became flesh and made his dwelling among us. We have seen his glory, the glory of the one and only Son, who came from the Father, full of grace and truth.",
  },
  {
    id: 4,
    title: "Salvation",
    summary: "By grace through faith alone",
    content: "We believe salvation is by grace alone through faith alone in Christ alone. It is a free gift from God, not earned by good works but received by personal faith in the Lord Jesus Christ and His finished work on the cross.",
    scripture: "Ephesians 2:8-9 - For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God—not by works, so that no one can boast.",
  },
  {
    id: 5,
    title: "Holy Spirit",
    summary: "Empowers believers for Christian living",
    content: "We believe the Holy Spirit indwells every believer at the moment of salvation, empowering them to live a godly life and equipping them with gifts for service in God's kingdom.",
    scripture: "John 14:26 - But the Advocate, the Holy Spirit, whom the Father will send in my name, will teach you all things and will remind you of everything I have said to you.",
  },
  {
    id: 6,
    title: "The Church",
    summary: "Body of Christ and community of believers",
    content: "We believe the Church is the body of Christ, a spiritual organism made up of all born-again believers. We are called to worship, fellowship, discipleship, ministry, and evangelism.",
    scripture: "1 Corinthians 12:27 - Now you are the body of Christ, and each one of you is a part of it.",
  },
  {
    id: 7,
    title: "Baptism",
    summary: "Public declaration of faith",
    content: "We believe baptism is a public declaration of faith in Christ. It symbolizes our identification with Christ's death, burial, and resurrection and our new life in Him.",
    scripture: "Romans 6:4 - We were therefore buried with him through baptism into death in order that, just as Christ was raised from the dead through the glory of the Father, we too may live a new life.",
  },
  {
    id: 8,
    title: "Communion",
    summary: "Remembrance of Christ's sacrifice",
    content: "We believe communion is a memorial of Christ's sacrifice on the cross. It reminds us of His broken body and shed blood for our redemption and proclaims His death until He returns.",
    scripture: "1 Corinthians 11:26 - For whenever you eat this bread and drink this cup, you proclaim the Lord's death until he comes.",
  },
  {
    id: 9,
    title: "Second Coming",
    summary: "Christ's return for His Church",
    content: "We believe in the personal, visible, and imminent return of the Lord Jesus Christ for His Church. This blessed hope motivates us to holy living, faithful service, and eager evangelism.",
    scripture: "Acts 1:11 - 'Men of Galilee,' they said, 'why do you stand here looking into the sky? This same Jesus, who has been taken from you into heaven, will come back in the same way you have seen him go into heaven.'",
  },
  {
    id: 10,
    title: "Eternity",
    summary: "Heaven and hell are real destinations",
    content: "We believe in the resurrection of both the saved and the lost—the saved to eternal life in heaven with God, and the lost to eternal separation from God in hell.",
    scripture: "John 5:28-29 - Do not be amazed at this, for a time is coming when all who are in their graves will hear his voice and come out—those who have done what is good will rise to live, and those who have done what is evil will rise to be condemned.",
  },
];
EOL

# Create a simplified queryClient for static site use
mkdir -p netlify_deploy/client/src/lib
cat > netlify_deploy/client/src/lib/queryClient.ts << 'EOL'
import { QueryClient } from "@tanstack/react-query";

// No API calls needed for static site, simplify the queryClient
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

// Create a simplified mock apiRequest for compatibility
export async function apiRequest(
  _path: string,
  _method: string = "GET",
  _body?: any,
  _headers: HeadersInit = {}
) {
  // In static version, we don't make real API calls
  // All operations happen through form submissions directly to Netlify
  console.log("Static site: API requests not supported");
  return null;
}
EOL

echo "Deployment files prepared in the netlify_deploy directory"
echo "You can now download this directory as a zip file and upload it to Netlify"
