
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { JobListing } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { MapPinIcon, ClockIcon, BriefcaseIcon, DollarSignIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface JobCardProps {
  job: JobListing;
  applied?: boolean;
}

const JobCard = ({ job, applied = false }: JobCardProps) => {
  const formatSalary = () => {
    if (!job.salary_min && !job.salary_max) {
      return "Not specified";
    }

    const currency = job.salary_currency || "USD";
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    });

    if (job.salary_min && job.salary_max) {
      return `${formatter.format(job.salary_min)} - ${formatter.format(job.salary_max)}`;
    } else if (job.salary_min) {
      return `From ${formatter.format(job.salary_min)}`;
    } else if (job.salary_max) {
      return `Up to ${formatter.format(job.salary_max)}`;
    }
  };

  const jobTypeMap = {
    full_time: "Full-time",
    part_time: "Part-time",
    contract: "Contract",
    internship: "Internship",
    remote: "Remote",
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <Avatar className="h-12 w-12 rounded-md">
              <AvatarImage src={job.company_logo_url} alt={job.company_name} />
              <AvatarFallback className="rounded-md">
                {job.company_name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg font-semibold">{job.title}</CardTitle>
              <div className="text-sm text-muted-foreground mt-1">
                {job.company_name}
              </div>
            </div>
          </div>
          {applied && (
            <Badge variant="success" className="mt-1">
              Applied
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPinIcon className="h-4 w-4 mr-1" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <BriefcaseIcon className="h-4 w-4 mr-1" />
            <span>{jobTypeMap[job.job_type]}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <DollarSignIcon className="h-4 w-4 mr-1" />
            <span>{formatSalary()}</span>
          </div>
        </div>
        <p className="text-sm line-clamp-2">
          {job.description}
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-2">
        <div className="text-xs text-muted-foreground flex items-center">
          <ClockIcon className="h-3 w-3 mr-1" />
          {formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}
        </div>
        <Link to={`/jobs/${job.id}`}>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
