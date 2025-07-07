import { useAuth } from "@/hooks/use-auth";
import { Loader2, AlertCircle, UserCheck } from "lucide-react";
import { Redirect, Route } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export function ProtectedRoute({
  path,
  component: Component,
}: {
  path: string;
  component: () => React.JSX.Element;
}) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Route path={path}>
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Loading...</p>
          </div>
        </div>
      </Route>
    );
  }

  if (!user) {
    return (
      <Route path={path}>
        <Redirect to="/admin/auth" />
      </Route>
    );
  }

  if (!user.isApproved) {
    return (
      <Route path={path}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <AlertCircle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
              <CardTitle className="text-xl font-semibold">Account Pending Approval</CardTitle>
              <CardDescription>
                Your admin account is awaiting approval from an existing administrator.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <UserCheck className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-amber-800 dark:text-amber-200 mb-1">
                      What happens next?
                    </p>
                    <ul className="text-amber-700 dark:text-amber-300 space-y-1">
                      <li>• An existing admin will review your request</li>
                      <li>• You'll receive an email once approved</li>
                      <li>• You can then access the admin dashboard</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Account:</strong> {user.username}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Email:</strong> {user.email}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Status:</strong> Pending approval
                </p>
              </div>

              <div className="flex gap-2">
                <Link href="/" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Visit Main Site
                  </Button>
                </Link>
                <Link href="/admin/auth" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Switch Account
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </Route>
    );
  }

  return (
    <Route path={path}>
      <Component />
    </Route>
  );
}