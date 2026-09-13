import React, { useEffect } from "react";
import "../styles/Home.css";
import HeroSection from "../components/HeroSection";
import FeatureSection from "../components/FeatureSection";
import TemplateSection from "../components/TemplateSection";
import Footer from "../components/Footer";
import Pricing from "../components/Pricing";
import { Helmet } from "react-helmet-async";
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
  const currentUrl = `${window.location.origin}${window.location.pathname}`;
  return (
    <>
      {" "}
      <Helmet>
        <title>Resumify - Free ATS-Friendly Resume Builder</title>

        <meta
          name="description"
          content="Create professional, ATS-friendly resumes with Resumify. Choose a modern resume template, add your details, preview your resume, and download it easily."
        />

        <meta name="robots" content="index, follow" />

        <link rel="canonical" href={currentUrl} />

        <meta
          property="og:title"
          content="Resumify - Free ATS-Friendly Resume Builder"
        />

        <meta
          property="og:description"
          content="Build a professional, ATS-friendly resume with modern templates using Resumify."
        />

        <meta property="og:url" content={currentUrl} />

        <meta property="og:type" content="website" />

        <meta property="og:site_name" content="Resumify" />
      </Helmet>
      <main>
        <HeroSection />
        <FeatureSection />
        <TemplateSection />
        <Pricing />
      </main>
      <Footer />
    </>
  );
};

export default Home;
