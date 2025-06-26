import { useState } from "react";
import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Bed, Check, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const consultationFormSchema = z.object({
  parentName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  childAge: z.string().min(1, "Please specify child's age"),
  sleepChallenges: z.string().min(10, "Please describe your sleep challenges"),
  consultationType: z.string().min(1, "Please select a consultation type"),
  preferredDate: z.string().optional(),
});

type ConsultationFormData = z.infer<typeof consultationFormSchema>;

export default function Services() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ConsultationFormData>({
    resolver: zodResolver(consultationFormSchema),
    defaultValues: {
      parentName: "",
      email: "",
      phone: "",
      childAge: "",
      sleepChallenges: "",
      consultationType: "",
      preferredDate: "",
    },
  });

  const scrollToForm = (packageType: string) => {
    // Set the selected package in the form
    form.setValue("consultationType", packageType);
    
    // Scroll to the form section
    const formElement = document.getElementById("consultation-form");
    if (formElement) {
      formElement.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      });
    }
  };

  const onSubmit = async (data: ConsultationFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/consultations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to book consultation');
      }

      toast({
        title: "Consultation booked!",
        description: "I'll contact you within 24 hours to schedule our call.",
      });
      
      form.reset();
      
    } catch (error) {
      toast({
        title: "Booking failed",
        description: "Please try again or contact me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const services = [
    {
      icon: Phone,
      title: "Free Consultation",
      bgColor: "bg-baby-blue/5",
      iconBg: "bg-baby-blue",
      buttonBg: "bg-baby-blue",
      features: [
        "15-minute phone call",
        "Sleep assessment",
        "General information",
        "Next steps discussion",
      ],
    },
    {
      icon: Bed,
      title: "Complete Sleep Package",
      bgColor: "bg-soft-pink/10",
      iconBg: "bg-soft-pink",
      buttonBg: "bg-soft-pink",
      popular: true,
      features: [
        "Comprehensive sleep assessment",
        "Three days nap and nighttime sleep monitoring",
        "Personalized daily schedule and daytime activities",
        "Personalized sleep plan",
        "Child's room assessment",
        "Unlimited support and Follow-up calls",
        "Support for future sleep regressions due to travel, environmental changes, etc",
        "Schedule adjustment due to child's growth",
      ],
    },

  ];

  return (
    <main>
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl font-bold text-soft-dark mb-4">
              Sleep Solutions for Every Family
            </h1>
            <p className="text-lg sm:text-xl text-medium-gray max-w-3xl mx-auto">
              Personalized sleep plans designed to work with your baby's temperament 
              and your family's lifestyle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={index}
                  className={`${service.bgColor} p-6 sm:p-8 rounded-2xl border-2 ${
                    service.popular ? "border-soft-pink" : "border-transparent"
                  } hover:border-baby-blue transition-colors card-hover relative`}
                >
                  {service.popular && (
                    <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-soft-pink text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div className="text-center mb-6">
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 ${service.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <IconComponent className="text-white h-6 w-6 sm:h-8 sm:w-8" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-soft-dark mb-2">
                      {service.title}
                    </h3>
                  </div>
                  <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm sm:text-base text-medium-gray">
                        <Check className="text-baby-blue mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${service.buttonBg} text-white py-3 rounded-full font-semibold hover:bg-baby-blue transition-colors touch-target`}
                    onClick={() => {
                      const packageType = service.title === "Free Consultation" ? "free-consultation" : "complete-package";
                      scrollToForm(packageType);
                    }}
                  >
                    {service.title === "Free Consultation" ? "Schedule Free Call" : "Get Started Today"}
                  </Button>
                </div>
              );
            })}
          </div>

          {/* Calendly Integration Section */}
          <div className="bg-cream p-6 sm:p-8 lg:p-12 rounded-2xl sm:rounded-3xl text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-soft-dark mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg sm:text-xl text-medium-gray mb-6 sm:mb-8 max-w-2xl mx-auto">
              Book your free consultation today and take the first step toward 
              peaceful nights for your whole family.
            </p>

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg max-w-4xl mx-auto">
              <div className="text-center py-8 sm:py-12 lg:py-16">
                <Calendar className="h-12 w-12 sm:h-16 sm:w-16 text-baby-blue mb-4 mx-auto" />
                <h3 className="text-xl sm:text-2xl font-semibold text-soft-dark mb-4">
                  Schedule Your Free Consultation
                </h3>
                <p className="text-sm sm:text-base text-medium-gray mb-6">Choose a time that works for you</p>
                <Card id="consultation-form" className="mt-6 sm:mt-8 text-left">
                  <CardHeader>
                    <CardTitle>Book Your Free Consultation</CardTitle>
                    <CardDescription>Tell me about your sleep challenges and I'll contact you within 48 hours</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="parentName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Your Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter your name" {...field} />
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
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="Enter your email" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone (Optional)</FormLabel>
                                <FormControl>
                                  <Input type="tel" placeholder="Phone number" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="childAge"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Child's Age</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., 8 months" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="consultationType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Consultation Type</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                value={field.value}
                                defaultValue=""
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select consultation type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="free-consultation">Free Consultation</SelectItem>
                                  <SelectItem value="complete-package">Complete Sleep Package</SelectItem>
                                  <SelectItem value="family-package">Family Sleep Package</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="sleepChallenges"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Sleep Challenges</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Describe your current sleep challenges..."
                                  rows={3}
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="preferredDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Preferred Date (Optional)</FormLabel>
                              <FormControl>
                                <Input 
                                  type="date" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button 
                          type="submit" 
                          className="w-full bg-baby-blue hover:bg-soft-pink"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Booking..." : "Book Free Consultation"}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
