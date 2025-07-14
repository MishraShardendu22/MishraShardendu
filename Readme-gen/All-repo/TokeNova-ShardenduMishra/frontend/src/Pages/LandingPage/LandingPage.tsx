import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TechSection from "./TechUsed";
import HeroSection from "./Hero";
import Featured from "./Featured";
import Work from "./Work";
import Faq from "./Faq";
import Footer from "./Footer";
import Header from "./Header";
import Cta from "./Cta";
import VideoSection from "./VideoSection";

const LandingPage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const floatingElements = [
    {
      size: "w-64 h-64",
      color: "bg-purple-400",
      position: { top: "10%", left: "5%" },
      animation: { x: [0, 100, 0], y: [0, 50, 0] },
      duration: 20,
      opacity: 0.3,
    },
    {
      size: "w-80 h-80",
      color: "bg-indigo-500",
      position: { top: "40%", right: "10%" },
      animation: { x: [0, -70, 0], y: [0, 100, 0] },
      duration: 25,
      opacity: 0.25,
    },
    {
      size: "w-72 h-72",
      color: "bg-pink-400",
      position: { bottom: "15%", left: "25%" },
      animation: { x: [0, 50, 0], y: [0, -80, 0] },
      duration: 22,
      opacity: 0.2,
    },
    {
      size: "w-56 h-56",
      color: "bg-teal-400",
      position: { top: "60%", left: "15%" },
      animation: { x: [0, 80, 0], y: [0, 40, 0] },
      duration: 18,
      opacity: 0.15,
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-white text-gray-900 overflow-hidden font-sans">
        <Header />

      <div className="fixed inset-0 -z-10 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern" />
      </div>

      <div className="fixed inset-0 -z-5 overflow-hidden pointer-events-none">
        {floatingElements.map((element, index) => (
          <motion.div
            key={index}
            className={`absolute ${element.size} rounded-full ${element.color} blur-3xl`}
            animate={element.animation}
            transition={{
              duration: element.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              ...element.position,
              opacity: element.opacity,
              filter: "saturate(0.85)",
            }}
          />
        ))}
      </div>

      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-indigo-500 to-pink-500 z-50"
        style={{
          scaleX: scrollY / (document.body.scrollHeight - window.innerHeight),
          transformOrigin: "left",
        }}
      />

      <HeroSection />
      <TechSection />
      <VideoSection />
      <Featured />
      <Work />
      <Cta />
      <Faq />
      <Footer />
    </div>
  );
};

export default LandingPage;
