import { useEffect, useState } from "react";
import favicon from "../assets/favicon.svg";
import { Link, useLocation } from "react-router-dom";
import useScrollToSection from "../hooks/useScrollToSection";
import { authClient } from "@/lib/auth-client";
import { UserButton } from "@daveyplate/better-auth-ui";
import api from "@/configs/axios.config";
import { toast } from "sonner";
import { Loader2Icon, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavLinkItem {
  label: string;
  to: string;
  sectionId?: string;
}

const menuVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const linkVariants = {
  hidden: { opacity: 0, x: -60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [credits, setCredits] = useState(0);
  const [loadingCredits, setLoadingCredits] = useState(false);

  const scrollToSection = useScrollToSection();
  const location = useLocation();

  const { data: session } = authClient.useSession();

  // Get credits function
  const getCredits = async () => {
    try {
      setLoadingCredits(true);
      const { data } = await api.get("/api/user/credits");
      setLoadingCredits(false);
      setCredits(data?.credits);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
      console.log(error);
    }
  };

  // Get credits if user logged in on mount
  useEffect(() => {
    if (session?.user) {
      getCredits();
    }
  }, [session?.user]);

  // Links definitions
  const authenticatedLinks: NavLinkItem[] = [
    { label: "Projects", to: "/projects" },
    { label: "Community", to: "/community" },
    { label: "Pricing", to: "/pricing" },
  ];

  const guestLinks: NavLinkItem[] = [
    { label: "Features", to: "/", sectionId: "features" },
    { label: "Community", to: "/community" },
    { label: "Pricing", to: "/pricing" },
    { label: "Testimonials", to: "/", sectionId: "testimonials" },
    { label: "FAQs", to: "/", sectionId: "faq" },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed top-0 z-20 w-full h-20 
      flex flex-col items-center justify-center
      bg-black/10 backdrop-blur-3xl"
    >
      <div className="flex items-center justify-between p-4 md:px-16 lg:px-24 xl:px-32 md:py-4 w-full">
        {/* Logo */}
        <Link to="/" className="text-xl text-white flex items-center gap-2">
          <img src={favicon} alt="logo" className="h-8 w-8" /> Genixor
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-8 text-sm">
          {(session ? authenticatedLinks : guestLinks).map((link, idx) => (
            <Link
              key={idx}
              to={link.to}
              state={link.sectionId ? { scrollTo: link.sectionId } : undefined}
              onClick={(e) => {
                if (link.sectionId && location.pathname === "/") {
                  e.preventDefault();
                  scrollToSection(link.sectionId);
                }
              }}
              className="text-white/80 hover:text-[#A6FF5D] transition font-medium"
            >
              {link.label}
            </Link>
          ))}

          {session ? (
            <div className="flex gap-4 justify-center items-center">
              <span className="text-white/80 gap-1 flex">
                Credits:{" "}
                <span className="text-[#a6ff5d]">
                  {loadingCredits ? (
                    <Loader2Icon className="size-4 animate-spin" />
                  ) : (
                    credits
                  )}
                </span>
              </span>
              <UserButton size="icon" />
            </div>
          ) : (
            <Link
              to="/auth/sign-in"
              className="bg-[#A6FF5D] hover:bg-[#A6FF5D]/90 text-gray-900 px-6 py-2 text-sm rounded-full transition font-medium"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile controls */}
        <div className="flex -mr-2 justify-center items-center lg:hidden md:gap-2">
          {session && (
            <div className="flex justify-center items-center mr-2">
              <span className="text-white/80 p-3 rounded-full text-sm flex items-center justify-center gap-1">
                Credits:
                <span className="text-[#a6ff5d]">
                  {loadingCredits ? (
                    <Loader2Icon className="size-4 animate-spin" />
                  ) : (
                    credits
                  )}
                </span>
              </span>
              <UserButton size="icon" />
            </div>
          )}

          {!session && (
            <Link
              to="/auth/sign-in"
              className="border bg-[#A6FF5D] hover:bg-[#A6FF5D]/90 text-gray-900 px-6 py-2 text-sm rounded-full transition font-medium mr-2"
            >
              Login
            </Link>
          )}

          {/* Hamburger toggle */}
          <button
            onClick={() => setMenuOpen(true)}
            className="hover:bg-[#A6FF5D]/10 px-4 py-2 rounded-full text-white text-xl transition"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 220 }}
            className="fixed inset-0 z-50 bg-black/98 backdrop-blur-3xl flex flex-col justify-center items-start pl-8 sm:pl-20 md:pl-32 lg:hidden w-full h-screen"
          >
            {/* Close button in top right of menu */}
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-5 right-4 hover:bg-[#A6FF5D]/10 px-4 py-2 rounded-full text-white text-xl transition"
            >
              ✕
            </button>

            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="show"
              className="flex flex-col gap-6 text-left items-start w-full"
            >
              {(session ? authenticatedLinks : guestLinks).map((link, idx) => (
                <motion.div key={idx} variants={linkVariants}>
                  <Link
                    to={link.to}
                    state={link.sectionId ? { scrollTo: link.sectionId } : undefined}
                    onClick={(e) => {
                      if (link.sectionId && location.pathname === "/") {
                        e.preventDefault();
                        scrollToSection(link.sectionId);
                      }
                      setMenuOpen(false);
                    }}
                    className="text-5xl sm:text-6xl md:text-7xl text-white/90 hover:text-[#A6FF5D] font-extralight tracking-tighter transition block leading-tight"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {session && (
                <motion.div variants={linkVariants} className="mt-4">
                  <button
                    onClick={() => {
                      authClient.signOut();
                      setMenuOpen(false);
                    }}
                    className="text-2xl text-red-500 hover:text-red-400 transition font-light flex items-center gap-2"
                  >
                    <LogOut size={20} />
                    Sign Out
                  </button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
