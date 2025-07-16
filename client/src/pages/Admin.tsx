import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Edit, Plus, Mail, Phone, Calendar, Star, User, BookOpen, MessageSquare } from "lucide-react";

export default function Admin() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [consultations, setConsultations] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateBlog, setShowCreateBlog] = useState(false);
  const [showCreateTestimonial, setShowCreateTestimonial] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    slug: '',
    published: false,
    imageUrl: ''
  });
  const [testimonialForm, setTestimonialForm] = useState({
    parentName: '',
    testimonial: '',
    childAge: '',
    rating: 5,
    photoUrl: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      console.log("Loading admin data...");
      const [contactsRes, consultationsRes, blogRes, testimonialsRes, usersRes] = await Promise.all([
        fetch("/api/contacts", { credentials: 'include' }),
        fetch("/api/consultations", { credentials: 'include' }),
        fetch("/api/blog", { credentials: 'include' }),
        fetch("/api/testimonials", { credentials: 'include' }),
        fetch("/api/admin/users", { credentials: 'include' }),
      ]);

      console.log("Response status:", { 
        contacts: contactsRes.status, 
        consultations: consultationsRes.status, 
        blog: blogRes.status, 
        testimonials: testimonialsRes.status,
        users: usersRes.status 
      });

      if (contactsRes.ok) {
        const contactsData = await contactsRes.json();
        console.log("Contacts data:", contactsData);
        setContacts(contactsData);
      } else {
        console.error("Contacts failed:", await contactsRes.text());
        setContacts([]); // Set empty array on failure
      }
      if (consultationsRes.ok) {
        const consultationsData = await consultationsRes.json();
        console.log("Consultations data:", consultationsData);
        setConsultations(consultationsData);
      } else {
        console.error("Consultations failed:", await consultationsRes.text());
        setConsultations([]); // Set empty array on failure
      }
      if (blogRes.ok) {
        const blogData = await blogRes.json();
        console.log("Blog data:", blogData);
        setBlogPosts(blogData);
      } else {
        console.error("Blog failed:", await blogRes.text());
        setBlogPosts([]); // Set empty array on failure
      }
      if (testimonialsRes.ok) {
        const testimonialsData = await testimonialsRes.json();
        console.log("Testimonials data:", testimonialsData);
        setTestimonials(testimonialsData);
      } else {
        console.error("Testimonials failed:", await testimonialsRes.text());
        setTestimonials([]); // Set empty array on failure
      }
      if (usersRes.ok) {
        const usersData = await usersRes.json();
        console.log("Users data:", usersData);
        setUsers(usersData);
      } else {
        console.error("Users failed:", await usersRes.text());
        setUsers([]); // Set empty array on failure
      }
    } catch (error) {
      console.error("Failed to load data:", error);
      // Set empty arrays on error to prevent loading state from persisting
      setContacts([]);
      setConsultations([]);
      setBlogPosts([]);
      setTestimonials([]);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const createBlogPost = async () => {
    try {
      const response = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: 'include'
      });
      if (response.ok) {
        const newPost = await response.json();
        setBlogPosts(prev => [...prev, newPost]);
        setFormData({ title: '', content: '', excerpt: '', slug: '', published: false, imageUrl: '' });
        setShowCreateBlog(false);
        toast({ title: "Success", description: "Blog post created successfully!" });
      } else {
        toast({ title: "Error", description: "Failed to create blog post", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to create blog post", variant: "destructive" });
    }
  };

  const updateBlogPost = async (id: number, updates: any) => {
    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
        credentials: 'include'
      });
      if (response.ok) {
        setBlogPosts(prev => prev.map(post => post.id === id ? { ...post, ...updates } : post));
        toast({ title: "Success", description: "Blog post updated successfully!" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to update blog post", variant: "destructive" });
    }
  };

  const deleteBlogPost = async (id: number) => {
    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: "DELETE",
        credentials: 'include'
      });
      if (response.ok) {
        setBlogPosts(prev => prev.filter(post => post.id !== id));
        toast({ title: "Success", description: "Blog post deleted successfully!" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete blog post", variant: "destructive" });
    }
  };

  const createTestimonial = async () => {
    try {
      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testimonialForm),
        credentials: 'include'
      });
      if (response.ok) {
        const newTestimonial = await response.json();
        setTestimonials(prev => [...prev, newTestimonial]);
        setTestimonialForm({ parentName: '', testimonial: '', childAge: '', rating: 5, photoUrl: '' });
        setShowCreateTestimonial(false);
        toast({ title: "Success", description: "Testimonial created successfully!" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to create testimonial", variant: "destructive" });
    }
  };

  const deleteContact = async (id: number) => {
    try {
      const response = await fetch(`/api/contacts/${id}`, {
        method: "DELETE",
        credentials: 'include'
      });
      if (response.ok) {
        setContacts(prev => prev.filter(contact => contact.id !== id));
        toast({ title: "Success", description: "Contact deleted successfully!" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete contact", variant: "destructive" });
    }
  };

  const deleteConsultation = async (id: number) => {
    try {
      const response = await fetch(`/api/consultations/${id}`, {
        method: "DELETE",
        credentials: 'include'
      });
      if (response.ok) {
        setConsultations(prev => prev.filter(consultation => consultation.id !== id));
        toast({ title: "Success", description: "Consultation deleted successfully!" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete consultation", variant: "destructive" });
    }
  };

  const deleteTestimonial = async (id: number) => {
    try {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: "DELETE",
        credentials: 'include'
      });
      if (response.ok) {
        setTestimonials(prev => prev.filter(testimonial => testimonial.id !== id));
        toast({ title: "Success", description: "Testimonial deleted successfully!" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete testimonial", variant: "destructive" });
    }
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  };

  const handleFormChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      ...(field === 'title' && { slug: generateSlug(value) })
    }));
  };

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-semibold">Loading admin dashboard...</div>
        </div>
      </div>
    );
  }

  console.log("Admin component rendering with data:", {
    contacts: contacts.length,
    consultations: consultations.length,
    blogPosts: blogPosts.length,
    testimonials: testimonials.length,
    loading
  });

  // Force render tabs even if data is empty
  console.log("Rendering tabs with loading:", loading);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your baby sleep consulting business</p>
          <div className="mt-4 text-sm text-gray-500">
            Welcome, admin 
            <a href="/" className="ml-4 text-blue-600 hover:text-blue-800">← Main Site</a>
            <button className="ml-4 text-red-600 hover:text-red-800">Logout</button>
          </div>
        </div>

        <Tabs defaultValue="contacts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="contacts">
              <MessageSquare className="w-4 h-4 mr-2" />
              Contacts ({contacts.filter(c => !c.responded).length})
            </TabsTrigger>
            <TabsTrigger value="consultations">
              <Calendar className="w-4 h-4 mr-2" />
              Consultations ({consultations.filter(c => c.status === 'pending').length})
            </TabsTrigger>
            <TabsTrigger value="blog">
              <BookOpen className="w-4 h-4 mr-2" />
              Blog Posts ({blogPosts.length})
            </TabsTrigger>
            <TabsTrigger value="testimonials">
              <Star className="w-4 h-4 mr-2" />
              Testimonials ({testimonials.filter(t => !t.approved).length} pending)
            </TabsTrigger>
            <TabsTrigger value="users">
              <User className="w-4 h-4 mr-2" />
              Users ({users.length})
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
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(`mailto:${contact.email}`)}
                          >
                            <Mail className="w-4 h-4 mr-1" />
                            Reply
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteContact(contact.id)}
                          >
                            <Trash2 className="w-4 h-4" />
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
                        Submitted: {new Date(contact.createdAt).toLocaleString()}
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
                            variant="outline"
                            onClick={() => window.open(`mailto:${consultation.email}`)}
                          >
                            <Mail className="w-4 h-4 mr-1" />
                            Email
                          </Button>
                          {consultation.phone && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => window.open(`tel:${consultation.phone}`)}
                            >
                              <Phone className="w-4 h-4 mr-1" />
                              Call
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteConsultation(consultation.id)}
                          >
                            <Trash2 className="w-4 h-4" />
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
                          {new Date(consultation.preferredDate).toLocaleString()}
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
                        Submitted: {new Date(consultation.createdAt).toLocaleString()}
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
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Blog Posts</CardTitle>
                    <CardDescription>Manage your blog content</CardDescription>
                  </div>
                  <Dialog open={showCreateBlog} onOpenChange={setShowCreateBlog}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Create Post
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Create New Blog Post</DialogTitle>
                        <DialogDescription>
                          Fill in the details to create a new blog post
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="title">Title</Label>
                            <Input
                              id="title"
                              value={formData.title}
                              onChange={(e) => handleFormChange('title', e.target.value)}
                              placeholder="Enter blog post title"
                            />
                          </div>
                          <div>
                            <Label htmlFor="slug">Slug</Label>
                            <Input
                              id="slug"
                              value={formData.slug}
                              onChange={(e) => handleFormChange('slug', e.target.value)}
                              placeholder="url-friendly-slug"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="excerpt">Excerpt</Label>
                          <Textarea
                            id="excerpt"
                            value={formData.excerpt}
                            onChange={(e) => handleFormChange('excerpt', e.target.value)}
                            placeholder="Brief description of the post"
                            rows={3}
                          />
                        </div>
                        <div>
                          <Label htmlFor="content">Content</Label>
                          <Textarea
                            id="content"
                            value={formData.content}
                            onChange={(e) => handleFormChange('content', e.target.value)}
                            placeholder="Write your blog post content here..."
                            rows={8}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="imageUrl">Image URL</Label>
                            <Input
                              id="imageUrl"
                              value={formData.imageUrl}
                              onChange={(e) => handleFormChange('imageUrl', e.target.value)}
                              placeholder="https://example.com/image.jpg"
                            />
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="published"
                              checked={formData.published}
                              onChange={(e) => handleFormChange('published', e.target.checked)}
                            />
                            <Label htmlFor="published">Publish immediately</Label>
                          </div>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setShowCreateBlog(false)}>
                            Cancel
                          </Button>
                          <Button onClick={createBlogPost}>
                            Create Post
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {blogPosts.map((post) => (
                    <Card key={post.id} className="p-4">
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
                            onClick={() => updateBlogPost(post.id, { published: !post.published })}
                          >
                            {post.published ? "Unpublish" : "Publish"}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingBlog(post)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteBlogPost(post.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm mb-2">{post.excerpt}</p>
                      <div className="text-xs text-gray-500">
                        Created: {new Date(post.createdAt).toLocaleString()}
                        {post.updatedAt && post.updatedAt !== post.createdAt && (
                          <span> • Updated: {new Date(post.updatedAt).toLocaleString()}</span>
                        )}
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
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Testimonials</CardTitle>
                    <CardDescription>Review and approve customer testimonials</CardDescription>
                  </div>
                  <Dialog open={showCreateTestimonial} onOpenChange={setShowCreateTestimonial}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Testimonial
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Testimonial</DialogTitle>
                        <DialogDescription>
                          Manually add a testimonial from a satisfied customer
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="parentName">Parent Name</Label>
                          <Input
                            id="parentName"
                            value={testimonialForm.parentName}
                            onChange={(e) => setTestimonialForm(prev => ({ ...prev, parentName: e.target.value }))}
                            placeholder="Enter parent's name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="childAge">Child Age</Label>
                          <Input
                            id="childAge"
                            value={testimonialForm.childAge}
                            onChange={(e) => setTestimonialForm(prev => ({ ...prev, childAge: e.target.value }))}
                            placeholder="e.g., 8 months"
                          />
                        </div>
                        <div>
                          <Label htmlFor="testimonial">Testimonial</Label>
                          <Textarea
                            id="testimonial"
                            value={testimonialForm.testimonial}
                            onChange={(e) => setTestimonialForm(prev => ({ ...prev, testimonial: e.target.value }))}
                            placeholder="Enter the testimonial text"
                            rows={4}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="rating">Rating</Label>
                            <Select value={testimonialForm.rating.toString()} onValueChange={(value) => setTestimonialForm(prev => ({ ...prev, rating: parseInt(value) }))}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select rating" />
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
                            <Label htmlFor="photoUrl">Photo URL (optional)</Label>
                            <Input
                              id="photoUrl"
                              value={testimonialForm.photoUrl}
                              onChange={(e) => setTestimonialForm(prev => ({ ...prev, photoUrl: e.target.value }))}
                              placeholder="https://example.com/photo.jpg"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setShowCreateTestimonial(false)}>
                            Cancel
                          </Button>
                          <Button onClick={createTestimonial}>
                            Add Testimonial
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
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
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteTestimonial(testimonial.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm mb-2">{testimonial.testimonial}</p>
                      <div className="text-xs text-gray-500">
                        Submitted: {new Date(testimonial.createdAt).toLocaleString()}
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

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage admin users and their permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <Card key={user.id} className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">{user.email}</h3>
                          <p className="text-sm text-gray-600">Role: {user.role || 'Admin'}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={user.approved ? "default" : "secondary"}>
                            {user.approved ? "Approved" : "Pending"}
                          </Badge>
                          <Badge variant="outline">
                            {user.canManageUsers ? "All Permissions" : "Limited"}
                          </Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <strong>Permissions:</strong>
                          <ul className="text-xs text-gray-600">
                            {user.canManageUsers && <li>• Manage Users</li>}
                            {user.canManageContacts && <li>• Manage Contacts</li>}
                            {user.canManageConsultations && <li>• Manage Consultations</li>}
                            {user.canManageBlog && <li>• Manage Blog</li>}
                            {user.canManageTestimonials && <li>• Manage Testimonials</li>}
                          </ul>
                        </div>
                        <div>
                          <strong>Account:</strong>
                          <p className="text-xs text-gray-600">
                            Created: {new Date(user.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                  {users.length === 0 && (
                    <p className="text-gray-500 text-center py-8">No users found</p>
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