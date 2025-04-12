
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { getJobListings, getJobApplications, getReportData } from "@/lib/mock-data";
import JobList from "@/components/jobs/JobList";
import DashboardStats from "@/components/dashboard/DashboardStats";
import { JobListing, JobApplication, ReportData } from "@/types";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
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
    return (
      <div className="min-h-[calc(100vh-160px)]">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/80 to-primary text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Discover Your Next Career Opportunity
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
              Connect with top employers and find real-time job opportunities that match your skills and experience.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90"
                onClick={() => navigate("/auth")}
              >
                Find a Job
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                onClick={() => navigate("/auth")}
              >
                For Employers
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Jobs Section */}
        <section className="py-16 container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Featured Job Opportunities
          </h2>
          {isLoading ? (
            <div className="flex justify-center">
              <div className="animate-pulse text-center">
                <div className="h-12 w-12 rounded-full bg-primary/20 mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading jobs...</p>
              </div>
            </div>
          ) : (
            <JobList jobs={jobs.slice(0, 3)} />
          )}
          <div className="mt-8 text-center">
            <Button onClick={() => navigate("/auth")}>
              View All Jobs
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Why Choose JobFlow
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-card rounded-lg shadow-sm">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-8 h-8 text-primary"
                  >
                    <path d="m12 14 4-4" />
                    <path d="M3.34 19a10 10 0 1 1 17.32 0" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Real-Time Updates</h3>
                <p className="text-muted-foreground">
                  Get instant notifications for application updates and new job matches.
                </p>
              </div>
              <div className="text-center p-6 bg-card rounded-lg shadow-sm">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-8 h-8 text-primary"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="m8 12 3 3 5-5" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Verified Employers</h3>
                <p className="text-muted-foreground">
                  All employers on our platform are verified to ensure legitimate opportunities.
                </p>
              </div>
              <div className="text-center p-6 bg-card rounded-lg shadow-sm">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-8 h-8 text-primary"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <path d="M12 17h.01" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">AI-Powered Support</h3>
                <p className="text-muted-foreground">
                  Get personalized job recommendations and career insights with our AI chatbot.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start Your Career Journey?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of job seekers who have found their perfect role through JobFlow.
          </p>
          <Button size="lg" onClick={() => navigate("/auth")}>
            Create Your Account
          </Button>
        </section>
      </div>
    );
  }

  // User is logged in, show role-specific dashboard
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      {user.role === "job_seeker" && (
        <Tabs defaultValue="recommendations" className="space-y-8">
          <TabsList>
            <TabsTrigger value="recommendations">Recommended Jobs</TabsTrigger>
            <TabsTrigger value="applications">My Applications</TabsTrigger>
          </TabsList>
          <TabsContent value="recommendations">
            <h2 className="text-2xl font-semibold mb-4">Jobs For You</h2>
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
          </TabsContent>
          <TabsContent value="applications">
            <h2 className="text-2xl font-semibold mb-4">My Applications</h2>
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-pulse text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/20 mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Loading applications...</p>
                </div>
              </div>
            ) : applications.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {applications.map((application) => (
                  <div key={application.id} className="animate-fade-in">
                    {/* Will use ApplicationCard component when created */}
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium">{application.job_title}</h3>
                      <p className="text-sm text-muted-foreground">{application.company_name}</p>
                      <p className="text-sm mt-2">Status: {application.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-muted p-8 rounded-md text-center">
                <h3 className="text-lg font-medium mb-2">No applications yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start applying to jobs to track your applications here.
                </p>
                <Button onClick={() => navigate("/jobs")}>
                  Browse Jobs
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}
      
      {user.role === "employer" && (
        <div className="space-y-8">
          <div className="bg-muted p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">Employer Dashboard</h2>
            <p className="text-muted-foreground">
              Manage your job listings and review applications from qualified candidates.
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              <Button onClick={() => navigate("/employer/listings/new")}>
                Post a New Job
              </Button>
              <Button variant="outline" onClick={() => navigate("/employer/applications")}>
                Review Applications
              </Button>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Your Job Listings</h2>
              <Button variant="outline" size="sm" onClick={() => navigate("/employer/listings")}>
                View All
              </Button>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-pulse text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/20 mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Loading listings...</p>
                </div>
              </div>
            ) : jobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {jobs.slice(0, 3).map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="bg-muted p-8 rounded-md text-center">
                <h3 className="text-lg font-medium mb-2">No job listings yet</h3>
                <p className="text-muted-foreground mb-4">
                  Post your first job to start receiving applications.
                </p>
                <Button onClick={() => navigate("/employer/listings/new")}>
                  Post a Job
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
      
      {user.role === "admin" && (
        <div className="space-y-8">
          <div className="bg-muted p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">Admin Dashboard</h2>
            <p className="text-muted-foreground">
              Monitor platform activity and analyze key metrics.
            </p>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-pulse text-center">
                <div className="h-12 w-12 rounded-full bg-primary/20 mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading statistics...</p>
              </div>
            </div>
          ) : reportData ? (
            <DashboardStats data={reportData} />
          ) : (
            <div className="bg-muted p-8 rounded-md text-center">
              <h3 className="text-lg font-medium mb-2">No data available</h3>
              <p className="text-muted-foreground">
                Statistics will appear here as users interact with the platform.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Index;
