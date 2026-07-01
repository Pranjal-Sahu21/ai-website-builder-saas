import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FAQSection from "../components/FAQSection";
import Features from "../components/Features";
import HeroSection from "../components/HeroSection";
import Testimonials from "../components/Testimonials";
import { useSession } from "@/lib/auth-client";

const Home = () => {
  const { data: session, isPending } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      <FAQSection />
    </div>
  );
};

export default Home;
