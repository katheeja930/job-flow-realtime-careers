
const PrivacyPolicyPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">
          Last Updated: April 13, 2025
        </p>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
            <p className="text-sm text-muted-foreground">
              This Privacy Policy explains how JobFlow ("we," "us," or "our") collects, uses, and shares your personal information when you visit our website, use our services, or otherwise interact with us. Please read this policy carefully to understand our practices regarding your information and how we will treat it.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">2. Information We Collect</h2>
            <p className="text-sm text-muted-foreground mb-2">
              We collect several types of information from and about users of our platform, including:
            </p>
            <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
              <li>Personal identifiers such as name, email address, phone number, and postal address</li>
              <li>Professional information such as work history, education, skills, and qualifications</li>
              <li>Account credentials such as username and password</li>
              <li>Usage data such as how you interact with our website and services</li>
              <li>Device information such as IP address, browser type, and operating system</li>
              <li>Communication data such as messages sent through our platform</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">3. How We Use Your Information</h2>
            <p className="text-sm text-muted-foreground mb-2">
              We use the information we collect for various purposes, including:
            </p>
            <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
              <li>Providing and improving our services</li>
              <li>Matching job seekers with relevant job opportunities</li>
              <li>Processing job applications</li>
              <li>Communicating with you about our services, updates, and promotional offers</li>
              <li>Analyzing usage patterns to enhance user experience</li>
              <li>Ensuring compliance with legal obligations</li>
              <li>Detecting and preventing fraud and unauthorized access</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">4. Sharing Your Information</h2>
            <p className="text-sm text-muted-foreground mb-2">
              We may share your information with the following categories of third parties:
            </p>
            <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
              <li>Employers and recruiters (for job seekers)</li>
              <li>Service providers who perform services on our behalf</li>
              <li>Business partners with whom we jointly offer products or services</li>
              <li>Legal authorities when required by law or to protect our rights</li>
              <li>Parties involved in business transfers, such as mergers or acquisitions</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">5. Your Rights and Choices</h2>
            <p className="text-sm text-muted-foreground mb-2">
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
              <li>Accessing and obtaining a copy of your information</li>
              <li>Correcting inaccurate information</li>
              <li>Deleting your information</li>
              <li>Restricting or objecting to certain processing activities</li>
              <li>Requesting portability of your information</li>
              <li>Withdrawing consent (where processing is based on consent)</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">6. Data Security</h2>
            <p className="text-sm text-muted-foreground">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, accidental loss, destruction, or damage. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">7. Contact Us</h2>
            <p className="text-sm text-muted-foreground">
              If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at privacy@jobflow.com or through our Contact page.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
