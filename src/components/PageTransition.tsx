import { motion } from "framer-motion";
import React, { useEffect } from "react";

interface PageTransitionProps {
  children: React.ReactNode;
}

// Premium cubic-bezier easing to match Zynero / Framer style transitions (Apple-style easeOut)
const transitionEasing: [number, number, number, number] = [0.16, 1, 0.3, 1];

const pageVariants = {
  initial: {
    opacity: 0,
    filter: "blur(20px)",
    scale: 0.96,
    y: 35,
  },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: transitionEasing,
      // Allow internal elements to coordinate animations if needed
      when: "beforeChildren",
    },
  },
  exit: {
    opacity: 0,
    filter: "blur(20px)",
    scale: 0.96,
    y: -35,
    transition: {
      duration: 0.45,
      ease: transitionEasing,
    },
  },
};



const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  // Automatically scroll to top on page transition mount
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant" as ScrollBehavior, // Direct snap to top to prevent scrolling layout during transition
    });
  }, []);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full min-h-screen origin-top"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
