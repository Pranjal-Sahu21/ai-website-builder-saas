import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AnimatedHeadline from "./AnimatedHeadline";
import "./HeroSection.css";

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Animation Variants
  const descriptionVariant = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
        delay: 1.4, // Staggered after heading animation finishes
      },
    },
  };

  const buttonsVariant = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
        delay: 1.6, // Staggered after description animation finishes
      },
    },
  };

  return (
    <header
      id="header"
      className="min-h-dvh bg-black text-white flex flex-col bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage:
          "url('https://assets.prebuiltui.com/images/components/hero-section/hero-background-image.png')",
      }}
    >
      {/* CENTERED CONTENT WRAPPER */}
      <div className="flex flex-1 flex-col items-center justify-center text-center px-4">
        {/* HEADING */}
        <AnimatedHeadline
          as="h1"
          className="text-4xl md:text-[80px]/[98px] max-w-5xl leading-tight tracking-tight text-white font-light"
          triggerOnView={false}
          stagger={30}
        >
          Build Stunning Websites <br />with AI in{" "}
          <span className="text-[#A6FF5D] italic">seconds</span>
        </AnimatedHeadline>

        {/* DESCRIPTION */}
        <motion.p
          variants={descriptionVariant}
          initial="hidden"
          animate="show"
          className="text-sm md:text-base text-white/70 max-w-lg mt-6 font-light"
        >
          Describe your vision and let AI generate a complete, ready-to-launch
          website tailored to your brand and goals.
        </motion.p>

        {/* BUTTONS */}
        <motion.div
          variants={buttonsVariant}
          initial="hidden"
          animate="show"
          className="flex min-[375px]:flex-row flex-col gap-3 mt-8 w-[90%] max-w-md justify-center"
        >
          <button
            onClick={() => navigate("/generate")}
            className="bg-[#A6FF5D] hover:bg-[#A6FF5D]/90 text-gray-900 px-6 py-2.5 rounded-full text-sm transition w-full min-[375px]:w-auto font-medium"
          >
            Generate website
          </button>

          <button
            onClick={() => {
              document
                .getElementById("features")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-white/10 hover:bg-white/20 px-6 py-2.5 rounded-full text-sm text-white transition w-full min-[375px]:w-auto"
          >
            See Features
          </button>
        </motion.div>
      </div>

      {/* SCROLL INDICATOR */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          delay: 1,
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer"
      >
        <svg
          onClick={() => handleClick("features")}
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
      </motion.div>
    </header>
  );
};

export default HeroSection;
