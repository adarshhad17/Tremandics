"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Package,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import Link from "next/link";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const { register } = useAuth();
  const router = useRouter();

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords don't match";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    // Clear errors when user starts typing
    if (error) setError("");
    if (validationErrors[e.target.name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [e.target.name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError("");

    const result = await register(
      formData.name,
      formData.email,
      formData.password
    );

    if (result.success) {
      router.push("/login?message=Registration successful! Please sign in.");
    } else {
      setError(result.error);
    }

    setIsLoading(false);
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
              Create Account
            </CardTitle>
            <p className="text-gray-400 mt-2">Join ShipTracker Pro today</p>
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
              <label className="text-sm font-medium text-gray-300">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500 ${
                    validationErrors.name
                      ? "border-red-500 focus:border-red-500"
                      : ""
                  }`}
                  required
                />
              </div>
              {validationErrors.name && (
                <p className="text-red-400 text-xs flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {validationErrors.name}
                </p>
              )}
            </div>

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
                  className={`pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500 ${
                    validationErrors.email
                      ? "border-red-500 focus:border-red-500"
                      : ""
                  }`}
                  required
                />
              </div>
              {validationErrors.email && (
                <p className="text-red-400 text-xs flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {validationErrors.email}
                </p>
              )}
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
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`pl-10 pr-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500 ${
                    validationErrors.password
                      ? "border-red-500 focus:border-red-500"
                      : ""
                  }`}
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
              {validationErrors.password && (
                <p className="text-red-400 text-xs flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {validationErrors.password}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`pl-10 pr-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500 ${
                    validationErrors.confirmPassword
                      ? "border-red-500 focus:border-red-500"
                      : ""
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {validationErrors.confirmPassword && (
                <p className="text-red-400 text-xs flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {validationErrors.confirmPassword}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-pink-600 hover:from-blue-600 hover:to-pink-700 text-white font-semibold py-2.5 transition-all duration-200 disabled:opacity-50"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-gray-400 text-sm ">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
