
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

  // This would normally connect to Supabase
  useEffect(() => {
    // Mock: Check if user is already logged in
    const storedUser = localStorage.getItem("jobflow_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user", error);
      }
    }
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string, role: UserRole) => {
    try {
      setIsLoading(true);
      // Mock authentication
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        role,
        created_at: new Date().toISOString(),
      };
      
      localStorage.setItem("jobflow_user", JSON.stringify(mockUser));
      setUser(mockUser);
      toast({
        title: "Sign In Successful",
        description: "Welcome back!",
      });
    } catch (error) {
      console.error("Sign in error:", error);
      toast({
        title: "Sign In Failed",
        description: "Please check your credentials and try again.",
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
      // Mock registration
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        role,
        created_at: new Date().toISOString(),
      };
      
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
        description: "Please try again later.",
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
      // Mock signout
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
      // Mock password reset
      toast({
        title: "Password Reset Email Sent",
        description: "Please check your email for further instructions.",
      });
    } catch (error) {
      console.error("Reset password error:", error);
      toast({
        title: "Password Reset Failed",
        description: "Please try again later.",
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
