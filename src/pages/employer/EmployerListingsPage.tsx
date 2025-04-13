
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { getJobListings } from "@/lib/mock-data";
import { JobListing } from "@/types";
import JobCard from "@/components/jobs/JobCard";

const EmployerListingsPage = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const loadJobs = async () => {
      try {
        setIsLoading(true);
        const jobsData = await getJobListings();
        // Filter jobs by the current employer
        if (user) {
          setJobs(jobsData.filter(job => job.employer_id === user.id));
        }
      } catch (error) {
        console.error("Error loading job listings:", error);
        toast({
          title: "Error",
          description: "Failed to load your job listings. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadJobs();
  }, [user, toast]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Job Listings</h1>
        <Button onClick={() => navigate("/employer/listings/new")}>Post a New Job</Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-pulse text-center">
            <div className="h-12 w-12 rounded-full bg-primary/20 mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading listings...</p>
          </div>
        </div>
      ) : jobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard 
              key={job.id} 
              job={job} 
              actions={
                <div className="mt-4 space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/employer/listings/edit/${job.id}`);
                    }}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      toast({
                        title: "Job removed",
                        description: "The job listing has been removed",
                      });
                    }}
                  >
                    Remove
                  </Button>
                </div>
              }
            />
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
  );
};

export default EmployerListingsPage;
