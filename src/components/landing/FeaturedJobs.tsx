
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import JobList from "@/components/jobs/JobList";
import { JobListing } from "@/types";

interface FeaturedJobsProps {
  jobs: JobListing[];
  isLoading: boolean;
}

const FeaturedJobs = ({ jobs, isLoading }: FeaturedJobsProps) => {
  const navigate = useNavigate();

  return (
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
  );
};

export default FeaturedJobs;
