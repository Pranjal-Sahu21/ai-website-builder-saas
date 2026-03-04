import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { Project } from "../types";
import {
  Loader2Icon,
  MessageSquareIcon,
  XIcon,
  SmartphoneIcon,
  TabletIcon,
  MonitorIcon,
  SaveIcon,
  FullscreenIcon,
  DownloadIcon,
  EyeOffIcon,
  EyeIcon,
} from "lucide-react";
import { dummyConversations, dummyProjects, dummyVersion } from "../assets/assets";
import Sidebar from "../components/Sidebar";

const Projects = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [device, setDevice] = useState<"phone" | "tablet" | "desktop">(
    "desktop",
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const fetchProject = async () => {
    setLoading(true);
    const project = dummyProjects.find((p) => p.id === projectId) || null;
    setTimeout(() => {
      if (project) {
        setProject({...project, conversation: dummyConversations, versions: dummyVersion});
        setLoading(false);
        setIsGenerating(project.current_code ? false : true);
      }
    }, 2000);
  };

  const saveProject = async () => {
    if (!project) return;
    setIsSaving(true);
  };

  const downloadCode = () => {
    if (!project) return;
    const element = document.createElement("a");
  };

  const togglePublish = async () => {
    if (!project) return;
    setProject({ ...project, isPublished: !project.isPublished });
  };

  useEffect(() => {
    fetchProject();
  }, []);

  if (loading) {
    return (
      <>
        <div className="flex items-center justify-center h-screen">
          <Loader2Icon className="animate-spin text-[#A6FF5D] w-10 h-10" />
        </div>
      </>
    );
  }

  return project ? (
    <div
      className="flex flex-col h-screen w-full text-white bg-black
    bg-[radial-gradient(rgba(166,255,93,0.15)_1.5px,transparent_0)]
    bg-size-[20px_20px]
    bg-position-[-1px_-1px]"
    >
      {/* Top Bar */}
      <div className="relative flex items-center justify-between px-6 py-4 backdrop-blur bg-neutral-900/60 border-b border-neutral-800">
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
            <p className="text-sm capitalize truncate">{project.name}</p>
            <p className="text-xs text-white/50 -mt-0.5">
              Previewing last saved version
            </p>
          </div>

          {/* Mobile Chat Toggle */}
          <div className="sm:hidden ml-2">
            {isMenuOpen ? (
              <XIcon
                className="size-6 cursor-pointer text-white/70 hover:text-[#A6FF5D] transition"
                onClick={() => setIsMenuOpen(false)}
              />
            ) : (
              <MessageSquareIcon
                className="size-6 cursor-pointer text-white/70 hover:text-[#A6FF5D] transition"
                onClick={() => setIsMenuOpen(true)}
              />
            )}
          </div>
        </div>
        {/* CENTER - Device Toggle */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden sm:flex items-center gap-1 bg-white/5 border border-neutral-800 rounded-full p-1">
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
        {/* RIGHT - Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Save */}
          <button
            onClick={saveProject}
            disabled={isSaving}
            className="flex items-center gap-2 bg-[#A6FF5D] text-gray-900 px-4 py-1.5 rounded-full text-xs hover:bg-[#A6FF5D]/90 transition disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <Loader2Icon className="animate-spin text-gray-900" size={16} />
            ) : (
              <SaveIcon size={14} />
            )}
            Save
          </button>

          {/* Preview */}
          <Link
            target="_blank"
            to={`/preview/${projectId}`}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-1.5 rounded-full text-xs transition"
          >
            <FullscreenIcon size={14} />
            Preview
          </Link>

          {/* Download */}
          <button
            onClick={downloadCode}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-1.5 rounded-full text-xs transition"
          >
            <DownloadIcon size={14} />
            Download
          </button>

          {/* Publish / Unpublish */}
          <button
            onClick={togglePublish}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs transition ${
              project.isPublished
                ? "bg-red-500/10 text-red-400 hover:bg-red-500/20"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            {project.isPublished ? (
              <EyeOffIcon size={14} />
            ) : (
              <EyeIcon size={14} />
            )}
            {project.isPublished ? "Unpublish" : "Publish"}
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex overflow-auto">
        {/* Sidebar */}
          <Sidebar isMenuOpen={isMenuOpen} project={project} setProject={setProject} isGenerating={isGenerating} setIsGenerating={setIsGenerating} />
        {/* Project preview */}
        <div className="flex-1 p-2 pl-0">Project preview</div>
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
