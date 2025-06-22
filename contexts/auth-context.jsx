"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const savedUser = localStorage.getItem("shiptracker_user");
        const authToken = localStorage.getItem("shiptracker_token");

        if (savedUser && authToken) {
          const userData = JSON.parse(savedUser);
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem("shiptracker_user");
        localStorage.removeItem("shiptracker_token");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const saved = localStorage.getItem("shiptracker_registered_users");
      const registeredUsers = saved ? JSON.parse(saved) : [];

      const validCredentials = [
        {
          email: "admin@gmail.com",
          password: "12345678",
          name: "Admin User",
          role: "admin",
        },
        {
          email: "adarsh@gmail.com",
          password: "12345678",
          name: "Regular User",
          role: "user",
        },
        ...registeredUsers,
      ];

      const validUser = validCredentials.find(
        (cred) => cred.email === email && cred.password === password
      );

      if (validUser) {
        const userData = {
          id: Date.now(),
          name: validUser.name,
          email: validUser.email,
          role: validUser.role,
          loginTime: new Date().toISOString(),
        };

        const authToken = `token_${Date.now()}_${Math.random()
          .toString(36)
          .substr(2, 9)}`;

        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem("shiptracker_user", JSON.stringify(userData));
        localStorage.setItem("shiptracker_token", authToken);

        return { success: true, user: userData };
      } else {
        return {
          success: false,
          error: "Invalid email or password.",
        };
      }
    } catch (error) {
      return {
        success: false,
        error: "Login failed. Please try again.",
      };
    }
  };

  const register = async (name, email, password) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const existing = localStorage.getItem("shiptracker_registered_users");
      const registeredUsers = existing ? JSON.parse(existing) : [];

      if (
        registeredUsers.find((user) => user.email === email) ||
        ["admin@gmail.com", "adarsh@gmail.com"].includes(email)
      ) {
        return {
          success: false,
          error: "Email already exists. Please use a different email.",
        };
      }

      const newUser = { name, email, password, role: "user" };
      registeredUsers.push(newUser);
      localStorage.setItem(
        "shiptracker_registered_users",
        JSON.stringify(registeredUsers)
      );

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: "Registration failed. Please try again.",
      };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("shiptracker_user");
    localStorage.removeItem("shiptracker_token");

    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  };

  const value = {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
