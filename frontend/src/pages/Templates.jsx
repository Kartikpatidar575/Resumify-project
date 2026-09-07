import React from "react";
import TemplateSelector from "../components/TemplateSelector";

const Templates = () => {
  return (
    <div
      className="container"
      style={{ paddingTop: "120px", paddingBottom: "10px" }}
    >
      {/* Page Header */}
      <div className="text-center mb-5">
        <h1 className="fw-bold">Choose Your Resume Template</h1>
        <p className="text-muted">
          Create a professional, ATS-friendly resume with our modern templates.
        </p>
      </div>
      <TemplateSelector />
    </div>
  );
};

export default Templates;
