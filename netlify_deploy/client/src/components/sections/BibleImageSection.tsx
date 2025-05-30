import { bibleImageContent } from "@/lib/church-data";

const BibleImageSection = () => {
  return (
    <section className="relative py-16 md:py-24" id="bible-section">
      <div className="absolute inset-0 z-0">
        <img
          src="/open-bible.jpg"
          className="object-cover w-full h-full"
          alt="Open Bible"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center text-white">
          <p className="text-lg md:text-xl lg:text-2xl mb-4 md:mb-6 scripture">
            "{bibleImageContent.content}"
            <span className="text-secondary font-semibold block mt-2">( {bibleImageContent.reference})</span>
          </p>

          <div className="mt-6 md:mt-8">
            <a
              href="#meetings"
              className="bg-white text-primary hover:bg-secondary hover:text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg"
            >
              Join Our Worship
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BibleImageSection;
