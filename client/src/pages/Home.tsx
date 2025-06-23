import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Heart, GraduationCap, Clock, Star, Moon } from "lucide-react";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-baby-blue/20 via-soft-pink/10 to-mint/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-soft-dark leading-tight">
                Peaceful Nights for Your{" "}
                <span className="text-baby-blue">Little One</span>
              </h1>
              <p className="text-lg sm:text-xl text-medium-gray leading-relaxed">
                Expert sleep consulting tailored specifically to your child to help develop healthy sleep habits, giving your whole family the rest you deserve.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/services">
                  <Button className="bg-soft-pink text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium hover:bg-baby-blue transition-colors touch-target mobile-full-width">
                    Book Free Consultation
                  </Button>
                </Link>
                <Link href="/services">
                  <Button
                    variant="outline"
                    className="border-2 border-baby-blue text-baby-blue px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium hover:bg-baby-blue hover:text-white transition-colors touch-target mobile-full-width"
                  >
                    View Services
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center justify-center lg:justify-start space-x-2 sm:space-x-6 pt-6 sm:pt-8">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-baby-blue">100+</div>
                  <div className="text-xs sm:text-sm text-medium-gray">Families Helped</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-soft-pink">Proven</div>
                  <div className="text-xs sm:text-sm text-medium-gray">Methods</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-mint">Expert</div>
                  <div className="text-xs sm:text-sm text-medium-gray">Guidance</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-baby-blue">Excellent</div>
                  <div className="text-xs sm:text-sm text-medium-gray">Results</div>
                </div>
              </div>
            </div>

            <div className="relative mt-8 lg:mt-0">
              <img
                src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Peaceful baby sleeping in nursery"
                className="rounded-2xl sm:rounded-3xl shadow-2xl w-full h-auto"
              />
              <div className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-mint rounded-full flex items-center justify-center">
                    <Moon className="text-white h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-soft-dark text-sm sm:text-base">Sleep Success</div>
                    <div className="text-xs sm:text-sm text-medium-gray">Within 2 weeks</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-soft-dark mb-4">Why Families Choose My Services:</h2>
            <p className="text-lg sm:text-xl text-medium-gray max-w-3xl mx-auto">
              My sleep training approach is holistic and addresses your child’s full 24-hour sleep cycle—including naps, nighttime sleep, feedings, bedtime routines, and daytime activities. It’s designed to establish healthy sleep habits, support overall well-being, and help your child thrive and reach important developmental milestones.

              The results are built to last. As your child grows, I will adjust the schedule to support transitions, sleep regressions, family changes, travel, and more. Throughout the process, I offer parents valuable guidance to better understand their child’s needs and provide support every step of the way.

              I will closely monitor your child for three full days and nights, and will continue to offer support and follow-up monitoring if needed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center p-6 sm:p-8 rounded-2xl bg-baby-blue/5 card-hover">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-baby-blue rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Heart className="text-white h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-soft-dark mb-3 sm:mb-4">Personalized Methods</h3>
              <p className="text-sm sm:text-base text-medium-gray leading-relaxed">
                Utilize a variety of techniques that are customized for your child and your family. 
                Methods are based on the developmental, emotional, and biological needs of your child.
              </p>
            </div>

            <div className="text-center p-6 sm:p-8 rounded-2xl bg-soft-pink/10 card-hover">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-soft-pink rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <GraduationCap className="text-white h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-soft-dark mb-3 sm:mb-4">Expert Guidance</h3>
              <p className="text-sm sm:text-base text-medium-gray leading-relaxed">
                Experienced sleep consultant and newborn care specialist helping families 
                achieve better sleep through education, guidance, and personalized plans.
              </p>
            </div>

            <div className="text-center p-6 sm:p-8 rounded-2xl bg-mint/10 card-hover">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-mint rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Clock className="text-white h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-soft-dark mb-3 sm:mb-4">Ongoing Support</h3>
              <p className="text-sm sm:text-base text-medium-gray leading-relaxed">
                Unlimited text support, follow-up calls, and plan adjustments to ensure lasting success for your family.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-baby-blue/20 via-soft-pink/10 to-mint/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-soft-dark mb-4 sm:mb-6">
            Ready for Peaceful Nights?
          </h2>
          <p className="text-lg sm:text-xl text-medium-gray mb-6 sm:mb-8 leading-relaxed">
            Join hundreds of families who've transformed their sleep with gentle, effective methods. 
            Your journey to better sleep starts with a free consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services">
              <Button className="bg-soft-pink text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-baby-blue transition-colors touch-target mobile-full-width">
                Book Free Consultation
              </Button>
            </Link>
            <Link href="/services">
              <Button
                variant="outline"
                className="border-2 border-baby-blue text-baby-blue px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-baby-blue hover:text-white transition-colors touch-target mobile-full-width"
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
