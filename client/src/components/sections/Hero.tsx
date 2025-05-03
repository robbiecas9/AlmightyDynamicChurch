import { heroContent } from "@/lib/church-data";

const Hero = () => {
  return (
    <section id="hero" className="py-20 md:py-32 bg-cover bg-center" style={{ backgroundImage: "url('/church-building.jpg')" }}>
      <div className="bg-black bg-opacity-60 -mx-4 px-4 py-20">
        <div className="container mx-auto px-4 text-center">
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
      </div>
    </section>
  );
};

export default Hero;
