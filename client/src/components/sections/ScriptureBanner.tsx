import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ScriptureBanner = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" }
      });
    }
  }, [controls, inView]);

  return (
    <section className="py-12 bg-primary">
      <div className="container mx-auto px-4">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          className="scripture text-center text-white max-w-4xl mx-auto"
        >
          <p className="text-xl md:text-2xl">
            "All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness"
            <span className="text-secondary font-semibold">( 2 Timothy 3: 16)</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ScriptureBanner;
