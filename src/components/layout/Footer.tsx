
import { Link } from "react-router-dom";
import { BriefcaseIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <BriefcaseIcon className="h-6 w-6 text-primary mr-2" />
              <span className="font-bold text-xl">JobFlow</span>
            </Link>
            <p className="text-sm text-gray-600">
              Connecting talent with real-time career opportunities.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">For Job Seekers</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/jobs" className="text-gray-600 hover:text-primary">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-600 hover:text-primary">
                  Create Profile
                </Link>
              </li>
              <li>
                <Link to="/applications" className="text-gray-600 hover:text-primary">
                  Application Status
                </Link>
              </li>
              <li>
                <Link to="/alerts" className="text-gray-600 hover:text-primary">
                  Job Alerts
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">For Employers</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/employer/listings" className="text-gray-600 hover:text-primary">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link to="/employer/applications" className="text-gray-600 hover:text-primary">
                  Review Applications
                </Link>
              </li>
              <li>
                <Link to="/employer/profile" className="text-gray-600 hover:text-primary">
                  Company Profile
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-primary">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} JobFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
