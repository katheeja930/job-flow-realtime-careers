
import { useAuth } from "@/context/AuthContext";
import ProfileTabs from "@/components/employer/profile/ProfileTabs";

const EmployerProfilePage = () => {
  const { user } = useAuth();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Company Profile</h1>
      <ProfileTabs />
    </div>
  );
};

export default EmployerProfilePage;
