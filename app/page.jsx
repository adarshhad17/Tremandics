"use client"

import Link from "next/link"
import { Package, ArrowRight, Shield, Truck, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-5" />

      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Tremandics</h1>
                <p className="text-gray-400 text-sm">Shipping Management</p>
              </div>
            </div>

            <Link href="/login">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                Sign In
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </header>

        {/* Hero Section */}
        <main className="container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6">
              Welcome Back to Tremandics
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              The most advanced shipping management platform for modern businesses. Track, manage, and optimize your
              shipments with real-time updates and intelligent analytics.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link href="/login">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-8 py-3"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>

              <Link href="/register">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-gray-700 text-white hover:bg-gray-800 text-lg px-8 py-3"
                >
                  Create Account
                </Button>
              </Link>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
              <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-blue-500/50 transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Truck className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Real-time Tracking</h3>
                  <p className="text-gray-400">
                    Monitor your shipments with live updates and detailed tracking history.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-purple-500/50 transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Secure Management</h3>
                  <p className="text-gray-400">Enterprise-grade security with role-based access control.</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/50 transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Smart Analytics</h3>
                  <p className="text-gray-400">Gain insights with advanced reporting and performance metrics.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="container mx-auto px-4 py-8 border-t border-gray-800">
          <div className="text-center text-gray-400">
            <p>&copy; 2024 . Built for Tremandics Technical Assessment.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
