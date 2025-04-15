
import { useState } from "react";
import { JobListing } from "@/types";
import JobCard from "./JobCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { SearchIcon, FilterIcon } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface JobListProps {
  jobs: JobListing[];
  appliedJobIds?: string[];
}

const JobList = ({ jobs, appliedJobIds = [] }: JobListProps) => {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState<string>("");
  const [minSalary, setMinSalary] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const filteredJobs = jobs.filter((job) => {
    // Filter by search term
    if (
      search &&
      !job.title.toLowerCase().includes(search.toLowerCase()) &&
      !job.description.toLowerCase().includes(search.toLowerCase()) &&
      !job.company_name.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }

    // Filter by location
    if (
      location &&
      !job.location.toLowerCase().includes(location.toLowerCase())
    ) {
      return false;
    }

    // Filter by job type
    if (jobType && job.job_type !== jobType) {
      return false;
    }

    // Filter by minimum salary
    if (minSalary > 0 && (!job.salary_min || job.salary_min < minSalary)) {
      return false;
    }

    return true;
  });

  const clearFilters = () => {
    setSearch("");
    setLocation("");
    setJobType("");
    setMinSalary(0);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <SearchIcon className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
          <Input
            placeholder="Search jobs by title, company or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Sheet open={showFilters} onOpenChange={setShowFilters}>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <FilterIcon className="h-4 w-4" />
                <span>Filters</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Jobs</SheetTitle>
              </SheetHeader>
              <div className="py-6 space-y-6">
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    placeholder="Filter by location..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Job Type</Label>
                  <Select value={jobType} onValueChange={setJobType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="full_time">Full Time</SelectItem>
                      <SelectItem value="part_time">Part Time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Minimum Salary</Label>
                    <span className="text-sm text-muted-foreground">
                      {minSalary > 0 
                        ? new Intl.NumberFormat('en-US', { 
                            style: 'currency', 
                            currency: 'USD',
                            maximumFractionDigits: 0 
                          }).format(minSalary) 
                        : "No minimum"}
                    </span>
                  </div>
                  <Slider
                    defaultValue={[0]}
                    max={200000}
                    step={10000}
                    value={[minSalary]}
                    onValueChange={(values) => setMinSalary(values[0])}
                  />
                </div>
                
                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                  <Button onClick={() => setShowFilters(false)}>
                    Apply Filters
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {filteredJobs.length === 0 ? (
        <div className="bg-muted p-8 rounded-md text-center">
          <h3 className="text-lg font-medium mb-2">No jobs found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters to find more opportunities.
          </p>
          {(search || location || jobType || minSalary > 0) && (
            <Button variant="link" onClick={clearFilters}>
              Clear all filters
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredJobs.map((job) => (
            <JobCard 
              key={job.id} 
              job={job} 
              applied={appliedJobIds?.includes(job.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;
