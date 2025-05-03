import { Link } from "wouter";

const Navbar = () => {
  const navItems = [
    { title: "Home", href: "#hero" },
    { title: "Our Belief", href: "#about" },
    { title: "Meetings", href: "#meetings" },
    { title: "Contact us", href: "#contact" }
  ];

  return (
    <div className="bg-primary py-4">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-white font-heading font-bold text-xl md:text-2xl mb-4 md:mb-0">
          ALMIGHTY GOD FELLOWSHIP
        </div>
        
        <div className="flex flex-wrap justify-center gap-6">
          {navItems.map((item, index) => (
            item.href.startsWith('/') ? (
              <Link
                key={index}
                href={item.href}
                className="text-white hover:text-secondary font-medium transition-colors"
              >
                {item.title}
              </Link>
            ) : (
              <a
                key={index}
                href={item.href}
                className="text-white hover:text-secondary font-medium transition-colors"
              >
                {item.title}
              </a>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
