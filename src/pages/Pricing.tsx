import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { appPlans } from "../assets/assets";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import api from "@/configs/axios.config";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedHeadline from "../components/AnimatedHeadline";


// Animation settings
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.9, // Snappier reveal matching accelerated title stagger
    },
  },
};
const item = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

// Next Arrow UI
const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute -right-2 top-1/2 -translate-y-1/2 z-20 bg-black/60 border border-[#A6FF5D]/30 hover:border-[#A6FF5D] p-2 rounded-full backdrop-blur"
    >
      <ChevronRight className="text-[#A6FF5D]" size={18} />
    </button>
  );
};

// Prev Arrow UI
const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute -left-2 top-1/2 -translate-y-1/2 z-20 bg-black/60 border border-[#A6FF5D]/30 hover:border-[#A6FF5D] p-2 rounded-full backdrop-blur"
    >
      <ChevronLeft className="text-[#A6FF5D]" size={18} />
    </button>
  );
};

// Slider Settings
const sliderSettings = {
  dots: false,
  arrows: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 3500,
  speed: 1000,
  fade: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

const Pricing: React.FC = () => {
  const { data: session } = useSession();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handlePurchase = async (planId: string) => {
    try {
      if (!session?.user) {
        return toast.error("Please login to purchase credits");
      }

      setLoadingPlan(planId);

      const { data } = await api.post("/api/user/purchase-credits", {
        planId,
      });

      window.location.href = data.payment_link;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoadingPlan(null);
    }
  };

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Plan Card component
  const PlanCard = ({ plan }: any) => (
    <div
      className={`relative flex flex-col gap-3 w-full p-6 rounded-2xl border scale-95 md:scale-100 border-neutral-800 ${
        plan.id === "pro"
          ? "bg-[#0D1F0D] border-[#A6FF5D]/40 md:scale-105"
          : "bg-neutral-900/80 hover:border-[#A6FF5D]/40"
      } transition-transform duration-300`}
    >
      {/* Popular badge */}
      {plan.id === "pro" && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#A6FF5D] text-gray-900 text-xs px-3 py-1 rounded-full shadow-lg">
          Popular
        </span>
      )}

      {/* Plan details */}
      <h3 className="text-lg text-white mb-2">{plan.name}</h3>
      <p className="text-3xl text-white">{plan.price}</p>
      <p className="text-sm text-white/50 mb-2 -mt-2">
        {plan.credits} AI credits
      </p>
      <p className="text-sm text-white/50 mb-4">{plan.description}</p>

      <ul className="text-sm text-white/60 mb-6 flex-1 space-y-2">
        {plan.features.map((feature: string, i: number) => (
          <li key={i} className="flex items-center gap-2">
            <span className="text-[#A6FF5D]">✔</span> {feature}
          </li>
        ))}
      </ul>

      {/* Buy plan button */}
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
  );

  return (
    <section
      className="bg-black py-20 px-4 pb-32"
      id="pricing"
    >
      {/* Heading */}
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto mt-12 md:mt-0">
        <AnimatedHeadline
          as="h2"
          className="text-white text-4xl md:text-5xl mt-10 tracking-tight text-center font-light"
          triggerOnView={true}
          stagger={20}
        >
          Choose your perfect{" "}
          <span className="text-[#A6FF5D] italic">plan</span>
        </AnimatedHeadline>
      </div>

      {/* Desktop Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="hidden md:flex w-full max-w-6xl mx-auto mt-14 flex-wrap justify-center gap-10"
      >
        {appPlans.map((plan) => (
          <motion.div key={plan.id} variants={item} className="w-72">
            <PlanCard plan={plan} />
          </motion.div>
        ))}
      </motion.div>

      {/* Mobile Slider */}
      <div className="md:hidden w-full max-w-md mx-auto mt-14">
        <Slider {...sliderSettings}>
          {appPlans.map((plan) => (
            <div key={plan.id} className="px-2">
              <PlanCard plan={plan} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Pricing;
