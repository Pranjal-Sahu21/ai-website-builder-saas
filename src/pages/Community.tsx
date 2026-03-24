import { useEffect, useState } from "react";
import type { Project } from "../types";
import { Loader2Icon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "@/configs/axios.config";
import { toast } from "sonner";

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

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProjects();
  }, []);

  return (
    <div
      className="px-4 md:px-16 lg:px-24 xl:px-32 bg-black min-h-screen text-white font-geist mt-24
      bg-[radial-gradient(rgba(166,255,93,0.15)_1.5px,transparent_0)] 
      bg-size-[20px_20px] 
      bg-position-[-1px_-1px]"
    >
      {loading ? (
        <div className="h-[80vh] flex flex-col items-center justify-center bg-transparent text-white">
          <Loader2Icon className="size-10 animate-spin text-[#A6FF5D]" />

          <p className="mt-4 text-md text-white/60 tracking-wide">
            Loading community projects...
          </p>
        </div>
      ) : projects.length > 0 ? (
        <div className="py-10 min-h-[80vh]">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-6">
            <h1 className="text-3xl sm:text-4xl text-white">
              Published <span className="text-[#A6FF5D] italic">Projects</span>
            </h1>
          </div>

          {/* Projects Grid */}
          <div className="flex flex-wrap gap-9 lg:gap-9 justify-center lg:justify-start">
            {projects.map((project) => (
              <Link
                to={`/view/${project.id}`}
                target="_blank"
                key={project.id}
                className="w-72 rounded-lg overflow-hidden bg-neutral-900/70 backdrop-blur border border-neutral-800 hover:border-[#A6FF5D]/40 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                {/* Mini Preview */}
                <div className="relative w-full h-40 overflow-hidden rounded-t-lg bg-neutral-800">
                  {project.current_code ? (
                    <iframe
                      srcDoc={project.current_code}
                      className="absolute top-0 left-0 w-300 h-200 origin-top-left pointer-events-none"
                      sandbox="allow-scripts allow-same-origin"
                      style={{ transform: "scale(0.25)" }}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <p>No preview available</p>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col gap-2">
                  {/* Title + Tag */}
                  <div className="flex items-center justify-between">
                    <h2 className="text-md text-white line-clamp-2">
                      {project.name}
                    </h2>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-white/60 line-clamp-2">
                    {project.initial_prompt || "No description provided."}
                  </p>
                  {/* Date and buttons */}
                  <div className="flex justify-between items-center mt-6">
                    {/* Date */}
                    <span className="text-xs text-white/50">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>

                    {/* Buttons */}
                    <div className="flex gap-3 text-sm">
                      <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-neutral-800 hover:border-[#A6FF5D]/40 px-3 py-1.5 rounded-full transition-all duration-200">
                        {/* Avatar Circle */}
                        <div className="flex items-center justify-center size-5 rounded-full bg-[#A6FF5D] text-gray-900 text-[10px] font-semibold">
                          {project.user?.name?.slice(0, 1)}
                        </div>

                        {/* Name */}
                        <span className="text-xs text-white/80 truncate max-w-22.5">
                          {project.user?.name?.split(" ")[0]}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[80vh] text-center gap-6">
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
        </div>
      )}
    </div>
  );
};

export default Community;
