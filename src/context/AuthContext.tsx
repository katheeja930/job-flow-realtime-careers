
import React, { createContext, useContext, useEffect, useState } from "react";
import { User, UserRole } from "@/types";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";

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
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state change", event, session);
        setSession(session);
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            role: (session.user.user_metadata.role as UserRole) || 'job_seeker',
            created_at: session.user.created_at,
          });
        } else {
          setUser(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          role: (session.user.user_metadata.role as UserRole) || 'job_seeker',
          created_at: session.user.created_at,
        });
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string, role: UserRole) => {
    try {
      setIsLoading(true);
      
      // Validate inputs
      if (!email || !password) {
        throw new Error("Email and password are required");
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
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
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role
          }
        }
      });
      
      if (error) throw error;
      
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
      
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
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
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/auth?tab=reset',
      });
      
      if (error) throw error;
      
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
