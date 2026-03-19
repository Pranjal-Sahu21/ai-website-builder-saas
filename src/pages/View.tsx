import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader2Icon } from "lucide-react";
import ProjectPreview from "../components/ProjectPreview";
import type { Project } from "../types";
import api from "@/configs/axios.config";
import { toast } from "sonner";

const View = () => {
  const { projectId } = useParams();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetching code function
  const fetchCode = async () => {
    try {
      const { data } = await api.get(`/api/project/published/${projectId}`);
      setCode(data.code);
      setLoading(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCode();
  }, [projectId]);

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
        <Loader2Icon className="size-10 animate-spin text-[#A6FF5D]" />

        <p className="mt-4 text-md text-white/60 tracking-wide">
          Loading project preview...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full h-screen border border-neutral-800 overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.7)]">
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

export default View;
