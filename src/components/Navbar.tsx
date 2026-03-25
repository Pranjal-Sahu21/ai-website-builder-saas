import { useEffect, useState } from "react";
import favicon from "../assets/favicon.svg";
import { Link } from "react-router-dom";
import useScrollToSection from "../hooks/useScrollToSection";
import { authClient } from "@/lib/auth-client";
import { UserButton } from "@daveyplate/better-auth-ui";
import api from "@/configs/axios.config";
import { toast } from "sonner";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const scrollToSection = useScrollToSection();

  const { data: session } = authClient.useSession();

  const [credits, setCredits] = useState(0);

  // Get credits function
  const getCredits = async () => {
    try {
      const { data } = await api.get("/api/user/credits");
      setCredits(data?.credits);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (session?.user) {
      getCredits();
    }
  }, [session?.user]);

  return (
    <nav
      className="fixed top-0 z-20 w-full h-20 
        flex flex-col items-center justify-center
        bg-black/10 backdrop-blur-3xl  
        "
    >
      <div className="flex items-center justify-between p-4 md:px-16 lg:px-24 xl:px-32 md:py-4 w-full">
        <Link to="/" className="text-xl text-white flex items-center gap-2">
          <img src={favicon} alt="logo" className="h-8 w-8" /> Genixor
        </Link>

        {session ? (
          <div
            className={`max-lg:fixed max-lg:top-0 max-lg:z-10 max-lg:left-0 max-lg:transition-all max-lg:duration-300 max-lg:overflow-hidden max-lg:h-screen max-lg:bg-black/95 max-lg:backdrop-blur-3xl max-lg:flex-col max-lg:justify-center flex items-center gap-8 text-2xl md:text-4xl md:gap-12 lg:text-sm ${
              menuOpen ? "max-lg:w-full" : "max-lg:w-0"
            }`}
          >
            <Link
              to="/projects"
              onClick={() => setMenuOpen(false)}
              className="text-white/80 hover:text-[#A6FF5D]"
            >
              Projects
            </Link>

            <Link
              to="/community"
              onClick={() => {
                setMenuOpen(false);
              }}
              className=" text-white/80 hover:text-[#A6FF5D]"
            >
              Community
            </Link>

            <Link
              to="/pricing"
              onClick={() => setMenuOpen(false)}
              className="text-white/80 hover:text-[#A6FF5D]"
            >
              Pricing
            </Link>
            <Link
              to="/"
              onClick={() => {
                scrollToSection("faq");
                setMenuOpen(false);
              }}
              className="text-white/80 hover:text-[#A6FF5D]"
            >
              FAQs
            </Link>
            {session ? (
              <div className="flex gap-4 justify-center items-center">
                <span className="text-white/80 gap-1 hidden lg:flex">
                  Credits: <span className="text-[#a6ff5d]">{credits}</span>
                </span>
                <UserButton className="hidden lg:flex" size="icon" />
              </div>
            ) : (
              <Link
                to="/auth/sign-in"
                className="hidden lg:flex bg-[#A6FF5D] hover:bg-[#A6FF5D]/90 text-gray-900 px-6 py-2 text-sm rounded-full transition"
              >
                Login
              </Link>
            )}
          </div>
        ) : (
          <div
            className={`max-lg:fixed max-lg:top-0 max-lg:z-10 max-lg:left-0 max-lg:transition-all max-lg:duration-300 max-lg:overflow-hidden max-lg:h-screen max-lg:bg-black/95 max-lg:backdrop-blur-3xl max-lg:flex-col max-lg:justify-center flex items-center gap-8 text-2xl md:text-4xl md:gap-12 lg:text-sm ${
              menuOpen ? "max-lg:w-full" : "max-lg:w-0"
            }`}
          >
            <Link
              to="/"
              onClick={() => {
                scrollToSection("features");
                setMenuOpen(false);
              }}
              className=" text-white/80 hover:text-[#A6FF5D]"
            >
              Features
            </Link>
            <Link
              to="/community"
              onClick={() => {
                setMenuOpen(false);
              }}
              className=" text-white/80 hover:text-[#A6FF5D]"
            >
              Community
            </Link>
            <Link
              to="/pricing"
              onClick={() => setMenuOpen(false)}
              className="text-white/80 hover:text-[#A6FF5D]"
            >
              Pricing
            </Link>
            <Link
              to="/"
              onClick={() => {
                scrollToSection("testimonials");
                setMenuOpen(false);
              }}
              className="text-white/80 hover:text-[#A6FF5D]"
            >
              Testimonials
            </Link>
            <Link
              to="/"
              onClick={() => {
                scrollToSection("faq");
                setMenuOpen(false);
              }}
              className="text-white/80 hover:text-[#A6FF5D]"
            >
              FAQs
            </Link>
            {session ? (
              <UserButton className="hidden lg:flex" size="icon" />
            ) : (
              <Link
                to="/auth/sign-in"
                className="hidden lg:flex bg-[#A6FF5D] hover:bg-[#A6FF5D]/90 text-gray-900 px-6 py-2 text-sm rounded-full transition"
              >
                Login
              </Link>
            )}
          </div>
        )}

        <div className="flex -mr-2 justify-center items-center lg:hidden md:gap-2">
          {session ? (
            <div className="flex justify-center items-center">
              <span className="text-white/80 p-3 rounded-full text-sm">
                Credits: <span className="text-[#a6ff5d]">{credits}</span>
              </span>
              <UserButton className="flex lg:hidden" size="icon" />
            </div>
          ) : (
            <Link
              to="/auth/sign-in"
              className=" lg:flex border bg-[#A6FF5D] hover:bg-[#A6FF5D]/90 text-gray-900 px-6 py-2 text-sm rounded-full transition"
            >
              Login
            </Link>
          )}

          <div className="md:fixed md:top-5 md:right-2 z-50">
            <button
              onClick={() => setMenuOpen(true)}
              className={`${menuOpen ? "hidden" : ""} lg:hidden hover:bg-[#A6FF5D]/10 px-4 py-2 rounded-full transition`}
            >
              ☰
            </button>
            <button
              onClick={() => setMenuOpen(false)}
              className={`${!menuOpen ? "hidden" : ""} lg:hidden z-20 hover:bg-[#A6FF5D]/10 px-4 py-2 rounded-full transition`}
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
