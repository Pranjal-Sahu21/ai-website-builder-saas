import { useEffect, useState } from "react";
import type { Project } from "../types";
import { Loader2Icon, PlusIcon, TrashIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "@/configs/axios.config";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";
import { motion } from "framer-motion";

// Animation settings
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const MyProjects = () => {
  const { data: session, isPending } = useSession();
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();

  // Fetch projects function
  const fetchProjects = async () => {
    try {
      const { data } = await api.get("/api/user/projects");
      setProjects(data.projects);
      setLoading(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
      console.log(error);
    }
  };

  // Delete project function
  const deleteProject = async (projectId: string) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this project?",
      );
      if (!confirm) return;

      setDeletingId(projectId);

      const { data } = await api.delete(`/api/project/${projectId}`);

      await fetchProjects();
      toast.success(data.message);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
      console.log(error);
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (session?.user && !isPending) {
      fetchProjects();
    } else if (!isPending && !session?.user) {
      navigate("/");
      toast("Please login to view your projects");
    }
  }, [session?.user]);

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
            Loading your projects...
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
            <h1 className="text-3xl sm:text-4xl text-white">
              My <span className="text-[#A6FF5D] italic">Projects</span>
            </h1>
            <Link
              to="/generate"
              onClick={() => navigate("/")}
              className="flex items-center gap-1 bg-[#A6FF5D] text-gray-900 px-4 py-2 rounded-full font-medium hover:bg-[#A6FF5D]/90 transition text-sm"
            >
              <PlusIcon size={16} />
              Create
            </Link>
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
                variants={item}
                onClick={() => navigate(`/projects/${project.id}`)}
                key={project.id}
                className="relative group w-full max-w-sm rounded-2xl overflow-hidden bg-neutral-900/40 hover:bg-neutral-900/70 border border-neutral-800 hover:border-[#A6FF5D]/30 hover:shadow-[0_0_30px_rgba(166,255,93,0.02)] transition-all duration-300 cursor-pointer"
              >
                {/* Mini Preview */}
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
                  {/* Title + Tag */}
                  <div>
                    <h2 className="text-base font-semibold text-white font-display line-clamp-1 group-hover:text-[#A6FF5D] transition-colors duration-200">
                      {project.name}
                    </h2>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-white/50 leading-relaxed line-clamp-2">
                    {project.initial_prompt || "No description provided."}
                  </p>

                  <div className="border-t border-neutral-800/80 my-1" />

                  {/* Date and buttons */}
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex justify-between items-center"
                  >
                    {/* Date */}
                    <span className="text-xs text-white/40">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>

                    {/* Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/preview/${project.id}`)}
                        className="bg-white/5 hover:bg-white/10 border border-neutral-800 hover:border-neutral-700 text-white/90 px-3 py-1.5 rounded-full transition text-xs font-medium"
                      >
                        Preview
                      </button>
                      <button
                        onClick={() => navigate(`/projects/${project.id}`)}
                        className="bg-[#A6FF5D] hover:bg-[#A6FF5D]/90 text-gray-900 px-3 py-1.5 rounded-full transition text-xs font-medium"
                      >
                        Open
                      </button>
                    </div>
                  </div>

                  {deletingId === project.id ? (
                    <div className="absolute top-3 right-3 flex items-center justify-center size-7 bg-neutral-950/80 rounded-lg border border-neutral-800">
                      <Loader2Icon
                        className="animate-spin text-[#A6FF5D]"
                        size={14}
                      />
                    </div>
                  ) : (
                    <TrashIcon
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteProject(project.id);
                      }}
                      className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-neutral-950/90 border border-neutral-800 hover:border-red-500/30 text-white/60 hover:text-red-400 p-1.5 size-7 rounded-lg cursor-pointer z-20"
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      ) : (
        // No personal projects
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center h-[80vh] text-center gap-6"
        >
          <h1 className="text-4xl sm:text-5xl text-white">
            You have no <span className="text-[#A6FF5D] italic">projects</span>{" "}
            yet
          </h1>

          <p className="text-white/50 text-md max-w-md">
            Start building something amazing.
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

export default MyProjects;
