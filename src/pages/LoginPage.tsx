import { useState } from "react";
import { LogIn, UserPlus } from "lucide-react";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const login = false;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (login) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="relative min-h-screen flex bg-black text-white overflow-hidden">
      {/* GRID BACKGROUND */}
      <div
        className="
        absolute inset-0
        bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)]
        bg-size-[48px_48px]
        "
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
            <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4">
              <p className="text-[#A6FF5D] text-xs mb-1">AI Generation</p>
              <p className="text-sm text-white/70">
                Instantly generate full project structures.
              </p>
            </div>

            <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4">
              <p className="text-[#A6FF5D] text-xs mb-1">Visual Editor</p>
              <p className="text-sm text-white/70">
                Click and edit elements directly.
              </p>
            </div>

            <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4">
              <p className="text-[#A6FF5D] text-xs mb-1">Instant Preview</p>
              <p className="text-sm text-white/70">
                Preview apps live while editing.
              </p>
            </div>

            <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4">
              <p className="text-[#A6FF5D] text-xs mb-1">Export Code</p>
              <p className="text-sm text-white/70">
                Download production-ready code.
              </p>
            </div>
          </div>
        </div>
        {/* FORM SIDE */}
        <div className="flex flex-1 items-center justify-center px-6">
          {/* PERSPECTIVE WRAPPER */}
          <div className="perspective-distant w-full max-w-md">
            {/* FLIP CONTAINER */}
            <div
              className={`relative w-full transition-all duration-700 transform-3d ${
                isSignup ? "rotate-y-180 h-125" : "h-105"
              }`}
            >
              {/* LOGIN CARD */}
              <div className="absolute inset-0 bg-neutral-950 border border-neutral-800 rounded-2xl p-8 shadow-[0_0_80px_rgba(0,0,0,0.9)] backface-hidden">
                <div className="mb-8 text-center">
                  <h2 className="text-2xl">Welcome Back</h2>
                  <p className="text-white/50 text-sm mt-1">
                    Login to continue
                  </p>
                </div>

                <form className="space-y-5">
                  <div>
                    <label className="text-xs text-[#A6FF5D] block mb-2 tracking-wide">
                      EMAIL
                    </label>

                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#A6FF5D]"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-[#A6FF5D] block mb-2 tracking-wide">
                      PASSWORD
                    </label>

                    <input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#A6FF5D]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-[#A6FF5D] text-black py-2 mt-6 rounded-xl hover:brightness-110 transition"
                  >
                    <LogIn className="w-4 h-4" />
                    Login
                  </button>
                </form>

                <p className="text-center text-xs text-white/40 mt-6">
                  Don’t have an account?{" "}
                  <span
                    onClick={() => setIsSignup(true)}
                    className="text-[#A6FF5D] cursor-pointer hover:underline"
                  >
                    Sign up
                  </span>
                </p>
              </div>

              {/* SIGNUP CARD */}
              <div className="absolute inset-0 bg-neutral-950 border border-neutral-800 rounded-2xl p-8 shadow-[0_0_80px_rgba(0,0,0,0.9)] rotate-y-180 backface-hidden">
                <div className="mb-8 text-center">
                  <h2 className="text-2xl">Create Account</h2>
                  <p className="text-white/50 text-sm mt-1">
                    Sign up to get started
                  </p>
                </div>

                <form className="space-y-5">
                  <div>
                    <label className="text-xs text-[#A6FF5D] block mb-2 tracking-wide">
                      USERNAME
                    </label>

                    <input
                      type="text"
                      placeholder="johndoe"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#A6FF5D]"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-[#A6FF5D] block mb-2 tracking-wide">
                      EMAIL
                    </label>

                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#A6FF5D]"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-[#A6FF5D] block mb-2 tracking-wide">
                      PASSWORD
                    </label>

                    <input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#A6FF5D]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-[#A6FF5D] text-black py-2 mt-6 rounded-xl hover:brightness-110 transition"
                  >
                    <UserPlus className="w-4 h-4" />
                    Sign Up
                  </button>
                </form>

                <p className="text-center text-xs text-white/40 mt-6">
                  Already have an account?{" "}
                  <span
                    onClick={() => setIsSignup(false)}
                    className="text-[#A6FF5D] cursor-pointer hover:underline"
                  >
                    Login
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
