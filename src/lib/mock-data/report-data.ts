
import { ReportData } from "@/types";

// Admin Report Data
export const mockReportData: ReportData = {
  jobPostings: 42,
  activeJobs: 38,
  totalApplications: 156,
  applicationsByStatus: {
    pending: 78,
    reviewing: 45,
    accepted: 22,
    rejected: 11
  },
  newUsers: 25
};
