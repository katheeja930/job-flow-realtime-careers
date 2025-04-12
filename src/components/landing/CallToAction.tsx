
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 container mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold mb-6">
        Ready to Start Your Career Journey?
      </h2>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
        Join thousands of job seekers who have found their perfect role through JobFlow.
      </p>
      <Button size="lg" onClick={() => navigate("/auth")}>
        Create Your Account
      </Button>
    </section>
  );
};

export default CallToAction;
