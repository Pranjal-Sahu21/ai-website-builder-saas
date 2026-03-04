import {
  BotIcon,
  EyeIcon,
  Loader2Icon,
  SendIcon,
  UserIcon,
} from "lucide-react";
import type { Project } from "../types";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

interface SidebarProps {
  isMenuOpen: boolean;
  project: Project | null;
  setProject: (project: Project) => void;
  isGenerating: boolean;
  setIsGenerating: (isGenerating: boolean) => void;
}

const Sidebar = ({
  isMenuOpen,
  project,
  setProject,
  isGenerating,
}: SidebarProps) => {
  const messageRef = useRef<HTMLDivElement>(null);

  const [input, setInput] = useState("");

  const handleRollback = (versionId: string) => {
    if (!project) return;
    const version = project.versions.find((v) => v.id === versionId);
    if (version) {
      setProject({
        ...project,
        current_code: version.code,
        current_version_index: version.id,
      });
    }
  };

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [project?.conversation.length, project?.versions.length, isGenerating]);

  return (
    <div
      className={`
        ${isMenuOpen ? "max-sm:w-0 max-sm:opacity-0 max-sm:pointer-events-none" : "w-full"}
        h-full sm:max-w-sm
        bg-neutral-900/60 backdrop-blur-xl
        border-l border-neutral-800
        transition-all duration-300
      `}
    >
      <div className="flex flex-col h-full">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-6 flex flex-col gap-4">
          {[
            ...(project?.conversation ?? []),
            ...(project?.versions.sort(
              (a: any, b: any) =>
                new Date(a.timestamp).getTime() -
                new Date(b.timestamp).getTime(),
            ) || []),
          ].map((message: any) => {
            const isMessage = "content" in message;

            if (isMessage) {
              const isUser = message.role === "user";

              return (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${
                    isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  {/* Bot Avatar */}
                  {!isUser && (
                    <div className="flex items-center justify-center rounded-full bg-[#A6FF5D] h-7 w-7">
                      <BotIcon className="size-4 text-gray-900" />
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed mt-2 ${
                      isUser
                        ? "bg-[#A6FF5D] text-gray-900 rounded-br-none shadow-[0_0_15px_rgba(166,255,93,0.15)]"
                        : "bg-white/5 border border-neutral-800 text-white rounded-bl-none"
                    }`}
                  >
                    {message.content}
                  </div>

                  {/* User Avatar */}
                  {isUser && (
                    <div className="flex items-center justify-center rounded-full bg-white/5 border border-neutral-700 h-7 w-7 backdrop-blur">
                      <UserIcon className="size-4 text-white/70" />
                    </div>
                  )}
                </div>
              );
            }

            // VERSION CARD
            return (
              <div
                key={message.id}
                className="w-[85%] mx-auto my-3 p-4 rounded-xl bg-white/5 border border-neutral-800 backdrop-blur flex flex-col gap-3"
              >
                <div className="text-xs text-white/60">
                  Code updated <br />
                  <span className="text-white/40">
                    {new Date(message.timestamp).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  {project?.current_version_index === message.id ? (
                    <button className="text-[#A6FF5D] text-xs font-medium">
                      Current version
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRollback(message.id)}
                      className="text-white/60 hover:text-[#A6FF5D] text-xs transition"
                    >
                      Roll back to this version
                    </button>
                  )}

                  <Link
                    target="_blank"
                    to={`/preview/${project?.id}/${message.id}`}
                    className="p-1 rounded-md hover:bg-white/10 transition"
                  >
                    <EyeIcon className="size-5" />
                  </Link>
                </div>
              </div>
            );
          })}

          {/* Generating */}
          {isGenerating && (
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center rounded-full bg-[#A6FF5D] h-7 w-7">
                <BotIcon className="size-4 text-gray-900" />
              </div>
              <div className="max-w-[80%] px-4 py-2.5 rounded-2xl rounded-bl-none text-sm bg-white/5 border border-neutral-800 animate-pulse">
                Generating code...
              </div>
            </div>
          )}

          <div ref={messageRef}></div>
        </div>

        {/* Input Area */}
        <form className="relative p-4 border-t border-neutral-800 bg-neutral-900/70 backdrop-blur">
          <textarea
            onChange={(e) => setInput(e.target.value)}
            value={input}
            rows={3}
            placeholder="Describe your website or request changes..."
            disabled={isGenerating}
            className="
              w-full
              bg-white/5
              border border-neutral-800
              rounded-xl
              p-3 pr-12
              resize-none
              text-sm
              text-white
              placeholder-white/40
              outline-none
              focus:border-[#A6FF5D]
              focus:ring-1 focus:ring-[#A6FF5D]/40
              transition
            "
          />

          <button
            disabled={isGenerating || !input.trim()}
            className="
              absolute bottom-6 right-6
              bg-[#A6FF5D]
              text-gray-900
              rounded-full
              p-2
              shadow-[0_0_15px_rgba(166,255,93,0.25)]
              hover:shadow-[0_0_20px_rgba(166,255,93,0.45)]
              active:scale-95
              transition-all
              disabled:opacity-50
              disabled:cursor-not-allowed
              mb-2
            "
          >
            {isGenerating ? (
              <Loader2Icon className="size-4 animate-spin" />
            ) : (
              <SendIcon className="size-4" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Sidebar;
