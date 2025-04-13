
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQPage = () => {
  const faqs = [
    {
      question: "How do I create an account?",
      answer: "To create an account, click on the 'Sign Up' button in the top right corner of the homepage. Fill out the registration form with your email address and create a password. After submitting, check your email for a verification link to complete the registration process."
    },
    {
      question: "How do I search for jobs?",
      answer: "You can search for jobs by navigating to the 'Jobs' page from the main navigation menu. Use the search bar to enter keywords related to the position you're interested in. You can also use filters to narrow down your search by location, job type, experience level, and more."
    },
    {
      question: "How do I apply for a job?",
      answer: "To apply for a job, navigate to the job listing page and click the 'Apply Now' button. You'll need to have a complete profile before applying. Some employers may redirect you to their own application system, while others will accept applications directly through our platform."
    },
    {
      question: "How do I create a professional profile?",
      answer: "To create a profile, log in to your account and click on 'Profile' in the navigation menu. Fill out all the required information about your education, work experience, skills, and other relevant details. A complete profile increases your chances of being noticed by employers."
    },
    {
      question: "How can employers contact me?",
      answer: "Employers can contact you through the messaging system on our platform or via the email address associated with your account. Make sure your contact information is up to date in your profile settings."
    },
    {
      question: "Is my personal information secure?",
      answer: "Yes, we take data security seriously. We use encryption to protect your personal information and never share your data with third parties without your consent. You can review our Privacy Policy for more details on how we handle and protect your information."
    },
    {
      question: "How do I update my resume?",
      answer: "To update your resume, go to your Profile page and navigate to the Resume section. You can either upload a new document or edit your existing information. Remember to keep your profile updated as you gain new skills and experiences."
    },
    {
      question: "Can I delete my account?",
      answer: "Yes, you can delete your account at any time. Go to your account settings and select the option to delete your account. Please note that this action is permanent and will remove all your data from our platform."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
        <p className="text-muted-foreground mb-8">
          Find answers to common questions about using JobFlow. If you can't find what you're looking for, please visit our contact page.
        </p>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        <div className="mt-12 text-center">
          <h2 className="text-xl font-semibold mb-4">Still have questions?</h2>
          <p className="mb-4">
            If you couldn't find the answer you were looking for, please reach out to our support team.
          </p>
          <a href="/contact" className="text-primary hover:underline">
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
