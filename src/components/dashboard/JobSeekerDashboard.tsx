
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import JobList from "@/components/jobs/JobList";
import { JobListing, JobApplication } from "@/types";

interface JobSeekerDashboardProps {
  jobs: JobListing[];
  applications: JobApplication[];
  isLoading: boolean;
  appliedJobIds: string[];
}

const JobSeekerDashboard = ({ 
  jobs, 
  applications, 
  isLoading, 
  appliedJobIds 
}: JobSeekerDashboardProps) => {
  const navigate = useNavigate();

  return (
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
  );
};

export default JobSeekerDashboard;
