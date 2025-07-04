import { Calendar, ArrowRight, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import type { BlogPost } from "@/../../shared/schema";

export default function Blog() {
  const { data: blogPosts, isLoading, error } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
    queryFn: async () => {
      const response = await fetch("/api/blog?published=true");
      if (!response.ok) {
        throw new Error("Failed to fetch blog posts");
      }
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <main className="min-h-screen bg-cream">
        <section className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl font-bold text-soft-dark mb-4">
                Sleep Tips & Resources
              </h1>
              <p className="text-lg text-medium-gray">Loading blog posts...</p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-cream">
        <section className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl font-bold text-soft-dark mb-4">
                Sleep Tips & Resources
              </h1>
              <p className="text-lg text-medium-gray">Unable to load blog posts at the moment.</p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const publishedPosts = blogPosts || [];
  const featuredPost = publishedPosts.find(post => post.featured) || publishedPosts[0];
  const regularPosts = publishedPosts.filter(post => post.id !== featuredPost?.id);

  return (
    <main className="min-h-screen bg-cream">
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl font-bold text-soft-dark mb-4">
              Sleep Tips & Resources
            </h1>
            <p className="text-lg sm:text-xl text-medium-gray max-w-3xl mx-auto">
              Expert advice, tips, and insights to help you understand your baby's 
              sleep needs and create healthy sleep habits.
            </p>
          </div>

          {publishedPosts.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold text-soft-dark mb-4">
                  Coming Soon
                </h2>
                <p className="text-medium-gray mb-6">
                  We're preparing valuable content about baby sleep tips and expert advice. 
                  Check back soon for helpful resources!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/services">
                    <Button className="bg-baby-blue hover:bg-baby-blue/90 text-white px-8 py-3 rounded-full font-semibold">
                      View Services
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" className="border-baby-blue text-baby-blue hover:bg-baby-blue hover:text-white px-8 py-3 rounded-full font-semibold">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Featured Article */}
              {featuredPost && (
                <div className="mb-12 sm:mb-16">
                  <div className="bg-white rounded-3xl shadow-lg overflow-hidden card-hover">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      <div className="relative">
                        {featuredPost.imageUrl ? (
                          <img
                            src={featuredPost.imageUrl}
                            alt={featuredPost.title}
                            className="w-full h-80 lg:h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-80 lg:h-full bg-gradient-to-br from-baby-blue/20 to-soft-pink/20 flex items-center justify-center">
                            <Calendar className="h-16 w-16 text-baby-blue" />
                          </div>
                        )}
                        <div className="absolute top-4 left-4">
                          <span className="bg-soft-pink text-white px-3 py-1 rounded-full text-sm font-semibold">
                            Featured
                          </span>
                        </div>
                      </div>
                      <div className="p-6 sm:p-8 lg:p-12">
                        <div className="flex items-center text-medium-gray text-xs sm:text-sm mb-4">
                          <Calendar className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{format(new Date(featuredPost.publishedAt!), "MMMM d, yyyy")}</span>
                          <span className="mx-2">•</span>
                          <Clock className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{featuredPost.readingTime || 5} min read</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-soft-dark mb-4">
                          {featuredPost.title}
                        </h2>
                        <p className="text-sm sm:text-base text-medium-gray leading-relaxed mb-6">
                          {featuredPost.excerpt}
                        </p>
                        <Link href={`/blog/${featuredPost.slug}`}>
                          <button className="inline-flex items-center text-baby-blue font-semibold hover:text-soft-pink transition-colors touch-target">
                            Read Full Article
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Blog Articles Grid */}
              {regularPosts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {regularPosts.map((post) => (
                    <article
                      key={post.id}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover"
                    >
                      {post.imageUrl ? (
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          className="w-full h-40 sm:h-48 object-cover"
                        />
                      ) : (
                        <div className="w-full h-40 sm:h-48 bg-gradient-to-br from-baby-blue/20 to-soft-pink/20 flex items-center justify-center">
                          <Calendar className="h-8 w-8 text-baby-blue" />
                        </div>
                      )}
                      <div className="p-4 sm:p-6">
                        <div className="flex items-center text-medium-gray text-xs sm:text-sm mb-3">
                          <Calendar className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{format(new Date(post.publishedAt!), "MMM d, yyyy")}</span>
                          <span className="mx-2">•</span>
                          <Clock className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{post.readingTime || 5} min read</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold text-soft-dark mb-3">
                          {post.title}
                        </h3>
                        <p className="text-sm sm:text-base text-medium-gray leading-relaxed mb-4">
                          {post.excerpt}
                        </p>
                        <Link href={`/blog/${post.slug}`}>
                          <button className="text-baby-blue font-semibold hover:text-soft-pink transition-colors touch-target">
                            Read More →
                          </button>
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}