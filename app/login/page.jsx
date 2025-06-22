"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Package, Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import Link from "next/link";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const result = await login(formData.email, formData.password);

    if (result.success) {
      router.push("/");
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  };

  const fillDemoCredentials = () => {
    setFormData({
      email: "admin@gmail.com",
      password: "12345678",
    });
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-5" />

      <Card className="w-full max-w-md bg-gray-900/80 backdrop-blur-xl border-gray-800 shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
            <Package className="w-8 h-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-white">
              Welcome Back
            </CardTitle>
            <p className="text-gray-400 mt-2">Sign in to Tremandics </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 pr-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2.5 transition-all duration-200 disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-gray-400 text-sm">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-300 text-sm font-medium">
                Demo Credentials:
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={fillDemoCredentials}
                className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white text-xs"
              >
                Auto Fill
              </Button>
            </div>
            <div className="space-y-1">
              <p className="text-gray-400 text-xs">Email: admin@gmail.com</p>
              <p className="text-gray-400 text-xs">Password: 12345678</p>
            </div>
            <div className="mt-2 pt-2 border-t border-gray-700">
              <p className="text-gray-500 text-xs">
                Other accounts: adarsh@gmail.com / 12345678
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
