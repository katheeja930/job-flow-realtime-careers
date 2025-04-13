
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { getJobListings, getJobApplications } from "@/lib/mock-data";
import { JobApplication, JobListing } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckIcon, XIcon, ClockIcon } from "lucide-react";

const EmployerApplicationsPage = () => {
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

  const pendingApplications = applications.filter(app => app.status === "pending");
  const reviewedApplications = applications.filter(app => app.status !== "pending");

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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Application Management</h1>
      
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-pulse text-center">
            <div className="h-12 w-12 rounded-full bg-primary/20 mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading applications...</p>
          </div>
        </div>
      ) : (
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="pending">
              Pending 
              <Badge variant="secondary" className="ml-2">
                {pendingApplications.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="reviewed">
              Reviewed
              <Badge variant="secondary" className="ml-2">
                {reviewedApplications.length}
              </Badge>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending">
            {pendingApplications.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pendingApplications.map(application => (
                  <Card key={application.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Avatar>
                          <AvatarImage src={application.applicant_avatar || ''} />
                          <AvatarFallback>
                            {application.applicant_name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span>{application.applicant_name}</span>
                      </CardTitle>
                      <CardDescription>
                        {getJobTitle(application.job_id)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="line-clamp-3">{application.cover_letter}</p>
                      <div className="flex items-center mt-4">
                        <ClockIcon className="w-4 h-4 mr-1 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Applied on {new Date(application.applied_at).toLocaleDateString()}
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-destructive"
                        onClick={() => handleUpdateStatus(application.id, "rejected")}
                      >
                        <XIcon className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleUpdateStatus(application.id, "accepted")}
                      >
                        <CheckIcon className="w-4 h-4 mr-1" />
                        Accept
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-muted rounded-md">
                <p className="text-muted-foreground">No pending applications</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="reviewed">
            {reviewedApplications.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviewedApplications.map(application => (
                  <Card key={application.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Avatar>
                          <AvatarImage src={application.applicant_avatar || ''} />
                          <AvatarFallback>
                            {application.applicant_name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span>{application.applicant_name}</span>
                      </CardTitle>
                      <CardDescription>
                        {getJobTitle(application.job_id)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="line-clamp-3">{application.cover_letter}</p>
                      <div className="flex items-center mt-4">
                        <Badge 
                          variant={application.status === "accepted" ? "success" : "destructive"}
                          className={application.status === "accepted" ? "bg-green-100 text-green-800" : ""}
                        >
                          {application.status === "accepted" ? "Accepted" : "Rejected"}
                        </Badge>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="w-full"
                      >
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-muted rounded-md">
                <p className="text-muted-foreground">No reviewed applications yet</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default EmployerApplicationsPage;
