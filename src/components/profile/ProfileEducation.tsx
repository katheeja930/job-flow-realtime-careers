
import { useState } from "react";
import { format } from "date-fns";
import { Education } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Loader2, CalendarIcon, GraduationCap, Building2, Plus, Pencil, Trash2 } from "lucide-react";

interface ProfileEducationProps {
  education: Education[];
  onSave: (education: Education[]) => Promise<void>;
  isSaving: boolean;
}

const emptyEducation: Education = {
  institution: "",
  degree: "",
  field_of_study: "",
  start_date: "",
  end_date: null,
  current: false
};

const ProfileEducation = ({ education, onSave, isSaving }: ProfileEducationProps) => {
  const [currentEducation, setCurrentEducation] = useState<Education[]>(education);
  const [formData, setFormData] = useState<Education>(emptyEducation);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const resetForm = () => {
    setFormData(emptyEducation);
    setEditingIndex(null);
  };
  
  const handleOpenDialog = (index?: number) => {
    if (index !== undefined) {
      setFormData({ ...currentEducation[index] });
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
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  
  const handleSubmitEducation = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.institution.trim() || !formData.degree.trim() || !formData.field_of_study.trim() || !formData.start_date) {
      return;
    }
    
    // Update or add education
    if (editingIndex !== null) {
      const updatedEducation = [...currentEducation];
      updatedEducation[editingIndex] = formData;
      setCurrentEducation(updatedEducation);
    } else {
      setCurrentEducation(prev => [...prev, formData]);
    }
    
    // Close dialog and reset form
    setIsDialogOpen(false);
    resetForm();
  };
  
  const handleDelete = (index: number) => {
    setCurrentEducation(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleSave = async () => {
    await onSave(currentEducation);
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
              <h3 className="text-lg font-medium">Education</h3>
              <p className="text-sm text-muted-foreground">
                Add your education to showcase your academic background.
              </p>
            </div>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => handleOpenDialog()} size="sm">
                  <Plus className="h-4 w-4 mr-1" /> Add Education
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    {editingIndex !== null ? "Edit Education" : "Add Education"}
                  </DialogTitle>
                </DialogHeader>
                
                <form onSubmit={handleSubmitEducation} className="space-y-4 py-4">
                  <div>
                    <Label htmlFor="institution">Institution *</Label>
                    <Input
                      id="institution"
                      name="institution"
                      value={formData.institution}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Harvard University"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="degree">Degree *</Label>
                    <Input
                      id="degree"
                      name="degree"
                      value={formData.degree}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Bachelor of Science"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="field_of_study">Field of Study *</Label>
                    <Input
                      id="field_of_study"
                      name="field_of_study"
                      value={formData.field_of_study}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Computer Science"
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
                    <Label htmlFor="current">I am currently studying here</Label>
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
            {currentEducation.length > 0 ? (
              currentEducation.map((edu, index) => (
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
                      <GraduationCap className="h-4 w-4 mr-1.5 text-muted-foreground" />
                      {edu.degree} in {edu.field_of_study}
                    </h4>
                    <p className="text-sm flex items-center">
                      <Building2 className="h-4 w-4 mr-1.5 text-muted-foreground" />
                      {edu.institution}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <CalendarIcon className="h-3.5 w-3.5 mr-1.5" />
                      {formatDateDisplay(edu.start_date)} - {edu.current ? "Present" : formatDateDisplay(edu.end_date)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="border rounded-lg p-6 text-center">
                <p className="text-muted-foreground">
                  No education added yet. Click "Add Education" to get started.
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
                "Save Education"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileEducation;
