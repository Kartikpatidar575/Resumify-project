import React from "react";
import TemplateSelector from "../components/TemplateSelector";
import { Helmet } from "react-helmet-async";

const Templates = () => {
  const currentUrl = `${window.location.origin}${window.location.pathname}`;
  return (
    <>
      <Helmet>
        <title>Resume Templates - Free ATS-Friendly Templates | Resumify</title>

        <meta
          name="description"
          content="Choose from professional, modern, clean and ATS-friendly resume templates. Select a Resumify template and create your resume in minutes."
        />

        <meta name="robots" content="index, follow" />

        <link rel="canonical" href={currentUrl} />

        <meta property="og:title" content="Resume Templates - Resumify" />

        <meta
          property="og:description"
          content="Explore free professional and ATS-friendly resume templates on Resumify."
        />

        <meta property="og:url" content={currentUrl} />

        <meta property="og:type" content="website" />

        <meta property="og:site_name" content="Resumify" />
      </Helmet>
      <div
        className="container"
        style={{ paddingTop: "120px", paddingBottom: "10px" }}
      >
        {/* Page Header */}
        <div className="text-center mb-5">
          <h1 className="fw-bold">Choose Your Resume Template</h1>
          <p className="text-muted">
            Create a professional, ATS-friendly resume with our modern
            templates.
          </p>
        </div>
        <TemplateSelector />
      </div>
    </>
  );
};

export default Templates;
