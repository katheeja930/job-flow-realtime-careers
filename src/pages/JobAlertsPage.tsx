
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { BellRing, X, Plus } from "lucide-react";

const JobAlertsPage = () => {
  const { user } = useAuth();
  const [jobAlerts, setJobAlerts] = useState([
    {
      id: "1",
      title: "Software Developer",
      location: "San Francisco, CA",
      frequency: "daily",
      enabled: true,
      keywords: ["React", "JavaScript", "TypeScript"]
    },
    {
      id: "2",
      title: "UX Designer",
      location: "Remote",
      frequency: "weekly",
      enabled: false,
      keywords: ["Figma", "UI/UX", "Wireframing"]
    }
  ]);
  
  const [isCreating, setIsCreating] = useState(false);
  const [newAlert, setNewAlert] = useState({
    title: "",
    location: "",
    frequency: "daily",
    enabled: true,
    keywords: [] as string[]
  });
  const [newKeyword, setNewKeyword] = useState("");
  
  const toggleAlertStatus = (id: string) => {
    setJobAlerts(jobAlerts.map(alert => 
      alert.id === id ? { ...alert, enabled: !alert.enabled } : alert
    ));
    
    toast({
      title: "Alert status updated",
      description: "Your job alert preferences have been saved."
    });
  };
  
  const deleteAlert = (id: string) => {
    setJobAlerts(jobAlerts.filter(alert => alert.id !== id));
    
    toast({
      title: "Alert deleted",
      description: "Your job alert has been removed."
    });
  };
  
  const addKeyword = () => {
    if (!newKeyword.trim()) return;
    
    if (newAlert.keywords.includes(newKeyword.trim())) {
      toast({
        title: "Keyword already exists",
        description: "This keyword is already in your alert.",
        variant: "destructive"
      });
      return;
    }
    
    setNewAlert({
      ...newAlert,
      keywords: [...newAlert.keywords, newKeyword.trim()]
    });
    setNewKeyword("");
  };
  
  const removeKeyword = (keyword: string) => {
    setNewAlert({
      ...newAlert,
      keywords: newAlert.keywords.filter(k => k !== keyword)
    });
  };
  
  const handleCreateAlert = () => {
    if (!newAlert.title.trim()) {
      toast({
        title: "Title required",
        description: "Please add a title for your job alert.",
        variant: "destructive"
      });
      return;
    }
    
    const newId = (jobAlerts.length + 1).toString();
    setJobAlerts([...jobAlerts, { ...newAlert, id: newId }]);
    
    // Reset form
    setNewAlert({
      title: "",
      location: "",
      frequency: "daily",
      enabled: true,
      keywords: []
    });
    setIsCreating(false);
    
    toast({
      title: "Alert created",
      description: "Your new job alert has been created successfully."
    });
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addKeyword();
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Job Alerts</h1>
        <p className="text-muted-foreground">
          Create and manage job alerts to stay updated on new opportunities
        </p>
      </div>
      
      {!user ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <BellRing className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">Sign in to create job alerts</h2>
              <p className="text-muted-foreground mb-4">
                Create customized job alerts to get notified when new jobs match your criteria
              </p>
              <Button asChild>
                <a href="/auth">Sign In</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Your Job Alerts</h2>
            {!isCreating && (
              <Button onClick={() => setIsCreating(true)}>
                <Plus className="h-4 w-4 mr-2" /> Create Alert
              </Button>
            )}
          </div>
          
          {isCreating && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>New Job Alert</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Job Title *</Label>
                    <Input 
                      id="title" 
                      value={newAlert.title}
                      onChange={(e) => setNewAlert({...newAlert, title: e.target.value})}
                      placeholder="e.g. Software Developer" 
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location" 
                      value={newAlert.location}
                      onChange={(e) => setNewAlert({...newAlert, location: e.target.value})}
                      placeholder="e.g. San Francisco, CA" 
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="frequency">Frequency</Label>
                    <Select 
                      value={newAlert.frequency}
                      onValueChange={(value) => setNewAlert({...newAlert, frequency: value})}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="biweekly">Bi-weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="keywords">Keywords</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Input
                        id="keywords"
                        value={newKeyword}
                        onChange={(e) => setNewKeyword(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Add a keyword (e.g. JavaScript)"
                        className="flex-1"
                      />
                      <Button 
                        type="button" 
                        onClick={addKeyword}
                        variant="outline"
                        size="sm"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-3">
                      {newAlert.keywords.length > 0 ? (
                        newAlert.keywords.map((keyword, index) => (
                          <Badge key={index} variant="secondary" className="px-3 py-1 text-sm">
                            {keyword}
                            <button
                              type="button"
                              onClick={() => removeKeyword(keyword)}
                              className="ml-2 text-muted-foreground hover:text-foreground"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          No keywords added yet. Keywords help match your alert with relevant jobs.
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-2">
                    <Switch
                      id="enabled"
                      checked={newAlert.enabled}
                      onCheckedChange={(checked) => setNewAlert({...newAlert, enabled: checked})}
                    />
                    <Label htmlFor="enabled">Enable this alert</Label>
                  </div>
                  
                  <div className="flex justify-end space-x-2 pt-2">
                    <Button variant="outline" onClick={() => setIsCreating(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateAlert}>
                      Create Alert
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {jobAlerts.length > 0 ? (
            <div className="space-y-4">
              {jobAlerts.map((alert) => (
                <Card key={alert.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-lg">{alert.title}</h3>
                        {alert.location && (
                          <p className="text-sm text-muted-foreground">
                            {alert.location}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-2 mt-2">
                          {alert.keywords.map((keyword, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Frequency: {alert.frequency.charAt(0).toUpperCase() + alert.frequency.slice(1)}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`toggle-${alert.id}`}
                            checked={alert.enabled}
                            onCheckedChange={() => toggleAlertStatus(alert.id)}
                          />
                          <Label htmlFor={`toggle-${alert.id}`} className="text-sm">
                            {alert.enabled ? "Enabled" : "Disabled"}
                          </Label>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteAlert(alert.id)}
                          className="text-destructive h-8 w-8"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <BellRing className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No alerts yet</h3>
                <p className="text-muted-foreground mb-4">
                  Create your first job alert to get notified when new jobs match your criteria
                </p>
                {!isCreating && (
                  <Button onClick={() => setIsCreating(true)}>
                    Create Your First Alert
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default JobAlertsPage;
