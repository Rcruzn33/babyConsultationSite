import { ArrowLeft, Moon, Sparkles, Calendar } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Blog() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-baby-blue/20 via-soft-pink/10 to-mint/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-soft-dark mb-6">
            Blog Coming Soon
          </h1>
          <p className="text-lg sm:text-xl text-medium-gray leading-relaxed">
            We're preparing valuable content about baby sleep tips, expert advice, and 
            evidence-based strategies to help your family get better rest.
          </p>
        </div>
      </section>

      {/* Under Construction Content */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12">
            {/* Icon */}
            <div className="flex justify-center mb-8">
              <div className="bg-gradient-to-br from-baby-blue to-soft-pink rounded-full p-6">
                <Moon className="h-12 w-12 text-white" />
              </div>
            </div>
            
            {/* Main Message */}
            <h2 className="text-2xl sm:text-3xl font-bold text-soft-dark mb-6">
              Under Construction
            </h2>
            
            <p className="text-lg text-medium-gray mb-8 leading-relaxed">
              Our blog is currently being prepared with expert sleep consulting content. 
              We're working hard to bring you valuable insights, practical tips, and 
              evidence-based strategies to help your baby sleep better.
            </p>
            
            {/* Features Coming Soon */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center justify-center md:justify-start">
                <Sparkles className="h-5 w-5 text-baby-blue mr-3" />
                <span className="text-medium-gray">Sleep Training Tips</span>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <Sparkles className="h-5 w-5 text-soft-pink mr-3" />
                <span className="text-medium-gray">Expert Advice</span>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <Calendar className="h-5 w-5 text-mint mr-3" />
                <span className="text-medium-gray">Age-Specific Guidance</span>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <Moon className="h-5 w-5 text-baby-blue mr-3" />
                <span className="text-medium-gray">Sleep Success Stories</span>
              </div>
            </div>
            
            {/* Call to Action */}
            <div className="space-y-4">
              <p className="text-medium-gray">
                In the meantime, feel free to explore our services or get in touch for a consultation.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/services">
                  <Button className="bg-baby-blue hover:bg-baby-blue/90 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
                    View Services
                  </Button>
                </Link>
                
                <Link href="/contact">
                  <Button variant="outline" className="border-baby-blue text-baby-blue hover:bg-baby-blue hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Back to Home */}
          <div className="mt-12">
            <Link href="/">
              <span className="text-baby-blue hover:text-soft-pink transition-colors cursor-pointer inline-flex items-center font-semibold">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}