import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Blog() {
  const featuredArticle = {
    title: "The Ultimate Guide to Creating the Perfect Sleep Environment",
    excerpt: "Discover how to optimize your baby's room for better sleep. From lighting and temperature to white noise and blackout curtains, learn the science-backed strategies that make a real difference.",
    date: "March 15, 2024",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
  };

  const articles = [
    {
      id: 1,
      title: "Mastering the Art of Daytime Naps",
      excerpt: "Learn why daytime naps are crucial for nighttime sleep and how to establish a consistent nap schedule that works.",
      date: "March 10, 2024",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    },
    {
      id: 2,
      title: "Building a Calming Bedtime Routine",
      excerpt: "Discover the key elements of an effective bedtime routine that signals to your baby that it's time to sleep.",
      date: "March 5, 2024",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    },
    {
      id: 3,
      title: "Gentle Sleep Training Methods That Work",
      excerpt: "Explore compassionate approaches to sleep training that respect your baby's needs while promoting healthy sleep habits.",
      date: "February 28, 2024",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    },
  ];

  return (
    <main>
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-soft-dark mb-4">
              Sleep Tips & Resources
            </h1>
            <p className="text-xl text-medium-gray max-w-3xl mx-auto">
              Expert advice, tips, and insights to help you understand your baby's 
              sleep needs and create healthy sleep habits.
            </p>
          </div>

          {/* Featured Article */}
          <div className="mb-16">
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden card-hover">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative">
                  <img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="w-full h-80 lg:h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-soft-pink text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-8 lg:p-12">
                  <div className="flex items-center text-medium-gray text-sm mb-4">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>{featuredArticle.date}</span>
                    <span className="mx-2">•</span>
                    <span>{featuredArticle.readTime}</span>
                  </div>
                  <h2 className="text-3xl font-bold text-soft-dark mb-4">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-medium-gray leading-relaxed mb-6">
                    {featuredArticle.excerpt}
                  </p>
                  <button className="inline-flex items-center text-baby-blue font-semibold hover:text-soft-pink transition-colors">
                    Read Full Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Blog Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center text-medium-gray text-sm mb-3">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>{article.date}</span>
                    <span className="mx-2">•</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-soft-dark mb-3">
                    {article.title}
                  </h3>
                  <p className="text-medium-gray leading-relaxed mb-4">
                    {article.excerpt}
                  </p>
                  <button className="text-baby-blue font-semibold hover:text-soft-pink transition-colors">
                    Read More →
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button className="bg-baby-blue text-white px-8 py-3 rounded-full font-semibold hover:bg-soft-pink transition-colors">
              View All Articles
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
