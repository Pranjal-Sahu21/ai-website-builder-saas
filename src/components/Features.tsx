import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
} as const;

const item = {
  hidden: { opacity: 0, y: 70 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
} as const;

const slideLeftItem = {
  hidden: { opacity: 0, x: -35 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
} as const;

const Features = () => {
  return (
    <section
      id="features"
      className="bg-black py-20 px-4"
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto px-4 text-center md:text-left"
      >
        {/* Heading */}
        <motion.h2
          variants={slideLeftItem}
          className="text-white text-4xl md:text-5xl mt-6 tracking-tight text-center md:text-left font-light"
        >
          Built for <span className="text-[#A6FF5D] italic">Speed</span>
        </motion.h2>

        {/* Feature Grid */}
        <motion.div
          variants={container}
          className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14"
        >
          {/* Feature 1 */}
          <motion.div
            variants={item}
            className="group bg-neutral-900/80 backdrop-blur border border-neutral-800 rounded-2xl hover:border-[#A6FF5D]/40 transition-colors duration-300 p-6 flex flex-col"
          >
            <div className="w-full aspect-16/10 overflow-hidden rounded-xl bg-neutral-800">
              <img
                src="https://images.unsplash.com/photo-1677442135136-760c813028c0?q=80&w=1200"
                alt="ai-generation"
                className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
              />
            </div>

            <h3 className="text-lg text-white mt-6 text-left">
              Instant AI Generation
            </h3>

            <p className="text-sm text-white/50 mt-3 text-left">
              Describe your idea and let AI generate layouts, content, and
              structure automatically.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            variants={item}
            className="group bg-neutral-900/80 backdrop-blur border border-neutral-800 rounded-2xl hover:border-[#A6FF5D]/40 transition-colors duration-300 p-6 flex flex-col"
          >
            <div className="w-full aspect-16/10 overflow-hidden rounded-xl bg-neutral-800">
              <img
                src="https://plus.unsplash.com/premium_photo-1721910821871-f8caece8d381?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8V2Vic2l0ZSUyMEN1c3RvbWl6YXRpb258ZW58MHx8MHx8fDA%3D"
                alt="dashboard"
                className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
              />
            </div>

            <h3 className="text-lg text-white mt-6 text-left">
              Smart Customization
            </h3>

            <p className="text-sm text-white/50 mt-3 text-left">
              Easily tweak design, branding, and layout while AI maintains
              visual consistency.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            variants={item}
            className="group bg-neutral-900/80 backdrop-blur border border-neutral-800 rounded-2xl hover:border-[#A6FF5D]/40 transition-colors duration-300 p-6 flex flex-col"
          >
            <div className="w-full aspect-16/10 overflow-hidden rounded-xl bg-neutral-800">
              <img
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200"
                alt="deployment"
                className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
              />
            </div>

            <h3 className="text-lg text-white mt-6 text-left">
              One-Click Deployment
            </h3>

            <p className="text-sm text-white/50 mt-3 text-left">
              Publish your fully responsive website instantly with optimized
              performance and SEO built-in.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Features;
