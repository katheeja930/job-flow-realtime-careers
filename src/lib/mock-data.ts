
import { JobListing, JobApplication, JobSeekerProfile, EmployerProfile, Notification, ReportData } from "@/types";

// Job Listings Data
export const mockJobListings: JobListing[] = [
  {
    id: "job-1",
    employer_id: "emp-1",
    title: "Senior Frontend Developer",
    description: "We are looking for an experienced Frontend Developer to join our team. You will be responsible for building user interfaces for our web applications.",
    location: "San Francisco, CA",
    job_type: "full_time",
    salary_min: 120000,
    salary_max: 160000,
    salary_currency: "USD",
    requirements: [
      "5+ years of experience with React",
      "Strong knowledge of JavaScript/TypeScript",
      "Experience with modern frontend frameworks",
      "Understanding of responsive design principles",
    ],
    responsibilities: [
      "Develop user interfaces using React and TypeScript",
      "Collaborate with backend developers to integrate APIs",
      "Optimize applications for maximum performance",
      "Implement responsive design principles",
    ],
    is_active: true,
    created_at: "2023-01-15T08:00:00Z",
    updated_at: "2023-01-15T08:00:00Z",
    company_name: "TechCorp Inc.",
    company_logo_url: "https://placehold.co/40",
  },
  {
    id: "job-2",
    employer_id: "emp-2",
    title: "Backend Engineer",
    description: "Join our backend team to build scalable and efficient systems. You'll work on building APIs, optimizing database queries, and ensuring high performance.",
    location: "Seattle, WA",
    job_type: "full_time",
    salary_min: 130000,
    salary_max: 170000,
    salary_currency: "USD",
    requirements: [
      "3+ years experience with Node.js or Python",
      "Experience with SQL and NoSQL databases",
      "Knowledge of API design and development",
      "Understanding of microservices architecture",
    ],
    responsibilities: [
      "Design and implement RESTful APIs",
      "Optimize database queries for performance",
      "Implement authentication and authorization systems",
      "Write clean, maintainable, and well-tested code",
    ],
    is_active: true,
    created_at: "2023-02-20T10:30:00Z",
    updated_at: "2023-02-20T10:30:00Z",
    company_name: "DataFlow Systems",
    company_logo_url: "https://placehold.co/40",
  },
  {
    id: "job-3",
    employer_id: "emp-3",
    title: "UX/UI Designer",
    description: "We're seeking a talented UX/UI Designer to create beautiful, intuitive interfaces for our products. You'll work closely with product managers and developers.",
    location: "Remote",
    job_type: "full_time",
    salary_min: 90000,
    salary_max: 120000,
    salary_currency: "USD",
    requirements: [
      "3+ years of UX/UI design experience",
      "Proficiency with design tools (Figma, Sketch)",
      "Portfolio showcasing design projects",
      "Understanding of user-centered design principles",
    ],
    responsibilities: [
      "Create wireframes, prototypes, and high-fidelity designs",
      "Conduct user research and usability testing",
      "Collaborate with developers to implement designs",
      "Maintain and evolve our design system",
    ],
    is_active: true,
    created_at: "2023-03-05T09:15:00Z",
    updated_at: "2023-03-05T09:15:00Z",
    company_name: "Creative Solutions",
    company_logo_url: "https://placehold.co/40",
  },
  {
    id: "job-4",
    employer_id: "emp-1",
    title: "DevOps Engineer",
    description: "Looking for a DevOps Engineer to help us build and maintain our cloud infrastructure. You'll work on CI/CD pipelines, infrastructure as code, and monitoring systems.",
    location: "New York, NY",
    job_type: "full_time",
    salary_min: 140000,
    salary_max: 180000,
    salary_currency: "USD",
    requirements: [
      "3+ years of DevOps experience",
      "Strong knowledge of AWS or Azure",
      "Experience with Docker and Kubernetes",
      "Familiarity with Infrastructure as Code (Terraform, CloudFormation)",
    ],
    responsibilities: [
      "Implement and maintain CI/CD pipelines",
      "Manage cloud infrastructure using IaC",
      "Set up monitoring and alerting systems",
      "Automate deployment processes",
    ],
    is_active: true,
    created_at: "2023-04-10T14:20:00Z",
    updated_at: "2023-04-10T14:20:00Z",
    company_name: "TechCorp Inc.",
    company_logo_url: "https://placehold.co/40",
  },
  {
    id: "job-5",
    employer_id: "emp-2",
    title: "Product Manager",
    description: "Join our team as a Product Manager to lead product development from conception to launch. You'll work with cross-functional teams to deliver high-quality products.",
    location: "Boston, MA",
    job_type: "full_time",
    salary_min: 110000,
    salary_max: 150000,
    salary_currency: "USD",
    requirements: [
      "3+ years of product management experience",
      "Experience with Agile methodologies",
      "Strong analytical and problem-solving skills",
      "Excellent communication skills",
    ],
    responsibilities: [
      "Define product vision, strategy, and roadmap",
      "Work with engineering, design, and marketing teams",
      "Gather and analyze user feedback",
      "Prioritize features and improvements",
    ],
    is_active: true,
    created_at: "2023-05-15T11:45:00Z",
    updated_at: "2023-05-15T11:45:00Z",
    company_name: "DataFlow Systems",
    company_logo_url: "https://placehold.co/40",
  },
];

