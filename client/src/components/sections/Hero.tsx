import { heroContent } from "@/lib/church-data";

const Hero = () => {
  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center"
      style={{ marginTop: '-60px' }} // Offset to handle navbar height
    >
      <div className="absolute inset-0 z-0">
        <img 
          src="/church-building.jpg" 
          className="object-cover w-full h-full" 
          alt="Church building" 
          onError={(e) => {
            console.error('Failed to load image:', e.currentTarget.src);
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10 text-center pt-16">
        <h1 
          className="text-white font-heading text-4xl md:text-6xl font-bold mb-6 animate-fade-in-down"
        >
          ALMIGHTY GOD FELLOWSHIP
        </h1>
        
        <p 
          className="text-white text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-fade-in-down animate-delay-1"
        >
          BIBLE COLLEGE JUNCTION, PUTHENCRUZ, ERNAKULAM DIST, KERALA
        </p>
        
        <div 
          className="mb-8 max-w-3xl mx-auto animate-fade-in-down animate-delay-2"
        >
          <p className="text-white text-xl md:text-2xl">FOLLOW JESUS FOR PEACE AND ETERNAL LIFE</p>
        </div>
        
        <div 
          className="mt-12 animate-fade-in-down animate-delay-4"
        >
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
