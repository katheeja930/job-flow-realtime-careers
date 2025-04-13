
export type UserRole = "job_seeker" | "employer" | "admin";

export type User = {
  id: string;
  email: string;
  role: UserRole;
  created_at: string;
};

export type JobSeekerProfile = {
  id: string;
  user_id: string;
  full_name: string;
  title: string;
  summary: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  location: string;
  profile_image_url?: string;
  created_at: string;
  updated_at: string;
};

export type Experience = {
  id?: string;
  company: string;
  title: string;
  start_date: string;
  end_date: string | null;
  current: boolean;
  description: string;
};

export type Education = {
  id?: string;
  institution: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date: string | null;
  current: boolean;
};

export type EmployerProfile = {
  id: string;
  user_id: string;
  company_name: string;
  industry: string;
  company_size: string;
  website: string;
  location: string;
  description: string;
  logo_url?: string;
  created_at: string;
  updated_at: string;
};

export type JobListing = {
  id: string;
  employer_id: string;
  title: string;
  description: string;
  location: string;
  job_type: "full_time" | "part_time" | "contract" | "internship" | "remote";
  salary_min?: number;
  salary_max?: number;
  salary_currency?: string;
  requirements: string[];
  responsibilities: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
  company_name: string;
  company_logo_url?: string;
};

export type JobApplication = {
  id: string;
  job_id: string;
  job_seeker_id: string;
  status: "pending" | "reviewing" | "accepted" | "rejected";
  cover_letter?: string;
  resume_url?: string;
  created_at: string;
  updated_at: string;
  job_title?: string;
  company_name?: string;
  applicant_name: string;
  applicant_avatar?: string;
  applied_at: string;
};

export type JobAlert = {
  id: string;
  user_id: string;
  keywords: string[];
  locations: string[];
  job_types: string[];
  salary_min?: number;
  frequency: "daily" | "weekly";
  is_active: boolean;
  created_at: string;
};

export type Notification = {
  id: string;
  user_id: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
  link?: string;
};

export type ReportData = {
  jobPostings: number;
  activeJobs: number;
  totalApplications: number;
  applicationsByStatus: Record<string, number>;
  newUsers: number;
};
