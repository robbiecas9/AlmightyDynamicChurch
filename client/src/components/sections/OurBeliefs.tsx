import { useState, useEffect, useRef } from "react";
import BeliefCard from "@/components/ui/belief-card";
import BeliefModal from "@/components/ui/belief-modal";
import { Belief, beliefData } from "@/lib/church-data";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAPAnimation } from "@/hooks/use-gsap";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const OurBeliefs = () => {
  const [selectedBelief, setSelectedBelief] = useState<Belief | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAllBeliefs, setShowAllBeliefs] = useState(false);
  
  const { elementRef: sectionRef } = useGSAPAnimation<HTMLElement>();
  const { elementRef: titleRef, animate: animateTitle } = useGSAPAnimation<HTMLHeadingElement>();
  const { elementRef: subtitleRef, animate: animateSubtitle } = useGSAPAnimation<HTMLParagraphElement>();
  const { elementRef: buttonRef, animate: animateButton } = useGSAPAnimation<HTMLDivElement>();
  
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const openBeliefModal = (belief: Belief) => {
    setSelectedBelief(belief);
    setIsModalOpen(true);
  };

  const closeBeliefModal = () => {
    setIsModalOpen(false);
  };

  const toggleShowAllBeliefs = () => {
    setShowAllBeliefs(!showAllBeliefs);
  };

  // Display only first 6 beliefs unless showAllBeliefs is true
  const visibleBeliefs = showAllBeliefs 
    ? beliefData 
    : beliefData.slice(0, 6);
    
  // Debugging: Log the number of beliefs to ensure they're loading
  useEffect(() => {
    console.log(`Loaded ${beliefData.length} beliefs, showing ${visibleBeliefs.length}`);
  }, [visibleBeliefs.length]);
  
  // GSAP animations
  useEffect(() => {
    // Title animation
    animateTitle({
      y: 50,
      opacity: 0,
      scrollTrigger: true,
      start: "top 80%",
    });
    
    // Subtitle animation
    animateSubtitle({
      y: 30,
      opacity: 0,
      delay: 0.2,
      scrollTrigger: true,
      start: "top 80%",
    });
    
    // Button animation
    animateButton({
      y: 20,
      opacity: 0,
      delay: 0.3,
      scrollTrigger: true,
      start: "top 80%",
    });
    
    // Animate the belief cards with staggered effect
    if (cardsContainerRef.current) {
      const cards = cardsContainerRef.current.querySelectorAll('.belief-card-container');
      
      gsap.fromTo(cards,
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: "top 85%",
          }
        }
      );
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [visibleBeliefs.length]);

  return (
    <section id="about" ref={sectionRef} className="py-10 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div>
          <h2 ref={titleRef} className="text-3xl md:text-4xl font-heading font-bold text-primary text-center mb-4 md:mb-6 fancy-heading">
            Our Beliefs
          </h2>
          
          <p ref={subtitleRef} className="text-center text-lg md:text-xl text-gray-600 mb-6 md:mb-12">
            Our beliefs are based on Bible principles.
          </p>
          
          <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleBeliefs.map((belief) => (
              <div key={belief.id} className="belief-card-container">
                <BeliefCard 
                  belief={belief} 
                  onClick={() => openBeliefModal(belief)} 
                />
              </div>
            ))}
          </div>
          
          <div ref={buttonRef} className="text-center mt-6 md:mt-12">
            <button 
              onClick={toggleShowAllBeliefs}
              className="bg-primary hover:bg-opacity-90 text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg"
            >
              {showAllBeliefs ? "Show Less" : "View All Beliefs"}
            </button>
          </div>
        </div>
      </div>
      
      {selectedBelief && (
        <BeliefModal 
          belief={selectedBelief}
          isOpen={isModalOpen}
          onClose={closeBeliefModal}
        />
      )}
    </section>
  );
};

export default OurBeliefs;