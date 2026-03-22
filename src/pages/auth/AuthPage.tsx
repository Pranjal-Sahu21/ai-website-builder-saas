import { Link, useParams } from "react-router-dom";
import { AuthView } from "@daveyplate/better-auth-ui";
import { ArrowUpRightFromSquare } from "lucide-react";

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
      <div className="absolute -top-50 left-0 md:left-[20%] w-175 h-175 bg-[#A6FF5D]/10 blur-[160px] rounded-full" />

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
        <div className="flex flex-1 items-center justify-center px-6 sm:px-10">
          <div className="relative w-full max-w-md">
            {/* Subtle Glow Behind Card */}
            <div className="absolute inset-0 bg-[#A6FF5D]/5 blur-3xl rounded-3xl pointer-events-none" />

            {/* Card */}
            <div className="relative w-full max-w-md mx-auto flex flex-col items-center px-2 sm:px-0 space-y-5">
              {/* Auth UI */}
              <AuthView
                pathname={pathname}
                classNames={{
                  base: "space-y-3 bg-neutral-950/80 w-full max-w-md mx-auto",
                }}
              />
              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-[10px] text-white/40">or</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              {/* Back Link */}
              <Link
                to="/"
                className="flex items-center justify-center gap-2 text-sm text-white/60 hover:text-[#A6FF5D] transition group"
              >
                Back to home
                <ArrowUpRightFromSquare className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
