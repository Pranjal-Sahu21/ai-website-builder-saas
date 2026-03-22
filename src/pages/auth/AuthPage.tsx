import { useParams } from "react-router-dom";
import { AuthView } from "@daveyplate/better-auth-ui";

type FeatureProps = {
  title: string;
  desc: string;
};

function Feature({ title, desc }: FeatureProps) {
  return (
    <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4">
      <p className="text-[#A6FF5D] text-xs mb-1">{title}</p>
      <p className="text-sm text-white/70">{desc}</p>
    </div>
  );
}

export default function AuthPage() {
  const { pathname } = useParams();

  return (
    <div className="relative min-h-screen flex bg-black text-white overflow-hidden">
      {/* DIAGONAL CROSS GRID BACKGROUND */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
          linear-gradient(45deg, transparent 49%, rgba(255,255,255,0.08) 49%, rgba(255,255,255,0.08) 51%, transparent 51%),
          linear-gradient(-45deg, transparent 49%, rgba(255,255,255,0.08) 49%, rgba(255,255,255,0.08) 51%, transparent 51%)
        `,
          backgroundSize: "50px 50px",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
        }}
      />

      {/* ACCENT GLOW */}
      <div className="absolute -top-50 left-[20%] w-175 h-175 bg-[#A6FF5D]/10 blur-[160px] rounded-full" />

      <div className="relative z-10 flex w-full">
        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col justify-center px-20 w-1/2 relative mt-14">
          <h1 className="text-5xl leading-tight">
            Build web apps <br />
            with <span className="text-[#A6FF5D] italic">AI</span>
          </h1>

          <p className="text-white/60 mt-6 max-w-md text-lg font-light">
            Generate fullstack apps, edit components visually, and ship faster.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4 max-w-lg">
            <Feature
              title="AI Generation"
              desc="Instantly generate full project structures."
            />
            <Feature
              title="Visual Editor"
              desc="Click and edit elements directly."
            />
            <Feature
              title="Instant Preview"
              desc="Preview apps live while editing."
            />
            <Feature
              title="Export Code"
              desc="Download production-ready code."
            />
          </div>
        </div>

        {/* AUTH FORM SIDE */}
        <div className="flex flex-1 items-center justify-center sm:p-8 ml-1 p-6 sm:ml-12">
          <div className="w-full max-w-md">
            <AuthView
              pathname={pathname}
              classNames={{
                base: "bg-neutral-950 border border-[#A6FF5D]/10 rounded-2xl shadow-[0_0_80px_rgba(0,0,0,0.9)] font-light space-y-3",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
