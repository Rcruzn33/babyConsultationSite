import { CheckCircle, Star } from "lucide-react";

export default function About() {
  const testimonials = [
    {
      id: 1,
      name: "Emma & David",
      role: "Parents of Lucas, 8 months",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
      content: "Sarah transformed our nights! Our 8-month-old now sleeps 12 hours straight. Her gentle approach made all the difference.",
    },
    {
      id: 2,
      name: "Michelle",
      role: "Mother of Sophia, 6 months",
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
      content: "After months of exhaustion, Sarah's plan worked in just 10 days. We finally have our evenings back!",
    },
    {
      id: 3,
      name: "James",
      role: "Father of Noah, 10 months",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
      content: "Sarah's support during the process was incredible. She was always there when we needed guidance.",
    },
  ];

  return (
    <main>
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl font-bold text-soft-dark mb-6">
                  Meet Sarah, Your Sleep Consultant
                </h1>
                <p className="text-lg text-medium-gray leading-relaxed mb-6">
                  As a certified pediatric sleep consultant and mother of two, I understand 
                  the exhaustion and overwhelm that comes with sleepless nights. My mission 
                  is to help families find gentle, effective solutions that work for everyone.
                </p>
                <p className="text-lg text-medium-gray leading-relaxed">
                  I believe every baby can learn to sleep well with the right approach, 
                  patience, and support. My methods are rooted in child development research 
                  and tailored to each family's unique needs and values.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-baby-blue h-6 w-6" />
                  <span className="text-medium-gray">Certified Pediatric Sleep Consultant</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-baby-blue h-6 w-6" />
                  <span className="text-medium-gray">8+ Years Experience</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-baby-blue h-6 w-6" />
                  <span className="text-medium-gray">Mother of Two</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-baby-blue h-6 w-6" />
                  <span className="text-medium-gray">Gentle Sleep Training Specialist</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Sarah, certified sleep consultant"
                className="rounded-3xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="mt-24">
            <h2 className="text-3xl font-bold text-soft-dark text-center mb-16">
              What Families Say
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white p-8 rounded-2xl shadow-lg card-hover"
                >
                  <div className="flex items-center mb-4">
                    <div className="flex text-pastel-yellow">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-medium-gray mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.image}
                      alt={`${testimonial.name} testimonial`}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <div className="font-semibold text-soft-dark">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-medium-gray">
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
