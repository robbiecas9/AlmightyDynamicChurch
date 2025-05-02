import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const BibleImageSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative py-24">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          className="object-cover w-full h-full"
          alt="Open Bible"
        />
        <div className="absolute inset-0 bg-overlay"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <motion.div
            ref={ref}
            variants={variants}
            initial="hidden"
            animate={controls}
            className="animate-on-scroll"
          >
            <p className="text-xl md:text-2xl mb-6 scripture">
              "Come, let us bow down in worship, let us kneel before the LORD our Maker; for he is our God and we are the people of his pasture, the flock under his care"
              <span className="text-secondary font-semibold">( Psalms 95: 6,7)</span>
            </p>

            <div className="mt-8">
              <a
                href="#meetings"
                className="bg-white text-primary hover:bg-secondary hover:text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg"
              >
                Join Our Worship
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BibleImageSection;
