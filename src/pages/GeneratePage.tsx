import { useEffect, useState } from "react";
import { Sparkles, Loader2Icon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import api from "@/configs/axios.config";
import { motion } from "framer-motion";

export default function GeneratePage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const { data: session } = useSession();
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
    if (!session?.user) {
      navigate("/auth/sign-in");
      toast("Please login to start building.");
    }
  }, [session?.user]);

  // Animations
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
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
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-3xl text-center"
      >
        {/* Badge */}
        <motion.div variants={item} className="flex justify-center mb-12">
          <div className="rainbow relative z-0 bg-white/15 overflow-hidden p-px flex items-center justify-center rounded-full">
            <div className="flex items-center gap-3 pl-4 pr-6 py-2 text-white rounded-full bg-neutral-900 backdrop-blur">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A6FF5D] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#A6FF5D]"></span>
              </span>

              <Link
                to="/pricing"
                className="text-xs tracking-wide cursor-pointer"
              >
                Change your plan
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1 variants={item} className="text-4xl md:text-5xl font-medium">
          Hi, <span className="text-[#A6FF5D] italic">{username}</span> !
        </motion.h1>

        <motion.p variants={item} className="text-white/60 mt-4 text-sm">
          What would you like to build today?
        </motion.p>

        {/* FORM */}
        <motion.form variants={item} onSubmit={handleSubmit} className="mt-10">
          <div className="relative bg-neutral-950 rounded-2xl shadow-[0_0_80px_rgba(0,0,0,0.9)]">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Build a SaaS dashboard with authentication..."
              className="w-full h-36 bg-neutral-950 border border-neutral-800 rounded-xl px-5 py-4 pr-16 text-sm outline-none focus:border-[#A6FF5D]/40 resize-none"
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
  );
}
