import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Phone, Bed, Users, Check, Calendar } from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: Phone,
      title: "Free Consultation",
      price: "$0",
      bgColor: "bg-baby-blue/5",
      iconBg: "bg-baby-blue",
      buttonBg: "bg-baby-blue",
      features: [
        "15-minute phone call",
        "Sleep assessment",
        "Customized recommendations",
        "Next steps discussion",
      ],
    },
    {
      icon: Bed,
      title: "Complete Sleep Package",
      price: "$497",
      bgColor: "bg-soft-pink/10",
      iconBg: "bg-soft-pink",
      buttonBg: "bg-soft-pink",
      popular: true,
      features: [
        "Comprehensive sleep assessment",
        "Personalized sleep plan",
        "2 weeks unlimited text support",
        "Follow-up calls",
        "Plan adjustments",
      ],
    },
    {
      icon: Users,
      title: "Group Workshop",
      price: "$97",
      bgColor: "bg-mint/10",
      iconBg: "bg-mint",
      buttonBg: "bg-mint",
      features: [
        "2-hour online workshop",
        "Learn foundational principles",
        "Q&A session",
        "Resource materials",
      ],
    },
  ];

  return (
    <main>
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-soft-dark mb-4">
              Sleep Solutions for Every Family
            </h1>
            <p className="text-xl text-medium-gray max-w-3xl mx-auto">
              Personalized sleep plans designed to work with your baby's temperament 
              and your family's lifestyle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={index}
                  className={`${service.bgColor} p-8 rounded-2xl border-2 ${
                    service.popular ? "border-soft-pink" : "border-transparent"
                  } hover:border-baby-blue transition-colors card-hover relative`}
                >
                  {service.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-soft-pink text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div className="text-center mb-6">
                    <div className={`w-16 h-16 ${service.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <IconComponent className="text-white h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-soft-dark mb-2">
                      {service.title}
                    </h3>
                    <div className="text-3xl font-bold text-baby-blue">
                      {service.price}
                    </div>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-medium-gray">
                        <Check className="text-baby-blue mr-3 h-5 w-5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full ${service.buttonBg} text-white py-3 rounded-full font-semibold hover:bg-baby-blue transition-colors`}>
                    {service.title === "Free Consultation" ? "Schedule Free Call" : 
                     service.title === "Complete Sleep Package" ? "Get Started Today" : 
                     "Join Workshop"}
                  </Button>
                </div>
              );
            })}
          </div>

          {/* Calendly Integration Section */}
          <div className="bg-cream p-12 rounded-3xl text-center">
            <h2 className="text-3xl font-bold text-soft-dark mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-medium-gray mb-8 max-w-2xl mx-auto">
              Book your free consultation today and take the first step toward 
              peaceful nights for your whole family.
            </p>

            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-4xl mx-auto">
              <div className="text-center py-16">
                <Calendar className="h-16 w-16 text-baby-blue mb-4 mx-auto" />
                <h3 className="text-2xl font-semibold text-soft-dark mb-4">
                  Schedule Your Free Consultation
                </h3>
                <p className="text-medium-gray mb-6">Choose a time that works for you</p>
                <Button className="bg-soft-pink text-white px-8 py-3 rounded-full font-semibold hover:bg-baby-blue transition-colors">
                  Open Calendar
                </Button>
                {/* TODO: Replace with actual Calendly embed code */}
                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    Calendly integration will be embedded here. 
                    Add your Calendly embed code to replace this placeholder.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
