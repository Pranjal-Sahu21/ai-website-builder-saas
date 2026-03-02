import React from "react";

// Testimonials data
const testimonials = [
  {
    text: "Genixor helped us move faster without sacrificing design quality. Everything feels production-ready.",
    name: "Cristofer Levin",
    role: "Frontend Engineer",
    image:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
  },
  {
    text: "The AI automation saved us countless hours. Launching a website has never been this smooth.",
    name: "Rohan Mehta",
    role: "Startup Founder",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
  },
  {
    text: "Design consistency is incredible. The platform feels thoughtfully engineered.",
    name: "Jason Kim",
    role: "Product Designer",
    image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200",
  },
  {
    text: "Genixor feels built by people who truly understand shipping real products.",
    name: "Alex Turner",
    role: "Full Stack Developer",
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200",
  },
  {
    text: "We now maintain visual consistency across projects effortlessly.",
    name: "Sofia Martinez",
    role: "UX Designer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
  },
  {
    text: "Team productivity improved instantly after adopting Genixor.",
    name: "Daniel Wong",
    role: "UI Designer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
  },
  {
    text: "Genixor transformed our idea into a polished landing page within minutes. The speed is unreal.",
    name: "Emma Carter",
    role: "Marketing Lead",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
  },
  {
    text: "We reduced development time by 60% after switching to Genixor’s AI builder.",
    name: "Liam Johnson",
    role: "Tech Founder",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
  },
  {
    text: "The AI suggestions feel smart and contextual. It’s like having a designer on demand.",
    name: "Olivia Brown",
    role: "Startup CEO",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200",
  },
  {
    text: "From layout to copywriting, everything was generated beautifully and required minimal tweaks.",
    name: "Noah Williams",
    role: "Indie Hacker",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200",
  },
  {
    text: "Our product launch page was live the same day we started building it.",
    name: "Sophia Davis",
    role: "Product Manager",
    image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=200",
  },
  {
    text: "The seamless deployment feature alone makes Genixor worth it.",
    name: "Ethan Wilson",
    role: "Full Stack Engineer",
    image: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=200",
  },
  {
    text: "Genixor’s automation keeps branding consistent across every section effortlessly.",
    name: "Ava Martinez",
    role: "Brand Strategist",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200",
  },
  {
    text: "It feels futuristic — describe your idea and watch it turn into a real website.",
    name: "James Anderson",
    role: "SaaS Builder",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
  },
];

const Testimonials: React.FC = () => {
  return (
    <section
      id="testimonials"
      className="bg-black py-24 px-4 relative overflow-hidden bg-[radial-gradient(rgba(166,255,93,0.15)_1.5px,transparent_0)]
        bg-size-[20px_20px]
        bg-position-[-1px_-1px]"
    >
      <div className="relative max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-white text-3xl md:text-4xl">
          Trusted for <span className="text-[#A6FF5D] italic">Performance</span>
        </h2>

        {/* Description */}
        <p className="text-white/50 text-sm max-w-md mx-auto mt-4">
          Real feedback from people building with AI.
        </p>

        {/* Rows */}
        <div className="space-y-8 mt-16">
          {[0, 1].map((row) => {
            const rowTestimonials = testimonials.slice(row * 3, row * 3 + 3);
            const animation =
              row === 0 ? "animate-scroll" : "animate-scroll-reverse";

            return (
              <div key={row} className="relative overflow-hidden w-full">
                {/* Gradient Fade - Left */}
                <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-linear-to-r from-black to-transparent z-10 pointer-events-none" />

                {/* Gradient Fade - Right */}
                <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-linear-to-l from-black to-transparent z-10 pointer-events-none" />

                {/* Scrolling Row */}
                <div className={`flex gap-4 sm:gap-6 w-max ${animation}`}>
                  {[...rowTestimonials, ...rowTestimonials].map(
                    (item, index) => (
                      <div
                        key={index}
                        className="
            bg-neutral-900/80 
            backdrop-blur 
            border 
            border-neutral-800 
            hover:border-[#A6FF5D]/40 
            transition 
            duration-300 
            rounded-2xl 
            p-5 sm:p-6 
            shrink-0 
            w-65 
            sm:w-75 
            md:w-85
          "
                      >
                        {/* Stars */}
                        <div className="flex mb-4 text-[#A6FF5D] text-sm">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <span key={i}>★</span>
                            ))}
                        </div>

                        {/* Text */}
                        <p className="text-white/60 text-sm mb-6 text-left leading-relaxed">
                          {item.text}
                        </p>

                        {/* User */}
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border border-neutral-700"
                          />
                          <div className="text-left">
                            <p className="text-white text-sm">{item.name}</p>
                            <p className="text-white/40 text-xs">{item.role}</p>
                          </div>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          @keyframes scrollReverse {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }

          .animate-scroll {
            animation: scroll 18s linear infinite;
          }

          .animate-scroll-reverse {
            animation: scrollReverse 18s linear infinite;
          }
        `}
      </style>
    </section>
  );
};

export default Testimonials;
