import { useEffect, useState } from "react";
import type { Project } from "../types";
import { Loader2Icon, PlusIcon, TrashIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "@/configs/axios.config";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";

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
      className="px-4 md:px-16 lg:px-24 xl:px-32 bg-black min-h-screen text-white font-geist mt-24
      bg-[radial-gradient(rgba(166,255,93,0.15)_1.5px,transparent_0)] 
      bg-size-[20px_20px] 
      bg-position-[-1px_-1px]"
    >
      {loading ? (
        <div className="h-[80vh] flex flex-col items-center justify-center bg-transparent text-white">
          <Loader2Icon className="size-10 animate-spin text-[#A6FF5D]" />

          <p className="mt-4 text-md text-white/60 tracking-wide">
            Loading your projects...
          </p>
        </div>
      ) : projects.length > 0 ? (
        <div className="py-10 min-h-[80vh]">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-6">
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
          </div>

          {/* Projects Grid */}
          <div className="flex flex-wrap gap-9 lg:gap-9 justify-center lg:justify-start">
            {projects.map((project) => (
              <div
                onClick={() => navigate(`/projects/${project.id}`)}
                key={project.id}
                className="relative group w-72 rounded-lg overflow-hidden bg-neutral-900/70 backdrop-blur border border-neutral-800 hover:border-[#A6FF5D]/40 hover:shadow-lg transition-all duration-300 cursor-pointer"
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
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex justify-between items-center mt-6"
                  >
                    {/* Date */}
                    <span className="text-xs text-white/50">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>

                    {/* Buttons */}
                    <div className="flex gap-3 text-sm">
                      <button
                        onClick={() => navigate(`/preview/${project.id}`)}
                        className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-full transition text-xs "
                      >
                        Preview
                      </button>
                      <button
                        onClick={() => navigate(`/projects/${project.id}`)}
                        className="bg-[#A6FF5D] hover:bg-[#A6FF5D]/90 text-gray-900 px-3 py-1.5 rounded-full transition text-xs "
                      >
                        Open
                      </button>
                    </div>
                  </div>
                  {deletingId === project.id ? (
                    <div className="absolute top-3 right-3 flex items-center justify-center size-7">
                      <Loader2Icon
                        className="animate-spin text-red-400"
                        size={18}
                      />
                    </div>
                  ) : (
                    <TrashIcon
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteProject(project.id);
                      }}
                      className="
                      absolute top-3 right-3
                      bg-neutral-900/90 backdrop-blur
                      border border-neutral-700
                      text-white/70
                      hover:text-red-400
                      hover:border-red-400/60
                      hover:bg-red-500/10
                      p-1.5 size-7
                      rounded-md
                      cursor-pointer
                      transition-all duration-200
                    "
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[80vh] text-center gap-6">
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
        </div>
      )}
    </div>
  );
};

export default MyProjects;
