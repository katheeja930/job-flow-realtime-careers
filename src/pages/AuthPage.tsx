
import AuthForm from "@/components/auth/AuthForm";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BriefcaseIcon } from "lucide-react";

const AuthPage = () => {
  const { user } = useAuth();

  // Redirect to dashboard if already logged in
  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-2">
            <BriefcaseIcon className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Welcome to JobFlow</h1>
          <p className="text-muted-foreground mt-2">
            Connect to real-time career opportunities
          </p>
        </div>
        <AuthForm />
      </div>
    </div>
  );
};

export default AuthPage;
