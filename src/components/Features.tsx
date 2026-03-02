const Features = () => {
  return (
    <section
      className="bg-black py-20 px-4
        bg-[radial-gradient(rgba(166,255,93,0.15)_1.5px,transparent_0)]
        bg-size-[20px_20px]
        bg-position-[-1px_-1px]"
    >
      <div className="flex items-center flex-col justify-center text-center">
        {/* Heading */}
        <h2 className="text-white text-4xl md:text-[40px] mt-6">
          Built for <span className="text-[#A6FF5D] italic">Speed</span>
        </h2>

        {/* Description */}
        <p className="text-sm md:text-base text-gray-300 text-center max-w-lg mt-4 px-4">
          Build and launch websites instantly with AI.
        </p>

        {/* Feature Grid */}
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {/* Feature 1 */}
          <div className="bg-neutral-900/80 backdrop-blur border border-neutral-800 rounded-2xl hover:-translate-y-3 hover:border-[#A6FF5D]/40 transition duration-300 p-6 flex flex-col">
            <div className="flex-1 flex items-center justify-center">
              <img
                className="w-full object-contain"
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800"
                alt="ai-generation"
              />
            </div>

            <h3 className="text-lg font-medium text-white mt-8 text-left">
              Instant AI Generation
            </h3>

            <p className="text-sm text-white/50 mt-3 text-left">
              Describe your idea and let AI generate layouts, content, and
              structure automatically.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-neutral-900/80 backdrop-blur border border-neutral-800 rounded-2xl hover:-translate-y-3 hover:border-[#A6FF5D]/40 transition duration-300 p-6 flex flex-col">
            <div className="flex-1 flex items-center justify-center">
              <img
                className="w-full object-contain"
                src="https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=800"
                alt="Website builder dashboard"
              />
            </div>

            <h3 className="text-lg font-medium text-white mt-8 text-left">
              Smart Customization
            </h3>

            <p className="text-sm text-white/50 mt-3 text-left">
              Easily tweak design, branding, and layout while AI maintains
              visual consistency.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-neutral-900/80 backdrop-blur border border-neutral-800 rounded-2xl hover:-translate-y-3 hover:border-[#A6FF5D]/40 transition duration-300 p-6 flex flex-col">
            <div className="flex-1 flex items-center justify-center">
              <img
                className="w-full object-contain"
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800"
                alt="Cloud deployment"
              />
            </div>

            <h3 className="text-lg font-medium text-white mt-8 text-left">
              One-Click Deployment
            </h3>

            <p className="text-sm text-white/50 mt-3 text-left">
              Publish your fully responsive website instantly with optimized
              performance and SEO built-in.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
