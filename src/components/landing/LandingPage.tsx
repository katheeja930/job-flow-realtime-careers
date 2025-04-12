
import HeroSection from "./HeroSection";
import FeaturedJobs from "./FeaturedJobs";
import FeaturesSection from "./FeaturesSection";
import CallToAction from "./CallToAction";
import { JobListing } from "@/types";

interface LandingPageProps {
  jobs: JobListing[];
  isLoading: boolean;
}

const LandingPage = ({ jobs, isLoading }: LandingPageProps) => {
  return (
    <div className="min-h-[calc(100vh-160px)]">
      <HeroSection />
      <FeaturedJobs jobs={jobs} isLoading={isLoading} />
      <FeaturesSection />
      <CallToAction />
    </div>
  );
};

export default LandingPage;
