
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getJobListings, getJobApplications } from "@/lib/mock-data";
import { JobListing, JobApplication } from "@/types";
import JobList from "@/components/jobs/JobList";

const JobsPage = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        
        const jobsData = await getJobListings();
        setJobs(jobsData);
        
        // If user is logged in as job seeker, get their applications
        if (user && user.role === "job_seeker") {
          const applicationsData = await getJobApplications(user.id);
          setApplications(applicationsData);
        }
      } catch (error) {
        console.error("Error loading jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [user]);

  // Get applied job IDs for filtering
  const appliedJobIds = applications.map(app => app.job_id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Browse Jobs</h1>
        <p className="text-muted-foreground">
          Discover and apply to the latest opportunities
        </p>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-pulse text-center">
            <div className="h-12 w-12 rounded-full bg-primary/20 mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading jobs...</p>
          </div>
        </div>
      ) : (
        <JobList jobs={jobs} appliedJobIds={appliedJobIds} />
      )}
    </div>
  );
};

export default JobsPage;
