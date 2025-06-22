import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Contact {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: string;
  responded: boolean;
}

interface Consultation {
  id: number;
  parentName: string;
  email: string;
  phone?: string;
  childAge: string;
  sleepChallenges: string;
  consultationType: string;
  preferredDate?: string;
  status: string;
  createdAt: string;
  notes?: string;
}

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl?: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Testimonial {
  id: number;
  parentName: string;
  childAge?: string;
  testimonial: string;
  rating: number;
  approved: boolean;
  createdAt: string;
}

const CreateBlogPostForm = ({ onPostCreated }: { onPostCreated: () => void }) => {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    imageUrl: '',
    published: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.excerpt || !formData.content) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setFormData({
          title: '',
          slug: '',
          excerpt: '',
          content: '',
          imageUrl: '',
          published: false
        });
        onPostCreated();
      }
    } catch (error) {
      console.error('Failed to create blog post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Blog Post</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Enter blog post title"
              required
            />
          </div>
          <div>
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
              placeholder="url-friendly-slug"
              required
            />
          </div>
          <div>
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
              placeholder="Brief description of the post"
              rows={2}
              required
            />
          </div>
          <div>
            <Label htmlFor="imageUrl">Image URL (Optional)</Label>
            <Input
              id="imageUrl"
              value={formData.imageUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Full blog post content"
              rows={8}
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="published"
              checked={formData.published}
              onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
            />
            <Label htmlFor="published">Publish immediately</Label>
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Post"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default function Admin() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [contactsRes, consultationsRes, blogRes, testimonialsRes] = await Promise.all([
        fetch("/api/contacts"),
        fetch("/api/consultations"),
        fetch("/api/blog"),
        fetch("/api/testimonials"),
      ]);

      if (contactsRes.ok) setContacts(await contactsRes.json());
      if (consultationsRes.ok) setConsultations(await consultationsRes.json());
      if (blogRes.ok) setBlogPosts(await blogRes.json());
      if (testimonialsRes.ok) setTestimonials(await testimonialsRes.json());
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString() + ' ' + new Date(dateString).toLocaleTimeString();
  };

  // Form component for creating new testimonials
  function CreateTestimonialForm({ onTestimonialCreated }: { onTestimonialCreated: () => void }) {
    const [formData, setFormData] = useState({
      parentName: '',
      childAge: '',
      testimonial: '',
      rating: 5,
      approved: true
    });

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!formData.parentName.trim() || !formData.testimonial.trim()) {
        alert('Please fill in required fields');
        return;
      }

      await createTestimonial({
        parentName: formData.parentName,
        childAge: formData.childAge || undefined,
        testimonial: formData.testimonial,
        rating: formData.rating,
        approved: formData.approved
      });

      setFormData({
        parentName: '',
        childAge: '',
        testimonial: '',
        rating: 5,
        approved: true
      });
      onTestimonialCreated();
    };

    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add New Testimonial</CardTitle>
          <CardDescription>Create a new testimonial for the website</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="parentName">Parent Name *</Label>
                <Input
                  id="parentName"
                  value={formData.parentName}
                  onChange={(e) => setFormData(prev => ({ ...prev, parentName: e.target.value }))}
                  placeholder="Enter parent name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="childAge">Child Age</Label>
                <Input
                  id="childAge"
                  value={formData.childAge}
                  onChange={(e) => setFormData(prev => ({ ...prev, childAge: e.target.value }))}
                  placeholder="e.g., 8 months"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="testimonial">Testimonial *</Label>
              <Textarea
                id="testimonial"
                value={formData.testimonial}
                onChange={(e) => setFormData(prev => ({ ...prev, testimonial: e.target.value }))}
                placeholder="Enter testimonial text"
                rows={4}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="rating">Rating</Label>
                <Select value={formData.rating.toString()} onValueChange={(value) => setFormData(prev => ({ ...prev, rating: parseInt(value) }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Star</SelectItem>
                    <SelectItem value="2">2 Stars</SelectItem>
                    <SelectItem value="3">3 Stars</SelectItem>
                    <SelectItem value="4">4 Stars</SelectItem>
                    <SelectItem value="5">5 Stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="approved">Status</Label>
                <Select value={formData.approved.toString()} onValueChange={(value) => setFormData(prev => ({ ...prev, approved: value === 'true' }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Approved</SelectItem>
                    <SelectItem value="false">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button type="submit" className="w-full">
              Create Testimonial
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }

  const updateContactStatus = async (id: number, responded: boolean) => {
    try {
      const response = await fetch(`/api/contacts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ responded }),
      });
      if (response.ok) {
        setContacts(prev => prev.map(c => c.id === id ? { ...c, responded } : c));
      }
    } catch (error) {
      console.error("Failed to update contact:", error);
    }
  };

  const updateConsultationStatus = async (id: number, status: string) => {
    try {
      const response = await fetch(`/api/consultations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        setConsultations(prev => prev.map(c => c.id === id ? { ...c, status } : c));
      }
    } catch (error) {
      console.error("Failed to update consultation:", error);
    }
  };

  const deleteConsultation = async (id: number) => {
    if (!confirm("Are you sure you want to delete this consultation?")) return;
    
    try {
      const response = await fetch(`/api/consultations/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setConsultations(prev => prev.filter(c => c.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete consultation:", error);
    }
  };

  const approveTestimonial = async (id: number) => {
    try {
      const response = await fetch(`/api/testimonials/${id}/approve`, {
        method: "PATCH",
      });
      if (response.ok) {
        setTestimonials(prev => prev.map(t => t.id === id ? { ...t, approved: true } : t));
      }
    } catch (error) {
      console.error("Failed to approve testimonial:", error);
    }
  };

  const unpublishTestimonial = async (id: number) => {
    try {
      const response = await fetch(`/api/testimonials/${id}/unpublish`, {
        method: "PATCH",
      });
      if (response.ok) {
        setTestimonials(prev => prev.map(t => t.id === id ? { ...t, approved: false } : t));
      }
    } catch (error) {
      console.error("Failed to unpublish testimonial:", error);
    }
  };

  const deleteTestimonial = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        const response = await fetch(`/api/testimonials/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setTestimonials(prev => prev.filter(t => t.id !== id));
        }
      } catch (error) {
        console.error("Failed to delete testimonial:", error);
      }
    }
  };

  const createTestimonial = async (testimonialData: {
    parentName: string;
    childAge?: string;
    testimonial: string;
    rating: number;
    approved: boolean;
  }) => {
    try {
      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testimonialData),
      });
      if (response.ok) {
        await loadData();
      }
    } catch (error) {
      console.error("Failed to create testimonial:", error);
    }
  };

  const togglePostStatus = async (id: number, published: boolean) => {
    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published }),
      });
      if (response.ok) {
        setBlogPosts(prev => prev.map(p => p.id === id ? { ...p, published } : p));
      }
    } catch (error) {
      console.error("Failed to update post status:", error);
    }
  };

  const deleteBlogPost = async (id: number) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    
    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setBlogPosts(prev => prev.filter(p => p.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };



  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-semibold">Loading admin dashboard...</div>
        </div>
      </div>
    );
  }

  const pendingContacts = contacts.filter(c => !c.responded).length;
  const pendingConsultations = consultations.filter(c => c.status === 'pending').length;
  const pendingTestimonials = testimonials.filter(t => !t.approved).length;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your baby sleep consulting business</p>
        </div>

        <Tabs defaultValue="contacts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="contacts">
              Contacts ({pendingContacts})
            </TabsTrigger>
            <TabsTrigger value="consultations">
              Consultations ({pendingConsultations})
            </TabsTrigger>
            <TabsTrigger value="blog">Blog Posts ({blogPosts.length})</TabsTrigger>
            <TabsTrigger value="testimonials">
              Testimonials ({pendingTestimonials} pending)
            </TabsTrigger>
          </TabsList>

          <TabsContent value="contacts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Contact Form Submissions</CardTitle>
                <CardDescription>
                  Manage contact form submissions from your website
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contacts.map((contact) => (
                    <Card key={contact.id} className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">{contact.name}</h3>
                          <p className="text-sm text-gray-600">{contact.email}</p>
                          {contact.phone && (
                            <p className="text-sm text-gray-600">{contact.phone}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={contact.responded ? "default" : "secondary"}>
                            {contact.responded ? "Responded" : "New"}
                          </Badge>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              updateContactStatus(contact.id, !contact.responded)
                            }
                          >
                            Mark as {contact.responded ? "Unread" : "Read"}
                          </Button>
                        </div>
                      </div>
                      <div className="mb-2">
                        <strong>Subject:</strong> {contact.subject}
                      </div>
                      <div className="mb-2">
                        <strong>Message:</strong>
                        <p className="mt-1 text-sm">{contact.message}</p>
                      </div>
                      <div className="text-xs text-gray-500">
                        Submitted: {formatDate(contact.createdAt)}
                      </div>
                    </Card>
                  ))}
                  {contacts.length === 0 && (
                    <p className="text-gray-500 text-center py-8">No contact submissions yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="consultations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Consultation Bookings</CardTitle>
                <CardDescription>
                  Manage consultation requests and appointments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {consultations.map((consultation) => (
                    <Card key={consultation.id} className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">{consultation.parentName}</h3>
                          <p className="text-sm text-gray-600">{consultation.email}</p>
                          {consultation.phone && (
                            <p className="text-sm text-gray-600">{consultation.phone}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              consultation.status === "pending"
                                ? "secondary"
                                : consultation.status === "confirmed"
                                ? "default"
                                : "outline"
                            }
                          >
                            {consultation.status}
                          </Badge>
                          <select
                            value={consultation.status}
                            onChange={(e) =>
                              updateConsultationStatus(consultation.id, e.target.value)
                            }
                            className="text-sm border rounded px-2 py-1"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deleteConsultation(consultation.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-2 text-sm">
                        <div>
                          <strong>Child Age:</strong> {consultation.childAge}
                        </div>
                        <div>
                          <strong>Consultation Type:</strong> {consultation.consultationType}
                        </div>
                      </div>
                      {consultation.preferredDate && (
                        <div className="mb-2 text-sm">
                          <strong>Preferred Date:</strong>{" "}
                          {formatDate(consultation.preferredDate)}
                        </div>
                      )}
                      <div className="mb-2">
                        <strong>Sleep Challenges:</strong>
                        <p className="mt-1 text-sm">{consultation.sleepChallenges}</p>
                      </div>
                      {consultation.notes && (
                        <div className="mb-2">
                          <strong>Notes:</strong>
                          <p className="mt-1 text-sm">{consultation.notes}</p>
                        </div>
                      )}
                      <div className="text-xs text-gray-500">
                        Submitted: {formatDate(consultation.createdAt)}
                      </div>
                    </Card>
                  ))}
                  {consultations.length === 0 && (
                    <p className="text-gray-500 text-center py-8">No consultation bookings yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blog" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Blog Posts</CardTitle>
                <CardDescription>Manage your blog content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <CreateBlogPostForm onPostCreated={loadData} />
                </div>
                <div className="space-y-4">
                  {blogPosts.map((post) => (
                    <Card key={post.id} className="p-4">
                      <div className="flex gap-4 mb-4">
                        {post.imageUrl && (
                          <img 
                            src={post.imageUrl} 
                            alt={post.title}
                            className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                          />
                        )}
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold">{post.title}</h3>
                              <p className="text-sm text-gray-600">Slug: {post.slug}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant={post.published ? "default" : "secondary"}>
                                {post.published ? "Published" : "Draft"}
                              </Badge>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => togglePostStatus(post.id, !post.published)}
                              >
                                {post.published ? "Unpublish" : "Publish"}
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => deleteBlogPost(post.id)}
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm mb-2">{post.excerpt}</p>
                          <div className="text-xs text-gray-500">
                            Created: {formatDate(post.createdAt)}
                            {post.updatedAt && post.updatedAt !== post.createdAt && (
                              <span> • Updated: {formatDate(post.updatedAt)}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                  {blogPosts.length === 0 && (
                    <p className="text-gray-500 text-center py-8">No blog posts yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="testimonials" className="space-y-4">
            <CreateTestimonialForm onTestimonialCreated={loadData} />
            <Card>
              <CardHeader>
                <CardTitle>Testimonials</CardTitle>
                <CardDescription>Review and approve customer testimonials</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {testimonials.map((testimonial) => (
                    <Card key={testimonial.id} className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">{testimonial.parentName}</h3>
                          {testimonial.childAge && (
                            <p className="text-sm text-gray-600">Child Age: {testimonial.childAge}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {Array.from({ length: testimonial.rating }).map((_, i) => (
                              <span key={i} className="text-yellow-400">★</span>
                            ))}
                          </div>
                          <Badge variant={testimonial.approved ? "default" : "secondary"}>
                            {testimonial.approved ? "Approved" : "Pending"}
                          </Badge>
                          {!testimonial.approved && (
                            <Button
                              size="sm"
                              onClick={() => approveTestimonial(testimonial.id)}
                            >
                              Approve
                            </Button>
                          )}
                          {testimonial.approved && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => unpublishTestimonial(testimonial.id)}
                            >
                              Unpublish
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deleteTestimonial(testimonial.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm mb-2">{testimonial.testimonial}</p>
                      <div className="text-xs text-gray-500">
                        Submitted: {formatDate(testimonial.createdAt)}
                      </div>
                    </Card>
                  ))}
                  {testimonials.length === 0 && (
                    <p className="text-gray-500 text-center py-8">No testimonials yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}