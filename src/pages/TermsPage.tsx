
const TermsPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">
          Last Updated: April 13, 2025
        </p>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p className="text-sm text-muted-foreground">
              By accessing or using the JobFlow platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">2. User Accounts</h2>
            <p className="text-sm text-muted-foreground">
              When you create an account with us, you must provide accurate, complete, and up-to-date information. You are responsible for safeguarding the password and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">3. User Content</h2>
            <p className="text-sm text-muted-foreground">
              You retain all rights to content you submit, post, or display on or through the service. By submitting content to the platform, you grant JobFlow a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, publish, and distribute such content for the purpose of providing and improving our services.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">4. Acceptable Use</h2>
            <p className="text-sm text-muted-foreground mb-2">
              You agree not to use our platform to:
            </p>
            <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon the rights of others</li>
              <li>Submit false or misleading information</li>
              <li>Upload or transmit viruses or any other malicious code</li>
              <li>Interfere with or disrupt the service or servers or networks connected to the service</li>
              <li>Harvest or collect user information without permission</li>
              <li>Engage in any activity that would constitute employment discrimination</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">5. Termination</h2>
            <p className="text-sm text-muted-foreground">
              We may terminate or suspend your account and access to the service immediately, without prior notice or liability, for any reason, including breach of these Terms. Upon termination, your right to use the service will immediately cease.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">6. Disclaimer of Warranties</h2>
            <p className="text-sm text-muted-foreground">
              The service is provided on an "as is" and "as available" basis. JobFlow makes no warranties, express or implied, regarding the service, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">7. Limitation of Liability</h2>
            <p className="text-sm text-muted-foreground">
              In no event shall JobFlow be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service, including but not limited to loss of profits, data, or other intangible losses.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">8. Changes to Terms</h2>
            <p className="text-sm text-muted-foreground">
              We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">9. Contact Us</h2>
            <p className="text-sm text-muted-foreground">
              If you have any questions about these Terms, please contact us at legal@jobflow.com or through our Contact page.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
