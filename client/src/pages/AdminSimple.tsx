import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileUpload } from "@/components/ui/file-upload";
import { useAuth } from "@/hooks/use-auth";
import { AdminUserManagement } from "@/components/AdminUserManagement";
import { AdminManagement } from "@/components/AdminManagement";
import { LogOut, User, Shield, Home } from "lucide-react";
import { Link } from "wouter";

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
  photoUrl?: string;
  approved: boolean;
  createdAt: string;
}

export default function Admin() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const { user, logoutMutation } = useAuth();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [contactsRes, consultationsRes, blogRes, testimonialsRes] = await Promise.all([
        fetch("/api/contacts", { credentials: "include" }),
        fetch("/api/consultations", { credentials: "include" }),
        fetch("/api/blog", { credentials: "include" }),
        fetch("/api/testimonials", { credentials: "include" }),
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
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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

  const deleteContact = async (id: number) => {
    if (!confirm("Are you sure you want to delete this contact submission?")) return;
    
    try {
      const response = await fetch(`/api/contacts/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setContacts(prev => prev.filter(c => c.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete contact:", error);
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
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    
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
  };

  const handleLogout = () => {
    logoutMutation.mutate();
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

  // Get available tabs and default tab based on permissions
  const availableTabs = [];
  if (user?.canManageContacts) availableTabs.push('contacts');
  if (user?.canManageConsultations) availableTabs.push('consultations');
  if (user?.canManageBlog) availableTabs.push('blog');
  if (user?.canManageTestimonials) availableTabs.push('testimonials');
  if (user?.canManageUsers) availableTabs.push('users');

  const defaultTab = availableTabs[0] || 'contacts';

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your baby sleep consulting business</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <User className="h-4 w-4" />
              <span>Welcome, {user?.username}</span>
              <Shield className="h-4 w-4 text-green-600" />
            </div>
            
            <Link href="/">
              <Button variant="outline" size="sm">
                <Home className="h-4 w-4 mr-2" />
                Main Site
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
            >
              <LogOut className="h-4 w-4 mr-2" />
              {logoutMutation.isPending ? "Logging out..." : "Logout"}
            </Button>
          </div>
        </div>

        <div className="mb-8 flex justify-between items-center">
          <a 
            href="/" 
            className="text-baby-blue hover:text-soft-pink transition-colors font-medium"
          >
            ← Main Site
          </a>
        </div>

        <Tabs defaultValue={defaultTab} className="space-y-6">
          <TabsList className={`grid w-full grid-cols-${availableTabs.length}`}>
            {user?.canManageContacts && (
              <TabsTrigger value="contacts">
                Contacts ({pendingContacts})
              </TabsTrigger>
            )}
            {user?.canManageConsultations && (
              <TabsTrigger value="consultations">
                Consultations ({pendingConsultations})
              </TabsTrigger>
            )}
            {user?.canManageBlog && (
              <TabsTrigger value="blog">Blog Posts ({blogPosts.length})</TabsTrigger>
            )}
            {user?.canManageTestimonials && (
              <TabsTrigger value="testimonials">
                Testimonials ({pendingTestimonials} pending)
              </TabsTrigger>
            )}
            {user?.canManageUsers && (
              <TabsTrigger value="users">
                Settings
              </TabsTrigger>
            )}
          </TabsList>

          {user?.canManageContacts && (
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
          )}

          {user?.canManageConsultations && (
            <TabsContent value="consultations" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Consultation Bookings</CardTitle>
                  <CardDescription>
                    Manage consultation requests from parents
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
                            <Badge variant={consultation.status === 'completed' ? 'default' : consultation.status === 'pending' ? 'secondary' : 'outline'}>
                              {consultation.status}
                            </Badge>
                            <select
                              value={consultation.status}
                              onChange={(e) => updateConsultationStatus(consultation.id, e.target.value)}
                              className="text-sm border rounded px-2 py-1"
                            >
                              <option value="pending">Pending</option>
                              <option value="scheduled">Scheduled</option>
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
                        <div className="mb-2">
                          <strong>Child Age:</strong> {consultation.childAge}
                        </div>
                        <div className="mb-2">
                          <strong>Consultation Type:</strong> {consultation.consultationType}
                        </div>
                        {consultation.preferredDate && (
                          <div className="mb-2">
                            <strong>Preferred Date:</strong> {consultation.preferredDate}
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
          )}

          {user?.canManageBlog && (
            <TabsContent value="blog" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Blog Posts</CardTitle>
                  <CardDescription>Manage your blog content</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {blogPosts.map((post) => (
                      <Card key={post.id} className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{post.title}</h3>
                              <Badge variant={post.published ? "default" : "secondary"}>
                                {post.published ? "Published" : "Draft"}
                              </Badge>
                            </div>
                            <p className="text-sm mb-2">{post.excerpt}</p>
                            <div className="text-xs text-gray-500">
                              Created: {formatDate(post.createdAt)}
                              {post.updatedAt && post.updatedAt !== post.createdAt && (
                                <span> • Updated: {formatDate(post.updatedAt)}</span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
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
                      </Card>
                    ))}
                    {blogPosts.length === 0 && (
                      <p className="text-gray-500 text-center py-8">No blog posts yet</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {user?.canManageTestimonials && (
            <TabsContent value="testimonials" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Testimonials</CardTitle>
                  <CardDescription>Manage customer testimonials</CardDescription>
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
          )}

          {user?.canManageUsers && (
            <TabsContent value="users" className="space-y-6">
              <AdminManagement />
              <AdminUserManagement />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
}