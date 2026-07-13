import { useEffect, useState } from "react";
import { Sparkles, Loader2Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import api from "@/configs/axios.config";
import { motion } from "framer-motion";
import AnimatedHeadline from "../components/AnimatedHeadline";

const PLACEHOLDERS = [
  "SaaS dashboard with analytics...",
  "minimalist photography portfolio...",
  "streetwear e-commerce store...",
  "task manager with kanban board...",
  "food delivery landing page...",
];

function useTypingPlaceholder(placeholders: string[], typingSpeed = 50, deletingSpeed = 30, pauseDuration = 2000) {
  const [placeholder, setPlaceholder] = useState("");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const currentFullText = placeholders[currentIdx];

    if (!isDeleting) {
      // Typing phase
      if (placeholder.length < currentFullText.length) {
        timer = setTimeout(() => {
          setPlaceholder(currentFullText.slice(0, placeholder.length + 1));
        }, typingSpeed);
      } else {
        // Full text reached, pause before deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      // Deleting phase
      if (placeholder.length > 0) {
        timer = setTimeout(() => {
          setPlaceholder(currentFullText.slice(0, placeholder.length - 1));
        }, deletingSpeed);
      } else {
        // Fully deleted, move to next item
        setIsDeleting(false);
        setCurrentIdx((prevIdx) => (prevIdx + 1) % placeholders.length);
      }
    }

    return () => clearTimeout(timer);
  }, [placeholder, isDeleting, currentIdx, placeholders, typingSpeed, deletingSpeed, pauseDuration]);

  return placeholder;
}

export default function GeneratePage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const animatedPlaceholder = useTypingPlaceholder(PLACEHOLDERS);

  const { data: session, isPending } = useSession();
  const username = session?.user?.name?.split(" ")[0] || "User";

  const navigate = useNavigate();

  // Submit prompt function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!session?.user) {
        return toast.error("Please sign in to create a project");
      } else if (!prompt.trim()) {
        return toast.error("Please enter a prompt");
      }

      setLoading(true);

      const { data } = await api.post("/api/user/project", {
        initial_prompt: prompt,
      });

      setLoading(false);
      navigate(`/projects/${data.projectId}`);
    } catch (error: any) {
      setLoading(false);
      toast.error(error?.response?.data?.message || error.message);
      console.log(error);
    }
  };

  // Check if signed in
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isPending && !session?.user) {
      navigate("/auth/sign-in");
      toast("Please login to start building.");
    }
  }, [session?.user, isPending]);

  // Animations
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 1.1, // Stagger elements after headline blur-in finishes
      },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <div className="relative -mb-20 min-h-screen flex items-center justify-center px-6 bg-black text-white overflow-hidden">
      {/* TOP ACCENT GLOW */}
      <div className="absolute left-[24%] w-175 h-175 bg-[#A6FF5D]/10 blur-[160px] rounded-full" />

      {/* GRID BACKGROUND */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
          linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)",
          maskImage:
            "radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)",
        }}
      />

      {/* Bottom Glow */}
      <div className="absolute bottom-0 right-1/4 w-125 h-125 bg-[#A6FF5D]/5 blur-[140px] rounded-full"></div>

      {/* LOADING */}
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            <Loader2Icon className="w-10 h-10 text-[#A6FF5D] animate-spin" />
            <p className="text-sm text-white/70 animate-pulse">
              Generating your project...
            </p>
          </div>

          <div className="absolute w-72 h-72 bg-[#A6FF5D]/10 blur-[120px] rounded-full"></div>
        </div>
      )}

      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-3xl text-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8"
        >
          <AnimatedHeadline
            as="h1"
            className="text-5xl md:text-6xl font-light tracking-tight"
            triggerOnView={false}
          >
            Hi, <span className="text-[#A6FF5D] italic">{username}</span> !
          </AnimatedHeadline>
        </motion.div>

        {/* Staggered Content Container */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="w-full flex flex-col items-center"
        >
          <motion.p variants={item} className="text-white/60 text-sm">
            What would you like to build today?
          </motion.p>

          {/* FORM */}
          <motion.form variants={item} onSubmit={handleSubmit} className="mt-8 w-full">
            <div className="relative bg-neutral-950 rounded-2xl shadow-[0_0_80px_rgba(0,0,0,0.9)]">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={`Build a ${animatedPlaceholder}`}
                className="w-full h-36 bg-neutral-950 border border-neutral-800 rounded-xl px-5 py-4 pr-16 text-sm outline-none focus:border-[#A6FF5D]/40 resize-none animate-placeholder"
              />

              <motion.button
                whileHover={{ opacity: 0.9 }}
                type="submit"
                disabled={loading}
                className="absolute bottom-6 right-6 flex items-center justify-center bg-[#A6FF5D] text-black p-3 rounded-lg hover:brightness-110 disabled:cursor-not-allowed transition disabled:opacity-50"
              >
                {loading ? (
                  <Loader2Icon size={18} className="animate-spin" />
                ) : (
                  <Sparkles size={18} />
                )}
              </motion.button>
            </div>
          </motion.form>

          {/* Suggestions */}
          <motion.div
            variants={item}
            className="mt-8 hidden md:flex flex-wrap justify-center gap-3 text-sm"
          >
            {[
              "Create a blog platform",
              "Make a task manager",
              "Build a landing page",
            ].map((idea) => (
              <motion.button
                key={idea}
                onClick={() => setPrompt(idea)}
                className="px-4 py-2 bg-neutral-900 border border-neutral-600 rounded-full hover:border-[#A6FF5D]/40 hover:text-[#A6FF5D] transition"
              >
                {idea}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
