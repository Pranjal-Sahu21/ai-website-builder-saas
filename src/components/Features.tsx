import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
} as const;

const item = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
} as const;

const Features = () => {
  return (
    <section
      id="features"
      className="bg-black py-20 px-4
        bg-[radial-gradient(rgba(166,255,93,0.15)_1.5px,transparent_0)]
        bg-size-[20px_20px]
        bg-position-[-1px_-1px] bg-fixed"
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="flex items-center flex-col justify-center text-center"
      >
        {/* Heading */}
        <motion.h2
          variants={item}
          className="text-white text-3xl md:text-4xl mt-6"
        >
          Built for <span className="text-[#A6FF5D] italic">Speed</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={item}
          className="text-white/50 text-sm max-w-md mx-auto mt-4"
        >
          Build and launch websites instantly with AI.
        </motion.p>

        {/* Feature Grid */}
        <motion.div
          variants={container}
          className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14"
        >
          {/* Feature 1 */}
          <motion.div
            variants={item}
            className="group bg-neutral-900/80 backdrop-blur border border-neutral-800 rounded-2xl hover:border-[#A6FF5D]/40 transition duration-300 p-6 flex flex-col"
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
            className="group bg-neutral-900/80 backdrop-blur border border-neutral-800 rounded-2xl hover:border-[#A6FF5D]/40 transition duration-300 p-6 flex flex-col"
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
            className="group bg-neutral-900/80 backdrop-blur border border-neutral-800 rounded-2xl hover:border-[#A6FF5D]/40 transition duration-300 p-6 flex flex-col"
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
