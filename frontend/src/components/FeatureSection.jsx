import React from "react";
import { FaRobot, FaFileAlt, FaPalette, FaDownload } from "react-icons/fa";
import Container from "./Container";

const features = [
  {
    icon: <FaRobot />,
    title: "AI Resume Builder",
    description:
      "Create professional resumes with AI-powered suggestions and smart content improvements.",
  },
  {
    icon: <FaFileAlt />,
    title: "ATS-Friendly Templates",
    description:
      "Build resumes optimized for applicant tracking systems used by recruiters.",
  },
  {
    icon: <FaPalette />,
    title: "Professional Designs",
    description:
      "Choose from modern templates and customize your resume style easily.",
  },
  {
    icon: <FaDownload />,
    title: "Instant PDF Export",
    description: "Download your resume instantly and share it with employers.",
  },
];

const FeatureSection = () => {
  return (
    <section className="features py-5" id="features">
      <Container>
        {" "}
        <h1 className="feature-title">
          Everything You Need to Create a Job-Winning Resume
        </h1>
        <p className="feature-subtitle">
          Build professional, ATS-friendly resumes with smart tools and
          beautiful templates.
        </p>
        <div className="">
          <div className="row g-4">
            {features.map((feature, index) => (
              <div className="col-lg-3 col-md-6" key={index}>
                <div className="feature-card">
                  <div className="feature-icon">{feature.icon}</div>

                  <h3>{feature.title}</h3>

                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FeatureSection;
