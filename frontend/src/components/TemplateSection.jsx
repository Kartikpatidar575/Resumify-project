import React, { useState, useEffect, useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Container from "./Container";
import templates from "../data/templates";

const TemplateSection = () => {
  const templateSliderRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = templateSliderRef.current;

    if (!el) return;

    const isAtStart = el.scrollLeft <= 1;
    const isAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;

    setCanScrollLeft(!isAtStart);
    setCanScrollRight(!isAtEnd);
  };

  useEffect(() => {
    const slider = templateSliderRef.current;

    if (!slider) return;

    checkScroll();

    slider.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      slider.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const handleScrollLeft = () => {
    templateSliderRef.current?.scrollBy({
      left: -330,
      behavior: "smooth",
    });
  };

  const handleScrollRight = () => {
    templateSliderRef.current?.scrollBy({
      left: 330,
      behavior: "smooth",
    });
  };

  return (
    <Container>
      <section className="template-section-home py-5">
        {/* Heading */}
        <div className="template-heading-content">
          <h1 className="template-text-heading">Resume Templates</h1>

          <p className="template-para text-muted">
            Choose a professional template that helps you get hired.
          </p>
        </div>
        <div className="template-heading-row">
          <Link to="/templates" className="view-all-templates">
            View All Templates
            <FaArrowRight />
          </Link>
        </div>

        {/* Slider */}
        <div className="template-wrapper-home">
          <button
            className={`scroll-btn ${!canScrollLeft ? "disabled" : ""}`}
            onClick={handleScrollLeft}
            disabled={!canScrollLeft}
            aria-label="Previous templates"
          >
            <FaArrowLeft />
          </button>

          <div className="template-slider-home" ref={templateSliderRef}>
            {templates.map((template) => (
              <div className="template-card-home" key={template.templateId}>
                <span>{template.templateName}</span>

                <img src={template.templateImage} alt={template.templateName} />
              </div>
            ))}
          </div>

          <button
            className={`scroll-btn ${!canScrollRight ? "disabled" : ""}`}
            onClick={handleScrollRight}
            disabled={!canScrollRight}
            aria-label="Next templates"
          >
            <FaArrowRight />
          </button>
        </div>
      </section>
    </Container>
  );
};

export default TemplateSection;
