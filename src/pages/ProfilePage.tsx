
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { JobSeekerProfile, Experience, Education } from "@/types";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import ProfileBasicInfo from "@/components/profile/ProfileBasicInfo";
import ProfileExperience from "@/components/profile/ProfileExperience";
import ProfileEducation from "@/components/profile/ProfileEducation";
import ProfileSkills from "@/components/profile/ProfileSkills";
import { Loader2 } from "lucide-react";

const ProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<JobSeekerProfile | null>(null);
  const [activeTab, setActiveTab] = useState("basic");
  
  useEffect(() => {
    // Redirect if not authenticated
    if (!user) {
      navigate("/auth");
      return;
    }
    
    fetchProfile();
  }, [user, navigate]);
  
  const fetchProfile = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      // Check if profile exists
      const { data: profileData, error: profileError } = await supabase
        .from("job_seeker_profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();
        
      if (profileError && profileError.code !== "PGRST116") {
        // Error other than "no rows returned"
        throw profileError;
      }
      
      if (profileData) {
        // Profile exists, fetch related data
        const [skillsResponse, experienceResponse, educationResponse] = await Promise.all([
          supabase.from("skills").select("*").eq("profile_id", profileData.id),
          supabase.from("experiences").select("*").eq("profile_id", profileData.id),
          supabase.from("education").select("*").eq("profile_id", profileData.id)
        ]);
        
        const skills = skillsResponse.data?.map(skill => skill.name) || [];
        const experience = experienceResponse.data || [];
        const education = educationResponse.data || [];
        
        setProfile({
          ...profileData,
          skills,
          experience,
          education
        });
      } else {
        // No profile yet, show empty form
        setProfile(null);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast({
        title: "Error loading profile",
        description: "There was a problem loading your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const saveProfileBasics = async (basicInfo: Partial<JobSeekerProfile>) => {
    if (!user) return;
    
    try {
      setSaving(true);
      
      if (profile?.id) {
        // Update existing profile
        const { error } = await supabase
          .from("job_seeker_profiles")
          .update({
            full_name: basicInfo.full_name,
            title: basicInfo.title,
            summary: basicInfo.summary,
            location: basicInfo.location,
            updated_at: new Date().toISOString()
          })
          .eq("id", profile.id);
          
        if (error) throw error;
        
        setProfile(prev => prev ? { ...prev, ...basicInfo } : null);
        
        toast({
          title: "Profile updated",
          description: "Your profile information has been saved."
        });
      } else {
        // Create new profile
        if (!basicInfo.full_name) {
          toast({
            title: "Missing information",
            description: "Please provide your full name.",
            variant: "destructive"
          });
          return;
        }
        
        const { data, error } = await supabase
          .from("job_seeker_profiles")
          .insert({
            user_id: user.id,
            full_name: basicInfo.full_name || "",
            title: basicInfo.title || null,
            summary: basicInfo.summary || null,
            location: basicInfo.location || null
          })
          .select()
          .single();
          
        if (error) throw error;
        
        setProfile({
          ...data,
          skills: [],
          experience: [],
          education: []
        });
        
        toast({
          title: "Profile created",
          description: "Your profile has been created successfully."
        });
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      toast({
        title: "Error saving profile",
        description: "There was a problem saving your information. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };
  
  const saveSkills = async (skills: string[]) => {
    if (!profile?.id) return;
    
    try {
      setSaving(true);
      
      // Delete existing skills
      await supabase
        .from("skills")
        .delete()
        .eq("profile_id", profile.id);
        
      // Insert new skills
      if (skills.length > 0) {
        const skillsToInsert = skills.map(name => ({
          profile_id: profile.id,
          name
        }));
        
        const { error } = await supabase
          .from("skills")
          .insert(skillsToInsert);
          
        if (error) throw error;
      }
      
      setProfile(prev => prev ? { ...prev, skills } : null);
      
      toast({
        title: "Skills updated",
        description: "Your skills have been saved successfully."
      });
    } catch (error) {
      console.error("Error saving skills:", error);
      toast({
        title: "Error saving skills",
        description: "There was a problem saving your skills. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };
  
  const saveExperience = async (experience: Experience[]) => {
    if (!profile?.id) return;
    
    try {
      setSaving(true);
      
      // Delete existing experience entries
      await supabase
        .from("experiences")
        .delete()
        .eq("profile_id", profile.id);
        
      // Insert new experience entries
      if (experience.length > 0) {
        const experienceToInsert = experience.map(exp => ({
          profile_id: profile.id,
          company: exp.company,
          title: exp.title,
          start_date: exp.start_date,
          end_date: exp.end_date,
          current: exp.current,
          description: exp.description
        }));
        
        const { error } = await supabase
          .from("experiences")
          .insert(experienceToInsert);
          
        if (error) throw error;
      }
      
      setProfile(prev => prev ? { ...prev, experience } : null);
      
      toast({
        title: "Experience updated",
        description: "Your work experience has been saved successfully."
      });
    } catch (error) {
      console.error("Error saving experience:", error);
      toast({
        title: "Error saving experience",
        description: "There was a problem saving your work experience. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };
  
  const saveEducation = async (education: Education[]) => {
    if (!profile?.id) return;
    
    try {
      setSaving(true);
      
      // Delete existing education entries
      await supabase
        .from("education")
        .delete()
        .eq("profile_id", profile.id);
        
      // Insert new education entries
      if (education.length > 0) {
        const educationToInsert = education.map(edu => ({
          profile_id: profile.id,
          institution: edu.institution,
          degree: edu.degree,
          field_of_study: edu.field_of_study,
          start_date: edu.start_date,
          end_date: edu.end_date,
          current: edu.current
        }));
        
        const { error } = await supabase
          .from("education")
          .insert(educationToInsert);
          
        if (error) throw error;
      }
      
      setProfile(prev => prev ? { ...prev, education } : null);
      
      toast({
        title: "Education updated",
        description: "Your education has been saved successfully."
      });
    } catch (error) {
      console.error("Error saving education:", error);
      toast({
        title: "Error saving education",
        description: "There was a problem saving your education. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
        <p className="text-muted-foreground">
          Complete your profile to stand out to employers
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="sticky top-16 z-10 bg-background pb-2">
          <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 gap-2">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="skills" disabled={!profile?.id}>Skills</TabsTrigger>
            <TabsTrigger value="experience" disabled={!profile?.id}>Experience</TabsTrigger>
            <TabsTrigger value="education" disabled={!profile?.id}>Education</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="basic">
          <ProfileBasicInfo
            profile={profile}
            onSave={saveProfileBasics}
            isSaving={saving}
          />
        </TabsContent>
        
        <TabsContent value="skills">
          <ProfileSkills
            skills={profile?.skills || []}
            onSave={saveSkills}
            isSaving={saving}
          />
        </TabsContent>
        
        <TabsContent value="experience">
          <ProfileExperience
            experiences={profile?.experience || []}
            onSave={saveExperience}
            isSaving={saving}
          />
        </TabsContent>
        
        <TabsContent value="education">
          <ProfileEducation
            education={profile?.education || []}
            onSave={saveEducation}
            isSaving={saving}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;
