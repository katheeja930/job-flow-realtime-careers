
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const CreateJobPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    jobType: "",
    description: "",
    requirements: "",
    benefits: "",
    isFeatured: false,
    isRemote: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would save to the database
    toast({
      title: "Job posted successfully",
      description: "Your job listing has been published.",
    });
    
    // Redirect to listings page
    navigate("/employer/listings");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Create New Job Listing</h1>
        <p className="text-muted-foreground mt-2">
          Fill out the form below to create a new job listing
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Provide the basic details about this position
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g. Senior React Developer"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    id="company"
                    name="company"
                    placeholder="e.g. Acme Inc."
                    value={formData.company}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="e.g. San Francisco, CA"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salary">Salary Range</Label>
                  <Input
                    id="salary"
                    name="salary"
                    placeholder="e.g. $80,000 - $100,000"
                    value={formData.salary}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobType">Job Type</Label>
                  <Select
                    value={formData.jobType}
                    onValueChange={(value) => handleSelectChange("jobType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full_time">Full-time</SelectItem>
                      <SelectItem value="part_time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 flex items-end">
                  <div className="flex flex-col space-y-1 w-full">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="isRemote">Remote Position</Label>
                      <Switch
                        id="isRemote"
                        checked={formData.isRemote}
                        onCheckedChange={(checked) => handleSwitchChange("isRemote", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="isFeatured">Featured Listing</Label>
                      <Switch
                        id="isFeatured"
                        checked={formData.isFeatured}
                        onCheckedChange={(checked) => handleSwitchChange("isFeatured", checked)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
              <CardDescription>
                Provide detailed information about the position
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Job Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe the role, responsibilities, and objectives"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="requirements">Requirements</Label>
                <Textarea
                  id="requirements"
                  name="requirements"
                  placeholder="List the skills, qualifications, and experience required"
                  value={formData.requirements}
                  onChange={handleChange}
                  rows={5}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="benefits">Benefits</Label>
                <Textarea
                  id="benefits"
                  name="benefits"
                  placeholder="Describe the benefits, perks, and incentives"
                  value={formData.benefits}
                  onChange={handleChange}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
          
          <CardFooter className="flex justify-between px-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/employer/listings")}
            >
              Cancel
            </Button>
            <Button type="submit">
              Post Job
            </Button>
          </CardFooter>
        </div>
      </form>
    </div>
  );
};

export default CreateJobPage;
