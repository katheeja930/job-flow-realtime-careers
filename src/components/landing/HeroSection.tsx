
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-r from-primary/80 to-primary text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Discover Your Next Career Opportunity
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
          Connect with top employers and find real-time job opportunities that match your skills and experience.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-white/90"
            onClick={() => navigate("/auth")}
          >
            Find a Job
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white/10"
            onClick={() => navigate("/auth")}
          >
            For Employers
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
