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

export default function Admin() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [consultations, setConsultations] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showCreateBlog, setShowCreateBlog] = useState(false);
  const [showCreateTestimonial, setShowCreateTestimonial] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
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
    loadCurrentUser();
    loadData();
  }, []);

  const loadCurrentUser = async () => {
    try {
      const response = await fetch("/api/auth/me", { credentials: 'include' });
      if (response.ok) {
        const data = await response.json();
        setCurrentUser(data.user);
      }
    } catch (error) {
      console.error("Error loading current user:", error);
    }
  };

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
        setContacts([]);
      }
      if (consultationsRes.ok) {
        const consultationsData = await consultationsRes.json();
        console.log("Consultations data:", consultationsData);
        setConsultations(consultationsData);
      } else {
        console.error("Consultations failed:", await consultationsRes.text());
        setConsultations([]);
      }
      if (blogRes.ok) {
        const blogData = await blogRes.json();
        console.log("Blog data:", blogData);
        setBlogPosts(blogData);
      } else {
        console.error("Blog failed:", await blogRes.text());
        setBlogPosts([]);
      }
      if (testimonialsRes.ok) {
        const testimonialsData = await testimonialsRes.json();
        console.log("Testimonials data:", testimonialsData);
        setTestimonials(testimonialsData);
      } else {
        console.error("Testimonials failed:", await testimonialsRes.text());
        setTestimonials([]);
      }
      if (usersRes.ok) {
        const usersData = await usersRes.json();
        console.log("Users data:", usersData);
        setUsers(usersData);
      } else {
        console.error("Users failed:", await usersRes.text());
        setUsers([]);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const approveTestimonial = async (id: number) => {
    try {
      const response = await fetch(`/api/testimonials/${id}/approve`, {
        method: "PATCH",
        credentials: 'include'
      });
      if (response.ok) {
        toast({ title: "Testimonial approved successfully" });
        loadData();
      } else {
        toast({ title: "Failed to approve testimonial", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error approving testimonial", variant: "destructive" });
    }
  };



  const handleFormChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const createBlogPost = async () => {
    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include'
      });
      if (response.ok) {
        toast({ title: "Blog post created successfully" });
        setShowCreateBlog(false);
        setFormData({
          title: '',
          content: '',
          excerpt: '',
          slug: '',
          published: false,
          imageUrl: ''
        });
        loadData();
      } else {
        toast({ title: "Failed to create blog post", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error creating blog post", variant: "destructive" });
    }
  };

  const createTestimonial = async () => {
    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...testimonialForm,
          approved: true
        }),
        credentials: 'include'
      });
      if (response.ok) {
        toast({ title: "Testimonial created successfully" });
        setShowCreateTestimonial(false);
        setTestimonialForm({
          parentName: '',
          testimonial: '',
          childAge: '',
          rating: 5,
          photoUrl: ''
        });
        loadData();
      } else {
        toast({ title: "Failed to create testimonial", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error creating testimonial", variant: "destructive" });
    }
  };

  const deleteBlogPost = async (id: number) => {
    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (response.ok) {
        toast({ title: "Blog post deleted successfully" });
        loadData();
      } else {
        toast({ title: "Failed to delete blog post", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error deleting blog post", variant: "destructive" });
    }
  };

  const toggleBlogPostPublished = async (id: number, published: boolean) => {
    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !published }),
        credentials: 'include'
      });
      if (response.ok) {
        toast({ title: `Blog post ${!published ? 'published' : 'unpublished'} successfully` });
        loadData();
      } else {
        toast({ title: "Failed to update blog post", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error updating blog post", variant: "destructive" });
    }
  };

  const deleteTestimonial = async (id: number) => {
    try {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (response.ok) {
        toast({ title: "Testimonial deleted successfully" });
        loadData();
      } else {
        toast({ title: "Failed to delete testimonial", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error deleting testimonial", variant: "destructive" });
    }
  };

  const toggleTestimonialApproval = async (id: number, approved: boolean) => {
    try {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approved: !approved }),
        credentials: 'include'
      });
      if (response.ok) {
        toast({ title: `Testimonial ${!approved ? 'approved' : 'unapproved'} successfully` });
        loadData();
      } else {
        toast({ title: "Failed to update testimonial", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error updating testimonial", variant: "destructive" });
    }
  };

  const updateUserPermissions = async (userId: number, permissions: any) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(permissions),
        credentials: 'include'
      });
      if (response.ok) {
        toast({ title: "User permissions updated successfully" });
        setEditingUser(null);
        loadData();
      } else {
        toast({ title: "Failed to update user permissions", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error updating user permissions", variant: "destructive" });
    }
  };

  const approveUser = async (userId: number) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/approve`, {
        method: 'POST',
        credentials: 'include'
      });
      if (response.ok) {
        toast({ title: "User approved successfully" });
        loadData();
      } else {
        toast({ title: "Failed to approve user", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error approving user", variant: "destructive" });
    }
  };

  const deleteContact = async (contactId: number) => {
    try {
      const response = await fetch(`/api/contacts/${contactId}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (response.ok) {
        toast({ title: "Contact deleted successfully" });
        loadData();
      } else {
        toast({ title: "Failed to delete contact", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error deleting contact", variant: "destructive" });
    }
  };

  const updateContactStatus = async (contactId: number, responded: boolean) => {
    try {
      const response = await fetch(`/api/contacts/${contactId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ responded }),
      });
      if (response.ok) {
        toast({ title: `Contact marked as ${responded ? 'read' : 'unread'}` });
        loadData();
      } else {
        toast({ title: "Failed to update contact status", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error updating contact status", variant: "destructive" });
    }
  };

  const createEmailReply = (contact: any) => {
    const subject = `Re: ${contact.subject}`;
    const body = `Hi ${contact.name},\n\nThank you for reaching out! I received your message:\n\n"${contact.message}"\n\nI'll get back to you soon with more information.\n\nBest regards,\nBaby Sleep Whisperer`;
    window.open(`mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
  };

  const updateConsultationStatus = async (consultationId: number, status: string) => {
    try {
      const response = await fetch(`/api/consultations/${consultationId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        toast({ title: `Consultation status updated to ${status}` });
        loadData();
      } else {
        toast({ title: "Failed to update consultation status", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error updating consultation status", variant: "destructive" });
    }
  };



  const deleteConsultation = async (consultationId: number) => {
    try {
      const response = await fetch(`/api/consultations/${consultationId}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (response.ok) {
        toast({ title: "Consultation deleted successfully" });
        loadData();
      } else {
        toast({ title: "Failed to delete consultation", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error deleting consultation", variant: "destructive" });
    }
  };

  const createConsultationEmailReply = (consultation: any) => {
    const subject = `Re: ${consultation.consultationType} Consultation Request`;
    const body = `Hi ${consultation.parentName},\n\nThank you for your consultation request! I received your information:\n\nChild's Age: ${consultation.childAge}\nSleep Challenges: ${consultation.sleepChallenges}\nConsultation Type: ${consultation.consultationType}\n\nI'll contact you within 24 hours to schedule our call.\n\nBest regards,\nBaby Sleep Whisperer`;
    window.open(`mailto:${consultation.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { 
        method: "POST",
        credentials: 'include'
      });
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage your baby sleep consulting business</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, admin</span>
              <a href="/" className="text-blue-600 hover:text-blue-800">← Main Site</a>
              <Button onClick={logout} variant="outline">Logout</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="contacts" className="space-y-6">
          <TabsList className={`grid w-full ${currentUser?.can_manage_users ? 'grid-cols-5' : 'grid-cols-4'}`}>
            <TabsTrigger value="contacts">📧 Contacts ({contacts.length})</TabsTrigger>
            <TabsTrigger value="consultations">📅 Consultations ({consultations.length})</TabsTrigger>
            <TabsTrigger value="blog">📝 Blog Posts ({blogPosts.length})</TabsTrigger>
            <TabsTrigger value="testimonials">⭐ Testimonials ({testimonials.filter(t => !t.approved).length} pending)</TabsTrigger>
            {currentUser?.can_manage_users && (
              <TabsTrigger value="users">👤 Users ({users.length})</TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="contacts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Contact Form Submissions</CardTitle>
                <CardDescription>Messages from potential clients</CardDescription>
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
                          <Badge variant={contact.responded ? "default" : "destructive"} className={contact.responded ? "" : "bg-red-500 text-white"}>
                            {contact.responded ? "Responded" : "Unread"}
                          </Badge>
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => createEmailReply(contact)}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            Reply via Email
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateContactStatus(contact.id, !contact.responded)}
                            className={contact.responded ? "" : "bg-red-500 text-white hover:bg-red-600"}
                          >
                            Mark as {contact.responded ? "Unread" : "Read"}
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deleteContact(contact.id)}
                          >
                            Delete
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
                <CardTitle>Consultation Requests</CardTitle>
                <CardDescription>Manage consultation bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {consultations.map((consultation) => (
                    <Card key={consultation.id} className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">{consultation.parentName}</h3>
                          <p className="text-sm text-gray-600">{consultation.email}</p>
                          <p className="text-sm text-gray-600">Child: {consultation.childAge}</p>
                          <p className="text-sm text-gray-600">Service: {consultation.consultationType}</p>
                          {consultation.phone && (
                            <p className="text-sm text-gray-600">{consultation.phone}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Select
                            value={consultation.status}
                            onValueChange={(value) => updateConsultationStatus(consultation.id, value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="confirmed">Confirmed</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => createConsultationEmailReply(consultation)}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            Reply via Email
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deleteConsultation(consultation.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                      <div className="mb-2">
                        <strong>Sleep Challenges:</strong>
                        <p className="mt-1 text-sm">{consultation.sleepChallenges}</p>
                      </div>
                      <div className="mb-2">
                        <strong>Consultation Type:</strong> {consultation.consultationType}
                      </div>
                      {consultation.preferredDate && (
                        <div className="mb-2">
                          <strong>Preferred Date:</strong> {new Date(consultation.preferredDate).toLocaleDateString()}
                        </div>
                      )}
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
                    <p className="text-gray-500 text-center py-8">No consultation requests yet</p>
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
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2">
                        + Create Post
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl bg-white border-2 border-gray-200 shadow-lg">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-gray-800">Create New Blog Post</DialogTitle>
                        <DialogDescription className="text-gray-600">
                          Fill in the details to create a new blog post
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 bg-white p-4 rounded-lg">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="title" className="text-sm font-medium text-gray-700">Title</Label>
                            <Input
                              id="title"
                              value={formData.title}
                              onChange={(e) => handleFormChange('title', e.target.value)}
                              placeholder="Enter blog post title"
                              className="mt-1 bg-white border-gray-300 text-gray-900"
                            />
                          </div>
                          <div>
                            <Label htmlFor="slug" className="text-sm font-medium text-gray-700">Slug</Label>
                            <Input
                              id="slug"
                              value={formData.slug}
                              onChange={(e) => handleFormChange('slug', e.target.value)}
                              placeholder="url-friendly-slug"
                              className="mt-1 bg-white border-gray-300 text-gray-900"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="excerpt" className="text-sm font-medium text-gray-700">Excerpt</Label>
                          <Textarea
                            id="excerpt"
                            value={formData.excerpt}
                            onChange={(e) => handleFormChange('excerpt', e.target.value)}
                            placeholder="Brief description of the post"
                            rows={3}
                            className="mt-1 bg-white border-gray-300 text-gray-900"
                          />
                        </div>
                        <div>
                          <Label htmlFor="content" className="text-sm font-medium text-gray-700">Content</Label>
                          <Textarea
                            id="content"
                            value={formData.content}
                            onChange={(e) => handleFormChange('content', e.target.value)}
                            placeholder="Write your blog post content here..."
                            rows={8}
                            className="mt-1 bg-white border-gray-300 text-gray-900"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="imageUrl" className="text-sm font-medium text-gray-700">Image URL</Label>
                            <Input
                              id="imageUrl"
                              value={formData.imageUrl}
                              onChange={(e) => handleFormChange('imageUrl', e.target.value)}
                              placeholder="https://example.com/image.jpg"
                              className="mt-1 bg-white border-gray-300 text-gray-900"
                            />
                          </div>
                          <div className="flex items-center space-x-2 mt-6">
                            <input
                              type="checkbox"
                              id="published"
                              checked={formData.published}
                              onChange={(e) => handleFormChange('published', e.target.checked)}
                              className="rounded border-gray-300"
                            />
                            <Label htmlFor="published" className="text-sm font-medium text-gray-700">Publish immediately</Label>
                          </div>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setShowCreateBlog(false)}>
                            Cancel
                          </Button>
                          <Button onClick={createBlogPost} className="bg-blue-600 hover:bg-blue-700 text-white">
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
                            onClick={() => toggleBlogPostPublished(post.id, post.published)}
                            className="text-xs"
                          >
                            {post.published ? "Unpublish" : "Publish"}
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deleteBlogPost(post.id)}
                            className="text-xs"
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm mb-2">{post.excerpt}</p>
                      <div className="text-xs text-gray-500">
                        Created: {new Date(post.createdAt).toLocaleString()}
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
                      <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2">
                        + Add Testimonial
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white border-2 border-gray-200 shadow-lg">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-gray-800">Add New Testimonial</DialogTitle>
                        <DialogDescription className="text-gray-600">
                          Manually add a testimonial from a satisfied customer
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 bg-white p-4 rounded-lg">
                        <div>
                          <Label htmlFor="parentName" className="text-sm font-medium text-gray-700">Parent Name</Label>
                          <Input
                            id="parentName"
                            value={testimonialForm.parentName}
                            onChange={(e) => setTestimonialForm(prev => ({ ...prev, parentName: e.target.value }))}
                            placeholder="Enter parent's name"
                            className="mt-1 bg-white border-gray-300 text-gray-900"
                          />
                        </div>
                        <div>
                          <Label htmlFor="childAge" className="text-sm font-medium text-gray-700">Child Age</Label>
                          <Input
                            id="childAge"
                            value={testimonialForm.childAge}
                            onChange={(e) => setTestimonialForm(prev => ({ ...prev, childAge: e.target.value }))}
                            placeholder="e.g., 8 months"
                            className="mt-1 bg-white border-gray-300 text-gray-900"
                          />
                        </div>
                        <div>
                          <Label htmlFor="testimonial" className="text-sm font-medium text-gray-700">Testimonial</Label>
                          <Textarea
                            id="testimonial"
                            value={testimonialForm.testimonial}
                            onChange={(e) => setTestimonialForm(prev => ({ ...prev, testimonial: e.target.value }))}
                            placeholder="Enter the testimonial text"
                            rows={4}
                            className="mt-1 bg-white border-gray-300 text-gray-900"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="rating" className="text-sm font-medium text-gray-700">Rating</Label>
                            <Select value={testimonialForm.rating.toString()} onValueChange={(value) => setTestimonialForm(prev => ({ ...prev, rating: parseInt(value) }))}>
                              <SelectTrigger className="mt-1 bg-white border-gray-300 text-gray-900">
                                <SelectValue placeholder="Select rating" />
                              </SelectTrigger>
                              <SelectContent className="bg-white border-gray-300">
                                <SelectItem value="1">1 Star</SelectItem>
                                <SelectItem value="2">2 Stars</SelectItem>
                                <SelectItem value="3">3 Stars</SelectItem>
                                <SelectItem value="4">4 Stars</SelectItem>
                                <SelectItem value="5">5 Stars</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="photoUrl" className="text-sm font-medium text-gray-700">Photo URL (optional)</Label>
                            <Input
                              id="photoUrl"
                              value={testimonialForm.photoUrl}
                              onChange={(e) => setTestimonialForm(prev => ({ ...prev, photoUrl: e.target.value }))}
                              placeholder="https://example.com/photo.jpg"
                              className="mt-1 bg-white border-gray-300 text-gray-900"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setShowCreateTestimonial(false)}>
                            Cancel
                          </Button>
                          <Button onClick={createTestimonial} className="bg-green-600 hover:bg-green-700 text-white">
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
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => toggleTestimonialApproval(testimonial.id, testimonial.approved)}
                            className="text-xs"
                          >
                            {testimonial.approved ? "Unapprove" : "Approve"}
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deleteTestimonial(testimonial.id)}
                            className="text-xs"
                          >
                            Delete
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

          {currentUser?.can_manage_users && (
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
                          <p className="text-sm text-gray-600">Username: {user.username || 'N/A'}</p>
                          <p className="text-sm text-gray-600">Role: {user.role || 'Admin'}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={user.approved ? "default" : "secondary"}>
                            {user.approved ? "Approved" : "Pending"}
                          </Badge>
                          <Badge variant="outline">
                            {user.canManageUsers ? "Full Access" : "Limited"}
                          </Badge>
                          {!user.approved && (
                            <Button
                              size="sm"
                              onClick={() => approveUser(user.id)}
                              className="text-xs"
                            >
                              Approve
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingUser(user)}
                            className="text-xs"
                          >
                            Edit Permissions
                          </Button>
                        </div>
                      </div>
                      
                      {editingUser && editingUser.id === user.id ? (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-semibold mb-3">Edit User Permissions</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  checked={editingUser.canManageUsers || false}
                                  onChange={(e) => setEditingUser({
                                    ...editingUser,
                                    canManageUsers: e.target.checked
                                  })}
                                  className="rounded border-gray-300"
                                />
                                <span className="text-sm">Manage Users</span>
                              </label>
                              <label className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  checked={editingUser.canManageContacts || false}
                                  onChange={(e) => setEditingUser({
                                    ...editingUser,
                                    canManageContacts: e.target.checked
                                  })}
                                  className="rounded border-gray-300"
                                />
                                <span className="text-sm">Manage Contacts</span>
                              </label>
                              <label className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  checked={editingUser.canManageConsultations || false}
                                  onChange={(e) => setEditingUser({
                                    ...editingUser,
                                    canManageConsultations: e.target.checked
                                  })}
                                  className="rounded border-gray-300"
                                />
                                <span className="text-sm">Manage Consultations</span>
                              </label>
                            </div>
                            <div>
                              <label className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  checked={editingUser.canManageBlog || false}
                                  onChange={(e) => setEditingUser({
                                    ...editingUser,
                                    canManageBlog: e.target.checked
                                  })}
                                  className="rounded border-gray-300"
                                />
                                <span className="text-sm">Manage Blog Posts</span>
                              </label>
                              <label className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  checked={editingUser.canManageTestimonials || false}
                                  onChange={(e) => setEditingUser({
                                    ...editingUser,
                                    canManageTestimonials: e.target.checked
                                  })}
                                  className="rounded border-gray-300"
                                />
                                <span className="text-sm">Manage Testimonials</span>
                              </label>
                            </div>
                          </div>
                          <div className="flex justify-end space-x-2 mt-4">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setEditingUser(null)}
                              className="text-xs"
                            >
                              Cancel
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => updateUserPermissions(editingUser.id, {
                                canManageUsers: editingUser.canManageUsers,
                                canManageContacts: editingUser.canManageContacts,
                                canManageConsultations: editingUser.canManageConsultations,
                                canManageBlog: editingUser.canManageBlog,
                                canManageTestimonials: editingUser.canManageTestimonials
                              })}
                              className="text-xs bg-blue-600 hover:bg-blue-700 text-white"
                            >
                              Save Changes
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <strong>Permissions:</strong>
                            <ul className="text-xs text-gray-600">
                              {user.canManageUsers && <li>• Manage Users</li>}
                              {user.canManageContacts && <li>• Manage Contacts</li>}
                              {user.canManageConsultations && <li>• Manage Consultations</li>}
                              {user.canManageBlog && <li>• Manage Blog Posts</li>}
                              {user.canManageTestimonials && <li>• Manage Testimonials</li>}
                              {!user.canManageUsers && !user.canManageContacts && !user.canManageConsultations && !user.canManageBlog && !user.canManageTestimonials && <li>• Basic Access</li>}
                            </ul>
                          </div>
                          <div>
                            <strong>Account Details:</strong>
                            <p className="text-xs text-gray-600">
                              Created: {new Date(user.createdAt).toLocaleString()}
                            </p>
                            {user.approvedAt && (
                              <p className="text-xs text-gray-600">
                                Approved: {new Date(user.approvedAt).toLocaleString()}
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </Card>
                  ))}
                  {users.length === 0 && (
                    <p className="text-gray-500 text-center py-8">No users found</p>
                  )}
                </div>
              </CardContent>
            </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
}