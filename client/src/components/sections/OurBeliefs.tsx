import { useState } from "react";
import BeliefCard from "@/components/ui/belief-card";
import BeliefModal from "@/components/ui/belief-modal";
import { Belief, beliefData } from "@/lib/church-data";

const OurBeliefs = () => {
  const [selectedBelief, setSelectedBelief] = useState<Belief | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAllBeliefs, setShowAllBeliefs] = useState(false);

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
        <div className="animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary text-center mb-4">
            Our Beliefs
          </h2>
          
          <p className="text-center text-xl text-gray-600 mb-12">
            Our beliefs are based on Bible principles.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleBeliefs.map((belief) => (
              <div key={belief.id}>
                <BeliefCard 
                  belief={belief} 
                  onClick={() => openBeliefModal(belief)} 
                />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
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