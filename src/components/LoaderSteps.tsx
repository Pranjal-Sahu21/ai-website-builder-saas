import { FolderTree, Component, Palette, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

const steps = [
  {
    id: 1,
    title: "Generating project structure",
    description: "Creating folders and files...",
    icon: FolderTree,
  },
  {
    id: 2,
    title: "Generating components",
    description: "Building React components...",
    icon: Component,
  },
  {
    id: 3,
    title: "Generating styles",
    description: "Applying Tailwind CSS...",
    icon: Palette,
  },
  {
    id: 4,
    title: "Finalizing",
    description: "Wrapping up the project...",
    icon: CheckCircle2,
  },
];

const STEP_DURATION = 45000;
const STORAGE_KEY = "loader-step";

const LoaderSteps = () => {
  // Load from localStorage
  const [current, setCurrent] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? Number(saved) : 0;
  });

  const Icon = steps[current].icon;

  // Step progression 
  useEffect(() => {
    if (current >= steps.length - 1) return;

    const timeout = setTimeout(() => {
      setCurrent((prev) => prev + 1);
    }, STEP_DURATION);

    return () => clearTimeout(timeout);
  }, [current]);

  // Persist step
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(current));
  }, [current]);

  useEffect(() => {
    if (current === steps.length - 1) {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [current]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center relative overflow-hidden bg-black text-white">
      {/* Icon Section */}
      <div className="relative z-10 w-36 h-36 flex items-center justify-center">
        {/* Outer Glow Ring */}
        <div className="absolute inset-0 rounded-full border border-[#A6FF5D]/30 animate-ping" />

        {/* Inner Ring */}
        <div className="absolute inset-4 rounded-full border border-[#A6FF5D]/40" />

        {/* Icon */}
        <Icon className="w-10 h-10 text-[#A6FF5D] animate-bounce" />
      </div>

      {/* Step Title */}
      <p
        key={current}
        className="mt-10 text-xl font-medium text-white tracking-wide transition-all duration-700"
      >
        {steps[current].title}
      </p>

      {/* Step Description */}
      <p className="mt-2 text-sm text-white/50">{steps[current].description}</p>

      {/* Static Info */}
      <p className="mt-6 text-xs text-[#A6FF5D]/70 tracking-wider uppercase">
        This may take 2–3 minutes
      </p>

      {/* Progress Indicators */}
      <div className="flex gap-2 mt-6">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 w-6 rounded-full transition-all duration-500 ${
              i === current
                ? "bg-[#A6FF5D] shadow-[0_0_10px_#A6FF5D]"
                : "bg-neutral-800"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default LoaderSteps;
