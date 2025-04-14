import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useCandidateManagement } from "@/hooks/useCandidateManagement";
import CandidateFilters from "@/components/employer/CandidateFilters";
import { LoadingState } from "@/components/ui/loading-state";
import KanbanBoard from "@/components/employer/KanbanBoard";
import { Button } from "@/components/ui/button";
import { ViewIcon, KanbanSquareIcon } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";

const CandidateManagementPage = () => {
  const { 
    isLoading,
    applications,
    jobs,
    searchTerm,
    statusFilter,
    jobFilter,
    filteredApplications,
    setSearchTerm,
    setStatusFilter,
    setJobFilter,
    handleUpdateStatus
  } = useCandidateManagement();

  // Add a view toggle state
  const [viewMode, setViewMode] = useState<"kanban" | "list">("kanban");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Candidate Management</h1>
        <div className="flex items-center space-x-2">
          <Button 
            variant={viewMode === "kanban" ? "default" : "outline"} 
            size="sm"
            onClick={() => setViewMode("kanban")}
          >
            <KanbanSquareIcon className="h-4 w-4 mr-2" />
            Kanban
          </Button>
          <Button 
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm" 
            onClick={() => setViewMode("list")}
          >
            <ViewIcon className="h-4 w-4 mr-2" />
            List
          </Button>
        </div>
      </div>
      
      {isLoading ? (
        <LoadingState message="Loading candidates..." />
      ) : (
        <>
          <CandidateFilters 
            jobs={jobs}
            searchTerm={searchTerm}
            statusFilter={statusFilter}
            jobFilter={jobFilter}
            onSearchChange={setSearchTerm}
            onStatusChange={setStatusFilter}
            onJobChange={setJobFilter}
          />
          
          {viewMode === "kanban" ? (
            <div className="mt-6">
              <KanbanBoard 
                applications={filteredApplications} 
                jobs={jobs} 
                onUpdateStatus={handleUpdateStatus} 
              />
            </div>
          ) : (
            <div className="rounded-md border mt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Candidate</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Applied</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.length > 0 ? (
                    filteredApplications.map((application) => {
                      const job = jobs.find(j => j.id === application.job_id);
                      return (
                        <TableRow key={application.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={application.applicant_avatar || ''} />
                                <AvatarFallback>
                                  {application.applicant_name.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{application.applicant_name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {application.cover_letter ? 
                                    application.cover_letter.substring(0, 30) + "..." : 
                                    "No cover letter"}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{job?.title || "Unknown Position"}</TableCell>
                          <TableCell>
                            {format(new Date(application.applied_at), "MMM d, yyyy")}
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={application.status} />
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              {application.status === "pending" && (
                                <>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => handleUpdateStatus(application.id, "accepted")}
                                  >
                                    Accept
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    className="text-destructive"
                                    onClick={() => handleUpdateStatus(application.id, "rejected")}
                                  >
                                    Reject
                                  </Button>
                                </>
                              )}
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => window.open(`/candidates/${application.job_seeker_id}`, "_blank")}
                              >
                                View Profile
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                        No candidates match your current filters
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "pending":
      return <Badge variant="secondary">Pending</Badge>;
    case "reviewing":
      return <Badge variant="primary">Under Review</Badge>;
    case "accepted":
      return <Badge className="bg-green-100 text-green-800">Accepted</Badge>;
    case "rejected":
      return <Badge variant="destructive">Rejected</Badge>;
    default:
      return null;
  }
};

export default CandidateManagementPage;
