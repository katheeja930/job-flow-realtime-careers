
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useTheme } from "@/context/ThemeContext";
import { toast } from "@/components/ui/use-toast";

const AppearanceSettings = () => {
  const { theme, setTheme } = useTheme();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>
          Customize how the application looks for you.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="theme">Theme</Label>
          <Select 
            value={theme} 
            onValueChange={(value) => {
              setTheme(value as 'light' | 'dark');
              toast({
                title: "Theme updated",
                description: `Theme changed to ${value}.`
              });
            }}
          >
            <SelectTrigger id="theme">
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button
          onClick={() => toast({
            title: "Settings saved",
            description: "Your appearance settings have been updated."
          })}
        >
          Save appearance settings
        </Button>
      </CardContent>
    </Card>
  );
};

export default AppearanceSettings;
