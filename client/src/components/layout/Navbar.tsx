import { Link } from "wouter";

const Navbar = () => {
  const navItems = [
    { title: "Home", href: "#hero" },
    { title: "Our Belief", href: "#about" },
    { title: "Meetings", href: "#meetings" },
    { title: "Contact us", href: "#contact" }
  ];

  return (
    <div className="bg-primary py-5 shadow-lg">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-white font-heading font-bold text-xl md:text-2xl mb-4 md:mb-0 flex items-center">
          <div className="mr-2 h-8 w-8 bg-secondary rounded-full flex items-center justify-center">
            <span className="text-primary text-sm font-bold">AG</span>
          </div>
          ALMIGHTY GOD FELLOWSHIP
        </div>
        
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
      </div>
    </div>
  );
};

export default Navbar;
