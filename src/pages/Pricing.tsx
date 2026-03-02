import React from "react";

const Pricing: React.FC = () => {
  const plans = [
    {
      name: "Basic",
      price: "$19/mo",
      credits: "100 AI credits",
      features: ["AI Website Builder", "1 Project", "Basic Support"],
      highlight: false,
    },
    {
      name: "Pro",
      price: "$49/mo",
      credits: "500 AI credits",
      features: [
        "Unlimited Projects",
        "Advanced AI Templates",
        "Priority Support",
      ],
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "$99/mo",
      credits: "2000 AI credits",
      features: [
        "Custom Integrations",
        "Dedicated Account Manager",
        "Full Support",
      ],
      highlight: false,
    },
  ];

  return (
    <section
      className="bg-black py-20 px-4 bg-[radial-gradient(rgba(166,255,93,0.15)_1.5px,transparent_0)]
        bg-size-[20px_20px]
        bg-position-[-1px_-1px]"
      id="pricing"
    >
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
        <h2 className="text-white text-3xl md:text-4xl mt-24">
          Choose the plan that fits your{" "}
          <span className="text-[#A6FF5D] italic">needs</span>
        </h2>

        <p className="text-white/50 text-sm max-w-md mx-auto mt-4">
          Plans for creators and teams to launch fast.
        </p>
      </div>

      <div className="w-full max-w-6xl mx-auto mt-14 flex flex-wrap justify-center gap-10">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative flex flex-col gap-3 w-70 p-6 rounded-2xl border border-neutral-800 ${
              plan.highlight
                ? "bg-[#0D1F0D] border-[#A6FF5D] scale-105"
                : "bg-neutral-900/80 hover:border-[#A6FF5D]/40"
            } transition-transform duration-300`}
          >
            {index === 1 && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#A6FF5D] text-gray-900 text-xs font-medium px-3 py-1 rounded-full shadow-lg">
                Popular
              </span>
            )}

            <h3 className="text-lg text-white mb-2">{plan.name}</h3>
            <p className="text-3xl font-medium text-white">{plan.price}</p>
            <p className="text-sm text-white/50 mb-4 -mt-2">{plan.credits}</p>

            <ul className="text-sm text-white/60 mb-6 flex-1 space-y-2">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-[#A6FF5D]">✔</span> {feature}
                </li>
              ))}
            </ul>

            <button
              className={`w-full py-2.5 rounded-full text-sm transition ${
                plan.highlight
                  ? "bg-[#A6FF5D] text-gray-900 hover:bg-[#A6FF5D]/90"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              Select Plan
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
