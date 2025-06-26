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
                  Hello and Welcome! I am Yanina, your sleep coach.
                </h1>
                <p className="text-base sm:text-lg text-medium-gray leading-relaxed mb-4 sm:mb-6">
                  My journey began with a bachelor's degree in psychology, which laid the foundation for my understanding of child development, sleep cycles and patterns, family dynamics, and the emotional and physical needs of babies and parents. While pursuing my academic goal, I met two incredible, highly professional, newborn care specialists who introduced me to this profession and gave me valuable training.
                </p>
                <p className="text-base sm:text-lg text-medium-gray leading-relaxed mb-4 sm:mb-6">
                  Over the years, I have combined this academic background with extensive real world experience, helping many families create nurturing environments and healthy sleep habits for their little ones. I specialize in sleep training for infants and toddlers and newborn care. My priority is to meet each family's unique needs and parenting style.
                </p>
                <p className="text-base sm:text-lg text-medium-gray leading-relaxed mb-4 sm:mb-6">
                  If you are having sleepless nights with an infant or a toddler, or if you need help navigating your baby's first days at home, I am here to guide you with compassion, knowledge and practical solutions. My goal is to empower parents with the confidence and tools they need to thrive, not just survive in the early months and years of parenthood. I look forward to supporting you and your family on this beautiful journey.
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
                  <span className="text-sm sm:text-base text-medium-gray">Pediatric Sleep Consultant</span>
                </div>
                <div className="flex items-center space-x-3 justify-center lg:justify-start">
                  <CheckCircle className="text-baby-blue h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-medium-gray">8+ Years Experience</span>
                </div>
                <div className="flex items-center space-x-3 justify-center lg:justify-start">
                  <CheckCircle className="text-baby-blue h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-medium-gray">Mother of One</span>
                </div>
                <div className="flex items-center space-x-3 justify-center lg:justify-start">
                  <CheckCircle className="text-baby-blue h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-medium-gray">Newborn Care Specialist</span>
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

          {/* Dynamic Testimonials Section */}
          <div className="mt-16 sm:mt-24">
            <TestimonialsSection />
          </div>
        </div>
      </section>
    </main>
  );
}
