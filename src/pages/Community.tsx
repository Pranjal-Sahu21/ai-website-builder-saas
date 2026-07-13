import { useEffect, useState } from "react";
import type { Project } from "../types";
import { Loader2Icon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "@/configs/axios.config";
import { toast } from "sonner";
import { motion } from "framer-motion";
import AnimatedHeadline from "../components/AnimatedHeadline";


// Animation settings
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 1.3,
    },
  },
};
const item = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const Community = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();

  // Fetching project function
  const fetchProjects = async () => {
    try {
      const { data } = await api.get("/api/project/published");
      setProjects(data.projects);
      setLoading(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
      console.log(error);
    }
  };

  // Fetch projects and scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProjects();
  }, []);

  return (
    <div
      className="px-4 md:px-16 lg:px-24 xl:px-32 bg-black min-h-screen text-white font-geist mt-20"
    >
      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="h-[80vh] flex flex-col items-center justify-center bg-transparent text-white"
        >
          <Loader2Icon className="size-10 animate-spin text-[#A6FF5D]" />
          <p className="mt-4 text-md text-white/60 tracking-wide">
            Loading community projects...
          </p>
        </motion.div>
      ) : projects.length > 0 ? (
        <div className="py-10 min-h-[80vh]">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-6"
          >
            <AnimatedHeadline
              as="h1"
              className="text-4xl sm:text-5xl text-white tracking-tight font-light"
              triggerOnView={false}
            >
              Published <span className="text-[#A6FF5D] italic">Projects</span>
            </AnimatedHeadline>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8 w-full justify-items-center sm:justify-items-stretch"
          >
            {/* Project Card */}
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={item}
                className="w-full max-w-sm"
              >
                <Link
                  to={`/view/${project.id}`}
                  target="_blank"
                  className="block group rounded-2xl overflow-hidden bg-neutral-900/40 hover:bg-neutral-900/70 border border-neutral-800 hover:border-[#A6FF5D]/30 hover:shadow-[0_0_30px_rgba(166,255,93,0.02)] transition-colors duration-300"
                >
                  {/* Preview */}
                  <div className="relative w-full h-44 overflow-hidden rounded-t-2xl bg-neutral-950 border-b border-neutral-800/50">
                    {project.current_code ? (
                      <div className="w-full h-full group-hover:scale-[1.02] transition-transform duration-500 origin-center">
                        <iframe
                          srcDoc={project.current_code}
                          className="absolute top-0 left-0 w-[400%] h-[400%] origin-top-left pointer-events-none overflow-hidden"
                          scrolling="no"
                          sandbox="allow-scripts allow-same-origin"
                          style={{ transform: "scale(0.25)" }}
                        />
                      </div>
                    ) : (
                      // No preview available
                      <div className="flex items-center justify-center h-full text-neutral-500">
                        <span className="text-xs">No preview available</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col gap-3">
                    <div>
                      <h2 className="text-base font-semibold text-white font-display line-clamp-1 group-hover:text-[#A6FF5D] transition-colors duration-200">
                        {project.name}
                      </h2>
                    </div>

                    <p className="text-xs text-white/50 leading-relaxed line-clamp-2">
                      {project.initial_prompt || "No description provided."}
                    </p>

                    <div className="border-t border-neutral-800/80 my-1" />

                    {/* Footer */}
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-white/40">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </span>

                      <div className="flex gap-2">
                        <div className="flex items-center gap-2 bg-white/5 border border-neutral-800 px-3 py-1.5 rounded-full text-xs">
                          <div className="flex items-center justify-center size-5 rounded-full bg-[#A6FF5D] text-gray-900 text-[10px] font-semibold">
                            {project.user?.name?.slice(0, 1)}
                          </div>

                          <span className="text-xs text-white/80 truncate max-w-22.5 font-medium">
                            {project.user?.name?.split(" ")[0]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      ) : (
        // No community projects
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center h-[80vh] text-center gap-6"
        >
          <h1 className="text-4xl sm:text-5xl text-white">
            No <span className="text-[#A6FF5D] italic">community</span> projects
            yet
          </h1>

          <p className="text-white/50 text-md max-w-md">
            Be the first to share something amazing.
          </p>

          <button
            onClick={() => navigate("/generate")}
            className="mt-2 bg-[#A6FF5D] text-gray-900 px-6 py-2.5 rounded-full font-medium hover:bg-[#A6FF5D]/90 transition text-sm"
          >
            Create Project
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Community;
