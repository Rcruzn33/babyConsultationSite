import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Phone, Mail, Clock, Instagram, Facebook } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendContactEmail } from "@/lib/emailjs";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      await sendContactEmail(data);
      toast({
        title: "Message sent successfully!",
        description: "I'll get back to you within 24 hours.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again or contact me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      content: "(555) 123-4567",
      subtitle: "Available Mon-Fri, 9am-6pm EST",
      bgColor: "bg-baby-blue",
    },
    {
      icon: Mail,
      title: "Email",
      content: "sarah@babysleepwhisperer.com",
      subtitle: "I respond within 24 hours",
      bgColor: "bg-soft-pink",
    },
    {
      icon: Clock,
      title: "Response Time",
      content: "Within 24 hours",
      subtitle: "Emergency support for active clients",
      bgColor: "bg-mint",
    },
  ];

  return (
    <main>
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl font-bold text-soft-dark mb-4">Get in Touch</h1>
            <p className="text-lg sm:text-xl text-medium-gray max-w-3xl mx-auto">
              Have questions about your baby's sleep? Ready to start your journey to better nights? 
              I'm here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Contact Form */}
            <div className="bg-cream p-6 sm:p-8 rounded-2xl sm:rounded-3xl">
              <h2 className="text-xl sm:text-2xl font-bold text-soft-dark mb-6">Send a Message</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-soft-dark">
                            Your Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your name"
                              className="px-4 py-3 rounded-xl border border-gray-200 focus:border-baby-blue focus:ring-2 focus:ring-baby-blue/20 touch-target"
                              {...field}
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
                          <FormLabel className="text-sm font-semibold text-soft-dark">
                            Email Address
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Enter your email"
                              className="px-4 py-3 rounded-xl border border-gray-200 focus:border-baby-blue focus:ring-2 focus:ring-baby-blue/20 touch-target"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-soft-dark">
                          Subject
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="px-4 py-3 rounded-xl border border-gray-200 focus:border-baby-blue focus:ring-2 focus:ring-baby-blue/20 touch-target">
                              <SelectValue placeholder="Select a topic" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="consultation">Free Consultation</SelectItem>
                            <SelectItem value="package">Sleep Package Inquiry</SelectItem>
                            <SelectItem value="workshop">Group Workshop</SelectItem>
                            <SelectItem value="general">General Question</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-soft-dark">
                          Message
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell me about your baby's sleep challenges..."
                            className="px-4 py-3 rounded-xl border border-gray-200 focus:border-baby-blue focus:ring-2 focus:ring-baby-blue/20 resize-none touch-target"
                            rows={5}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-soft-pink text-white py-4 rounded-xl font-semibold hover:bg-baby-blue transition-colors touch-target"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </div>

            {/* Contact Information */}
            <div className="space-y-6 sm:space-y-8 mt-8 lg:mt-0">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-soft-dark mb-4 sm:mb-6">Let's Connect</h2>
                <p className="text-sm sm:text-base text-medium-gray leading-relaxed mb-6 sm:mb-8">
                  I'm passionate about helping families get the sleep they need. Whether you have 
                  questions about my services or just want to chat about your baby's sleep, I'd love to hear from you.
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3 sm:space-x-4">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 ${info.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                        <IconComponent className="text-white h-4 w-4 sm:h-5 sm:w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-soft-dark mb-1 text-sm sm:text-base">{info.title}</h3>
                        <p className="text-medium-gray text-sm sm:text-base">{info.content}</p>
                        <p className="text-xs sm:text-sm text-medium-gray">{info.subtitle}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Social Media Links */}
              <div className="pt-6 sm:pt-8 border-t border-gray-200">
                <h3 className="font-semibold text-soft-dark mb-4 text-sm sm:text-base">Follow for Daily Tips</h3>
                <div className="flex space-x-3 sm:space-x-4">
                  <a
                    href="#"
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-baby-blue rounded-full flex items-center justify-center text-white hover:bg-soft-pink transition-colors touch-target"
                  >
                    <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-baby-blue rounded-full flex items-center justify-center text-white hover:bg-soft-pink transition-colors touch-target"
                  >
                    <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
