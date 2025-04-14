
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CompanyInfoCard from "./CompanyInfoCard";
import BrandingCard from "./BrandingCard";
import TeamCard from "./TeamCard";

const ProfileTabs = () => {
  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="branding">Branding</TabsTrigger>
        <TabsTrigger value="team">Team</TabsTrigger>
      </TabsList>
      
      <TabsContent value="profile">
        <CompanyInfoCard />
      </TabsContent>
      
      <TabsContent value="branding">
        <BrandingCard />
      </TabsContent>
      
      <TabsContent value="team">
        <TeamCard />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
