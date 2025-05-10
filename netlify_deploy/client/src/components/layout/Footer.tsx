import { Link } from "wouter";
import { 
  Facebook, 
  Youtube, 
  Instagram, 
  Smartphone, 
  Mail, 
  Globe 
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <h3 className="text-2xl font-heading font-bold mb-4">
              Almighty God Fellowship
            </h3>
            <p className="max-w-md">
              We encourage people of all nations to worship Almighty Jehovah God 
              through Jesus Christ. You are welcome to join our worship meetings 
              every Sunday.
            </p>
          </div>
          
          <div className="mb-8 md:mb-0">
            <h4 className="text-xl font-heading font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#hero" 
                  className="hover:text-secondary transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  className="hover:text-secondary transition-colors"
                >
                  Our Beliefs
                </a>
              </li>
              <li>
                <a 
                  href="#pastor-message" 
                  className="hover:text-secondary transition-colors"
                >
                  Pastor's Message
                </a>
              </li>
              <li>
                <a 
                  href="#meetings" 
                  className="hover:text-secondary transition-colors"
                >
                  Worship Meetings
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="hover:text-secondary transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-heading font-bold mb-4">Connect With Us</h4>
            <div className="flex space-x-4 mb-4">
              <a 
                href="#" 
                className="text-white hover:text-secondary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a 
                href="#" 
                className="text-white hover:text-secondary transition-colors"
                aria-label="Youtube"
              >
                <Youtube className="h-6 w-6" />
              </a>
              <a 
                href="#" 
                className="text-white hover:text-secondary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
            
            <div>
              <p className="mb-2 flex items-center">
                <Mail className="h-4 w-4 mr-2" /> 
                <a 
                  href="mailto:almightygf@gmail.com" 
                  className="hover:text-secondary transition-colors"
                >
                  almightygf@gmail.com
                </a>
              </p>
              <p className="flex items-center">
                <Smartphone className="h-4 w-4 mr-2" /> 
                <a 
                  href="tel:+919447218226" 
                  className="hover:text-secondary transition-colors"
                >
                  +91 9447218226
                </a>
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white border-opacity-20 mt-8 pt-8 text-center">
          <p>&copy; {currentYear} Almighty God Fellowship. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
