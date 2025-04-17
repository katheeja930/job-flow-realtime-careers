
import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useAuth } from "@/context/AuthContext";
import { ChatbotDrawer } from "@/components/chat/ChatbotDrawer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-center">
          <div className="h-12 w-12 rounded-full bg-primary/70 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      <ChatbotDrawer />
    </div>
  );
};

export default Layout;
