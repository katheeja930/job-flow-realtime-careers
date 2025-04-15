
import { JobApplication, JobListing } from "@/types";
import KanbanColumn from "./KanbanColumn";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

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
    <div className="flex flex-col h-full">
      <div className="flex items-center mb-4 gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search candidates..." 
            className="pl-8 bg-background"
          />
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <span className="mr-2">Total: {applications.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-[calc(100vh-220px)] overflow-hidden">
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
    </div>
  );
};

export default KanbanBoard;
