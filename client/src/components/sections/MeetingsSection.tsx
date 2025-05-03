import { Clock, Calendar } from "lucide-react";
import { meetingData } from "@/lib/church-data";

const MeetingsSection = () => {
  return (
    <section id="meetings" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="animate-fade-in-down">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary text-center mb-8 md:mb-16 fancy-heading animate-heading">
            Worship Services & Meetings
          </h2>

          <div className="flex flex-col lg:flex-row gap-6 md:gap-12 items-stretch">
            <div className="lg:w-1/2 animate-fade-in-down animate-delay-2 flex flex-col justify-center p-2 md:p-4 pt-4 md:pt-8">
              <p className="text-lg mb-4 md:mb-8">
                Our Christian meetings serve as gatherings where believers come together to worship, study scripture, pray, and fellowship with one another. Hebrews 10:25 says, "And let us not neglect our meeting together, as some people do, but encourage one another, especially now that the day of his return is drawing near."
              </p>

              <p className="text-lg mb-4 md:mb-8">
                Scripture study is central to Christian meetings, where passages from the Bible are read and discussed to deepen understanding and spiritual growth. Prayer is a vital component, providing an opportunity for individuals to communicate with God, seek guidance, and intercede for others.
              </p>

              <p className="text-lg mb-4 md:mb-8">
                Fellowship fosters a sense of community and support, allowing believers to share their joys, struggles, and faith journeys with one another.
              </p>
            </div>

            <div className="lg:w-1/2 animate-fade-in-down animate-delay-3 flex flex-col">
              <div className="bg-gray-50 rounded-lg shadow-lg p-4 md:p-8 transition-all duration-300 hover:shadow-xl flex-grow flex flex-col">
                <h3 className="text-2xl font-heading font-bold text-primary mb-5 md:mb-10 text-center fancy-heading-center">
                  Worship Meeting Timings
                </h3>

                <div className="mb-8">
                  <div className="flex items-center justify-center mb-4">
                    <span className="text-secondary mr-3 text-xl">
                      <Calendar className="h-6 w-6" />
                    </span>
                    <span className="text-xl font-semibold">Every {meetingData[0].day}</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {meetingData.map((meeting) => (
                    <div
                      key={meeting.id}
                      className="flex flex-col sm:flex-row sm:items-center p-5 bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:bg-gray-50 hover:translate-y-[-2px] hover:border-l-4 hover:border-secondary"
                    >
                      <div className="sm:w-1/2 mb-3 sm:mb-0">
                        <h4 className="text-lg font-bold text-primary">{meeting.title}</h4>
                        {meeting.location && (
                          <p className="text-sm text-gray-600">{meeting.location}</p>
                        )}
                      </div>
                      <div className="sm:w-1/2 flex items-center justify-end">
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
