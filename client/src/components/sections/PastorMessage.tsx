import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const PastorMessage = () => {
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
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
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
    <section id="pastor-message" className="py-16 bg-white">
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
            className="text-3xl md:text-4xl font-heading font-bold text-primary text-center mb-12"
          >
            MESSAGE FROM SENIOR PASTOR
          </motion.h2>

          <div className="flex flex-col md:flex-row items-center">
            <motion.div variants={itemVariants} className="md:w-1/3 mb-8 md:mb-0">
              <div className="relative rounded-full overflow-hidden w-64 h-64 mx-auto border-4 border-secondary shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                  className="object-cover w-full h-full"
                  alt="Pastor"
                />
              </div>
              <div className="text-center mt-4">
                <h3 className="text-xl font-heading font-bold">Rev Dr. Jacob Mathai</h3>
                <p className="text-gray-600">Senior Pastor</p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="md:w-2/3 md:pl-12">
              <div className="prose prose-lg max-w-none">
                <p className="mb-4">
                  ALMIGHTY GOD worship church is a reformed church and spiritual movement inspired by the Holy spirit and totally based on the teachings of Jesus Christ. As per the teachings of Jesus Christ in John 17: 3 the ONLY ONE AND TRUE God is the ALMIGHTY JEHOVAH God, the creator of heavens and earth (Genesis 1: 1, 2:4, 17: 1).
                </p>

                <p className="mb-4">
                  As per John 4: 23,24 and Mathew 4: 10, Jesus said to worship ONLY THE FATHER in spirit and truth. According to Rev 5: 13 people are expected to give glory and express thanks and gratitude to Jesus, the son of God, our saviour who died for us on the cross of Calvary.
                </p>

                <p className="font-semibold">
                  We encourage people of all nations to worship Almighty Jehovah God through Jesus Christ. You are welcome to join our worship meetings on every Sundays.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PastorMessage;
