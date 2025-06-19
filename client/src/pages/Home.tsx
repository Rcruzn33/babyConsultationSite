import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Heart, GraduationCap, Clock, Star, Moon } from "lucide-react";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-baby-blue/20 via-soft-pink/10 to-mint/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl lg:text-6xl font-bold text-soft-dark leading-tight">
                Peaceful Nights for Your{" "}
                <span className="text-baby-blue">Little One</span>
              </h1>
              <p className="text-xl text-medium-gray leading-relaxed">
                Expert sleep consulting to help your baby develop healthy sleep habits, 
                giving your whole family the rest you deserve.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/services">
                  <Button className="bg-soft-pink text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-baby-blue transition-colors">
                    Book Free Consultation
                  </Button>
                </Link>
                <Link href="/services">
                  <Button
                    variant="outline"
                    className="border-2 border-baby-blue text-baby-blue px-8 py-4 rounded-full text-lg font-medium hover:bg-baby-blue hover:text-white transition-colors"
                  >
                    View Services
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-baby-blue">500+</div>
                  <div className="text-sm text-medium-gray">Families Helped</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-soft-pink">95%</div>
                  <div className="text-sm text-medium-gray">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-mint">5★</div>
                  <div className="text-sm text-medium-gray">Average Rating</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Peaceful baby sleeping in nursery"
                className="rounded-3xl shadow-2xl w-full h-auto"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-mint rounded-full flex items-center justify-center">
                    <Moon className="text-white h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-soft-dark">Sleep Success</div>
                    <div className="text-sm text-medium-gray">Within 2 weeks</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-soft-dark mb-4">Why Families Choose Us</h2>
            <p className="text-xl text-medium-gray max-w-3xl mx-auto">
              Our gentle, evidence-based approach helps babies learn healthy sleep habits 
              while supporting parents through every step.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-baby-blue/5 card-hover">
              <div className="w-16 h-16 bg-baby-blue rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="text-white h-8 w-8" />
              </div>
              <h3 className="text-2xl font-semibold text-soft-dark mb-4">Gentle Methods</h3>
              <p className="text-medium-gray leading-relaxed">
                No harsh cry-it-out methods. We use responsive, gentle techniques that 
                respect your baby's needs and your parenting style.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-soft-pink/10 card-hover">
              <div className="w-16 h-16 bg-soft-pink rounded-full flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="text-white h-8 w-8" />
              </div>
              <h3 className="text-2xl font-semibold text-soft-dark mb-4">Expert Guidance</h3>
              <p className="text-medium-gray leading-relaxed">
                Certified sleep consultant with 8+ years of experience helping families 
                achieve better sleep through personalized plans.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-mint/10 card-hover">
              <div className="w-16 h-16 bg-mint rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="text-white h-8 w-8" />
              </div>
              <h3 className="text-2xl font-semibold text-soft-dark mb-4">Ongoing Support</h3>
              <p className="text-medium-gray leading-relaxed">
                2 weeks of unlimited text support, follow-up calls, and plan adjustments 
                to ensure lasting success for your family.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-br from-baby-blue/20 via-soft-pink/10 to-mint/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-soft-dark mb-6">
            Ready for Peaceful Nights?
          </h2>
          <p className="text-xl text-medium-gray mb-8 leading-relaxed">
            Join hundreds of families who've transformed their sleep with gentle, effective methods. 
            Your journey to better sleep starts with a free consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services">
              <Button className="bg-soft-pink text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-baby-blue transition-colors">
                Book Free Consultation
              </Button>
            </Link>
            <Link href="/services">
              <Button
                variant="outline"
                className="border-2 border-baby-blue text-baby-blue px-8 py-4 rounded-full text-lg font-semibold hover:bg-baby-blue hover:text-white transition-colors"
              >
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
