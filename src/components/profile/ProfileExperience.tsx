
import { useState } from "react";
import { format } from "date-fns";
import { Experience } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Loader2, CalendarIcon, Briefcase, Building, Plus, Pencil, Trash2 } from "lucide-react";

interface ProfileExperienceProps {
  experiences: Experience[];
  onSave: (experiences: Experience[]) => Promise<void>;
  isSaving: boolean;
}

const emptyExperience: Experience = {
  company: "",
  title: "",
  start_date: "",
  end_date: null,
  current: false,
  description: ""
};

const ProfileExperience = ({ experiences, onSave, isSaving }: ProfileExperienceProps) => {
  const [currentExperiences, setCurrentExperiences] = useState<Experience[]>(experiences);
  const [formData, setFormData] = useState<Experience>(emptyExperience);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const resetForm = () => {
    setFormData(emptyExperience);
    setEditingIndex(null);
  };
  
  const handleOpenDialog = (index?: number) => {
    if (index !== undefined) {
      setFormData({ ...currentExperiences[index] });
      setEditingIndex(index);
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };
  
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    resetForm();
  };
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCurrentChange = (checked: boolean) => {
    setFormData(prev => ({ 
      ...prev, 
      current: checked,
      end_date: checked ? null : prev.end_date
    }));
  };
  
  const handleSubmitExperience = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.company.trim() || !formData.title.trim() || !formData.start_date) {
      return;
    }
    
    // Update or add experience
    if (editingIndex !== null) {
      const updatedExperiences = [...currentExperiences];
      updatedExperiences[editingIndex] = formData;
      setCurrentExperiences(updatedExperiences);
    } else {
      setCurrentExperiences(prev => [...prev, formData]);
    }
    
    // Close dialog and reset form
    setIsDialogOpen(false);
    resetForm();
  };
  
  const handleDelete = (index: number) => {
    setCurrentExperiences(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleSave = async () => {
    await onSave(currentExperiences);
  };
  
  const formatDateDisplay = (dateStr: string | null) => {
    if (!dateStr) return "";
    try {
      return format(new Date(dateStr), "MMM yyyy");
    } catch {
      return dateStr;
    }
  };
  
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Work Experience</h3>
              <p className="text-sm text-muted-foreground">
                Add your work history to showcase your professional experience.
              </p>
            </div>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => handleOpenDialog()} size="sm">
                  <Plus className="h-4 w-4 mr-1" /> Add Experience
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    {editingIndex !== null ? "Edit Experience" : "Add Experience"}
                  </DialogTitle>
                </DialogHeader>
                
                <form onSubmit={handleSubmitExperience} className="space-y-4 py-4">
                  <div>
                    <Label htmlFor="title">Job Title *</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Software Developer"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="company">Company *</Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Acme Inc."
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="start_date">Start Date *</Label>
                      <Input
                        id="start_date"
                        name="start_date"
                        type="date"
                        value={formData.start_date}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="end_date">End Date</Label>
                      <Input
                        id="end_date"
                        name="end_date"
                        type="date"
                        value={formData.end_date || ""}
                        onChange={handleChange}
                        disabled={formData.current}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="current"
                      checked={formData.current}
                      onCheckedChange={handleCurrentChange}
                    />
                    <Label htmlFor="current">I currently work here</Label>
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description || ""}
                      onChange={handleChange}
                      placeholder="Describe your responsibilities and achievements..."
                      className="mt-1 min-h-[100px]"
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-2 pt-2">
                    <Button type="button" variant="outline" onClick={handleCloseDialog}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingIndex !== null ? "Update" : "Add"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="space-y-4">
            {currentExperiences.length > 0 ? (
              currentExperiences.map((exp, index) => (
                <div key={index} className="border rounded-lg p-4 relative">
                  <div className="absolute right-3 top-3 flex space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleOpenDialog(index)}
                      className="h-8 w-8"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(index)}
                      className="h-8 w-8 text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex flex-col space-y-2 pr-16">
                    <h4 className="font-medium flex items-center">
                      <Briefcase className="h-4 w-4 mr-1.5 text-muted-foreground" />
                      {exp.title}
                    </h4>
                    <p className="text-sm flex items-center">
                      <Building className="h-4 w-4 mr-1.5 text-muted-foreground" />
                      {exp.company}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <CalendarIcon className="h-3.5 w-3.5 mr-1.5" />
                      {formatDateDisplay(exp.start_date)} - {exp.current ? "Present" : formatDateDisplay(exp.end_date)}
                    </p>
                    {exp.description && (
                      <p className="text-sm mt-2 whitespace-pre-line">
                        {exp.description}
                      </p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="border rounded-lg p-6 text-center">
                <p className="text-muted-foreground">
                  No work experience added yet. Click "Add Experience" to get started.
                </p>
              </div>
            )}
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
                "Save Experience"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileExperience;
