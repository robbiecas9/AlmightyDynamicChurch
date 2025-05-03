const BibleImageSection = () => {
  return (
    <section className="relative py-24" id="bible-section">
      <div className="absolute inset-0 z-0">
        <img
          src="/bible-study.jpg"
          className="object-cover w-full h-full"
          alt="Open Bible"
          onError={(e) => {
            console.error('Failed to load image:', e.currentTarget.src);
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <div className="animate-fade-in-down">
            <p className="text-xl md:text-2xl mb-6 scripture">
              "Come, let us bow down in worship, let us kneel before the LORD our Maker; for he is our God and we are the people of his pasture, the flock under his care"
              <span className="text-secondary font-semibold">( Psalms 95: 6,7)</span>
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
