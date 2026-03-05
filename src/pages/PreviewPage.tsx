import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dummyProjects } from "../assets/assets";
import { Loader2Icon } from "lucide-react";
import ProjectPreview from "../components/ProjectPreview";
import type { Project } from "../types";

const PreviewPage = () => {
  const { projectId } = useParams();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchCode = async () => {
    setTimeout(() => {
      const code = dummyProjects.find(
        (project) => project.id === projectId,
      )?.current_code;

      if (code) {
        setCode(code);
        setLoading(false);
      }
    }, 2000);
  };

  useEffect(() => {
    fetchCode();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
        <Loader2Icon className="size-10 animate-spin text-[#A6FF5D]" />

        <p className="mt-4 text-md text-white/60 tracking-wide">
          Loading preview...
        </p>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full h-screen border border-neutral-800 rounded-xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.7)]">
        {code && (
          <ProjectPreview
            project={{ current_code: code } as Project}
            isGenerating={false}
            showEditorPanel={false}
          />
        )}
      </div>
    </div>
  );
};

export default PreviewPage;
