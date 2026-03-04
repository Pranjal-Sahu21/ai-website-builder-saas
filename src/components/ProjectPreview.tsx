import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import type { Project } from "../types";
import { iframeScript } from "../assets/assets";
import EditorPanel from "./EditorPanel";
import LoaderSteps from "./LoaderSteps";

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
  (
    { project, isGenerating, device = "desktop", showEditorPanel = "true" },
    ref,
  ) => {
    const [selectedElement, setSelectedElement] = useState<any>(null);

    const iframeRef = useRef<HTMLIFrameElement>(null);

    const resolutions = {
      phone: "w-[400px]",
      tablet: "w-[768px]",
      desktop: "w-full",
    };

    useImperativeHandle(ref, () => ({
      getCode: () => {
        const doc = iframeRef.current?.contentDocument;
        if (!doc) return undefined;

        // Remove selection class
        doc
          .querySelectorAll(".ai-selected-element,[data-ai-selected]")
          .forEach((e1) => {
            e1.classList.remove("ai-selected-element");
            e1.removeAttribute("data-ai-selected");
            (e1 as HTMLElement).style.outline = "";
          });

        // Remove injected style + script
        const previewStyle = doc.getElementById("ai-preview-style");
        if (previewStyle) previewStyle.remove();
        const previewScript = doc.getElementById("ai-preview-script");
        if (previewScript) previewScript.remove();

        //Serialize clean HTML
        const html = doc.documentElement.outerHTML;
        return html;
      },
    }));

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
            <div className="fixed inset-0 z-50">
              <LoaderSteps />
            </div>
          )
        )}
      </div>
    );
  },
);

export default ProjectPreview;
