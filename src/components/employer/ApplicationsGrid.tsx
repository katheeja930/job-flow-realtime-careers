
import { JobApplication } from "@/types";
import ApplicationCard from "./ApplicationCard";

interface ApplicationsGridProps {
  applications: JobApplication[];
  getJobTitle: (jobId: string) => string;
  onUpdateStatus: (appId: string, status: "accepted" | "rejected") => void;
  isReviewed?: boolean;
}

const ApplicationsGrid = ({ 
  applications, 
  getJobTitle, 
  onUpdateStatus,
  isReviewed = false
}: ApplicationsGridProps) => {
  if (applications.length === 0) {
    return (
      <div className="text-center py-12 bg-muted rounded-md">
        <p className="text-muted-foreground">
          {isReviewed 
            ? "No reviewed applications yet" 
            : "No pending applications"
          }
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {applications.map(application => (
        <ApplicationCard
          key={application.id}
          application={application}
          jobTitle={getJobTitle(application.job_id)}
          onUpdateStatus={onUpdateStatus}
          isReviewed={isReviewed}
        />
      ))}
    </div>
  );
};

export default ApplicationsGrid;
