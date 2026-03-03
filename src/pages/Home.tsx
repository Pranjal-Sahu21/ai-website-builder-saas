import { useEffect } from "react";
import FAQSection from "../components/FAQSection";
import Features from "../components/Features";
import HeroSection from "../components/HeroSection";
import Testimonials from "../components/Testimonials";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
