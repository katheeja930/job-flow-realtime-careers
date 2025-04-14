
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCompanyData } from "@/hooks/useCompanyData";

const CompanyInfoCard = () => {
  const { companyData, setCompanyData } = useCompanyData();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    // In a real app, this would save to the database
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your company profile has been updated successfully."
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Company Information</CardTitle>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col items-center">
            <Avatar className="h-32 w-32">
              <AvatarImage src={companyData.logo} alt={companyData.name} />
              <AvatarFallback>{companyData.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            {isEditing && (
              <Button variant="outline" className="mt-4 w-full">
                Change Logo
              </Button>
            )}
          </div>
          
          <div className="space-y-4 flex-1">
            {isEditing ? (
              <EditableForm companyData={companyData} setCompanyData={setCompanyData} />
            ) : (
              <CompanyInfo companyData={companyData} />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const EditableForm = ({ companyData, setCompanyData }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Company Name</Label>
          <Input 
            id="name" 
            value={companyData.name} 
            onChange={(e) => setCompanyData({...companyData, name: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="industry">Industry</Label>
          <Input 
            id="industry" 
            value={companyData.industry} 
            onChange={(e) => setCompanyData({...companyData, industry: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="founded">Founded</Label>
          <Input 
            id="founded" 
            value={companyData.founded} 
            onChange={(e) => setCompanyData({...companyData, founded: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="size">Company Size</Label>
          <Input 
            id="size" 
            value={companyData.size} 
            onChange={(e) => setCompanyData({...companyData, size: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input 
            id="website" 
            value={companyData.website} 
            onChange={(e) => setCompanyData({...companyData, website: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input 
            id="location" 
            value={companyData.location} 
            onChange={(e) => setCompanyData({...companyData, location: e.target.value})}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="about">About Company</Label>
        <Textarea 
          id="about" 
          value={companyData.about} 
          onChange={(e) => setCompanyData({...companyData, about: e.target.value})}
          rows={6}
        />
      </div>
    </>
  );
};

const CompanyInfo = ({ companyData }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Company Name</h3>
          <p>{companyData.name}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Industry</h3>
          <p>{companyData.industry}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Founded</h3>
          <p>{companyData.founded}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Company Size</h3>
          <p>{companyData.size}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Website</h3>
          <p>
            <a 
              href={companyData.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {companyData.website}
            </a>
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
          <p>{companyData.location}</p>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-2">About Company</h3>
        <p className="whitespace-pre-wrap">{companyData.about}</p>
      </div>
    </div>
  );
};

export default CompanyInfoCard;
