import { useState } from "react";
import favicon from "../assets/favicon.svg";
import { Link } from "react-router-dom";
import useScrollToSection from "../hooks/useScrollToSection";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const scrollToSection = useScrollToSection();
  return (
    <nav
      className="fixed top-0 z-20 w-full h-20 
        flex flex-col items-center justify-center
        bg-black/10 backdrop-blur-3xl  
        "
    >
      {" "}
      <div className="flex items-center justify-between p-4 md:px-16 lg:px-24 xl:px-32 md:py-4 w-full">
        <Link to="/" className="text-xl text-white flex items-center gap-2">
          <img src={favicon} alt="logo" className="h-8 w-8" /> Genixor
        </Link>

        <div
          className={`max-md:fixed max-md:top-0 max-md:z-10 max-md:left-0 max-md:transition-all max-md:duration-300 max-md:overflow-hidden max-md:h-screen max-md:bg-black/95 max-md:backdrop-blur-3xl max-md:flex-col max-md:justify-center flex items-center gap-8 text-2xl md:text-sm ${
            menuOpen ? "max-md:w-full" : "max-md:w-0"
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

          <button
            onClick={() => setMenuOpen(false)}
            className="md:hidden border border-[#A6FF5D] text-[#A6FF5D] hover:bg-[#A6FF5D]/10 px-4 py-2 rounded-full transition"
          >
            ✕
          </button>
        </div>

        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden bg-gray-950 hover:bg-gray-900 text-white p-2 rounded-md"
        >
          ☰
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
