
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";

const NotificationSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);

  const handleSaveNotificationSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your notification preferences have been updated."
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>
          Configure how you want to receive notifications.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="email-notifications">Email Notifications</Label>
          <Switch 
            id="email-notifications" 
            checked={emailNotifications}
            onCheckedChange={(checked) => {
              setEmailNotifications(checked);
              toast({
                title: "Email notifications " + (checked ? "enabled" : "disabled"),
                description: "Your notification preferences have been updated."
              });
            }}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="push-notifications">Push Notifications</Label>
          <Switch 
            id="push-notifications" 
            checked={pushNotifications}
            onCheckedChange={(checked) => {
              setPushNotifications(checked);
              toast({
                title: "Push notifications " + (checked ? "enabled" : "disabled"),
                description: "Your notification preferences have been updated."
              });
            }}
          />
        </div>
        
        <Button onClick={handleSaveNotificationSettings}>
          Save notification settings
        </Button>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;
