import { scriptureBannerContent } from "@/lib/church-data";

const ScriptureBanner = () => {
  return (
    <section className="py-12 bg-primary">
      <div className="container mx-auto px-4">
        <div className="scripture text-center text-white max-w-4xl mx-auto animate-fade-in-down">
          <p className="text-xl md:text-2xl">
            "{scriptureBannerContent.content}"
            <span className="text-secondary font-semibold">( {scriptureBannerContent.reference})</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ScriptureBanner;
