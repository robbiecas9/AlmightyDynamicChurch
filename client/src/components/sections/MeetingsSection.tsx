import { Clock, Calendar } from "lucide-react";
import { meetingData } from "@/lib/church-data";

const MeetingsSection = () => {
  return (
    <section id="meetings" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="animate-fade-in-down">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary text-center mb-12 animate-fade-in-down animate-delay-1">
            Worship Services & Meetings
          </h2>

          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/2 animate-fade-in-down animate-delay-2">
              <p className="text-lg mb-6">
                Our Christian meetings serve as gatherings where believers come together to worship, study scripture, pray, and fellowship with one another. Hebrews 10:25 says, "And let us not neglect our meeting together, as some people do, but encourage one another, especially now that the day of his return is drawing near."
              </p>

              <p className="text-lg mb-6">
                Scripture study is central to Christian meetings, where passages from the Bible are read and discussed to deepen understanding and spiritual growth. Prayer is a vital component, providing an opportunity for individuals to communicate with God, seek guidance, and intercede for others.
              </p>

              <p className="text-lg mb-8">
                Fellowship fosters a sense of community and support, allowing believers to share their joys, struggles, and faith journeys with one another.
              </p>

              {/* Image removed */}
            </div>

            <div className="lg:w-1/2 animate-fade-in-down animate-delay-3">
              <div className="bg-gray-50 rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-heading font-bold text-primary mb-6">
                  Worship Meeting Timings
                </h3>

                <div className="mb-8">
                  <div className="flex items-center mb-2">
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
                      className="flex flex-col sm:flex-row sm:items-center p-4 bg-white rounded-lg shadow-md"
                    >
                      <div className="sm:w-1/2 mb-3 sm:mb-0">
                        <h4 className="text-lg font-bold text-primary">{meeting.title}</h4>
                        {meeting.location && (
                          <p className="text-sm text-gray-600">{meeting.location}</p>
                        )}
                      </div>
                      <div className="sm:w-1/2 flex items-center">
                        <Clock className="text-secondary mr-2 h-5 w-5" />
                        <span>{meeting.time}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Second image removed */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetingsSection;
