const ScriptureBanner = () => {
  return (
    <section className="py-12 bg-primary">
      <div className="container mx-auto px-4">
        <div className="scripture text-center text-white max-w-4xl mx-auto animate-fade-in-down">
          <p className="text-xl md:text-2xl">
            "All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness"
            <span className="text-secondary font-semibold">( 2 Timothy 3: 16)</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ScriptureBanner;
