import React from "react";

const ProfessionalSummary = ({ resumeData, setResumeData }) => {
  const maxLength = 300;

  const professionalSummary = resumeData?.professionalSummary ?? "";

  const handleChange = (e) => {
    setResumeData((prev) => ({
      ...prev,
      professionalSummary: e.target.value,
    }));
  };

  const isLimitReached = professionalSummary.length >= maxLength;

  return (
    <div className="mb-4">
      <label htmlFor="professionalSummary" className="form-label fw-semibold">
        Professional Summary
      </label>

      <textarea
        id="professionalSummary"
        name="professionalSummary"
        className={`form-control ${isLimitReached ? "border-danger" : ""}`}
        rows="5"
        maxLength={maxLength}
        placeholder="Write a brief summary of your professional background, skills, experience, and career goals..."
        value={professionalSummary}
        onChange={handleChange}
      />

      <div className="d-flex justify-content-between mt-1">
        <small className="text-muted">
          Keep it concise and relevant to the job.
        </small>

        <small className={isLimitReached ? "text-danger" : "text-muted"}>
          {professionalSummary.length}/{maxLength}
        </small>
      </div>
    </div>
  );
};

export default ProfessionalSummary;
