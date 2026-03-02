import "./HeroSection.css";
const HeroSection: React.FC = () => {
  return (
    <header
      className="md:min-h-dvh bg-black text-white flex flex-col items-center bg-cover bg-center bg-no-repeat pb-10"
      style={{
        backgroundImage:
          "url('https://assets.prebuiltui.com/images/components/hero-section/hero-background-image.png')",
      }}
    >
      {/* BADGE */}
      <div className="rainbow relative z-0 bg-white/15 overflow-hidden p-px flex items-center justify-center rounded-full mt-32 md:mt-42">
        <div className="flex items-center gap-3 pl-4 pr-6 py-3 text-white rounded-full font-medium bg-neutral-900 backdrop-blur">
          {/* Pulsing Dot */}
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A6FF5D] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#A6FF5D]"></span>
          </span>

          <span className="text-xs">AI-Powered Website Builder</span>
        </div>
      </div>

      {/* HEADING */}
      <h1 className="text-4xl md:text-[64px]/[82px] text-center max-w-4xl mt-5 leading-tight px-4">
        Build Stunning Websites with AI in <span className="accent-text text-[#A6FF5D] font-medium italic">seconds</span>
      </h1>

      {/* DESCRIPTION */}
      <p className="text-sm md:text-base text-gray-300 text-center max-w-lg mt-4 px-4">
        Describe your vision and let AI generate a complete, ready-to-launch
        website tailored to your brand and goals.
      </p>

      {/* BUTTONS */}
      <div className="flex min-[375px]:flex-row flex-col gap-3 mt-8">
        <button className="bg-[#A6FF5D] hover:bg-[#A6FF5D]/90 text-gray-900 px-6 py-2.5 rounded-full text-sm transition">
          Generate My Website
        </button>

        <button className="bg-white/10 hover:bg-white/20 px-6 py-2.5 rounded-full text-sm text-white transition">
          See Features
        </button>
      </div>

      {/* DOWN ARROW SCROLL INDICATOR */}
      <div className="flex items-center justify-center mt-20 animate-bounce cursor-pointer">
        <svg
          className="w-6 h-6 text-white/60"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </header>
  );
};

export default HeroSection;
