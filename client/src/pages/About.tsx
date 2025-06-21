import { CheckCircle, Star } from "lucide-react";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function About() {

  return (
    <main>
      <section className="py-16 sm:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-soft-dark mb-4 sm:mb-6">
                  Meet Yana, Your Sleep Consultant
                </h1>
                <p className="text-base sm:text-lg text-medium-gray leading-relaxed mb-4 sm:mb-6">
                  As a certified pediatric sleep consultant and mother of two, I understand 
                  the exhaustion and overwhelm that comes with sleepless nights. My mission 
                  is to help families find gentle, effective solutions that work for everyone.
                </p>
                <p className="text-base sm:text-lg text-medium-gray leading-relaxed">
                  I believe every baby can learn to sleep well with the right approach, 
                  patience, and support. My methods are rooted in child development research 
                  and tailored to each family's unique needs and values.
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-3 justify-center lg:justify-start">
                  <CheckCircle className="text-baby-blue h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-medium-gray">Certified Pediatric Sleep Consultant</span>
                </div>
                <div className="flex items-center space-x-3 justify-center lg:justify-start">
                  <CheckCircle className="text-baby-blue h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-medium-gray">8+ Years Experience</span>
                </div>
                <div className="flex items-center space-x-3 justify-center lg:justify-start">
                  <CheckCircle className="text-baby-blue h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-medium-gray">Mother of Two</span>
                </div>
                <div className="flex items-center space-x-3 justify-center lg:justify-start">
                  <CheckCircle className="text-baby-blue h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-medium-gray">Gentle Sleep Training Specialist</span>
                </div>
              </div>
            </div>

            <div className="relative mt-8 lg:mt-0">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Yana, certified sleep consultant"
                className="rounded-2xl sm:rounded-3xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="mt-16 sm:mt-24">
            <h2 className="text-2xl sm:text-3xl font-bold text-soft-dark text-center mb-12 sm:mb-16">
              What Families Say
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg card-hover"
                >
                  <div className="flex items-center mb-4">
                    <div className="flex text-pastel-yellow">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-medium-gray mb-4 sm:mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.image}
                      alt={`${testimonial.name} testimonial`}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4 flex-shrink-0"
                    />
                    <div>
                      <div className="font-semibold text-soft-dark text-sm sm:text-base">
                        {testimonial.name}
                      </div>
                      <div className="text-xs sm:text-sm text-medium-gray">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