// Job Applications Data
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
    company_name: "TechCorp Inc."
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
    company_name: "Creative Solutions"
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
    company_name: "DataFlow Systems"
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
    company_name: "DataFlow Systems"
  },
];

// Job Seeker Profile
export const mockJobSeekerProfile: JobSeekerProfile = {
  id: "profile-1",
  user_id: "user-1",
  full_name: "Alex Johnson",
  title: "Senior Frontend Developer",
  summary: "Experienced frontend developer with a passion for creating intuitive user interfaces using React and TypeScript.",
  skills: ["React", "TypeScript", "JavaScript", "HTML", "CSS", "Redux", "GraphQL"],
  experience: [
    {
      id: "exp-1",
      company: "TechStart Inc.",
      title: "Frontend Developer",
      start_date: "2020-03-01",
      end_date: null,
      current: true,
      description: "Leading frontend development for a SaaS application. Responsible for implementing new features and improving performance."
    },
    {
      id: "exp-2",
      company: "WebSolutions Ltd.",
      title: "Junior Developer",
      start_date: "2018-06-01",
      end_date: "2020-02-28",
      current: false,
      description: "Worked on various client projects, primarily using React and JavaScript."
    }
  ],
  education: [
    {
      id: "edu-1",
      institution: "University of Technology",
      degree: "Bachelor of Science",
      field_of_study: "Computer Science",
      start_date: "2014-09-01",
      end_date: "2018-05-30",
      current: false
    }
  ],
  location: "San Francisco, CA",
  profile_image_url: "https://placehold.co/150",
  created_at: "2023-01-10T08:30:00Z",
  updated_at: "2023-06-15T14:20:00Z"
};

// Employer Profile
export const mockEmployerProfile: EmployerProfile = {
  id: "emp-profile-1",
  user_id: "emp-user-1",
  company_name: "TechCorp Inc.",
  industry: "Technology",
  company_size: "50-200",
  website: "https://techcorp-example.com",
  location: "San Francisco, CA",
  description: "TechCorp is a leading software development company specializing in web and mobile applications for enterprise clients.",
  logo_url: "https://placehold.co/150",
  created_at: "2022-11-05T09:20:00Z",
  updated_at: "2023-05-12T11:15:00Z"
};

// Notifications
export const mockNotifications: Notification[] = [
  {
    id: "notif-1",
    user_id: "user-1",
    title: "Application Status Update",
    message: "Your application for Product Manager at DataFlow Systems has been accepted!",
    is_read: false,
    created_at: "2023-05-25T14:30:00Z",
    link: "/applications"
  },
  {
    id: "notif-2",
    user_id: "user-1",
    title: "New Job Match",
    message: "We found a new Frontend Developer position that matches your profile!",
    is_read: true,
    created_at: "2023-06-10T09:45:00Z",
    link: "/jobs/job-new"
  },
  {
    id: "notif-3",
    user_id: "user-1",
    title: "Profile Reminder",
    message: "Complete your profile to improve your job matches.",
    is_read: false,
    created_at: "2023-06-18T16:20:00Z",
    link: "/profile"
  }
];

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

// Mock service to get job listings
export const getJobListings = () => {
  return Promise.resolve(mockJobListings);
};

// Mock service to get job applications
export const getJobApplications = (userId: string) => {
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
    company_name: job.company_name
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
