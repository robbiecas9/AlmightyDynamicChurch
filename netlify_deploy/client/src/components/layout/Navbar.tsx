import { Link } from "wouter";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const navItems = [
    { title: "Home", href: "#hero" },
    { title: "Our Belief", href: "#about" },
    { title: "Meetings", href: "#meetings" },
    { title: "Contact us", href: "#contact" }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-primary py-5 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="text-white font-heading font-bold text-xl md:text-2xl flex items-center">
            <div className="mr-2 h-8 w-8 bg-secondary rounded-full flex items-center justify-center">
              <span className="text-primary text-sm font-bold">AGF</span>
            </div>
            <span className="sm:inline hidden">ALMIGHTY GOD FELLOWSHIP</span>
            <span className="sm:hidden inline">AGF</span>
          </div>

          {isMobile ? (
            <button 
              onClick={toggleMenu}
              className="text-white p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          ) : (
            <div className="flex flex-wrap justify-center gap-3">
              {navItems.map((item, index) => (
                item.href.startsWith('/') ? (
                  <Link
                    key={index}
                    href={item.href}
                    className="relative overflow-hidden px-5 py-2 rounded-full bg-white bg-opacity-20 text-white hover:bg-secondary hover:text-primary font-medium transition-all duration-300 transform hover:scale-105 shadow-md group"
                  >
                    <span className="relative z-10">{item.title}</span>
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
                  </Link>
                ) : (
                  <a
                    key={index}
                    href={item.href}
                    className="relative overflow-hidden px-5 py-2 rounded-full bg-white bg-opacity-20 text-white hover:bg-secondary hover:text-primary font-medium transition-all duration-300 transform hover:scale-105 shadow-md group"
                  >
                    <span className="relative z-10">{item.title}</span>
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
                  </a>
                )
              ))}
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <div className={`mt-4 pb-3 overflow-hidden transition-all duration-300 ${isMobile ? (isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0') : 'hidden'}`}>
          <div className="flex flex-col space-y-3 animate-slide-down">
              {navItems.map((item, index) => (
                item.href.startsWith('/') ? (
                  <Link
                    key={index}
                    href={item.href}
                    onClick={closeMenu}
                    className="relative overflow-hidden px-5 py-2 rounded-full bg-white bg-opacity-20 text-white hover:bg-secondary hover:text-primary font-medium transition-all duration-300 transform hover:scale-105 shadow-md group"
                  >
                    <span className="relative z-10">{item.title}</span>
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
                  </Link>
                ) : (
                  <a
                    key={index}
                    href={item.href}
                    onClick={closeMenu}
                    className="relative overflow-hidden px-5 py-2 rounded-full bg-white bg-opacity-20 text-white hover:bg-secondary hover:text-primary font-medium transition-all duration-300 transform hover:scale-105 shadow-md group"
                  >
                    <span className="relative z-10">{item.title}</span>
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
                  </a>
                )
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
