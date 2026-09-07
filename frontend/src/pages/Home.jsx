import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import HeroSection from "../components/HeroSection";
import FeatureSection from "../components/FeatureSection";
import TemplateSection from "../components/TemplateSection";
import Footer from "../components/Footer";
import Pricing from "../components/Pricing";

const Home = () => {
  useEffect(() => {
    if (window.location.hash === "#pricing") {
      const pricingSection = document.getElementById("pricing");

      if (pricingSection) {
        pricingSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  }, []);
  return (
    <main>
      <HeroSection />
      <FeatureSection />
      <TemplateSection />
      <Pricing />
      <Footer />
    </main>
  );
};

export default Home;
