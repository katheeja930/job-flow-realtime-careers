
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

const ContactPage = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // This is just a placeholder for actual form submission
    toast({
      title: "Message sent",
      description: "Thank you for contacting us. We'll respond shortly.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        <p className="text-muted-foreground mb-8">
          Have questions or feedback? We'd love to hear from you. Fill out the form below and our team will get back to you as soon as possible.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                  First Name
                </label>
                <Input id="firstName" placeholder="Enter your first name" required />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                  Last Name
                </label>
                <Input id="lastName" placeholder="Enter your last name" required />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <Input id="email" type="email" placeholder="Enter your email address" required />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-1">
                Subject
              </label>
              <Input id="subject" placeholder="What is this regarding?" required />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Message
              </label>
              <Textarea 
                id="message" 
                placeholder="Please describe your inquiry or feedback in detail..." 
                required 
                className="min-h-[150px]"
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full">Send Message</Button>
        </form>
        
        <div className="mt-12 text-center">
          <h2 className="text-xl font-semibold mb-2">Other Ways to Reach Us</h2>
          <p className="mb-4">Email: support@jobflow.com</p>
          <p>Phone: (555) 123-4567</p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
