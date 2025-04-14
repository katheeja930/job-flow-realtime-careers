
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JobApplication, JobListing } from "@/types";
import CandidateCard from "./CandidateCard";

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

  const getJobTitle = (jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    return job ? job.title : "Unknown Position";
  };

  return (
    <Card className={`h-full ${getColorClass()}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          <Badge variant="secondary">{count}</Badge>
        </div>
      </CardHeader>
      <CardContent className="overflow-y-auto max-h-[calc(100vh-200px)]">
        {applications.length > 0 ? (
          applications.map(application => (
            <CandidateCard
              key={application.id}
              application={application}
              jobTitle={getJobTitle(application.job_id)}
              onUpdateStatus={onUpdateStatus}
            />
          ))
        ) : (
          <p className="text-center py-8 text-muted-foreground">
            No candidates in this stage
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default KanbanColumn;
