import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div
      className="min-h-dvh flex flex-col items-center justify-center bg-black text-white px-4  bg-[radial-gradient(rgba(166,255,93,0.15)_1.5px,transparent_0)]
        bg-size-[20px_20px]
        bg-position-[-1px_-1px]"
    >
      <div className="relative z-10 flex flex-col items-center text-center max-w-lg">
        <h1 className="text-[clamp(4rem,15vw,12rem)] font-extrabold text-[#A6FF5D] mb-6">
          404
        </h1>
        <h2 className="text-2xl md:text-4xl font-semibold mb-4">
          Page Not Found
        </h2>
        <p className="text-white/60 mb-8">
          Oops! The page you are looking for does not exist or has been moved.
        </p>

        <Link
          to="/"
          className="bg-[#A6FF5D] hover:bg-[#A6FF5D]/90 text-gray-900 px-6 py-3 rounded-full transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
