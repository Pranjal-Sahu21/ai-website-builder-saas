import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound: React.FC = () => {
  return (
    <div className="relative min-h-dvh flex items-center justify-center bg-black text-white px-4 -mb-24 overflow-hidden">

      {/* GRID BACKGROUND */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 60% at 50% 50%, #000 40%, transparent 80%)",
          maskImage:
            "radial-gradient(ellipse 60% 60% at 50% 50%, #000 40%, transparent 80%)",
        }}
      />

      {/* TOP GLOW */}
      <div className="absolute left-1/2 -translate-x-1/2 w-125 h-125 bg-[#A6FF5D]/20 blur-[140px] rounded-full" />

      {/* BOTTOM GLOW */}
      <div className="absolute bottom-0 right-1/4 w-75 h-75 bg-[#A6FF5D]/5 blur-[120px] rounded-full" />

      {/* CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col items-center text-center max-w-lg"
      >
        {/* Animated 404 */}
        <motion.h1
          className="text-[clamp(4rem,15vw,12rem)] font-extrabold text-[#A6FF5D]"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          404
        </motion.h1>

        {/* Heading */}
        <motion.h2
          className="text-2xl md:text-4xl font-semibold mt-2 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Page Not Found
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-white/60 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Oops! The page you are looking for does not exist or has been moved.
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link
            to="/"
            className="relative group bg-[#A6FF5D] hover:opacity-90 transition-all text-black px-5 py-2 rounded-full overflow-hidden"
          >
            <span className="relative z-10 text-sm">Go Back Home</span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;