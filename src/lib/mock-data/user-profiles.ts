
import { JobSeekerProfile, EmployerProfile } from "@/types";

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
