
import { useState } from "react";

// Define a type for the company data
interface CompanyData {
  name: string;
  industry: string;
  founded: string;
  size: string;
  website: string;
  location: string;
  about: string;
  logo: string;
}

// Create a hook to manage company data
export const useCompanyData = () => {
  // In a real app, this would come from an API or database
  const [companyData, setCompanyData] = useState<CompanyData>({
    name: "Acme Corporation",
    industry: "Technology",
    founded: "2010",
    size: "50-100",
    website: "https://acme.example.com",
    location: "San Francisco, CA",
    about: "Acme Corporation is a leading technology company focused on innovative solutions for businesses. We create cutting-edge software that helps organizations streamline their operations and improve productivity.",
    logo: "https://placehold.co/100"
  });

  return { companyData, setCompanyData };
};
