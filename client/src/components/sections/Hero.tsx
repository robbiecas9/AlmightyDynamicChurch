import { heroContent } from "@/lib/church-data";

const Hero = () => {
  return (
    <section 
      id="hero" 
      className="relative h-screen flex items-center justify-center"
    >
      <div className="absolute inset-0 z-0">
        <img 
          src={heroContent.imageUrl} 
          className="object-cover w-full h-full" 
          alt="Church worship" 
        />
        <div className="absolute inset-0 bg-overlay"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10 text-center pt-16">
        <h1 
          className="text-white font-heading text-4xl md:text-6xl font-bold mb-6 animate-fade-in-down"
        >
          {heroContent.title}
        </h1>
        
        <p 
          className="text-white text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-fade-in-down animate-delay-1"
        >
          {heroContent.subtitle}
        </p>
        
        <div 
          className="mb-8 max-w-3xl mx-auto animate-fade-in-down animate-delay-2"
        >
          <p className="text-white text-xl md:text-2xl">{heroContent.content}</p>
        </div>
        

        
        <div 
          className="mt-12 animate-fade-in-down animate-delay-4"
        >
          <a 
            href={heroContent.buttonLink} 
            className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg mx-2"
          >
            {heroContent.buttonText}
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
