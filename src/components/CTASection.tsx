import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { authClient } from "@/lib/auth-client";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const slideLeftItem = {
  hidden: { opacity: 0, x: -50 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const slideRightItem = {
  hidden: { opacity: 0, x: 50 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const CTASection = () => {
  const { data: session } = authClient.useSession();

  return (
    <section className="bg-black py-28 px-4 relative overflow-hidden flex items-center justify-center">
      {/* Background Accent Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#A6FF5D]/5 blur-[160px] rounded-full pointer-events-none" />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 max-w-5xl w-full bg-neutral-900/70 border border-neutral-800/80 rounded-3xl p-6 sm:p-10 md:p-14 backdrop-blur-sm"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Side: Main Text */}
          <motion.div
            variants={slideLeftItem}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-left leading-tight max-w-xl">
              Ready to build your next website <span className="text-[#A6FF5D] italic">instantly?</span>
            </h2>
          </motion.div>

          {/* Right Side: Social Proof and Buttons */}
          <motion.div
            variants={slideRightItem}
            className="lg:col-span-6 flex flex-col gap-6 items-start text-left lg:border-l lg:border-neutral-800/80 lg:pl-10"
          >
            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <div className="flex -space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
                  alt="avatar"
                  className="w-9 h-9 rounded-full border-2 border-neutral-900 object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
                  alt="avatar"
                  className="w-9 h-9 rounded-full border-2 border-neutral-900 object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200"
                  alt="avatar"
                  className="w-9 h-9 rounded-full border-2 border-neutral-900 object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200"
                  alt="avatar"
                  className="w-9 h-9 rounded-full border-2 border-neutral-900 object-cover"
                />
              </div>
              <p className="text-white/70 text-sm">
                Join <span className="text-white font-medium">1,000+ creators</span> building fast
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <Link
                to={session ? "/generate" : "/auth/sign-in"}
                className="w-full px-6 py-3.5 bg-[#A6FF5D] hover:bg-[#A6FF5D]/90 text-gray-900 font-medium text-sm rounded-full transition text-center whitespace-nowrap"
              >
                Start Building Free
              </Link>
              <Link
                to="/community"
                className="w-full px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-medium text-sm rounded-full transition text-center whitespace-nowrap"
              >
                Browse Community
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;
