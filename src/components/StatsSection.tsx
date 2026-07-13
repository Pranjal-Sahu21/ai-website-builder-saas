import { motion } from "framer-motion";
import { NumberTicker } from "./NumberTicker";
import { Layers, Zap, Users } from "lucide-react";

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
  hidden: { opacity: 0, x: -70 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
} as const;

const statsData = [
  {
    prefix: "",
    to: 1.2,
    suffix: "M+",
    decimals: 1,
    label: "Pages Generated",
    description: "Deploying responsive, highly structured landing pages instantly to Vercel's global edge network.",
    icon: Layers,
  },
  {
    prefix: "< ",
    to: 150,
    suffix: "ms",
    decimals: 0,
    label: "Average Load Time",
    description: "Lightning-fast page load speeds achieved via optimal asset delivery and next-gen static builds.",
    icon: Zap,
  },
  {
    prefix: "",
    to: 15,
    suffix: "k+",
    decimals: 0,
    label: "Global Active Builders",
    description: "A fast-growing community of startup founders, visual creators, and web developers.",
    icon: Users,
  },
];

const StatsSection = () => {
  return (
    <section id="stats" className="bg-black py-28 px-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#A6FF5D]/3 blur-[180px] rounded-full pointer-events-none" />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={container}
        className="max-w-6xl mx-auto flex flex-col items-start w-full"
      >
        {/* Heading */}
        <div className="mb-12 w-full text-left">
          <motion.h2
            variants={slideLeftItem}
            className="text-white text-4xl md:text-5xl mt-6 tracking-tight text-center md:text-left font-light"
          >
            Genixor in <span className="text-[#A6FF5D] italic">Numbers</span>
          </motion.h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {statsData.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                variants={item}
                className="bg-neutral-900/80 border border-neutral-800 rounded-3xl p-8 backdrop-blur-md relative overflow-hidden group hover:border-[#A6FF5D]/40 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(166,255,93,0.02)] transition-all duration-300 flex flex-col justify-between items-start text-left min-h-[250px] w-full"
              >
                {/* Top Row: Number Ticker and Icon Badge Side-by-Side */}
                <div className="flex items-center justify-between w-full relative z-10">
                  {/* Number Ticker */}
                  <div className="text-white text-5xl md:text-6xl font-light tracking-tight flex items-baseline gap-0.5 group-hover:text-[#A6FF5D] transition-colors duration-300">
                    <span className="text-neutral-400 font-light text-4xl mr-1">{stat.prefix}</span>
                    <NumberTicker value={stat.to} decimalPlaces={stat.decimals} />
                    <span className="text-[#A6FF5D] font-light">{stat.suffix}</span>
                  </div>

                  {/* Glassmorphic Icon Badge */}
                  <div className="p-3 bg-[#A6FF5D]/10 text-[#A6FF5D] rounded-2xl shrink-0 flex items-center justify-center group-hover:bg-[#A6FF5D]/20 group-hover:scale-105 transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="w-full relative z-10">
                  {/* Labels & Descriptions */}
                  <div className="border-t border-neutral-700/80 pt-4 w-full group-hover:border-[#A6FF5D]/30 transition-colors duration-300">
                    <p className="text-white text-[11px] tracking-wider uppercase group-hover:text-[#A6FF5D]/80 transition-colors duration-300">
                      {stat.label}
                    </p>
                    <p className="text-neutral-400 text-xs md:text-[13px] leading-relaxed font-light">
                      {stat.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default StatsSection;
