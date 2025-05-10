import { Belief } from "@/lib/church-data";

interface BeliefCardProps {
  belief: Belief;
  onClick: () => void;
}

const BeliefCard = ({ belief, onClick }: BeliefCardProps) => {
  return (
    <div className="belief-card bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all h-full">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mr-4">
          <span className="text-white font-bold">{belief.id}</span>
        </div>
        <h3 className="text-xl font-heading font-bold">{belief.title}</h3>
      </div>
      
      <p className="mb-4">
        {belief.summary}
      </p>
      
      <div className="scripture text-sm text-gray-600 mt-4">
        {belief.scripture}
      </div>
      
      <button 
        className="mt-4 text-primary hover:text-secondary transition-colors focus:outline-none"
        onClick={onClick}
        aria-label={`Read more about ${belief.title}`}
      >
        Read More 
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block ml-1">
          <path d="m9 18 6-6-6-6"/>
        </svg>
      </button>
    </div>
  );
};

export default BeliefCard;
