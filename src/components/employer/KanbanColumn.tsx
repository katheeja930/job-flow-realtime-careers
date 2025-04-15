
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JobApplication, JobListing } from "@/types";
import CandidateCard from "./CandidateCard";
import { AlertCircle } from "lucide-react";

interface KanbanColumnProps {
  title: string;
  status: string;
  count: number;
  applications: JobApplication[];
  jobs: JobListing[];
  onUpdateStatus: (appId: string, status: "pending" | "reviewing" | "accepted" | "rejected") => void;
}

const KanbanColumn = ({ 
  title, 
  status, 
  count, 
  applications, 
  jobs, 
  onUpdateStatus 
}: KanbanColumnProps) => {
  const getColorClass = () => {
    switch (status) {
      case "pending":
        return "bg-amber-50 border-amber-200";
      case "reviewing":
        return "bg-blue-50 border-blue-200";
      case "accepted":
        return "bg-green-50 border-green-200";
      case "rejected":
        return "bg-red-50 border-red-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const getStatusIconColor = () => {
    switch (status) {
      case "pending":
        return "text-amber-500";
      case "reviewing":
        return "text-blue-500";
      case "accepted":
        return "text-green-500";
      case "rejected":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getJobTitle = (jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    return job ? job.title : "Unknown Position";
  };

  return (
    <Card className={`h-full ${getColorClass()}`}>
      <CardHeader className="pb-2 px-3 pt-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <AlertCircle className={`h-4 w-4 ${getStatusIconColor()}`} />
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
          </div>
          <Badge variant="secondary" className="rounded-full px-2.5 py-0.5 text-xs">
            {count}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="overflow-y-auto p-2 max-h-[calc(100vh-220px)]">
        {applications.length > 0 ? (
          <div className="space-y-2">
            {applications.map(application => (
              <CandidateCard
                key={application.id}
                application={application}
                jobTitle={getJobTitle(application.job_id)}
                onUpdateStatus={onUpdateStatus}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-24 text-sm text-muted-foreground bg-background/50 rounded-md border border-dashed">
            No candidates in this stage
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default KanbanColumn;
