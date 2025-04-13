
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useEmployerApplications } from "@/hooks/useEmployerApplications";
import ApplicationsGrid from "@/components/employer/ApplicationsGrid";
import { LoadingState } from "@/components/ui/loading-state";

const EmployerApplicationsPage = () => {
  const { 
    isLoading, 
    pendingApplications, 
    reviewedApplications, 
    getJobTitle, 
    handleUpdateStatus 
  } = useEmployerApplications();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Application Management</h1>
      
      {isLoading ? (
        <LoadingState message="Loading applications..." />
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
            <ApplicationsGrid 
              applications={pendingApplications}
              getJobTitle={getJobTitle}
              onUpdateStatus={handleUpdateStatus}
            />
          </TabsContent>
          
          <TabsContent value="reviewed">
            <ApplicationsGrid 
              applications={reviewedApplications}
              getJobTitle={getJobTitle}
              onUpdateStatus={handleUpdateStatus}
              isReviewed
            />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default EmployerApplicationsPage;
