import { heroContent } from "@/lib/church-data";
import worshipSunsetImage from "../../assets/worship-sunset.jpg";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAPAnimation } from "@/hooks/use-gsap";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const { elementRef: heroRef } = useGSAPAnimation<HTMLElement>();
  const { elementRef: headingRef, animate: animateHeading } = useGSAPAnimation<HTMLHeadingElement>();
  const { elementRef: locationRef, animate: animateLocation } = useGSAPAnimation<HTMLParagraphElement>();
  const { elementRef: taglineRef, animate: animateTagline } = useGSAPAnimation<HTMLDivElement>();
  const { elementRef: ctaRef, animate: animateCta } = useGSAPAnimation<HTMLDivElement>();
  const imgRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial animations
    gsap.fromTo(overlayRef.current, 
      { opacity: 0.2 },
      { opacity: 0.6, duration: 1.5, ease: "power2.inOut" }
    );
    
    gsap.fromTo(imgRef.current,
      { scale: 1.1 },
      { scale: 1, duration: 2.5, ease: "power2.out" }
    );

    // Heading animation
    animateHeading({
      y: 100,
      delay: 0.5,
      duration: 1,
      ease: "power3.out"
    });

    // Location text animation
    animateLocation({
      y: 50,
      delay: 0.8,
      duration: 0.8,
    });

    // Tagline animation
    animateTagline({
      y: 50,
      delay: 1,
      duration: 0.8,
    });

    // CTA buttons animation
    animateCta({
      y: 30,
      opacity: 0,
      delay: 1.3,
      duration: 0.8,
    });

    // Parallax effect for the background image
    gsap.to(imgRef.current, {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.5,
      },
    });

    return () => {
      // Clear all scroll triggers on unmount
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section id="hero" ref={heroRef} className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          ref={imgRef}
          src={worshipSunsetImage} 
          className="object-cover w-full h-full" 
          alt="Person worshiping at sunset" 
        />
        <div ref={overlayRef} className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 text-center">
        <h1 ref={headingRef} className="text-white font-heading text-4xl md:text-6xl font-bold mb-6">
          ALMIGHTY GOD FELLOWSHIP
        </h1>
        
        <p ref={locationRef} className="text-white text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          BIBLE COLLEGE JUNCTION, PUTHENCRUZ, ERNAKULAM DIST, KERALA
        </p>
        
        <div ref={taglineRef} className="mb-8 max-w-3xl mx-auto">
          <p className="text-white text-xl md:text-2xl">FOLLOW JESUS FOR PEACE AND ETERNAL LIFE</p>
        </div>
        
        <div ref={ctaRef} className="mt-12">
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
