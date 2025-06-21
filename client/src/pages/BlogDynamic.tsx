import { useQuery } from "@tanstack/react-query";
import { Calendar, Clock } from "lucide-react";
import { Link } from "wouter";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function Blog() {
  const { data: blogPosts = [], isLoading } = useQuery({
    queryKey: ["/api/blog", "published"],
    queryFn: async () => {
      const response = await fetch("/api/blog?published=true");
      if (!response.ok) throw new Error("Failed to fetch blog posts");
      return response.json() as Promise<BlogPost[]>;
    },
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const estimateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  return (
    <main className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-baby-blue/20 via-soft-pink/10 to-mint/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-soft-dark mb-6">
            Sleep Tips & Insights
          </h1>
          <p className="text-lg sm:text-xl text-medium-gray leading-relaxed">
            Expert advice, practical strategies, and evidence-based guidance to help your family 
            get the peaceful sleep you deserve.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="text-center">
              <div className="text-medium-gray text-lg">Loading articles...</div>
            </div>
          ) : blogPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <article 
                  key={post.id} 
                  className={`${index === 0 ? 'md:col-span-2 lg:col-span-1' : ''} bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow`}
                >
                  <div className={`${index === 0 ? 'h-48' : 'h-48'} bg-gradient-to-br ${
                    index % 6 === 0 ? 'from-baby-blue to-soft-pink' :
                    index % 6 === 1 ? 'from-soft-pink to-mint' :
                    index % 6 === 2 ? 'from-mint to-baby-blue' :
                    index % 6 === 3 ? 'from-baby-blue/50 to-soft-pink/50' :
                    index % 6 === 4 ? 'from-soft-pink/50 to-mint/50' :
                    'from-mint/50 to-baby-blue/50'
                  }`}></div>
                  <div className={`${index === 0 ? 'p-6 sm:p-8' : 'p-6'}`}>
                    <div className="flex items-center text-sm text-medium-gray mb-3">
                      <Calendar className="h-4 w-4 mr-2" />
                      {formatDate(post.createdAt)}
                      <span className="mx-2">•</span>
                      <Clock className="h-4 w-4 mr-2" />
                      {estimateReadTime(post.content)} min read
                    </div>
                    <h2 className={`${index === 0 ? 'text-xl sm:text-2xl' : 'text-lg'} font-bold text-soft-dark mb-3 leading-tight`}>
                      {post.title}
                    </h2>
                    <p className={`text-medium-gray mb-4 ${index === 0 ? 'leading-relaxed' : 'text-sm leading-relaxed'}`}>
                      {post.excerpt}
                    </p>
                    <Link href={`/blog/${post.slug}`}>
                      <span className={`text-baby-blue font-semibold hover:text-soft-pink transition-colors cursor-pointer ${index === 0 ? '' : 'text-sm'}`}>
                        Read More →
                      </span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-soft-dark mb-4">No Articles Yet</h2>
              <p className="text-medium-gray">
                We're working on creating helpful sleep tips and insights for you. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}