import React from "react";
import hero_image from "../assets/hero_image.webp";
import { useNavigate } from "react-router-dom";
import Container from "./Container";
import { FaArrowRight, FaCheck } from "react-icons/fa6";
import { FiDownload } from "react-icons/fi";
import { GoEye } from "react-icons/go";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleCreateResume = () => {
    navigate("/dashboard/create-resume");
  };

  const handleViewTemplates = () => {
    navigate("/templates");
  };

  return (
    <section className="hero-section-container">
      <Container>
        <div className="row align-items-center g-5 hero-row">
          {/* Left Content */}
          <div className="col-lg-6">
            <div className="hero-content">
              <span className="hero-tag">ATS-FRIENDLY RESUME BUILDER</span>

              <h1 className="hero-title">
                Build a Professional Resume in <span>Minutes</span>
              </h1>

              <p className="hero-description" style={{ fontWeight: "500" }}>
                Create a professional, ATS-friendly resume that helps you stand
                out from the competition and land more interviews.
              </p>

              {/* Buttons */}
              <div className="hero-buttons">
                <button
                  type="button"
                  className="hero-primary-btn"
                  onClick={handleCreateResume}
                >
                  Build My Resume
                  <FaArrowRight />
                </button>

                <button
                  type="button"
                  className="hero-secondary-btn"
                  onClick={handleViewTemplates}
                >
                  View Templates
                </button>
              </div>

              {/* Features */}
              <div className="hero-features">
                <div className="hero-feature">
                  <div className="feature-icon">
                    <FaCheck color="rgb(23,110,253)" />
                  </div>

                  <div>
                    <h3>ATS Friendly</h3>
                    <p>Built for ATS systems</p>
                  </div>
                </div>

                <div className="hero-feature">
                  <div className="feature-icon">
                    <GoEye color="rgb(23,110,253)" />
                  </div>

                  <div>
                    <h3>Live Preview</h3>
                    <p>See changes instantly</p>
                  </div>
                </div>

                <div className="hero-feature">
                  <div className="feature-icon">
                    <FiDownload color="rgb(23,110,253)" />
                  </div>

                  <div>
                    <h3>Easy Download</h3>
                    <p>Export as PDF</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="col-lg-6">
            <div className="hero-image-container">
              <img
                src={hero_image}
                alt="Resumify resume builder preview"
                className="hero-image"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
