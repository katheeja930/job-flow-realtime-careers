
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import Layout from "@/components/layout/Layout";
import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";
import JobsPage from "./pages/JobsPage";
import JobDetailPage from "./pages/JobDetailPage";
import ApplicationsPage from "./pages/ApplicationsPage";
import ProfilePage from "./pages/ProfilePage";
import ContactPage from "./pages/ContactPage";
import FAQPage from "./pages/FAQPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsPage from "./pages/TermsPage";
import JobAlertsPage from "./pages/JobAlertsPage";
import NotFound from "./pages/NotFound";

import EmployerListingsPage from "./pages/employer/EmployerListingsPage";
import CreateJobPage from "./pages/employer/CreateJobPage";
import EmployerApplicationsPage from "./pages/employer/EmployerApplicationsPage";
import EmployerProfilePage from "./pages/employer/EmployerProfilePage";
import CandidateManagementPage from "./pages/employer/CandidateManagementPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/jobs" element={<JobsPage />} />
                <Route path="/jobs/:id" element={<JobDetailPage />} />
                <Route path="/applications" element={<ApplicationsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/privacy" element={<PrivacyPolicyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/alerts" element={<JobAlertsPage />} />
                
                <Route path="/employer/listings" element={<EmployerListingsPage />} />
                <Route path="/employer/listings/new" element={<CreateJobPage />} />
                <Route path="/employer/applications" element={<EmployerApplicationsPage />} />
                <Route path="/employer/profile" element={<EmployerProfilePage />} />
                <Route path="/employer/candidates" element={<CandidateManagementPage />} />
                
                <Route path="/admin/analytics" element={<div>Admin Analytics (Coming Soon)</div>} />
                <Route path="/admin/users" element={<div>Admin Users (Coming Soon)</div>} />
                <Route path="/admin/reports" element={<div>Admin Reports (Coming Soon)</div>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
