const PastorMessage = () => {
  return (
    <section id="pastor-message" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="animate-fade-in-down">
          <h2
            className="text-3xl md:text-4xl font-heading font-bold text-primary text-center mb-12 animate-fade-in-down animate-delay-1"
          >
            MESSAGE FROM SENIOR PASTOR
          </h2>

          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 mb-8 md:mb-0 animate-fade-in-down animate-delay-2">
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
            </div>

            <div className="md:w-2/3 md:pl-12 animate-fade-in-down animate-delay-3">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PastorMessage;
