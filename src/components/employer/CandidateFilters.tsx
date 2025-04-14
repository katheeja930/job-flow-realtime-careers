
import { JobListing } from "@/types";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { SearchIcon } from "lucide-react";

interface CandidateFiltersProps {
  jobs: JobListing[];
  searchTerm: string;
  statusFilter: string;
  jobFilter: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onJobChange: (value: string) => void;
}

const CandidateFilters = ({
  jobs,
  searchTerm,
  statusFilter,
  jobFilter,
  onSearchChange,
  onStatusChange,
  onJobChange
}: CandidateFiltersProps) => {
  return (
    <div className="bg-muted/40 p-4 rounded-md space-y-4">
      <h2 className="font-medium text-lg">Filter Candidates</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search candidates..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={onStatusChange}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="reviewing">Under Review</SelectItem>
            <SelectItem value="accepted">Accepted</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={jobFilter} onValueChange={onJobChange}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by job" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Jobs</SelectItem>
            {jobs.map((job) => (
              <SelectItem key={job.id} value={job.id}>
                {job.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default CandidateFilters;
