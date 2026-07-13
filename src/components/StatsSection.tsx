import { motion } from "framer-motion";
import { NumberTicker } from "./NumberTicker";

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
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" as const },
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

const statsData = [
  {
    prefix: "",
    to: 1.2,
    suffix: "M+",
    decimals: 1,
    label: "Pages Generated",
    description: "Deploying responsive, highly structured landing pages instantly to Vercel's global edge network.",
  },
  {
    prefix: "< ",
    to: 150,
    suffix: "ms",
    decimals: 0,
    label: "Average Load Time",
    description: "Lightning-fast page load speeds achieved via optimal asset delivery and next-gen static builds.",
  },
  {
    prefix: "",
    to: 15,
    suffix: "k+",
    decimals: 0,
    label: "Global Active Builders",
    description: "A fast-growing community of startup founders, visual creators, and web developers.",
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
        <motion.h2
          variants={slideLeftItem}
          className="text-4xl md:text-5xl text-white tracking-tight text-center md:text-left mb-8 font-light w-full"
        >
          Genixor in <span className="text-[#A6FF5D] italic">Numbers</span>
        </motion.h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {statsData.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={item}
              className="bg-neutral-900/40 border border-neutral-800 rounded-3xl p-10 backdrop-blur-sm relative overflow-hidden group hover:border-[#A6FF5D]/30 transition-all duration-300 flex flex-col justify-between items-start text-left min-h-[260px] w-full"
            >
              {/* Number Ticker */}
              <div className="text-white text-5xl md:text-6xl font-light tracking-tight mb-2 flex items-baseline">
                <span>{stat.prefix}</span>
                <NumberTicker value={stat.to} decimalPlaces={stat.decimals} />
                <span>{stat.suffix}</span>
              </div>

              {/* Labels & Descriptions */}
              <div className="mt-4 w-full">
                <p className="text-white text-xs tracking-wider uppercase font-light mb-2">
                  {stat.label}
                </p>
                <p className="text-white/50 text-xs md:text-[13px] leading-relaxed font-light">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default StatsSection;
