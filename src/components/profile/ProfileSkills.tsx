
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, X, Plus } from "lucide-react";

interface ProfileSkillsProps {
  skills: string[];
  onSave: (skills: string[]) => Promise<void>;
  isSaving: boolean;
}

const ProfileSkills = ({ skills, onSave, isSaving }: ProfileSkillsProps) => {
  const [currentSkills, setCurrentSkills] = useState<string[]>(skills);
  const [newSkill, setNewSkill] = useState("");
  
  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    
    // Check if skill already exists
    if (currentSkills.includes(newSkill.trim())) {
      return;
    }
    
    setCurrentSkills(prev => [...prev, newSkill.trim()]);
    setNewSkill("");
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };
  
  const handleRemoveSkill = (skillToRemove: string) => {
    setCurrentSkills(prev => prev.filter(skill => skill !== skillToRemove));
  };
  
  const handleSave = async () => {
    await onSave(currentSkills);
  };
  
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Your Skills</h3>
            <p className="text-sm text-muted-foreground">
              Add skills that showcase your expertise and help employers find you.
            </p>
            
            <div className="flex items-center space-x-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add a skill (e.g. JavaScript)"
                className="flex-1"
              />
              <Button 
                type="button" 
                onClick={handleAddSkill}
                variant="outline"
                size="icon"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div>
            <div className="flex flex-wrap gap-2 min-h-[100px]">
              {currentSkills.length > 0 ? (
                currentSkills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1 text-sm">
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground p-2">
                  No skills added yet. Add some skills to help employers find you.
                </p>
              )}
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button 
              type="button" 
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Skills"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSkills;
