import { useState } from "react";
import favicon from "../assets/favicon.svg";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const handleClick = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };
  return (
    <nav
      className="fixed top-0 z-20 w-full h-20 
        flex flex-col items-center justify-center
        bg-black/10 backdrop-blur-3xl  
        "
    >
      {" "}
      <div className="flex items-center justify-between p-4 md:px-16 lg:px-24 xl:px-32 md:py-4 w-full">
        <a href="#" className="text-xl text-white flex items-center gap-2">
          <img src={favicon} alt="logo" className="h-8 w-8" /> genixor
        </a>

        <div
          className={`max-md:fixed max-md:top-0 max-md:z-10 max-md:left-0 max-md:transition-all max-md:duration-300 max-md:overflow-hidden max-md:h-screen max-md:bg-black/95 max-md:backdrop-blur-3xl max-md:flex-col max-md:justify-center flex items-center gap-8 text-2xl md:text-sm ${
            menuOpen ? "max-md:w-full" : "max-md:w-0"
          }`}
        >
          <a
            onClick={() => {
              handleClick("features");
            }}
            className=" text-white/80 hover:text-[#A6FF5D]"
          >
            Features
          </a>
          <a
            onClick={() => {
              handleClick("testimonials");
            }}
            className="text-white/80 hover:text-[#A6FF5D]"
          >
            Testimonials
          </a>
          <a
            onClick={() => setMenuOpen(false)}
            className="text-white/80 hover:text-[#A6FF5D]"
          >
            Pricing
          </a>
          <a
            onClick={() => {
              handleClick("faq");
            }}
            className="text-white/80 hover:text-[#A6FF5D]"
          >
            FAQs
          </a>

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
