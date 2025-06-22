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

interface SafeUser extends Omit<User, 'password' | 'resetToken' | 'resetTokenExpiry'> {}

export function AdminManagement() {
  const { toast } = useToast();
  const { user: currentUser } = useAuth();

  const { data: allUsers, isLoading } = useQuery<SafeUser[]>({
    queryKey: ["/api/admin/users"],
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
                Admin Status
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-sm">
                  <span className="font-medium">Role:</span> {user.role}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Status:</span> 
                  <Badge variant="default" className="ml-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                    Full Access
                  </Badge>
                </div>
                {user.approvedAt && (
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">Approved:</span> {format(new Date(user.approvedAt), "MMM d, yyyy")}
                  </div>
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