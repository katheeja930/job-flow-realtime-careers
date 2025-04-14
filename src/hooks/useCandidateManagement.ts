
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { getJobListings, getJobApplications } from "@/lib/mock-data";
import { JobApplication, JobListing } from "@/types";

export const useCandidateManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [jobs, setJobs] = useState<JobListing[]>([]);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [jobFilter, setJobFilter] = useState("all");

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [jobsData, applicationsData] = await Promise.all([
          getJobListings(),
          getJobApplications(),
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
        console.error("Error loading candidate data:", error);
        toast({
          title: "Error",
          description: "Failed to load candidate data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [user, toast]);

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.applicant_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.cover_letter && app.cover_letter.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === "all" ? true : app.status === statusFilter;
    const matchesJob = jobFilter === "all" ? true : app.job_id === jobFilter;
    
    return matchesSearch && matchesStatus && matchesJob;
  });

  const handleUpdateStatus = (appId: string, status: "pending" | "reviewing" | "accepted" | "rejected") => {
    // Update application status (this would be a database call in a real app)
    setApplications(prev => 
      prev.map(app => app.id === appId ? {...app, status} : app)
    );
    
    const statusText = {
      "pending": "pending review",
      "reviewing": "under review",
      "accepted": "accepted",
      "rejected": "rejected"
    };
    
    toast({
      title: `Candidate ${statusText[status]}`,
      description: `The candidate has been marked as ${statusText[status]}.`,
    });
  };

  return {
    isLoading,
    applications,
    jobs,
    searchTerm,
    statusFilter,
    jobFilter,
    filteredApplications,
    setSearchTerm,
    setStatusFilter,
    setJobFilter,
    handleUpdateStatus
  };
};
