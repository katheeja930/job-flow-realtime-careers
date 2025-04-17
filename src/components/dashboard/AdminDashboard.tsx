
import DashboardStats from "@/components/dashboard/DashboardStats";
import { ReportData } from "@/types";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, BarChartIcon, Users, FileText } from "lucide-react";

interface AdminDashboardProps {
  reportData: ReportData | null;
  isLoading: boolean;
}

const AdminDashboard = ({ reportData, isLoading }: AdminDashboardProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-8">
      <div className="bg-muted p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-2">Admin Dashboard</h2>
        <p className="text-muted-foreground">
          Monitor platform activity and analyze key metrics.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-start space-y-0 gap-3">
            <BarChartIcon className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>Platform performance metrics</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">Track user engagement, job applications, and overall platform performance.</p>
            <Button 
              onClick={() => navigate("/admin/analytics")}
              className="w-full"
            >
              View Analytics
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-start space-y-0 gap-3">
            <Users className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <CardTitle>Users</CardTitle>
              <CardDescription>Manage user accounts</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">View and manage job seekers, employers, and administrator accounts.</p>
            <Button 
              onClick={() => navigate("/admin/users")}
              className="w-full"
            >
              Manage Users
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-start space-y-0 gap-3">
            <FileText className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <CardTitle>Reports</CardTitle>
              <CardDescription>Generate custom reports</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">Create custom reports for job metrics, user activity, and platform insights.</p>
            <Button 
              onClick={() => navigate("/admin/reports")}
              className="w-full"
            >
              Create Reports
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-pulse text-center">
            <div className="h-12 w-12 rounded-full bg-primary/20 mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading statistics...</p>
          </div>
        </div>
      ) : reportData ? (
        <DashboardStats data={reportData} />
      ) : (
        <div className="bg-muted p-8 rounded-md text-center">
          <h3 className="text-lg font-medium mb-2">No data available</h3>
          <p className="text-muted-foreground">
            Statistics will appear here as users interact with the platform.
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
