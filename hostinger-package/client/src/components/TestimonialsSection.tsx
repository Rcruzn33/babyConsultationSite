import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { useMemo } from "react";

interface Testimonial {
  id: number;
  parentName: string;
  childAge?: string;
  testimonial: string;
  rating: number;
  photoUrl?: string;
  approved: boolean;
  createdAt: string;
}

export default function TestimonialsSection() {
  const { data: allTestimonials = [], isLoading, error } = useQuery({
    queryKey: ["/api/testimonials", "approved"],
    queryFn: async () => {
      const response = await fetch("/api/testimonials?approved=true");
      if (!response.ok) throw new Error("Failed to fetch testimonials");
      return response.json() as Promise<Testimonial[]>;
    },
  });

  // Randomize and select 3 testimonials - creates new random selection on each component mount
  const testimonials = useMemo(() => {
    if (allTestimonials.length === 0) return [];
    
    // Simple shuffle and take first 3
    const shuffled = [...allTestimonials].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }, [allTestimonials]);

  if (isLoading) {
    return (
      <section className="py-16 sm:py-24 bg-cream/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-soft-dark mb-4">What Parents Say</h2>
          </div>
          <div className="text-center">
            <div className="text-medium-gray">Loading testimonials...</div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 sm:py-24 bg-cream/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-soft-dark mb-4">What Parents Say</h2>
          </div>
          <div className="text-center">
            <div className="text-red-500">Error loading testimonials: {error.message}</div>
          </div>
        </div>
      </section>
    );
  }

  // Data is already filtered by approved=true in the API call

  return (
    <section className="py-16 sm:py-24 bg-cream/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-soft-dark mb-4">What Parents Say</h2>
        </div>

        {testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial: Testimonial) => (
              <div key={testimonial.id} className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg card-hover">
                <div className="flex mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
                  ))}
                </div>
                <p className="text-medium-gray mb-4 italic leading-relaxed">
                  "{testimonial.testimonial}"
                </p>
                <div className="flex items-center gap-3">
                  {testimonial.photoUrl && (
                    <img 
                      src={testimonial.photoUrl} 
                      alt={testimonial.parentName}
                      className="w-12 h-12 rounded-full object-cover border-2 border-baby-blue/20"
                    />
                  )}
                  <div>
                    <div className="text-soft-dark font-semibold">- {testimonial.parentName}</div>
                    {testimonial.childAge && (
                      <div className="text-sm text-medium-gray">Parent of {testimonial.childAge}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <div className="text-medium-gray">No testimonials available yet.</div>
          </div>
        )}
      </div>
    </section>
  );
}