import { bibleImageContent } from "@/lib/church-data";

const BibleImageSection = () => {
  return (
    <section className="py-24 bg-cover bg-center" id="bible-section" style={{ backgroundImage: "url('/bible-study.jpg')" }}>
      <div className="bg-black bg-opacity-60 -mx-4 px-4 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <p className="text-xl md:text-2xl mb-6 scripture">
              "{bibleImageContent.content}"
              <span className="text-secondary font-semibold">( {bibleImageContent.reference})</span>
            </p>

            <div className="mt-8">
              <a
                href="#meetings"
                className="bg-white text-primary hover:bg-secondary hover:text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg"
              >
                Join Our Worship
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BibleImageSection;
