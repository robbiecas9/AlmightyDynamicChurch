import { useRef, useEffect } from "react";
import { X } from "lucide-react";
import { Belief } from "@/lib/church-data";

interface BeliefModalProps {
  belief: Belief;
  isOpen: boolean;
  onClose: () => void;
}

const BeliefModal = ({ belief, isOpen, onClose }: BeliefModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Close modal on escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div
        ref={modalRef}
        className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          <h3 className="text-2xl font-heading font-bold text-primary mb-4">
            {belief.title}
          </h3>

          <div className="prose max-w-none">
            <p>{belief.content}</p>
            
            {belief.scripture && (
              <div className="scripture text-gray-600 mt-4">
                {belief.scripture}
              </div>
            )}
          </div>

          <div className="mt-6 text-right">
            <button
              onClick={onClose}
              className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeliefModal;
