import { heroContent } from "@/lib/church-data";
import worshipSunsetImage from "../../assets/worship-sunset.jpg";

const Hero = () => {
  return (
    <section id="hero" className="relative py-20 md:py-32">
      <div className="absolute inset-0 z-0">
        <img 
          src={worshipSunsetImage} 
          className="object-cover w-full h-full" 
          alt="Person worshiping at sunset" 
        />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 text-center">
        <h1 className="text-white font-heading text-4xl md:text-6xl font-bold mb-6">
          ALMIGHTY GOD FELLOWSHIP
        </h1>
        
        <p className="text-white text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          BIBLE COLLEGE JUNCTION, PUTHENCRUZ, ERNAKULAM DIST, KERALA
        </p>
        
        <div className="mb-8 max-w-3xl mx-auto">
          <p className="text-white text-xl md:text-2xl">FOLLOW JESUS FOR PEACE AND ETERNAL LIFE</p>
        </div>
        
        <div className="mt-12">
          <a 
            href="#meetings" 
            className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg mx-2"
          >
            Join Our Worship
          </a>
          <a 
            href="#about" 
            className="bg-secondary hover:bg-secondary-dark text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg mx-2 mt-4 md:mt-0 inline-block md:inline"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
