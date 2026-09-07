import React from "react";
import { MdAdd, MdRemove } from "react-icons/md";
const AccordionSection = ({
  title,
  id,
  activeSection,
  setActiveSection,
  children,
}) => {
  const isOpen = activeSection === id;
  return (
    <div className="accordion-card">
      <button
        className="accordion-btn"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseOne"
        aria-expanded="true"
        aria-controls="collapseOne"
        onClick={() => setActiveSection(isOpen ? "" : id)}
      >
        <span className="accordion-title">{title}</span>
        {isOpen ? (
          <MdRemove className="accordion-icon" />
        ) : (
          <MdAdd className="accordion-icon" />
        )}
      </button>

      <div id="collapseOne" className="accordion-collapse collapse show">
        <div className={isOpen ? "active-accordion-body" : "accordion-body"}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AccordionSection;
