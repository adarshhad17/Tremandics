"use client";

import { useAuth } from "@/contexts/auth-context";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AuthGuard({ children }) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const publicRoutes = ["/", "/login", "/register"];
  const isPublicRoute = publicRoutes.includes(pathname);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated && !isPublicRoute) {
        setShowLoginPrompt(true);

        const timer = setTimeout(() => {
          router.push("/login");
        }, 5000);

        return () => clearTimeout(timer);
      } else if (
        isAuthenticated &&
        (pathname === "/login" || pathname === "/register")
      ) {
        router.push("/dashboard");
      }
    }
  }, [isAuthenticated, isLoading, isPublicRoute, router, pathname]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 bg-white rounded-lg animate-pulse"></div>
          </div>
          <p className="text-white text-lg mb-2">Tremandics</p>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (showLoginPrompt && !isAuthenticated && !isPublicRoute) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gray-900/80 backdrop-blur-xl border-gray-800 shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-red-500 to-orange-600 rounded-2xl flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-white">
                Authentication Required
              </CardTitle>
              <p className="text-gray-400 mt-2">
                Please login to access this page
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-center">
              <p className="text-red-400 text-sm mb-3">
                You need to be logged in to access the shipping dashboard.
              </p>
              <p className="text-gray-400 text-xs">
                Redirecting to login page in 3 seconds...
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                onClick={() => router.push("/login")}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                Go to Login
              </Button>

              <Button
                onClick={() => router.push("/")}
                variant="outline"
                className="w-full bg-transparent border-gray-700 text-white hover:bg-gray-800"
              >
                Back to Home
              </Button>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
              <p className="text-gray-300 text-sm font-medium mb-2">
                Demo Credentials:
              </p>
              <div className="space-y-1">
                <p className="text-gray-400 text-xs">Email: admin@gmail.com</p>
                <p className="text-gray-400 text-xs">Password: 12345678</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (
    !isLoading &&
    ((!isAuthenticated && !isPublicRoute) ||
      (isAuthenticated && (pathname === "/login" || pathname === "/register")))
  ) {
    return null;
  }

  return children;
}
