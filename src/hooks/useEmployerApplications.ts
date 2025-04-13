
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { getJobListings, getJobApplications } from "@/lib/mock-data";
import { JobApplication, JobListing } from "@/types";

export const useEmployerApplications = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [jobs, setJobs] = useState<JobListing[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [jobsData, applicationsData] = await Promise.all([
          getJobListings(),
          getJobApplications(), // Get all applications
        ]);

        if (user) {
          // Filter jobs by employer
          const employerJobs = jobsData.filter(job => job.employer_id === user.id);
          setJobs(employerJobs);
          
          // Filter applications by employer's jobs
          const jobIds = employerJobs.map(job => job.id);
          const employerApplications = applicationsData.filter(app => 
            jobIds.includes(app.job_id)
          );
          setApplications(employerApplications);
        }
      } catch (error) {
        console.error("Error loading applications:", error);
        toast({
          title: "Error",
          description: "Failed to load applications. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [user, toast]);

  const getJobTitle = (jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    return job ? job.title : "Unknown Position";
  };

  const handleUpdateStatus = (appId: string, status: "accepted" | "rejected") => {
    // Update application status (this would be a database call in a real app)
    setApplications(prev => 
      prev.map(app => app.id === appId ? {...app, status} : app)
    );
    
    toast({
      title: `Application ${status === "accepted" ? "accepted" : "rejected"}`,
      description: `The application has been ${status === "accepted" ? "accepted" : "rejected"} successfully.`,
    });
  };

  return {
    isLoading,
    applications,
    getJobTitle,
    handleUpdateStatus,
    pendingApplications: applications.filter(app => app.status === "pending"),
    reviewedApplications: applications.filter(app => app.status !== "pending"),
  };
};
