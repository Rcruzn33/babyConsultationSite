import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export default function Admin() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [consultations, setConsultations] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
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

  const updateConsultationStatus = async (id: number, status: string) => {
    try {
      const response = await fetch(`/api/consultations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
        credentials: 'include'
      });
      if (response.ok) {
        toast({ title: "Consultation status updated" });
        loadData();
      } else {
        toast({ title: "Failed to update consultation", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error updating consultation", variant: "destructive" });
    }
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
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="contacts">📧 Contacts ({contacts.length})</TabsTrigger>
            <TabsTrigger value="consultations">📅 Consultations ({consultations.length})</TabsTrigger>
            <TabsTrigger value="blog">📝 Blog Posts ({blogPosts.length})</TabsTrigger>
            <TabsTrigger value="testimonials">⭐ Testimonials ({testimonials.filter(t => !t.approved).length} pending)</TabsTrigger>
            <TabsTrigger value="users">👤 Users ({users.length})</TabsTrigger>
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
                        </div>
                        <Badge variant={contact.responded ? "default" : "secondary"}>
                          {contact.responded ? "Responded" : "New"}
                        </Badge>
                      </div>
                      <p className="text-sm mb-2">{contact.message}</p>
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
                          <p className="text-sm text-gray-600">Service: {consultation.serviceType}</p>
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
                        </div>
                      </div>
                      <p className="text-sm mb-2">{consultation.message}</p>
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
                  <Button>+ Create Post</Button>
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
                        <Badge variant={post.published ? "default" : "secondary"}>
                          {post.published ? "Published" : "Draft"}
                        </Badge>
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
                        <Badge variant={user.approved ? "default" : "secondary"}>
                          {user.approved ? "Approved" : "Pending"}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-500">
                        Created: {new Date(user.createdAt).toLocaleString()}
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