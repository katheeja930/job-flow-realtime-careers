
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JobApplication } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { CheckCircleIcon, XCircleIcon, ClockIcon, EyeIcon } from "lucide-react";

interface ApplicationCardProps {
  application: JobApplication;
  isEmployer?: boolean;
  onStatusChange?: (applicationId: string, newStatus: "pending" | "reviewing" | "accepted" | "rejected") => void;
}

const ApplicationCard = ({ 
  application, 
  isEmployer = false,
  onStatusChange 
}: ApplicationCardProps) => {
  const getStatusBadge = () => {
    switch (application.status) {
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "reviewing":
        return <Badge variant="primary">Under Review</Badge>;
      case "accepted":
        return <Badge variant="success">Accepted</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = () => {
    switch (application.status) {
      case "pending":
        return <ClockIcon className="h-10 w-10 text-muted-foreground" />;
      case "reviewing":
        return <EyeIcon className="h-10 w-10 text-primary" />;
      case "accepted":
        return <CheckCircleIcon className="h-10 w-10 text-success" />;
      case "rejected":
        return <XCircleIcon className="h-10 w-10 text-destructive" />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-start pb-2">
        <div>
          <CardTitle className="text-lg">{application.job_title}</CardTitle>
          <div className="text-sm text-muted-foreground mt-1">
            {application.company_name}
          </div>
        </div>
        <div className="flex flex-col items-end">
          {getStatusBadge()}
          <div className="text-xs text-muted-foreground mt-2">
            Applied {formatDistanceToNow(new Date(application.created_at), { addSuffix: true })}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="flex items-center justify-center py-4">
          {getStatusIcon()}
        </div>
        {isEmployer && application.cover_letter && (
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-1">Cover Letter</h4>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {application.cover_letter}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link to={`/jobs/${application.job_id}`}>
          <Button variant="outline" size="sm">
            View Job
          </Button>
        </Link>
        
        {isEmployer && onStatusChange && (
          <div className="flex gap-2">
            {application.status === "pending" && (
              <Button 
                size="sm"
                onClick={() => onStatusChange(application.id, "reviewing")}
              >
                Review
              </Button>
            )}
            {application.status === "reviewing" && (
              <>
                <Button 
                  size="sm" 
                  variant="destructive"
                  onClick={() => onStatusChange(application.id, "rejected")}
                >
                  Reject
                </Button>
                <Button 
                  size="sm" 
                  variant="success"
                  onClick={() => onStatusChange(application.id, "accepted")}
                >
                  Accept
                </Button>
              </>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ApplicationCard;
