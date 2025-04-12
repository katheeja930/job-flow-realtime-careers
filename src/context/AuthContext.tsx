
import React, { createContext, useContext, useEffect, useState } from "react";
import { User, UserRole } from "@/types";
import { toast } from "@/components/ui/use-toast";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string, role: UserRole) => Promise<void>;
  signUp: (email: string, password: string, role: UserRole) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const storedUser = localStorage.getItem("jobflow_user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Failed to parse stored user", error);
        // Clear invalid storage data
        localStorage.removeItem("jobflow_user");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const signIn = async (email: string, password: string, role: UserRole) => {
    try {
      setIsLoading(true);
      
      // Validate inputs
      if (!email || !password) {
        throw new Error("Email and password are required");
      }
      
      // Mock authentication - in a real app, this would be an API call
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        role,
        created_at: new Date().toISOString(),
      };
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      localStorage.setItem("jobflow_user", JSON.stringify(mockUser));
      setUser(mockUser);
      
      toast({
        title: "Sign In Successful",
        description: `Welcome back, ${email}!`,
      });
    } catch (error) {
      console.error("Sign in error:", error);
      toast({
        title: "Sign In Failed",
        description: error instanceof Error ? error.message : "Please check your credentials and try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, role: UserRole) => {
    try {
      setIsLoading(true);
      
      // Validate inputs
      if (!email || !password) {
        throw new Error("Email and password are required");
      }
      
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }
      
      // Mock registration - in a real app, this would be an API call
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        role,
        created_at: new Date().toISOString(),
      };
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      localStorage.setItem("jobflow_user", JSON.stringify(mockUser));
      setUser(mockUser);
      
      toast({
        title: "Registration Successful",
        description: "Your account has been created.",
      });
    } catch (error) {
      console.error("Sign up error:", error);
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      localStorage.removeItem("jobflow_user");
      setUser(null);
      
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
    } catch (error) {
      console.error("Sign out error:", error);
      toast({
        title: "Sign Out Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setIsLoading(true);
      
      if (!email) {
        throw new Error("Email is required");
      }
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Password Reset Email Sent",
        description: "Please check your email for further instructions.",
      });
    } catch (error) {
      console.error("Reset password error:", error);
      toast({
        title: "Password Reset Failed",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
