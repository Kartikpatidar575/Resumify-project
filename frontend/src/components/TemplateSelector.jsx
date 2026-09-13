import React, { useState, useContext } from "react";
import "../styles/component/TemplateSelector.css";
import { RiArrowLeftSFill, RiArrowRightSFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../../context/AuthContext";
import templates from "../data/templates";

const TemplateSelector = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState("All Templates");

  const categories = [
    ...new Set(templates.map((template) => template.templateCategory)),
  ];

  const filterTemplates =
    selectedCategory === "All Templates"
      ? templates
      : templates.filter(
          (template) => template.templateCategory === selectedCategory,
        );

  const handleSelectTemplate = async (templateId) => {
    try {
      if (!isAuthenticated) {
        navigate("/login");
        return;
      }
      const res = await api.post("/resume", {
        templateId,
      });
      const resumeId = res.data.resume._id;
      navigate(`/dashboard/resume/${resumeId}/edit`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* Category Filter */}
      <div className="template-filter">
        <button
          type="button"
          className="template-filter-btn"
          aria-label="Previous categories"
        >
          <RiArrowLeftSFill />
        </button>

        <ul className="template-filter-list">
          <li
            className={selectedCategory === "All Templates" ? "active" : ""}
            onClick={() => setSelectedCategory("All Templates")}
          >
            All Templates
          </li>

          {categories.map((category) => (
            <li
              key={category}
              className={selectedCategory === category ? "active" : ""}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="template-filter-btn"
          aria-label="Next categories"
        >
          <RiArrowRightSFill />
        </button>
      </div>

      {/* Template Grid */}
      <div className="container py-3">
        <div className="template-grid">
          {filterTemplates.map((template) => (
            <div className="template-card" key={template.templateId}>
              {/* Image */}
              <div className="template-image-box">
                <img
                  src={template.templateImage}
                  alt={`${template.templateName} resume template`}
                  className="template-image"
                />

                {/* Hover Overlay */}
                <div className="template-overlay">
                  <button
                    type="button"
                    className="btn btn-success px-4"
                    onClick={() => handleSelectTemplate(template.templateId)}
                  >
                    Select Template
                  </button>
                </div>
              </div>

              {/* Details */}
              <div className="pt-3">
                <h5 className="fw-semibold mb-2">{template.templateName}</h5>

                <p className="text-muted small mb-0">{template.templatePara}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TemplateSelector;
