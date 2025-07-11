import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import { User } from "@shared/schema";
import { UserCheck, Clock, Mail, Calendar, CheckCircle } from "lucide-react";
import { format } from "date-fns";

export function AdminUserManagement() {
  const { toast } = useToast();

  const { data: pendingUsers, isLoading } = useQuery<User[]>({
    queryKey: ["/api/admin/pending-users"],
  });

  const approveUserMutation = useMutation({
    mutationFn: async (userId: number) => {
      const res = await fetch(`/api/admin/approve-user/${userId}`, {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to approve user");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/pending-users"] });
      toast({
        title: "User approved",
        description: "The user has been approved and can now access the admin dashboard.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Approval failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleApproveUser = (userId: number) => {
    approveUserMutation.mutate(userId);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5" />
            Pending Admin Approvals
          </CardTitle>
          <CardDescription>
            Review and approve new admin account requests
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-48" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-10 w-20" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (!pendingUsers || pendingUsers.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5" />
            Pending Admin Approvals
          </CardTitle>
          <CardDescription>
            Review and approve new admin account requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">All caught up!</h3>
            <p className="text-gray-600 dark:text-gray-400">
              No pending admin approvals at this time.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserCheck className="h-5 w-5" />
          Pending Admin Approvals
        </CardTitle>
        <CardDescription>
          Review and approve new admin account requests ({pendingUsers.length} pending)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {pendingUsers.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-4 border rounded-lg bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h4 className="font-medium">{user.username}</h4>
                <Badge variant="secondary" className="bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200">
                  <Clock className="h-3 w-3 mr-1" />
                  Pending
                </Badge>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  {user.email}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Requested {format(new Date(user.createdAt), "MMM d, yyyy")}
                </div>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Role: {user.role || "Admin"}
              </p>
            </div>

            <Button
              onClick={() => handleApproveUser(user.id)}
              disabled={approveUserMutation.isPending}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {approveUserMutation.isPending ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Approving...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Approve
                </div>
              )}
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}