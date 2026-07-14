import { motion } from "framer-motion";
import { MessageSquare, Cpu, Sliders, Share2 } from "lucide-react";

// Mockup image asset imports
import SimplePromptImg from "../assets/Simple_Prompt.png";
import AIGeneratesImg from "../assets/AI_Generates.png";
import TweakDesignImg from "../assets/Tweak_Design.png";
import PublishCommunityImg from "../assets/Publish_Community.png";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 0 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const slideLeftItem = {
  hidden: { opacity: 0, x: -35 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const stepsData = [
  {
    num: "01",
    icon: MessageSquare,
    title: "Enter Your Idea",
    description:
      "Type a simple prompt describing your project or brand concept.",
    image: SimplePromptImg,
    isWide: true,
  },
  {
    num: "02",
    icon: Cpu,
    title: "AI Generates",
    description: "AI handles layout grids, asset selection, and themes.",
    image: AIGeneratesImg,
    isWide: false,
  },
  {
    num: "03",
    icon: Sliders,
    title: "Tweak & Customize",
    description: "Tweak layouts, modify components, and refine sections.",
    image: TweakDesignImg,
    isWide: false,
  },
  {
    num: "04",
    icon: Share2,
    title: "Publish to Community",
    description:
      "Share your generated landing page to our public community feed.",
    image: PublishCommunityImg,
    isWide: true,
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-black py-20 px-4 relative overflow-hidden"
    >
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-[#A6FF5D]/2 blur-[150px] rounded-full pointer-events-none" />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={container}
        className="max-w-6xl mx-auto flex flex-col items-start w-full"
      >
        {/* Heading */}
        <div className="mb-14 w-full text-left">
          <motion.h2
            variants={slideLeftItem}
            className="text-white text-4xl md:text-5xl tracking-tight text-center md:text-left font-light"
          >
            How it <span className="text-[#A6FF5D] italic">Works</span>
          </motion.h2>
        </div>

        {/* Steps Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-6 w-full">
          {stepsData.map((step, idx) => {
            const Icon = step.icon;
            const isWide = step.isWide;
            return (
              <motion.div
                key={idx}
                variants={item}
                className={`bg-neutral-900/80 border border-neutral-800 rounded-3xl backdrop-blur-md relative overflow-hidden group hover:border-[#A6FF5D]/40 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(166,255,93,0.02)] transition-all duration-300 flex flex-col items-stretch w-full max-w-[92%] mx-auto md:max-w-none ${
                  isWide ? "md:col-span-3" : "md:col-span-2"
                }`}
              >
                {/* SVG Dotted Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] opacity-30 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none" />

                {/* Radial Accent Glow */}
                <div className="absolute top-0 right-0 w-28 h-28 bg-[#A6FF5D]/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Full Bleed Step Mockup Image */}
                <div className={`overflow-hidden bg-black relative z-10 shrink-0 w-full aspect-[21/9] md:aspect-auto md:h-[280px] ${
                  idx === 0 ? "px-4 pb-0 pt-0" : idx === 1 || idx === 2 ? "max-md:px-4 max-md:pb-0 max-md:pt-0" : ""
                }`}>
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                    style={{ objectPosition: "center 15%" }}
                  />
                  {/* Mockup Fade Overlay (Bottom) */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none z-20" />
                </div>

                {/* Content Block */}
                <div className="w-full flex flex-col relative z-10 p-5 flex-grow justify-between">
                  {/* Header Row: Indicator and Icon Badge */}
                  <div className="flex items-center justify-between w-full mb-4">
                    <span className="text-white/10 text-4xl font-light font-mono tracking-tighter select-none group-hover:text-[#A6FF5D]/25 transition-colors duration-300">
                      {step.num}
                    </span>
                    <div className="p-2.5 bg-[#A6FF5D]/10 text-[#A6FF5D] rounded-2xl shrink-0 flex items-center justify-center group-hover:bg-[#A6FF5D]/20 group-hover:scale-105 transition-all duration-300">
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                  </div>

                  {/* Info block */}
                  <div className="w-full mt-auto">
                    <h3 className="text-white text-base font-medium mb-1.5 group-hover:text-[#A6FF5D] transition-colors duration-300 line-clamp-1">
                      {step.title}
                    </h3>
                    <div className="mt-2 w-full">
                      <p className="text-neutral-400 text-xs md:text-[13px] leading-relaxed font-light line-clamp-2">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
