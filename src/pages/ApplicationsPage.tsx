
import { useEffect, useState } from "react";
import { getJobApplications } from "@/lib/mock-data";
import { JobApplication } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ApplicationCard from "@/components/applications/ApplicationCard";

const ApplicationsPage = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadApplications = async () => {
      if (!user) return;

      try {
        setIsLoading(true);
        const applicationsData = await getJobApplications(user.id);
        setApplications(applicationsData);
      } catch (error) {
        console.error("Error loading applications:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadApplications();
  }, [user]);

  // Filter applications by status
  const pendingApplications = applications.filter(app => app.status === "pending" || app.status === "reviewing");
  const acceptedApplications = applications.filter(app => app.status === "accepted");
  const rejectedApplications = applications.filter(app => app.status === "rejected");

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <div className="animate-pulse text-center">
          <div className="h-12 w-12 rounded-full bg-primary/20 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading applications...</p>
        </div>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Applications</h1>
        <div className="bg-muted p-8 rounded-md text-center">
          <h3 className="text-lg font-medium mb-2">No applications yet</h3>
          <p className="text-muted-foreground">
            When you apply for jobs, they will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Applications</h1>
      
      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All ({applications.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pendingApplications.length})</TabsTrigger>
          <TabsTrigger value="accepted">Accepted ({acceptedApplications.length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({rejectedApplications.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {applications.map(application => (
              <ApplicationCard key={application.id} application={application} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="pending">
          {pendingApplications.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pendingApplications.map(application => (
                <ApplicationCard key={application.id} application={application} />
              ))}
            </div>
          ) : (
            <div className="bg-muted p-8 rounded-md text-center">
              <p className="text-muted-foreground">No pending applications</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="accepted">
          {acceptedApplications.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {acceptedApplications.map(application => (
                <ApplicationCard key={application.id} application={application} />
              ))}
            </div>
          ) : (
            <div className="bg-muted p-8 rounded-md text-center">
              <p className="text-muted-foreground">No accepted applications yet</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="rejected">
          {rejectedApplications.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rejectedApplications.map(application => (
                <ApplicationCard key={application.id} application={application} />
              ))}
            </div>
          ) : (
            <div className="bg-muted p-8 rounded-md text-center">
              <p className="text-muted-foreground">No rejected applications</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApplicationsPage;
