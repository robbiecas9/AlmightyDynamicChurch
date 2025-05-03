import { pastorMessageContent } from "@/lib/church-data";

const PastorMessage = () => {
  // Split the content into paragraphs
  const paragraphs = pastorMessageContent.content.split('. ').reduce((acc, sentence, index, array) => {
    // Determine paragraph breaks roughly every 2-3 sentences
    const paragraphIndex = Math.floor(index / 3);
    if (!acc[paragraphIndex]) acc[paragraphIndex] = '';
    acc[paragraphIndex] += sentence + (index < array.length - 1 ? '. ' : '');
    return acc;
  }, [] as string[]);

  return (
    <section id="pastor-message" className="py-10 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="animate-fade-in-down">
          <h2
            className="text-3xl md:text-4xl font-heading font-bold text-primary text-center mb-4 md:mb-16 fancy-heading animate-heading"
          >
            {pastorMessageContent.title.toUpperCase()}
          </h2>

          <div className="flex flex-col md:flex-row items-center mt-2 md:mt-0">
            <div className="md:w-1/3 mb-4 md:mb-0 animate-fade-in-down animate-delay-2">
              <div className="relative rounded-full overflow-hidden w-48 h-48 md:w-64 md:h-64 mx-auto border-4 border-secondary shadow-lg">
                <img
                  src={pastorMessageContent.imageUrl}
                  className="object-cover w-full h-full"
                  alt="Pastor"
                />
              </div>
              <div className="text-center mt-4">
                <h3 className="text-xl font-heading font-bold">{pastorMessageContent.name}</h3>
                <p className="text-gray-600">{pastorMessageContent.position}</p>
              </div>
            </div>

            <div className="md:w-2/3 md:pl-12 animate-fade-in-down animate-delay-3">
              <div className="prose prose-base md:prose-lg max-w-none">
                {paragraphs.map((paragraph, index) => (
                  <p key={index} className={index === paragraphs.length - 1 ? "font-semibold" : "mb-3 md:mb-4"}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PastorMessage;
