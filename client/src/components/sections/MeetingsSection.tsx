import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Clock } from "lucide-react";

const MeetingsSection = () => {
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
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const meetingSchedules = [
    {
      type: "English & Malayalam Combined",
      time: "10:00 am to 12:30 pm",
    },
    {
      type: "Hindi Service",
      time: "4:00 pm to 5:30 pm",
    },
  ];

  return (
    <section id="meetings" className="py-16 bg-white">
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
            Our Christian Meetings
          </motion.h2>

          <div className="flex flex-col lg:flex-row gap-12">
            <motion.div variants={itemVariants} className="lg:w-1/2">
              <p className="text-lg mb-6">
                Our Christian meetings serve as gatherings where believers come together to worship, study scripture, pray, and fellowship with one another. Hebrews 10:25 says, "And let us not neglect our meeting together, as some people do, but encourage one another, especially now that the day of his return is drawing near."
              </p>

              <p className="text-lg mb-6">
                Scripture study is central to Christian meetings, where passages from the Bible are read and discussed to deepen understanding and spiritual growth. Prayer is a vital component, providing an opportunity for individuals to communicate with God, seek guidance, and intercede for others.
              </p>

              <p className="text-lg mb-8">
                Fellowship fosters a sense of community and support, allowing believers to share their joys, struggles, and faith journeys with one another.
              </p>

              <img
                src="https://images.unsplash.com/photo-1513269890889-8e4e362e5582?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                className="rounded-lg shadow-lg w-full h-64 object-cover"
                alt="Christian fellowship"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="lg:w-1/2">
              <div className="bg-gray-50 rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-heading font-bold text-primary mb-6">
                  Worship Meeting Timings
                </h3>

                <div className="mb-8">
                  <div className="flex items-center mb-2">
                    <span className="text-secondary mr-3 text-xl">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar">
                        <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                        <line x1="16" x2="16" y1="2" y2="6"/>
                        <line x1="8" x2="8" y1="2" y2="6"/>
                        <line x1="3" x2="21" y1="10" y2="10"/>
                      </svg>
                    </span>
                    <span className="text-xl font-semibold">Every Sunday</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {meetingSchedules.map((schedule, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-center p-4 bg-white rounded-lg shadow-md"
                    >
                      <div className="sm:w-1/2 mb-3 sm:mb-0">
                        <h4 className="text-lg font-bold text-primary">{schedule.type}</h4>
                      </div>
                      <div className="sm:w-1/2 flex items-center">
                        <Clock className="text-secondary mr-2 h-5 w-5" />
                        <span>{schedule.time}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <img
                    src="https://images.unsplash.com/photo-1534691157105-7ca4adf0989e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                    className="rounded-lg shadow-lg w-full h-64 object-cover"
                    alt="Worship service"
                  />
                  <p className="text-center mt-2 text-gray-600">Worship Meetings</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MeetingsSection;
