"use client";

import { Package, LogOut, User, Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";

export default function DashboardHeader({ user }) {
  const { logout } = useAuth();

  return (
    <div className="bg-black/50 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4 py-4">
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

          <div className="flex items-center gap-4">
            {/* User Info */}
            <div className="flex items-center gap-2 text-gray-300">
              <User className="w-4 h-4 " />
              <span className="text-sm text-orange-400">{user?.name}</span>
            </div>

            {/* Direct Logout Button */}
            <Button
              onClick={logout}
              variant="outline"
              size="sm"
              className="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
