import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const navItems = [
    { title: "Home", href: "#hero" },
    { title: "Our Belief", href: "#about" },
    { title: "Meetings", href: "#meetings" },
    { title: "Contact us", href: "#contact" }
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-primary bg-opacity-95 shadow-lg" 
          : "bg-primary bg-opacity-40"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a 
          href="#hero" 
          className="text-white font-heading font-bold text-xl md:text-2xl"
        >
          AGW Church
        </a>
        
        <div className="hidden md:flex space-x-8 items-center">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="text-white hover:text-secondary font-medium transition-colors"
            >
              {item.title}
            </a>
          ))}
        </div>
        
        <button 
          className="md:hidden text-white focus:outline-none" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`md:hidden bg-primary bg-opacity-95 w-full shadow-md ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="text-white hover:text-secondary transition-colors py-2 font-medium"
              onClick={closeMenu}
            >
              {item.title}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
