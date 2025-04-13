
import { JobApplication } from "@/types";

// Mock job applications data with applicant details
export const mockJobApplications: JobApplication[] = [
  {
    id: "app-1",
    job_id: "job-1",
    job_seeker_id: "user-1",
    status: "pending",
    cover_letter: "I'm excited to apply for this position...",
    resume_url: "https://example.com/resume1.pdf",
    created_at: "2023-01-20T15:30:00Z",
    updated_at: "2023-01-20T15:30:00Z",
    job_title: "Senior Frontend Developer",
    company_name: "TechCorp Inc.",
    applicant_name: "John Doe",
    applicant_avatar: "https://placehold.co/40",
    applied_at: "2023-01-20T15:30:00Z"
  },
  {
    id: "app-2",
    job_id: "job-3",
    job_seeker_id: "user-1",
    status: "reviewing",
    cover_letter: "I believe my design skills make me a great fit...",
    resume_url: "https://example.com/resume1.pdf",
    created_at: "2023-03-10T09:45:00Z",
    updated_at: "2023-03-12T13:20:00Z",
    job_title: "UX/UI Designer",
    company_name: "Creative Solutions",
    applicant_name: "John Doe",
    applicant_avatar: "https://placehold.co/40",
    applied_at: "2023-03-10T09:45:00Z"
  },
  {
    id: "app-3",
    job_id: "job-5",
    job_seeker_id: "user-1",
    status: "accepted",
    cover_letter: "I'm passionate about product management...",
    resume_url: "https://example.com/resume1.pdf",
    created_at: "2023-05-20T10:15:00Z",
    updated_at: "2023-05-25T14:30:00Z",
    job_title: "Product Manager",
    company_name: "DataFlow Systems",
    applicant_name: "John Doe",
    applicant_avatar: "https://placehold.co/40",
    applied_at: "2023-05-20T10:15:00Z"
  },
  {
    id: "app-4",
    job_id: "job-2",
    job_seeker_id: "user-1",
    status: "rejected",
    cover_letter: "I have extensive experience with backend development...",
    resume_url: "https://example.com/resume1.pdf",
    created_at: "2023-02-25T11:00:00Z",
    updated_at: "2023-03-05T16:45:00Z",
    job_title: "Backend Engineer",
    company_name: "DataFlow Systems",
    applicant_name: "John Doe",
    applicant_avatar: "https://placehold.co/40",
    applied_at: "2023-02-25T11:00:00Z"
  },
];
