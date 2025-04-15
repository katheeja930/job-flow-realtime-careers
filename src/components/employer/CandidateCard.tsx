
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { JobApplication } from "@/types";
import { format } from "date-fns";
import { CheckIcon, XIcon, UserIcon, ExternalLinkIcon, ClockIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CandidateCardProps {
  application: JobApplication;
  jobTitle: string;
  onUpdateStatus: (appId: string, status: "pending" | "reviewing" | "accepted" | "rejected") => void;
}

const CandidateCard = ({ application, jobTitle, onUpdateStatus }: CandidateCardProps) => {
  return (
    <Card className="w-full overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-3">
        <div className="flex items-start gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={application.applicant_avatar || ''} />
            <AvatarFallback className="bg-primary/10">
              {application.applicant_name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm truncate">{application.applicant_name}</h3>
            <div className="flex items-center gap-1 mt-1">
              <Badge variant="outline" className="text-xs font-normal py-0 px-1.5">
                {jobTitle}
              </Badge>
            </div>
            <div className="flex items-center text-xs text-muted-foreground mt-1.5">
              <ClockIcon className="h-3 w-3 mr-1" />
              <span>Applied {format(new Date(application.applied_at), "MMM d")}</span>
            </div>
          </div>
        </div>

        {application.cover_letter && (
          <div className="mt-2 text-xs text-muted-foreground line-clamp-2 pl-11">
            {application.cover_letter.substring(0, 100)}...
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex gap-1 justify-end p-2 bg-muted/20 border-t">
        <Button 
          size="sm" 
          variant="ghost"
          className="h-7 px-2 text-xs"
          onClick={() => window.open(`/candidates/${application.job_seeker_id}`, "_blank")}
        >
          <ExternalLinkIcon className="h-3 w-3 mr-1" />
          Profile
        </Button>
        
        {application.status === "pending" && (
          <Button 
            size="sm" 
            variant="ghost"
            className="h-7 px-2 text-xs"
            onClick={() => onUpdateStatus(application.id, "reviewing")}
          >
            <UserIcon className="h-3 w-3 mr-1" />
            Review
          </Button>
        )}
        
        {application.status === "reviewing" && (
          <>
            <Button 
              size="sm" 
              variant="ghost"
              className="h-7 px-2 text-xs text-green-600"
              onClick={() => onUpdateStatus(application.id, "accepted")}
            >
              <CheckIcon className="h-3 w-3 mr-1" />
              Accept
            </Button>
            <Button 
              size="sm" 
              variant="ghost"
              className="h-7 px-2 text-xs text-red-600"
              onClick={() => onUpdateStatus(application.id, "rejected")}
            >
              <XIcon className="h-3 w-3 mr-1" />
              Reject
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default CandidateCard;
