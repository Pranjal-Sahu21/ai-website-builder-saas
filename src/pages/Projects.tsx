import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { Project } from "../types";
import {
  Loader2Icon,
  MessageSquareIcon,
  SmartphoneIcon,
  TabletIcon,
  MonitorIcon,
  SaveIcon,
  FullscreenIcon,
  DownloadIcon,
  EyeOffIcon,
  EyeIcon,
  MoreVerticalIcon,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import ProjectPreview, {
  type ProjectPreviewRef,
} from "../components/ProjectPreview";
import api from "@/configs/axios.config";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";

const Projects = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { data: session, isPending } = useSession();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [device, setDevice] = useState<"phone" | "tablet" | "desktop">(
    "desktop",
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [actionsOpen, setActionsOpen] = useState(false);

  const previewRef = useRef<ProjectPreviewRef>(null);

  // Fetch project
  const fetchProject = async () => {
    try {
      const { data } = await api.get(`/api/user/project/${projectId}`);
      setProject(data.project);
      setIsGenerating(!data.project.current_code);
      setLoading(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
      console.log(error);
    }
  };

  // Save Project
  const saveProject = async () => {
    if (!previewRef.current) return;
    const code = previewRef.current.getCode();
    if (!code) {
      toast.error("The code is not generated yet.");
      return;
    }
    setIsSaving(true);
    try {
      const { data } = await api.put(`/api/project/save/${projectId}`, {
        code,
      });
      toast.success(data.message);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
      console.log(error);
    } finally {
      setIsSaving(false);
    }
  };

  //Download Code
  const downloadCode = () => {
    if (!project) return;
    const code = previewRef.current?.getCode() || project.current_code;
    if (!code) {
      if (isGenerating) return;
      toast.error("The code is not generated yet.");
      return;
    }
    const element = document.createElement("a");
    const file = new Blob([code], { type: "text/html" });
    element.href = URL.createObjectURL(file);
    element.download = "index.html";
    document.body.appendChild(element);
    element.click();
  };

  // Toggle publish
  const togglePublish = async () => {
    try {
      setIsPublishing(true);
      const { data } = await api.get(`/api/user/publish-toggle/${projectId}`);
      setIsPublishing(false);
      toast.success(data.message);
      setProject((prev) =>
        prev ? { ...prev, isPublished: !prev.isPublished } : null,
      );
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (session?.user) {
      fetchProject();
    } else if (!isPending && !session?.user) {
      navigate("/");
      toast.error("Please login to view your projects");
    }
  }, [session?.user]);

  useEffect(() => {
    if (project && !project.current_code) {
      const intervalId = setInterval(fetchProject, 10000);
      return () => clearInterval(intervalId);
    }
  }, [project]);

  if (loading) {
    return (
      <>
        <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
          <Loader2Icon className="size-10 animate-spin text-[#A6FF5D]" />

          <p className="mt-4 text-md text-white/60 tracking-wide">
            Loading project...
          </p>
        </div>
      </>
    );
  }

  return project ? (
    <div
      className="flex flex-col h-screen w-full text-white bg-black"
    >
      {/* Top Bar */}
      <div className="relative flex items-center justify-between px-6 py-4 backdrop-blur bg-neutral-900/60 border-b border-neutral-800 z-100">
        {" "}
        {/* LEFT */}
        <div className="flex items-center gap-4">
          <img
            src="/favicon.svg"
            alt="logo"
            className="h-6 cursor-pointer hover:opacity-80 transition"
            onClick={() => navigate("/")}
          />

          <div className="max-w-xs">
            <p className="text-sm capitalize">
              {project.name.split(" ").slice(0, 4).join(" ")}
              {project.name.split(" ").length > 4 && "..."}
            </p>
            <p className="text-xs text-white/50 -mt-0.5">
              Previewing last saved version
            </p>
          </div>
        </div>
        {/* CENTER - Device Toggle */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-1 bg-white/5 border border-neutral-800 rounded-full p-1">
          {[
            { type: "phone", icon: SmartphoneIcon },
            { type: "tablet", icon: TabletIcon },
            { type: "desktop", icon: MonitorIcon },
          ].map(({ type, icon: Icon }) => (
            <button
              key={type}
              onClick={() => setDevice(type as any)}
              className={`p-2 rounded-full transition ${
                device === type
                  ? "bg-[#A6FF5D] text-gray-900"
                  : "text-white/70 hover:text-[#A6FF5D]"
              }`}
            >
              <Icon size={16} />
            </button>
          ))}
        </div>
        {/* RIGHT - Desktop Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={saveProject}
            disabled={isSaving}
            className="flex items-center gap-2 bg-[#A6FF5D] text-gray-900 px-4 py-1.5 rounded-full text-xs"
          >
            {isSaving ? (
              <Loader2Icon className="animate-spin" size={16} />
            ) : (
              <SaveIcon size={14} />
            )}
            Save
          </button>

          <Link
            to={`/preview/${projectId}`}
            className="flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-xs"
          >
            <FullscreenIcon size={14} />
            Preview
          </Link>

          <button
            onClick={downloadCode}
            className="flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-xs"
          >
            <DownloadIcon size={14} />
            Download
          </button>

          <button
            onClick={togglePublish}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs transition ${
              project.isPublished
                ? "bg-red-500/10 text-red-400 hover:bg-red-500/20"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            {isPublishing ? (
              <Loader2Icon className="animate-spin" size={16} />
            ) : project.isPublished ? (
              <EyeOffIcon size={14} />
            ) : (
              <EyeIcon size={14} />
            )}
            {project.isPublished ? "Unpublish" : "Publish"}
          </button>
        </div>
        {/* Mobile Controls */}
        <div className="flex items-center gap-4 lg:hidden">
          {/* Chat Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
              setActionsOpen(false);
            }}
            className="text-white/70 hover:text-[#A6FF5D] sm:hidden"
          >
            <MessageSquareIcon size={22} />
          </button>

          {/* Actions Menu */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActionsOpen(!actionsOpen);
            }}
            className="text-white/70 hover:text-[#A6FF5D] lg:hidden"
          >
            <MoreVerticalIcon size={22} />
          </button>
        </div>
        {actionsOpen && (
          <div className="lg:hidden absolute text-sm top-16 right-4 bg-neutral-900 border border-neutral-800 rounded-xl p-2 flex flex-col gap-1 z-100 animate-fade-in fade-in">
            <button
              onClick={saveProject}
              className="flex items-center gap-2 px-3 py-2 hover:bg-white/10 rounded-md"
            >
              {isSaving ? (
                <>
                  <Loader2Icon className="animate-spin" size={16} /> Saving...
                </>
              ) : (
                <>
                  <SaveIcon size={16} /> Save
                </>
              )}
            </button>

            <Link
              to={`/preview/${projectId}`}
              className="flex items-center gap-2 px-3 py-2 hover:bg-white/10 rounded-md"
            >
              <FullscreenIcon size={16} /> Preview
            </Link>

            <button
              onClick={downloadCode}
              className="flex items-center gap-2 px-3 py-2 hover:bg-white/10 rounded-md"
            >
              <DownloadIcon size={16} /> Download
            </button>

            <button
              onClick={togglePublish}
              className={` flex items-center justify-start px-3 py-2 gap-2 rounded-md ${
                project.isPublished
                  ? " text-red-400 hover:bg-red-500/20"
                  : "text-white hover:bg-white/20"
              }`}
            >
              {isPublishing ? (
                <Loader2Icon className="animate-spin" size={16} />
              ) : project.isPublished ? (
                <EyeOffIcon size={14} />
              ) : (
                <EyeIcon size={14} />
              )}
              {project.isPublished ? "Unpublish" : "Publish"}
            </button>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 flex overflow-auto">
        {/* Sidebar */}
        <Sidebar
          isMenuOpen={isMenuOpen}
          project={project}
          setProject={setProject}
          isGenerating={isGenerating}
          setIsGenerating={setIsGenerating}
        />
        {/* Project preview */}
        <div className="flex-1 sm:pl-0 relative z-0">
          {" "}
          <ProjectPreview
            ref={previewRef}
            project={project}
            isGenerating={isGenerating}
            device={device}
          />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <p className="text-4xl">
        Unable to <span className="text-[#A6FF5D] italic">load</span> project
      </p>
    </div>
  );
};

export default Projects;
