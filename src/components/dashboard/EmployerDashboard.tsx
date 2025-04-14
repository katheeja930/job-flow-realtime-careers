
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import JobCard from "@/components/jobs/JobCard";
import { JobListing } from "@/types";

interface EmployerDashboardProps {
  jobs: JobListing[];
  isLoading: boolean;
}

const EmployerDashboard = ({ jobs, isLoading }: EmployerDashboardProps) => {
  const navigate = useNavigate();
  
  return (
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
          <Button variant="outline" onClick={() => navigate("/employer/candidates")}>
            Manage Candidates
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
  );
};

export default EmployerDashboard;
