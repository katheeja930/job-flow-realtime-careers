
import { JobApplication, JobListing } from "@/types";
import KanbanColumn from "./KanbanColumn";

interface KanbanBoardProps {
  applications: JobApplication[];
  jobs: JobListing[];
  onUpdateStatus: (appId: string, status: "pending" | "reviewing" | "accepted" | "rejected") => void;
}

const KanbanBoard = ({ applications, jobs, onUpdateStatus }: KanbanBoardProps) => {
  // Group applications by status
  const pendingApplications = applications.filter(app => app.status === "pending");
  const reviewingApplications = applications.filter(app => app.status === "reviewing");
  const acceptedApplications = applications.filter(app => app.status === "accepted");
  const rejectedApplications = applications.filter(app => app.status === "rejected");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-[calc(100vh-220px)]">
      <KanbanColumn
        title="Pending"
        status="pending"
        count={pendingApplications.length}
        applications={pendingApplications}
        jobs={jobs}
        onUpdateStatus={onUpdateStatus}
      />
      
      <KanbanColumn
        title="Under Review"
        status="reviewing"
        count={reviewingApplications.length}
        applications={reviewingApplications}
        jobs={jobs}
        onUpdateStatus={onUpdateStatus}
      />
      
      <KanbanColumn
        title="Accepted"
        status="accepted"
        count={acceptedApplications.length}
        applications={acceptedApplications}
        jobs={jobs}
        onUpdateStatus={onUpdateStatus}
      />
      
      <KanbanColumn
        title="Rejected"
        status="rejected"
        count={rejectedApplications.length}
        applications={rejectedApplications}
        jobs={jobs}
        onUpdateStatus={onUpdateStatus}
      />
    </div>
  );
};

export default KanbanBoard;
