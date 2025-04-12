
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getJobListings, getJobApplications, getReportData } from "@/lib/mock-data";
import { JobListing, JobApplication, ReportData } from "@/types";
import LandingPage from "@/components/landing/LandingPage";
import JobSeekerDashboard from "@/components/dashboard/JobSeekerDashboard";
import EmployerDashboard from "@/components/dashboard/EmployerDashboard";
import AdminDashboard from "@/components/dashboard/AdminDashboard";

const Index = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        if (user) {
          // Load role-specific data
          if (user.role === "job_seeker") {
            const [jobsData, applicationsData] = await Promise.all([
              getJobListings(),
              getJobApplications(user.id),
            ]);
            setJobs(jobsData);
            setApplications(applicationsData);
          } else if (user.role === "employer") {
            const jobsData = await getJobListings();
            setJobs(jobsData.filter(job => job.employer_id === user.id));
          } else if (user.role === "admin") {
            const [jobsData, reportData] = await Promise.all([
              getJobListings(),
              getReportData(),
            ]);
            setJobs(jobsData);
            setReportData(reportData);
          }
        } else {
          // Just load jobs for non-logged in users
          const jobsData = await getJobListings();
          setJobs(jobsData);
        }
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [user]);

  // Get applied job IDs for filtering
  const appliedJobIds = applications.map(app => app.job_id);

  if (!user) {
    return <LandingPage jobs={jobs} isLoading={isLoading} />;
  }

  // User is logged in, show role-specific dashboard
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      {user.role === "job_seeker" && (
        <JobSeekerDashboard 
          jobs={jobs} 
          applications={applications} 
          isLoading={isLoading} 
          appliedJobIds={appliedJobIds} 
        />
      )}
      
      {user.role === "employer" && (
        <EmployerDashboard jobs={jobs} isLoading={isLoading} />
      )}
      
      {user.role === "admin" && (
        <AdminDashboard reportData={reportData} isLoading={isLoading} />
      )}
    </div>
  );
};

export default Index;
