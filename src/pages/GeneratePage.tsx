import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useSession } from "@/lib/auth-client";

export default function GeneratePage() {
  const [prompt, setPrompt] = useState("");

  const { data: session } = useSession();

  const username = session?.user?.name;
  
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(prompt);
  };

  return (
    <div
      className="relative -mb-20 min-h-screen flex items-center justify-center px-6 bg-black text-white overflow-hidden
        bg-[linear-gradient(rgba(166,255,93,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(166,255,93,0.08)_1px,transparent_1px)]
        bg-size-[50px_50px]"
    >
      {/* ACCENT LIGHTING */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-175 h-175 bg-[#A6FF5D]/10 blur-[160px] rounded-full"></div>

      <div className="absolute bottom-0 right-1/4 w-125 h-125 bg-[#A6FF5D]/5 blur-[140px] rounded-full"></div>
      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-3xl text-center">
        {/* Badge */}
        <div className="flex justify-center mb-12">
          <div className="rainbow relative z-0 bg-white/15 overflow-hidden p-px flex items-center justify-center rounded-full">
            <div className="flex items-center gap-3 pl-4 pr-6 py-2 text-white rounded-full bg-neutral-900 backdrop-blur">
              {/* Pulsing Dot */}
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A6FF5D] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#A6FF5D]"></span>
              </span>

              <Link
                to="/pricing"
                className="text-xs tracking-wide cursor-pointer"
              >
                Change your plan
              </Link>
            </div>
          </div>
        </div>

        {/* GREETING */}
        <h1 className="text-4xl md:text-5xl font-medium">
          Hi, <span className="text-[#A6FF5D] italic">{username}</span> !
        </h1>

        <p className="text-white/60 mt-4 text-sm">
          What would you like to build today?
        </p>

        {/* PROMPT FORM */}
        <form onSubmit={handleSubmit} className="mt-10">
          <div className="relative bg-neutral-950 border border-neutral-800 rounded-2xl shadow-[0_0_80px_rgba(0,0,0,0.9)]">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Build a SaaS dashboard with authentication..."
              className="w-full h-36 bg-neutral-950 border border-neutral-800 rounded-xl px-5 py-4 pr-16 text-sm outline-none focus:border-[#A6FF5D] resize-none"
            />

            {/* Generate Button */}
            <button
              type="submit"
              className="absolute bottom-6 right-6 flex items-center justify-center bg-[#A6FF5D] text-black p-3 rounded-lg hover:brightness-110 transition"
            >
              <Sparkles size={18} />
            </button>
          </div>
        </form>

        {/* SUGGESTIONS */}
        <div className="mt-8 hidden md:flex flex-wrap justify-center gap-3 text-sm">
          {[
            "Create a blog platform",
            "Make a task manager",
            "Build a landing page",
          ].map((idea) => (
            <button
              key={idea}
              onClick={() => setPrompt(idea)}
              className="px-4 py-2 bg-neutral-900 border border-neutral-600 rounded-full hover:border-[#A6FF5D] hover:text-[#A6FF5D] transition"
            >
              {idea}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
