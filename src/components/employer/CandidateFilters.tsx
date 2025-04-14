
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { JobListing } from "@/types";
import { Button } from "@/components/ui/button";
import { XCircleIcon } from "lucide-react";

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
  const handleClearFilters = () => {
    onSearchChange("");
    onStatusChange("all");
    onJobChange("all");
  };

  const hasActiveFilters = searchTerm !== "" || statusFilter !== "all" || jobFilter !== "all";

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Input
            placeholder="Search candidates..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        
        <div>
          <Select value={statusFilter} onValueChange={onStatusChange}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="reviewing">Under Review</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Select value={jobFilter} onValueChange={onJobChange}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by job" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Jobs</SelectItem>
              {jobs.map((job) => (
                <SelectItem key={job.id} value={job.id}>
                  {job.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {hasActiveFilters && (
        <div className="flex justify-end">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleClearFilters}
            className="flex items-center gap-1"
          >
            <XCircleIcon className="h-4 w-4" />
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default CandidateFilters;
