
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JobApplication } from "@/types";
import { CheckIcon, XIcon, ClockIcon } from "lucide-react";

interface ApplicationCardProps {
  application: JobApplication;
  jobTitle: string;
  onUpdateStatus: (appId: string, status: "accepted" | "rejected") => void;
  isReviewed?: boolean;
}

const ApplicationCard = ({ 
  application, 
  jobTitle, 
  onUpdateStatus,
  isReviewed = false
}: ApplicationCardProps) => {
  return (
    <Card>
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
          {jobTitle}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3">{application.cover_letter}</p>
        {isReviewed ? (
          <div className="flex items-center mt-4">
            <Badge 
              variant={application.status === "accepted" ? "success" : "destructive"}
              className={application.status === "accepted" ? "bg-green-100 text-green-800" : ""}
            >
              {application.status === "accepted" ? "Accepted" : "Rejected"}
            </Badge>
          </div>
        ) : (
          <div className="flex items-center mt-4">
            <ClockIcon className="w-4 h-4 mr-1 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Applied on {new Date(application.applied_at).toLocaleDateString()}
            </span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {isReviewed ? (
          <Button 
            variant="outline" 
            size="sm"
            className="w-full"
          >
            View Details
          </Button>
        ) : (
          <>
            <Button 
              variant="outline" 
              size="sm"
              className="text-destructive"
              onClick={() => onUpdateStatus(application.id, "rejected")}
            >
              <XIcon className="w-4 h-4 mr-1" />
              Reject
            </Button>
            <Button 
              size="sm"
              onClick={() => onUpdateStatus(application.id, "accepted")}
            >
              <CheckIcon className="w-4 h-4 mr-1" />
              Accept
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default ApplicationCard;
