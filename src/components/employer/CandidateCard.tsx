
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { JobApplication } from "@/types";
import { format } from "date-fns";

interface CandidateCardProps {
  application: JobApplication;
  jobTitle: string;
  onUpdateStatus: (appId: string, status: "pending" | "reviewing" | "accepted" | "rejected") => void;
}

const CandidateCard = ({ application, jobTitle, onUpdateStatus }: CandidateCardProps) => {
  return (
    <Card className="mb-3 w-full">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <Avatar>
            <AvatarImage src={application.applicant_avatar || ''} />
            <AvatarFallback>
              {application.applicant_name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h3 className="font-medium">{application.applicant_name}</h3>
            <p className="text-sm text-muted-foreground">{jobTitle}</p>
            <p className="text-xs text-muted-foreground">
              Applied: {format(new Date(application.applied_at), "MMM d, yyyy")}
            </p>
          </div>
        </div>

        {application.cover_letter && (
          <div className="mt-3 text-sm text-muted-foreground line-clamp-2">
            {application.cover_letter.substring(0, 100)}...
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex gap-2 justify-end border-t pt-3">
        <Button 
          size="sm" 
          variant="outline"
          onClick={() => window.open(`/candidates/${application.job_seeker_id}`, "_blank")}
        >
          Profile
        </Button>
        
        {application.status === "pending" && (
          <>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onUpdateStatus(application.id, "reviewing")}
            >
              Review
            </Button>
          </>
        )}
        
        {application.status === "reviewing" && (
          <>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onUpdateStatus(application.id, "accepted")}
            >
              Accept
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              className="text-destructive"
              onClick={() => onUpdateStatus(application.id, "rejected")}
            >
              Reject
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default CandidateCard;
