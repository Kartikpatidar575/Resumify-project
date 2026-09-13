import React from "react";
import "../../../styles/component/ResumePreview.css";
import templatesRegistry from "../templates/templateRegistry";

const ResumePreview = ({ resumeData, templateId }) => {
  const SelectedTemplate = templatesRegistry[templateId];

  if (!SelectedTemplate) {
    return <p className="template-not-found">Template not found</p>;
  }

  return (
    <div className="resume-page-content">
      <SelectedTemplate resumeData={resumeData} />
    </div>
  );
};

export default ResumePreview;
