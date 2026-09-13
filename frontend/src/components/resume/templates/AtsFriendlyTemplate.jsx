import React from "react";
import "../templatesCss/AtsFriendlyTemplate.css";

const LEVEL_RANK = {
  Expert: 4,
  Advanced: 3,
  Intermediate: 2,
  Beginner: 1,
};

function formatMonthYear(value) {
  if (!value) return "";
  const [year, month] = value.split("-");
  if (!month) return year;
  const date = new Date(Number(year), Number(month) - 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function formatRange(start, end) {
  const startLabel = formatMonthYear(start);
  const endLabel = end ? formatMonthYear(end) : "Present";
  if (!startLabel) return endLabel;
  return `${startLabel} – ${endLabel}`;
}

function sortedSkillNames(skills = []) {
  return [...skills]
    .sort((a, b) => (LEVEL_RANK[b.level] || 0) - (LEVEL_RANK[a.level] || 0))
    .map((skill) => skill.name);
}

function EducationRow({ label, school, board, year, percentage }) {
  if (!school) return null;
  return (
    <div className="ats-edu-row">
      <div className="ats-edu-row__head">
        <span className="ats-edu-row__degree">{label}</span>
        <span className="ats-edu-row__year">{year}</span>
      </div>
      <div className="ats-edu-row__school">{school}</div>
      {(board || percentage) && (
        <div className="ats-edu-row__meta">
          {board}
          {board && percentage ? " · " : ""}
          {percentage}
        </div>
      )}
    </div>
  );
}

export default function ResumeTemplateATS({ resumeData }) {
  if (!resumeData) return null;

  const {
    personalDetails = {},
    professionalSummary,
    experience = {},
    education = {},
    skills = [],
    projects = [],
  } = resumeData;

  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    city,
    state,
    country,
    jobTitle,
    linkedinUrl,
  } = personalDetails;

  const fullName = [firstName, lastName].filter(Boolean).join(" ");
  const location = [city, state, country].filter(Boolean).join(", ");
  const skillNames = sortedSkillNames(skills);

  const jobs = experience.jobs || [];
  const internships = experience.internships || [];

  return (
    <article className="ats-resume" aria-label={`${fullName} resume`}>
      {/* Header — plain text, no photo */}
      <header className="ats-header">
        <h1 className="ats-name">{fullName}</h1>
        {jobTitle && <p className="ats-role">{jobTitle}</p>}
        <p className="ats-contact">
          {[
            location,
            email,
            phoneNumber,
            linkedinUrl?.replace(/^https?:\/\//, ""),
          ]
            .filter(Boolean)
            .join("  |  ")}
        </p>
      </header>

      {/* Summary */}
      {professionalSummary && (
        <section className="ats-section">
          <h2 className="ats-section__title">Summary</h2>
          <p className="ats-summary">{professionalSummary}</p>
        </section>
      )}

      {/* Work experience */}
      {jobs.length > 0 && (
        <section className="ats-section">
          <h2 className="ats-section__title">Work Experience</h2>
          {jobs.map((job, i) => (
            <div className="ats-entry" key={`job-${i}`}>
              <div className="ats-entry__head">
                <h3 className="ats-entry__title">
                  {job.jobTitle}
                  {job.jobCompanyName ? `, ${job.jobCompanyName}` : ""}
                </h3>
                <span className="ats-entry__dates">
                  {formatRange(job.jobStartDate, job.jobEndDate)}
                </span>
              </div>
              {job.jobLocation && (
                <div className="ats-entry__location">{job.jobLocation}</div>
              )}
              {job.jobResponsibilities && (
                <ul className="ats-entry__list">
                  {job.jobResponsibilities
                    .split(/\.\s+/)
                    .map((s) => s.trim())
                    .filter(Boolean)
                    .map((sentence, idx) => (
                      <li key={idx}>{sentence.replace(/\.$/, "")}.</li>
                    ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Internships */}
      {internships.length > 0 && (
        <section className="ats-section">
          <h2 className="ats-section__title">Internships</h2>
          {internships.map((intern, i) => (
            <div className="ats-entry" key={`intern-${i}`}>
              <div className="ats-entry__head">
                <h3 className="ats-entry__title">
                  {intern.internshipRole}
                  {intern.internshipCompanyName
                    ? `, ${intern.internshipCompanyName}`
                    : ""}
                </h3>
                <span className="ats-entry__dates">
                  {formatRange(
                    intern.internshipStartDate,
                    intern.internshipEndDate,
                  )}
                </span>
              </div>
              {intern.internshipLocation && (
                <div className="ats-entry__location">
                  {intern.internshipLocation}
                </div>
              )}
              {intern.internshipResponsibilities && (
                <ul className="ats-entry__list">
                  {intern.internshipResponsibilities
                    .split(/\.\s+/)
                    .map((s) => s.trim())
                    .filter(Boolean)
                    .map((sentence, idx) => (
                      <li key={idx}>{sentence.replace(/\.$/, "")}.</li>
                    ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      <section className="ats-section">
        <h2 className="ats-section__title">Education</h2>

        <EducationRow
          label={`${education.graduationDegree || ""}${
            education.graduationCourse ? `, ${education.graduationCourse}` : ""
          }`}
          school={education.graduationCollegeName}
          board={education.graduationUniversity}
          year={
            education.graduationStartingYear && education.graduationPassingYear
              ? `${education.graduationStartingYear} – ${education.graduationPassingYear}`
              : education.graduationPassingYear
          }
          percentage={education.graduationPercentage}
        />

        <EducationRow
          label={`${education.postGraduationDegree || ""}${
            education.postGraduationCourse
              ? `, ${education.postGraduationCourse}`
              : ""
          }`}
          school={education.postGraduationCollegeName}
          board={education.postGraduationUniversity}
          year={
            education.postGraduationStartingYear &&
            education.postGraduationPassingYear
              ? `${education.postGraduationStartingYear} – ${education.postGraduationPassingYear}`
              : education.postGraduationPassingYear
          }
          percentage={education.postGraduationPercentage}
        />

        <EducationRow
          label={`${education.diplomaDegree || ""}${
            education.diplomaCourse ? `, ${education.diplomaCourse}` : ""
          }`}
          school={education.diplomaCollegeName}
          board={education.diplomaUniversity}
          year={
            education.diplomaStartingYear && education.diplomaPassingYear
              ? `${education.diplomaStartingYear} – ${education.diplomaPassingYear}`
              : education.diplomaPassingYear
          }
          percentage={education.diplomaPercentage}
        />

        <EducationRow
          label="Senior Secondary"
          school={education.seniorSecondarySchoolName}
          board={education.seniorSecondaryBoard}
          year={education.seniorSecondaryPassingYear}
          percentage={education.seniorSecondaryPercentage}
        />

        <EducationRow
          label="Secondary"
          school={education.secondarySchoolName}
          board={education.secondaryBoard}
          year={education.secondaryPassingYear}
          percentage={education.secondaryPercentage}
        />
      </section>

      {/* Skills — sorted by level, level itself never shown */}
      {skillNames.length > 0 && (
        <section className="ats-section">
          <h2 className="ats-section__title">Skills</h2>
          <p className="ats-skills">{skillNames.join(", ")}</p>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="ats-section">
          <h2 className="ats-section__title">Projects</h2>
          {projects.map((project, i) => (
            <div className="ats-entry" key={`project-${i}`}>
              <div className="ats-entry__head">
                <h3 className="ats-entry__title">
                  {project.projectName}
                  {project.yourRole ? ` — ${project.yourRole}` : ""}
                </h3>
              </div>
              {project.projectDescription && (
                <p className="ats-entry__text">{project.projectDescription}</p>
              )}
              <p className="ats-entry__meta">
                {project.technologyUsed}
                {project.projectLink && (
                  <>
                    {project.technologyUsed ? "  |  " : ""}
                    {project.projectLink.replace(/^https?:\/\//, "")}
                  </>
                )}
              </p>
            </div>
          ))}
        </section>
      )}
    </article>
  );
}
