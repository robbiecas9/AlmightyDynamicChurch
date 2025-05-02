import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import BeliefCard from "@/components/ui/belief-card";
import BeliefModal from "@/components/ui/belief-modal";
import { Belief, beliefData } from "@/lib/church-data";

const OurBeliefs = () => {
  const [selectedBelief, setSelectedBelief] = useState<Belief | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAllBeliefs, setShowAllBeliefs] = useState(false);
  
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

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

  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="animate-on-scroll"
        >
          <motion.h2
            variants={itemVariants} 
            className="text-3xl md:text-4xl font-heading font-bold text-primary text-center mb-4"
          >
            Our Beliefs
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-center text-xl text-gray-600 mb-12"
          >
            Our beliefs are based on Bible principles.
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleBeliefs.map((belief) => (
              <motion.div key={belief.id} variants={itemVariants}>
                <BeliefCard 
                  belief={belief} 
                  onClick={() => openBeliefModal(belief)} 
                />
              </motion.div>
            ))}
          </div>
          
          <motion.div variants={itemVariants} className="text-center mt-12">
            <button 
              onClick={toggleShowAllBeliefs}
              className="bg-primary hover:bg-opacity-90 text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg"
            >
              {showAllBeliefs ? "Show Less" : "View All Beliefs"}
            </button>
          </motion.div>
        </motion.div>
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
