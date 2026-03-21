import React, { useEffect, useState } from "react";
import { appPlans } from "../assets/assets";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import api from "@/configs/axios.config";

const Pricing: React.FC = () => {
  const { data: session } = useSession();

  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handlePurchase = async (planId: string) => {
    try {
      if (!session?.user)
        return toast.error("Please login to purchase credits");

      setLoadingPlan(planId);

      const { data } = await api.post("/api/user/purchase-credits", { planId });
      window.location.href = data.payment_link;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoadingPlan(null);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section
      className="bg-black py-20 px-4 bg-[radial-gradient(rgba(166,255,93,0.15)_1.5px,transparent_0)]
        bg-size-[20px_20px]
        bg-position-[-1px_-1px]"
      id="pricing"
    >
      {/* Heading */}
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
        <h2 className="text-white text-3xl md:text-4xl mt-10">
          Choose your perfect{" "}
          <span className="text-[#A6FF5D] italic">plan</span>
        </h2>
        <p className="text-white/50 text-sm max-w-md mx-auto mt-4">
          Plans for creators and teams to launch fast.
        </p>
      </div>

      {/* Plans */}
      <div className="w-full max-w-6xl mx-auto mt-14 flex flex-wrap justify-center gap-10">
        {appPlans.map((plan) => (
          <div
            key={plan.id}
            className={`relative flex flex-col gap-3 w-72 p-6 rounded-2xl border border-neutral-800 ${
              plan.id === "pro"
                ? "bg-[#0D1F0D] border-[#A6FF5D] scale-105"
                : "bg-neutral-900/80 hover:border-[#A6FF5D]/40"
            } transition-transform duration-300`}
          >
            {/* Popular badge */}
            {plan.id === "pro" && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#A6FF5D] text-gray-900 text-xs px-3 py-1 rounded-full shadow-lg">
                Popular
              </span>
            )}

            <h3 className="text-lg text-white mb-2">{plan.name}</h3>
            <p className="text-3xl text-white">{plan.price}</p>
            <p className="text-sm text-white/50 mb-2 -mt-2">
              {plan.credits} AI credits
            </p>
            <p className="text-sm text-white/50 mb-4">{plan.description}</p>

            <ul className="text-sm text-white/60 mb-6 flex-1 space-y-2">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-[#A6FF5D]">✔</span> {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handlePurchase(plan.id)}
              className={`w-full py-2.5 rounded-full text-sm transition ${
                plan.id === "pro"
                  ? "bg-[#A6FF5D] text-gray-900 hover:bg-[#A6FF5D]/90"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
              disabled={loadingPlan === plan.id}
            >
              {loadingPlan === plan.id ? "Processing..." : "Select Plan"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
