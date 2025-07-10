import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Admin() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [consultations, setConsultations] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
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
              Contacts ({contacts.filter(c => !c.responded).length})
            </TabsTrigger>
            <TabsTrigger value="consultations">
              Consultations ({consultations.filter(c => c.status === 'pending').length})
            </TabsTrigger>
            <TabsTrigger value="blog">Blog Posts ({blogPosts.length})</TabsTrigger>
            <TabsTrigger value="testimonials">
              Testimonials ({testimonials.filter(t => !t.approved).length} pending)
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
                <CardTitle>Blog Posts</CardTitle>
                <CardDescription>Manage your blog content</CardDescription>
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
        </Tabs>
      </div>
    </div>
  );
}