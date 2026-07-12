import { Twitter, Github, Linkedin, Youtube, Instagram } from "lucide-react";
import favicon from "../assets/favicon.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div
      className="bg-black pt-20"
    >
      <footer className="bg-[#111112] w-full mx-auto text-white pt-8 lg:pt-12 px-4 sm:px-8 md:px-16 lg:px-28 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-6 gap-8 md:gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-3 space-y-6">
            <Link to="/" className="text-xl text-white flex items-center gap-2">
              <img src={favicon} alt="logo" className="h-8 w-8" /> Genixor
            </Link>
            <p className="text-sm text-neutral-400 max-w-96">
              Genixor helps you build AI-powered websites instantly —
              intelligent, fast, and production-ready.
            </p>

            {/* Social Icons */}
            <div className="flex gap-5 md:gap-6">
              <Link to="/" className="hover:text-[#A6FF5D]">
                <Twitter size={20} />
              </Link>
              <Link to="/" className="hover:text-[#A6FF5D]">
                <Github size={20} />
              </Link>
              <Link to="/" className="hover:text-[#A6FF5D]">
                <Linkedin size={20} />
              </Link>
              <Link to="/" className="hover:text-[#A6FF5D]">
                <Youtube size={20} />
              </Link>
              <Link to="/" className="hover:text-[#A6FF5D]">
                <Instagram size={20} />
              </Link>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 lg:gap-28 items-start">
            {/* Products */}
            <div>
              <h3 className="text-sm mb-4">Products</h3>
              <ul className="space-y-3 text-sm text-neutral-400">
                <li>
                  <Link to="/" className="hover:text-[#A6FF5D]">
                    Components
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-[#A6FF5D]">
                    Templates
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-[#A6FF5D]">
                    Icons
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-sm mb-4">Resources</h3>
              <ul className="space-y-3 text-sm text-neutral-400">
                <li>
                  <Link to="/" className="hover:text-[#A6FF5D]">
                    Docs
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-[#A6FF5D]">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-[#A6FF5D]">
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-sm mb-4">Company</h3>
              <ul className="space-y-3 text-sm text-neutral-400">
                <li>
                  <Link to="/" className="hover:text-[#A6FF5D]">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-[#A6FF5D]">
                    Vision
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-[#A6FF5D]">
                    Privacy policy
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-[#A6FF5D]">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="max-w-7xl mx-auto mt-12 pt-4 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
          <p className="text-neutral-500 text-sm">
            © {new Date().getFullYear()} Genixor
          </p>
          <p className="text-neutral-500 text-sm">All rights reserved.</p>
        </div>

        {/* Neon Glow Text */}
        <div className="relative mt-10">
          <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-3xl h-full max-h-64 bg-[#A6FF5D] rounded-full blur-[150px] pointer-events-none"></div>
          <h1 className="text-center font-extrabold leading-[0.7] text-transparent text-[clamp(3rem,15vw,15rem)] [-webkit-text-stroke:1px_#0D542B] mt-6">
            Genixor
          </h1>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
