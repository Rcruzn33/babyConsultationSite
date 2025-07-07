import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import { User } from "@shared/schema";
import { useAuth } from "@/hooks/use-auth";
import { Users, Shield, Trash2, Mail, Calendar, CheckCircle, Settings } from "lucide-react";
import { format } from "date-fns";

interface SafeUser extends Omit<User, 'password' | 'resetToken' | 'resetTokenExpiry'> {
  canManageContacts: boolean;
  canManageConsultations: boolean;
  canManageBlog: boolean;
  canManageTestimonials: boolean;
  canManageUsers: boolean;
}

export function AdminManagement() {
  const { toast } = useToast();
  const { user: currentUser } = useAuth();

  const { data: allUsers, isLoading } = useQuery<SafeUser[]>({
    queryKey: ["/api/admin/users"],
  });

  const updateUserMutation = useMutation({
    mutationFn: async ({ userId, updates }: { userId: number; updates: Partial<SafeUser> }) => {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to update user");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({
        title: "Success",
        description: "User permissions updated successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (userId: number) => {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete user");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({
        title: "Success",
        description: "User deleted successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handlePermissionChange = (userId: number, permission: string, value: boolean) => {
    updateUserMutation.mutate({
      userId,
      updates: { [permission]: value }
    });
  };

  const handleDeleteUser = (userId: number, username: string) => {
    if (confirm(`Are you sure you want to delete admin "${username}"? This action cannot be undone.`)) {
      deleteUserMutation.mutate(userId);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Admin Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  const approvedUsers = allUsers?.filter(user => user.isApproved) || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Admin Management
        </CardTitle>
        <CardDescription>
          Manage admin users and their permissions ({approvedUsers.length} active admins)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {approvedUsers.map((user) => (
          <div
            key={user.id}
            className="border rounded-lg p-6 space-y-4 bg-card"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-lg">{user.username}</h4>
                  {user.id === currentUser?.id && (
                    <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                      <Shield className="h-3 w-3 mr-1" />
                      You
                    </Badge>
                  )}
                  <Badge variant="default" className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Active
                  </Badge>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    {user.email}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Joined {format(new Date(user.createdAt), "MMM d, yyyy")}
                  </div>
                </div>
              </div>
              
              {user.id !== currentUser?.id && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteUser(user.id, user.username)}
                  disabled={deleteUserMutation.isPending}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Settings className="h-4 w-4" />
                Permissions
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`contacts-${user.id}`}
                    checked={user.canManageContacts}
                    onCheckedChange={(checked) => 
                      handlePermissionChange(user.id, 'canManageContacts', checked as boolean)
                    }
                    disabled={updateUserMutation.isPending || user.id === currentUser?.id || !currentUser?.canManageUsers}
                  />
                  <label
                    htmlFor={`contacts-${user.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Manage Contacts
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`consultations-${user.id}`}
                    checked={user.canManageConsultations}
                    onCheckedChange={(checked) => 
                      handlePermissionChange(user.id, 'canManageConsultations', checked as boolean)
                    }
                    disabled={updateUserMutation.isPending || user.id === currentUser?.id || !currentUser?.canManageUsers}
                  />
                  <label
                    htmlFor={`consultations-${user.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Manage Consultations
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`blog-${user.id}`}
                    checked={user.canManageBlog}
                    onCheckedChange={(checked) => 
                      handlePermissionChange(user.id, 'canManageBlog', checked as boolean)
                    }
                    disabled={updateUserMutation.isPending || user.id === currentUser?.id || !currentUser?.canManageUsers}
                  />
                  <label
                    htmlFor={`blog-${user.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Manage Blog Posts
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`testimonials-${user.id}`}
                    checked={user.canManageTestimonials}
                    onCheckedChange={(checked) => 
                      handlePermissionChange(user.id, 'canManageTestimonials', checked as boolean)
                    }
                    disabled={updateUserMutation.isPending || user.id === currentUser?.id || !currentUser?.canManageUsers}
                  />
                  <label
                    htmlFor={`testimonials-${user.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Manage Testimonials
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`users-${user.id}`}
                    checked={user.canManageUsers}
                    onCheckedChange={(checked) => 
                      handlePermissionChange(user.id, 'canManageUsers', checked as boolean)
                    }
                    disabled={updateUserMutation.isPending || user.id === currentUser?.id || !currentUser?.canManageUsers}
                  />
                  <label
                    htmlFor={`users-${user.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Manage Users & Settings
                  </label>
                </div>
              </div>

              <div className="pt-2 border-t text-xs text-muted-foreground">
                {user.approvedAt && (
                  <div>Approved: {format(new Date(user.approvedAt), "MMM d, yyyy")}</div>
                )}
                {user.id === currentUser?.id && (
                  <div className="text-blue-600 dark:text-blue-400">You cannot modify your own permissions</div>
                )}
                {!currentUser?.canManageUsers && user.id !== currentUser?.id && (
                  <div className="text-amber-600 dark:text-amber-400">You need user management permissions to modify others</div>
                )}
              </div>
            </div>
          </div>
        ))}

        {approvedUsers.length === 0 && (
          <div className="text-center py-8">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Active Admins</h3>
            <p className="text-muted-foreground">
              No approved admin users found.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}