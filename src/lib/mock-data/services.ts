
import { JobListing, JobApplication } from "@/types";
import { mockJobListings } from './job-listings';
import { mockJobApplications } from './job-applications';
import { mockJobSeekerProfile, mockEmployerProfile } from './user-profiles';
import { mockNotifications } from './notifications';
import { mockReportData } from './report-data';

// Mock service to get job listings
export const getJobListings = () => {
  return Promise.resolve(mockJobListings);
};

// Mock service to get job applications
export const getJobApplications = (userId?: string) => {
  return Promise.resolve(mockJobApplications);
};

// Mock service to get job seeker profile
export const getJobSeekerProfile = (userId: string) => {
  return Promise.resolve(mockJobSeekerProfile);
};

// Mock service to get employer profile
export const getEmployerProfile = (userId: string) => {
  return Promise.resolve(mockEmployerProfile);
};

// Mock service to get notifications
export const getNotifications = (userId: string) => {
  return Promise.resolve(mockNotifications);
};

// Mock service to get admin report data
export const getReportData = () => {
  return Promise.resolve(mockReportData);
};

// Mock service to create a job application
export const createJobApplication = (
  jobId: string, 
  jobSeekerId: string, 
  coverLetter?: string, 
  resumeUrl?: string
) => {
  const job = mockJobListings.find(job => job.id === jobId);
  if (!job) {
    return Promise.reject(new Error("Job not found"));
  }

  const newApplication: JobApplication = {
    id: `app-${Date.now()}`,
    job_id: jobId,
    job_seeker_id: jobSeekerId,
    status: "pending",
    cover_letter: coverLetter,
    resume_url: resumeUrl,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    job_title: job.title,
    company_name: job.company_name,
    applicant_name: "John Doe",
    applicant_avatar: "https://placehold.co/40",
    applied_at: new Date().toISOString()
  };

  // This would normally add to the database
  // For now we just return the new application
  return Promise.resolve(newApplication);
};

// Mock service to update application status
export const updateApplicationStatus = (
  applicationId: string,
  status: "pending" | "reviewing" | "accepted" | "rejected"
) => {
  // This would normally update the database
  return Promise.resolve({
    id: applicationId,
    status,
    updated_at: new Date().toISOString()
  });
};

// Mock service to create a job listing
export const createJobListing = (jobData: Partial<JobListing>, employerId: string) => {
  const newJob: JobListing = {
    id: `job-${Date.now()}`,
    employer_id: employerId,
    title: jobData.title || "Untitled Position",
    description: jobData.description || "",
    location: jobData.location || "Remote",
    job_type: jobData.job_type || "full_time",
    salary_min: jobData.salary_min,
    salary_max: jobData.salary_max,
    salary_currency: jobData.salary_currency || "USD",
    requirements: jobData.requirements || [],
    responsibilities: jobData.responsibilities || [],
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    company_name: mockEmployerProfile.company_name,
    company_logo_url: mockEmployerProfile.logo_url
  };

  // This would normally add to the database
  return Promise.resolve(newJob);
};
