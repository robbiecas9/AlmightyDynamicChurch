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
                      <p>almightygwc@gmail.com</p>
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
