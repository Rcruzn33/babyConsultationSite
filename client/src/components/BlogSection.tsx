import { useQuery } from "@tanstack/react-query";
import { Calendar } from "lucide-react";
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

export default function BlogSection() {
  const { data: blogPosts = [], isLoading } = useQuery({
    queryKey: ["/api/blog", "published"],
    queryFn: async () => {
      const response = await fetch("/api/blog?published=true");
      if (!response.ok) throw new Error("Failed to fetch blog posts");
      return response.json() as Promise<BlogPost[]>;
    },
  });

  if (isLoading) {
    return (
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-soft-dark mb-4">Sleep Tips & Insights</h2>
            <p className="text-lg sm:text-xl text-medium-gray max-w-3xl mx-auto">
              Expert advice and proven strategies to help your family get better sleep.
            </p>
          </div>
          <div className="text-center">
            <div className="text-medium-gray">Loading articles...</div>
          </div>
        </div>
      </section>
    );
  }

  const publishedPosts = blogPosts.filter(post => post.published);

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-soft-dark mb-4">Sleep Tips & Insights</h2>
          <p className="text-lg sm:text-xl text-medium-gray max-w-3xl mx-auto">
            Expert advice and proven strategies to help your family get better sleep.
          </p>
        </div>

        {publishedPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {publishedPosts.slice(0, 3).map((post) => (
              <article key={post.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="p-6 sm:p-8">
                  <div className="flex items-center text-sm text-medium-gray mb-3">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-soft-dark mb-3 leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-medium-gray mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <Link href={`/blog/${post.slug}`}>
                    <span className="text-baby-blue font-semibold hover:text-soft-pink transition-colors cursor-pointer">
                      Read More →
                    </span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <div className="text-medium-gray">No articles available yet. Check back soon for expert sleep tips!</div>
          </div>
        )}

        {publishedPosts.length > 3 && (
          <div className="text-center mt-12">
            <Link href="/blog">
              <span className="inline-block bg-baby-blue text-white px-8 py-3 rounded-full font-semibold hover:bg-soft-pink transition-colors cursor-pointer">
                View All Articles
              </span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}