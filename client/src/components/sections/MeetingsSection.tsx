import { Clock, Calendar } from "lucide-react";
import { meetingData } from "@/lib/church-data";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAPAnimation } from "@/hooks/use-gsap";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const MeetingsSection = () => {
  const { elementRef: sectionRef } = useGSAPAnimation<HTMLElement>();
  const { elementRef: titleRef, animate: animateTitle } = useGSAPAnimation<HTMLHeadingElement>();
  const { elementRef: descriptionRef, animate: animateDescription } = useGSAPAnimation<HTMLDivElement>();
  const { elementRef: meetingsRef, animate: animateMeetings } = useGSAPAnimation<HTMLDivElement>();
  const { elementRef: meetingTitleRef, animate: animateMeetingTitle } = useGSAPAnimation<HTMLHeadingElement>();
  const meetingItemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    animateTitle({
      y: 50,
      opacity: 0,
      scrollTrigger: true,
      start: "top 80%",
    });

    animateDescription({
      x: -50,
      opacity: 0,
      delay: 0.2,
      scrollTrigger: true,
      start: "top 80%",
    });

    animateMeetings({
      x: 50,
      opacity: 0,
      delay: 0.3,
      scrollTrigger: true,
      start: "top 80%",
    });

    animateMeetingTitle({
      y: 30,
      opacity: 0,
      delay: 0.5,
      scrollTrigger: true,
      start: "top 80%",
    });

    if (meetingItemsRef.current) {
      const meetingItems = meetingItemsRef.current.querySelectorAll('.meeting-item');

      gsap.fromTo(
        meetingItems,
        { y: 30, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: meetingItemsRef.current,
            start: "top 85%",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section id="meetings" ref={sectionRef} className="py-10 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div>
          <h2
            ref={titleRef}
            className="text-3xl md:text-4xl font-heading font-bold text-primary text-center mb-4 md:mb-16 fancy-heading"
          >
            Worship Services & Meetings
          </h2>

          <div className="flex flex-col lg:flex-row gap-6 md:gap-12 items-stretch mt-2 md:mt-0">
            {/* Left Description */}
            <div
              ref={descriptionRef}
              className="lg:w-1/2 flex flex-col justify-center px-2 md:px-4 pt-4 md:pt-8"
            >
              <p className="text-lg mb-4 md:mb-8">
                Our Christian meetings serve as gatherings where believers come together to worship,
                study scripture, pray, and fellowship. Hebrews 10:25 says, "Let us not neglect our
                meeting together, but encourage one another."
              </p>
              <p className="text-lg mb-4 md:mb-8">
                Scripture study is central to Christian meetings, where passages from the Bible are read
                and discussed to deepen understanding and spiritual growth.
              </p>
              <p className="text-lg mb-4 md:mb-8">
                Fellowship fosters a sense of community and support, allowing believers to share their
                joys, struggles, and faith journeys.
              </p>
            </div>

            {/* Right Timings */}
            <div ref={meetingsRef} className="lg:w-1/2 flex flex-col">
              <div className="bg-gray-50 rounded-lg shadow-lg p-5 md:p-8 hover:shadow-xl flex-grow flex flex-col transition-all duration-300">
                <h3
                  ref={meetingTitleRef}
                  className="text-2xl font-heading font-bold text-primary mb-6 md:mb-10 text-center fancy-heading-center"
                >
                  Worship Meeting Timings
                </h3>

                <div className="flex items-center justify-center mb-6">
                  <Calendar className="h-6 w-6 text-secondary mr-2" />
                  <span className="text-xl font-semibold">
                    Every {meetingData[0].day}
                  </span>
                </div>

                <div ref={meetingItemsRef} className="space-y-6">
                  {meetingData.map((meeting) => (
                    <div
                      key={meeting.id}
                      className="meeting-item flex flex-col sm:flex-row sm:items-center p-5 bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-gray-50 hover:-translate-y-1 border-l-4 border-transparent hover:border-secondary transition-all"
                    >
                      <div className="sm:w-1/2 w-full mb-3 sm:mb-0">
                        <h4 className="text-lg font-bold text-primary">{meeting.title}</h4>
                        {meeting.location && (
                          <p className="text-sm text-gray-600">{meeting.location}</p>
                        )}
                      </div>
                      <div className="sm:w-1/2 w-full flex items-center justify-start sm:justify-end">
                        <Clock className="text-secondary mr-2 h-5 w-5 animate-pulse-subtle" />
                        <span className="font-medium">{meeting.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetingsSection;
