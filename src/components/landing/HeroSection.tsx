
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Scene3D } from "@/components/visuals/Scene3D";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative text-white py-16">
      {/* 3D Visualization Background */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <Scene3D />
      </div>
      
      {/* Content with semi-transparent overlay for better text readability */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="bg-black/30 py-8 px-6 rounded-xl backdrop-blur-sm">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Discover Your Next Career Opportunity
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
            Connect with top employers and find real-time job opportunities that match your skills and experience.
          </p>
          <div className="flex justify-center">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90"
              onClick={() => navigate("/auth")}
            >
              Find a Job
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
