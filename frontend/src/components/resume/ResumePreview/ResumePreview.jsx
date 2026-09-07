// import React from "react";
import "../../../styles/ResumePreview.css";
// import templatesRegistry from "../templates/templateRegistry";

// const ResumePreview = ({ resumeData, templateId }) => {
//   const SelectedTemplate = templatesRegistry[templateId];
//   if (!SelectedTemplate) {
//     return <p>template not found</p>;
//   }
//   return <SelectedTemplate resumeData={resumeData} />;
// };

// export default ResumePreview;
import React, { useEffect, useRef, useState } from "react";
import templatesRegistry from "../templates/templateRegistry";

const PAGE_WIDTH_PX = 794; // 210mm @ 96dpi

const ResumePreview = ({ resumeData, templateId }) => {
  const SelectedTemplate = templatesRegistry[templateId];
  const wrapperRef = useRef(null);
  const pageRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [pageHeight, setPageHeight] = useState(0);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const updateScale = () => {
      const containerWidth = wrapper.clientWidth;
      setScale(containerWidth / PAGE_WIDTH_PX);
    };

    updateScale();
    const ro = new ResizeObserver(updateScale);
    ro.observe(wrapper);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (pageRef.current) {
      setPageHeight(pageRef.current.scrollHeight);
    }
  }, [resumeData, templateId, scale]);

  if (!SelectedTemplate) {
    return <p>Template not found</p>;
  }

  return (
    <div
      ref={wrapperRef}
      className="resume-scale-wrapper"
      style={{ height: pageHeight * scale || "auto" }}
    >
      <div
        ref={pageRef}
        className="resume-scale-inner"
        style={{ transform: `scale(${scale})` }}
      >
        <SelectedTemplate resumeData={resumeData} />
      </div>
    </div>
  );
};

export default ResumePreview;
