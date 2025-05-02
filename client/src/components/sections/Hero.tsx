const Hero = () => {
  return (
    <section 
      id="hero" 
      className="relative h-screen flex items-center justify-center"
    >
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
          className="object-cover w-full h-full" 
          alt="Church worship" 
        />
        <div className="absolute inset-0 bg-overlay"></div>
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
          <h2 className="text-secondary font-heading text-2xl md:text-3xl mb-2">FOLLOW JESUS</h2>
          <p className="text-white text-xl md:text-2xl">FOR PEACE AND ETERNAL LIFE</p>
        </div>
        
        <div 
          className="scripture bg-white bg-opacity-10 p-6 rounded-lg max-w-3xl mx-auto text-white animate-fade-in-down animate-delay-3"
        >
          <p className="text-lg md:text-xl">
            "Come, let us bow down in worship, let us kneel before the LORD our Maker; for he is our God and we are the people of his pasture, the flock under his care"
            <span className="text-secondary font-semibold">( Psalms 95: 6,7)</span>
          </p>
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
