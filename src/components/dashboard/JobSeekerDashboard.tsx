import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import JobList from "@/components/jobs/JobList";
import { JobListing, JobApplication } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BotIcon, BookOpenIcon, BriefcaseIcon, LineChartIcon } from "lucide-react";

interface JobSeekerDashboardProps {
  jobs: JobListing[];
  applications: JobApplication[];
  isLoading: boolean;
  appliedJobIds: string[];
}

const JobSeekerDashboard = ({ 
  jobs, 
  applications, 
  isLoading, 
  appliedJobIds 
}: JobSeekerDashboardProps) => {
  const navigate = useNavigate();

  return (
    <Tabs defaultValue="recommendations" className="space-y-8">
      <TabsList>
        <TabsTrigger value="recommendations">Recommended Jobs</TabsTrigger>
        <TabsTrigger value="applications">My Applications</TabsTrigger>
        <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
      </TabsList>
      
      <TabsContent value="recommendations">
        <h2 className="text-2xl font-semibold mb-4">Jobs For You</h2>
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-pulse text-center">
              <div className="h-12 w-12 rounded-full bg-primary/20 mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading jobs...</p>
            </div>
          </div>
        ) : (
          <JobList jobs={jobs} appliedJobIds={appliedJobIds} />
        )}
      </TabsContent>
      
      <TabsContent value="applications">
        <h2 className="text-2xl font-semibold mb-4">My Applications</h2>
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-pulse text-center">
              <div className="h-12 w-12 rounded-full bg-primary/20 mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading applications...</p>
            </div>
          </div>
        ) : applications.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {applications.map((application) => (
              <div key={application.id} className="animate-fade-in">
                {/* Will use ApplicationCard component when created */}
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium">{application.job_title}</h3>
                  <p className="text-sm text-muted-foreground">{application.company_name}</p>
                  <p className="text-sm mt-2">Status: {application.status}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-muted p-8 rounded-md text-center">
            <h3 className="text-lg font-medium mb-2">No applications yet</h3>
            <p className="text-muted-foreground mb-4">
              Start applying to jobs to track your applications here.
            </p>
            <Button onClick={() => navigate("/jobs")}>
              Browse Jobs
            </Button>
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="ai-insights">
        <h2 className="text-2xl font-semibold mb-4">AI-Powered Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-start space-y-0 gap-3">
              <BriefcaseIcon className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <CardTitle>Job Match Analysis</CardTitle>
                <CardDescription>How your profile matches with top jobs</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Based on your skills and experience, you have a strong match with Software Developer roles. Consider highlighting your React and TypeScript experience in applications.</p>
              <Button variant="link" className="p-0 h-auto mt-2">View detailed analysis</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-start space-y-0 gap-3">
              <LineChartIcon className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <CardTitle>Market Trends</CardTitle>
                <CardDescription>Current trends in your industry</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">There's growing demand for professionals with AI/ML knowledge in your field. Companies are also increasingly valuing cloud infrastructure experience.</p>
              <Button variant="link" className="p-0 h-auto mt-2">Explore trends</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-start space-y-0 gap-3">
              <BookOpenIcon className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <CardTitle>Skill Recommendations</CardTitle>
                <CardDescription>Skills to develop for career growth</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Adding knowledge of AWS, Docker, and CI/CD pipelines would significantly enhance your profile attractiveness for senior roles.</p>
              <Button variant="link" className="p-0 h-auto mt-2">View learning resources</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-start space-y-0 gap-3">
              <BotIcon className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <CardTitle>Ask AI Assistant</CardTitle>
                <CardDescription>Get personalized career advice</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">Have questions about job opportunities, interview preparation, or profile optimization?</p>
              <Button className="w-full" onClick={() => document.querySelector<HTMLButtonElement>('[data-open-chatbot]')?.click()}>
                Chat with AI Assistant
              </Button>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default JobSeekerDashboard;
