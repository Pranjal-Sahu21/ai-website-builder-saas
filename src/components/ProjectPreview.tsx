import { forwardRef, useEffect, useRef, useState } from "react";
import type { Project } from "../types";
import { iframeScript } from "../assets/assets";
import EditorPanel from "./EditorPanel";

export interface ProjectPreviewRef {
  getCode: () => string | undefined;
}

interface ProjectPreviewProps {
  project: Project;
  isGenerating: boolean;
  device?: "phone" | "tablet" | "desktop";
  showEditorPanel?: boolean;
}

const ProjectPreview = forwardRef<ProjectPreviewRef, ProjectPreviewProps>(
  ({ project, isGenerating, device = "desktop", showEditorPanel = "true" },) => {
    const [selectedElement, setSelectedElement] = useState<any>(null);

    const iframeRef = useRef<HTMLIFrameElement>(null);

    const resolutions = {
      phone: "w-[400px]",
      tablet: "w-[768px]",
      desktop: "w-full",
    };

    const injectPreview = (html: string) => {
      if (!html) return "";
      if (!showEditorPanel) return html;
      if (html.includes("</body>")) {
        return html.replace("</body>", iframeScript + "</body>");
      } else {
        return html + iframeScript;
      }
    };

    const handleUpdate = (updates: any) => {
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          {
            type: "UPDATE_ELEMENT",
            payload: updates,
          },
          "*",
        );
      }
    };

    useEffect(() => {
      const handleMessage = (event: MessageEvent) => {
        if (event.data.type === "ELEMENT_SELECTED") {
          setSelectedElement(event.data.payload);
        } else if (event.data.type === "CLEAR_SELECTION") {
          setSelectedElement(null);
        }
      };
      window.addEventListener("message", handleMessage);
      return () => {
        window.removeEventListener("message", handleMessage);
      };
    }, []);

    return (
      <div className="relative flex-1 h-full rounded-xl overflow-hidden">
        {project.current_code ? (
          <>
            <iframe
              ref={iframeRef}
              srcDoc={injectPreview(project.current_code)}
              className={`
                h-full
                ${device === "desktop" ? "w-full" : resolutions[device]}
                mx-auto
                transition-all
                border-0
                `}
            />
            {showEditorPanel && selectedElement && (
              <EditorPanel
                selectedElement={selectedElement}
                onUpdate={handleUpdate}
                onClose={() => {
                  setSelectedElement(null);
                  if (iframeRef.current?.contentWindow) {
                    iframeRef.current.contentWindow?.postMessage(
                      { type: "CLEAR_SELECTION" },
                      "*",
                    );
                  }
                }}
              />
            )}
          </>
        ) : (
          isGenerating && (
            <div className="flex items-center justify-center h-full text-white/50">
              Loading...
            </div>
          )
        )}
      </div>
    );
  },
);

export default ProjectPreview;
