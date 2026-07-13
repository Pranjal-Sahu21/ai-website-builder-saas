import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import FAQSection from "../components/FAQSection";
import Features from "../components/Features";
import HeroSection from "../components/HeroSection";
import Testimonials from "../components/Testimonials";
import StatsSection from "../components/StatsSection";
import CTASection from "../components/CTASection";
import { useSession } from "@/lib/auth-client";

const Home = () => {
  const { data: session, isPending } = useSession();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle scrolling to section if navigating from another page
  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (state?.scrollTo) {
      const targetId = state.scrollTo;
      const timer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
        // Clear state so browser refresh or back button doesn't trigger scroll again
        navigate(location.pathname, { replace: true, state: {} });
      }, 50); // Matches the page transition animation duration

      return () => clearTimeout(timer);
    }
  }, [location, navigate]);

  // Redirect logged-in users to the generate page
  useEffect(() => {
    if (!isPending && session?.user) {
      navigate("/generate", { replace: true });
    }
  }, [session?.user, isPending]);

  return (
    <div>
      <HeroSection />
      <Features />
      <Testimonials />
      <StatsSection />
      <FAQSection />
      <CTASection />
    </div>
  );
};

export default Home;
