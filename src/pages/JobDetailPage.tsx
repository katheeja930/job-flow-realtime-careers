
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { getJobListings, createJobApplication, getJobApplications } from "@/lib/mock-data";
import { JobListing, JobApplication } from "@/types";
import { 
  MapPinIcon, 
  ClockIcon, 
  BriefcaseIcon, 
  DollarSignIcon,
  BuildingIcon,
  GlobeIcon,
  CheckCircleIcon
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const JobDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [job, setJob] = useState<JobListing | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [coverLetter, setCoverLetter] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [application, setApplication] = useState<JobApplication | null>(null);

  useEffect(() => {
    const loadJob = async () => {
      try {
        setIsLoading(true);
        const jobs = await getJobListings();
        const foundJob = jobs.find(j => j.id === id);
        
        if (foundJob) {
          setJob(foundJob);
          
          // Check if user has already applied
          if (user && user.role === "job_seeker") {
            const applications = await getJobApplications(user.id);
            const existingApplication = applications.find(app => app.job_id === id);
            
            if (existingApplication) {
              setHasApplied(true);
              setApplication(existingApplication);
            }
          }
        } else {
          toast({
            title: "Job Not Found",
            description: "The job listing you're looking for doesn't exist.",
            variant: "destructive",
          });
          navigate("/jobs");
        }
      } catch (error) {
        console.error("Error loading job:", error);
        toast({
          title: "Error",
          description: "Failed to load job details. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadJob();
  }, [id, navigate, toast, user]);

  const handleApply = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to apply for this job.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    if (user.role !== "job_seeker") {
      toast({
        title: "Action Not Allowed",
        description: "Only job seekers can apply for jobs.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsApplying(true);
      const newApplication = await createJobApplication(
        id!,
        user.id,
        coverLetter
      );
      
      setHasApplied(true);
      setApplication(newApplication);
      
      toast({
        title: "Application Submitted",
        description: "Your application has been successfully submitted.",
      });
    } catch (error) {
      console.error("Error applying for job:", error);
      toast({
        title: "Application Failed",
        description: "Failed to submit your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsApplying(false);
    }
  };

  const formatSalary = () => {
    if (!job?.salary_min && !job?.salary_max) {
      return "Not specified";
    }

    const currency = job.salary_currency || "USD";
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    });

    if (job.salary_min && job.salary_max) {
      return `${formatter.format(job.salary_min)} - ${formatter.format(job.salary_max)}`;
    } else if (job.salary_min) {
      return `From ${formatter.format(job.salary_min)}`;
    } else if (job.salary_max) {
      return `Up to ${formatter.format(job.salary_max)}`;
    }
  };

  const jobTypeMap = {
    full_time: "Full-time",
    part_time: "Part-time",
    contract: "Contract",
    internship: "Internship",
    remote: "Remote",
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="animate-pulse text-center">
          <div className="h-12 w-12 rounded-full bg-primary/20 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Job Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The job listing you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={() => navigate("/jobs")}>
          Browse All Jobs
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate(-1)}
      >
        ← Back
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12 rounded-md">
                    <AvatarImage src={job.company_logo_url} alt={job.company_name} />
                    <AvatarFallback className="rounded-md">
                      {job.company_name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-2xl">{job.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {job.company_name} • {job.location}
                    </CardDescription>
                  </div>
                </div>
                <Badge className="capitalize">
                  {jobTypeMap[job.job_type]}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="description">
                <TabsList className="mb-4">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="requirements">Requirements</TabsTrigger>
                  <TabsTrigger value="responsibilities">Responsibilities</TabsTrigger>
                  <TabsTrigger value="company">Company</TabsTrigger>
                </TabsList>
                
                <TabsContent value="description" className="space-y-4">
                  <div className="prose prose-sm max-w-none">
                    <p className="text-base leading-relaxed whitespace-pre-line">
                      {job.description}
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="requirements" className="space-y-4">
                  <ul className="space-y-2">
                    {job.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2 text-primary">•</span>
                        <span>{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                
                <TabsContent value="responsibilities" className="space-y-4">
                  <ul className="space-y-2">
                    {job.responsibilities.map((responsibility, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2 text-primary">•</span>
                        <span>{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                
                <TabsContent value="company" className="space-y-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <Avatar className="h-16 w-16 rounded-md">
                      <AvatarImage src={job.company_logo_url} alt={job.company_name} />
                      <AvatarFallback className="rounded-md">
                        {job.company_name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-xl">{job.company_name}</h3>
                      <div className="flex items-center mt-1">
                        <MapPinIcon className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{job.location}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm mb-4">
                    This is a company description. In a real application, this would be fetched from the database.
                  </p>
                  <div className="flex items-center space-x-4">
                    <Button variant="outline" size="sm" className="inline-flex items-center">
                      <GlobeIcon className="h-4 w-4 mr-2" />
                      Visit Website
                    </Button>
                    <Button variant="outline" size="sm" className="inline-flex items-center">
                      <BuildingIcon className="h-4 w-4 mr-2" />
                      Company Profile
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Job Summary Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Job Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start">
                <MapPinIcon className="h-5 w-5 mr-3 text-muted-foreground" />
                <div>
                  <div className="font-medium">Location</div>
                  <div className="text-sm text-muted-foreground">{job.location}</div>
                </div>
              </div>
              <div className="flex items-start">
                <BriefcaseIcon className="h-5 w-5 mr-3 text-muted-foreground" />
                <div>
                  <div className="font-medium">Job Type</div>
                  <div className="text-sm text-muted-foreground capitalize">{jobTypeMap[job.job_type]}</div>
                </div>
              </div>
              <div className="flex items-start">
                <DollarSignIcon className="h-5 w-5 mr-3 text-muted-foreground" />
                <div>
                  <div className="font-medium">Salary</div>
                  <div className="text-sm text-muted-foreground">{formatSalary()}</div>
                </div>
              </div>
              <div className="flex items-start">
                <ClockIcon className="h-5 w-5 mr-3 text-muted-foreground" />
                <div>
                  <div className="font-medium">Posted</div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(job.created_at).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Application Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Apply for this position</CardTitle>
            </CardHeader>
            <CardContent>
              {hasApplied ? (
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <CheckCircleIcon className="h-16 w-16 text-success" />
                  </div>
                  <h3 className="font-medium text-lg">Application Submitted</h3>
                  <p className="text-sm text-muted-foreground">
                    Your application is {application?.status}. We'll notify you of any updates.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {user?.role === "job_seeker" && (
                    <>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium">
                          Cover Letter (Optional)
                        </label>
                        <Textarea
                          placeholder="Tell the employer why you're a good fit for this position..."
                          value={coverLetter}
                          onChange={(e) => setCoverLetter(e.target.value)}
                          rows={4}
                        />
                      </div>
                      <Button 
                        className="w-full" 
                        onClick={handleApply}
                        disabled={isApplying}
                      >
                        {isApplying ? "Submitting..." : "Apply Now"}
                      </Button>
                    </>
                  )}
                  
                  {!user && (
                    <div className="text-center space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Please sign in to apply for this job.
                      </p>
                      <Button onClick={() => navigate("/auth")}>
                        Sign In to Apply
                      </Button>
                    </div>
                  )}
                  
                  {user && user.role !== "job_seeker" && (
                    <p className="text-sm text-muted-foreground text-center">
                      Only job seekers can apply for positions.
                    </p>
                  )}
                </div>
              )}
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground">
              By applying, you agree to our terms and conditions.
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
