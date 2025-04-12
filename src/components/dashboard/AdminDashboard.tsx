
import DashboardStats from "@/components/dashboard/DashboardStats";
import { ReportData } from "@/types";

interface AdminDashboardProps {
  reportData: ReportData | null;
  isLoading: boolean;
}

const AdminDashboard = ({ reportData, isLoading }: AdminDashboardProps) => {
  return (
    <div className="space-y-8">
      <div className="bg-muted p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-2">Admin Dashboard</h2>
        <p className="text-muted-foreground">
          Monitor platform activity and analyze key metrics.
        </p>
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
