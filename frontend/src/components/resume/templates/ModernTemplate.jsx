import React from "react";
import "../templatesCss/ModernTemplate.css";

const ModernTemplate = ({ resumeData = {} }) => {
  const {
    personalDetails = {},
    professionalSummary = "",
    education = {},
    experience = {},
    skills = [],
    projects = [],
  } = resumeData;

  const { jobs = [], internships = [] } = experience;

  /* ================================
     SKILL LEVEL RANKING
  ================================= */
  const LEVEL_RANK = {
    Expert: 4,
    Advanced: 3,
    Intermediate: 2,
    Beginner: 1,
  };

  // Sort by skill level:
  // Expert → Advanced → Intermediate → Beginner
  // The level itself is NOT displayed in the resume.
  const sortedSkills = [...skills].sort(
    (a, b) => (LEVEL_RANK[b?.level] || 0) - (LEVEL_RANK[a?.level] || 0),
  );

  /* ================================
     PERSONAL DETAILS
  ================================= */

  const fullName = [personalDetails.firstName, personalDetails.lastName]
    .filter(Boolean)
    .join(" ");

  const nameParts = fullName.trim().split(/\s+/);

  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ");

  const location = [
    personalDetails.city,
    personalDetails.state,
    personalDetails.country,
  ]
    .filter(Boolean)
    .join(", ");

  /* ================================
     EDUCATION
  ================================= */

  const qualification = education.highestQualification;

  const educationMap = {
    Secondary: {
      degree: "10th / Secondary",
      institute: education.secondarySchoolName,
      board: education.secondaryBoard,
      year: education.secondaryPassingYear,
      score: education.secondaryPercentage,
    },

    "Senior Secondary": {
      degree: "12th / Senior Secondary",
      institute: education.seniorSecondarySchoolName,
      board: education.seniorSecondaryBoard,
      year: education.seniorSecondaryPassingYear,
      score: education.seniorSecondaryPercentage,
    },

    Diploma: {
      degree: education.diplomaDegree,
      institute: education.diplomaCollegeName,
      university: education.diplomaUniversity,
      course: education.diplomaCourse,
      year: `${education.diplomaStartingYear || ""}${
        education.diplomaPassingYear ? ` – ${education.diplomaPassingYear}` : ""
      }`.trim(),
      score: education.diplomaPercentage,
    },

    Graduation: {
      degree: education.graduationDegree,
      institute: education.graduationCollegeName,
      university: education.graduationUniversity,
      course: education.graduationCourse,
      year: `${education.graduationStartingYear || ""}${
        education.graduationPassingYear
          ? ` – ${education.graduationPassingYear}`
          : ""
      }`.trim(),
      score: education.graduationPercentage,
    },

    "Post Graduation": {
      degree: education.postGraduationDegree,
      institute: education.postGraduationCollegeName,
      university: education.postGraduationUniversity,
      course: education.postGraduationCourse,
      year: `${education.postGraduationStartingYear || ""}${
        education.postGraduationPassingYear
          ? ` – ${education.postGraduationPassingYear}`
          : ""
      }`.trim(),
      score: education.postGraduationPercentage,
    },
  };

  const edu = educationMap[qualification];

  /* ================================
     HELPERS
  ================================= */

  const Section = ({ title, children }) => (
    <section className="modern-section">
      <div className="modern-section-heading">
        <span className="modern-dot"></span>

        <h2>{title}</h2>

        <span className="modern-heading-line"></span>
      </div>

      <div className="modern-section-content">{children}</div>
    </section>
  );

  const renderDescription = (text) => {
    if (!text) return null;

    const points = text
      .split("\n")
      .map((point) => point.trim())
      .filter(Boolean);

    if (!points.length) return null;

    return (
      <ul className="modern-responsibilities">
        {points.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
    );
  };

  const formatLink = (url) => {
    if (!url) return "";

    return url.startsWith("http") ? url : `https://${url}`;
  };

  /* ================================
     RENDER
  ================================= */

  return (
    <div className="modern-template">
      {/* ================================
          HEADER
      ================================= */}

      <header className="modern-header">
        <div className="modern-header-top">
          <div>
            {firstName && (
              <span className="modern-first-name">{firstName}</span>
            )}

            {lastName && <span className="modern-last-name"> {lastName}</span>}
          </div>
        </div>

        {personalDetails.jobTitle && (
          <p className="modern-job-title">{personalDetails.jobTitle}</p>
        )}

        <div className="modern-contact">
          {personalDetails.email && (
            <span className="modern-contact-item">
              <span className="modern-icon">✉</span>
              {personalDetails.email}
            </span>
          )}

          {personalDetails.email && personalDetails.phoneNumber && (
            <span className="modern-contact-separator">|</span>
          )}

          {personalDetails.phoneNumber && (
            <span className="modern-contact-item">
              <span className="modern-icon">☎</span>
              {personalDetails.phoneNumber}
            </span>
          )}

          {personalDetails.phoneNumber && location && (
            <span className="modern-contact-separator">|</span>
          )}

          {location && (
            <span className="modern-contact-item">
              <span className="modern-icon">●</span>
              {location}
            </span>
          )}

          {personalDetails.linkedinUrl && (
            <>
              <span className="modern-contact-separator">|</span>

              <a
                className="modern-linkedin"
                href={formatLink(personalDetails.linkedinUrl)}
                target="_blank"
                rel="noreferrer"
              >
                <span className="linkedin-icon">in</span>
                LinkedIn
              </a>
            </>
          )}
        </div>
      </header>

      {/* ================================
          PROFESSIONAL SUMMARY
      ================================= */}

      {professionalSummary && professionalSummary.trim() && (
        <Section title="Professional Summary">
          <p className="modern-summary">{professionalSummary}</p>
        </Section>
      )}

      {/* ================================
          EXPERIENCE
      ================================= */}

      {(jobs.length > 0 || internships.length > 0) && (
        <Section title="Experience">
          {/* ==========================
              JOBS
          =========================== */}

          {jobs.map((job, index) => (
            <div className="modern-experience-item" key={`job-${index}`}>
              <div className="modern-item-header">
                <div className="modern-item-main">
                  {job.jobTitle && <h3>{job.jobTitle}</h3>}

                  {(job.jobCompanyName || job.jobLocation) && (
                    <p className="modern-company">
                      {job.jobCompanyName}

                      {job.jobCompanyName && job.jobLocation && (
                        <span className="modern-bullet">•</span>
                      )}

                      {job.jobLocation && (
                        <span className="modern-location">
                          {job.jobLocation}
                        </span>
                      )}
                    </p>
                  )}
                </div>

                {(job.jobStartDate || job.jobEndDate) && (
                  <span className="modern-date">
                    {job.jobStartDate}

                    {job.jobStartDate && job.jobEndDate && " – "}

                    {job.jobEndDate || (job.jobStartDate ? "Present" : "")}
                  </span>
                )}
              </div>

              {renderDescription(job.jobResponsibilities)}
            </div>
          ))}

          {/* ==========================
              INTERNSHIPS
          =========================== */}

          {internships.map((internship, index) => (
            <div className="modern-experience-item" key={`internship-${index}`}>
              <div className="modern-item-header">
                <div className="modern-item-main">
                  {internship.internshipRole && (
                    <h3>{internship.internshipRole}</h3>
                  )}

                  {(internship.internshipCompanyName ||
                    internship.internshipLocation) && (
                    <p className="modern-company">
                      {internship.internshipCompanyName}

                      {internship.internshipCompanyName &&
                        internship.internshipLocation && (
                          <span className="modern-bullet">•</span>
                        )}

                      {internship.internshipLocation && (
                        <span className="modern-location">
                          {internship.internshipLocation}
                        </span>
                      )}
                    </p>
                  )}
                </div>

                {(internship.internshipStartDate ||
                  internship.internshipEndDate) && (
                  <span className="modern-date">
                    {internship.internshipStartDate}

                    {internship.internshipStartDate &&
                      internship.internshipEndDate &&
                      " – "}

                    {internship.internshipEndDate ||
                      (internship.internshipStartDate ? "Present" : "")}
                  </span>
                )}
              </div>

              {renderDescription(internship.internshipResponsibilities)}
            </div>
          ))}
        </Section>
      )}

      {/* ================================
          EDUCATION
      ================================= */}

      {edu &&
        (edu.degree ||
          edu.institute ||
          edu.university ||
          edu.course ||
          edu.year ||
          edu.score ||
          edu.board) && (
          <Section title="Education">
            <div className="modern-education-item">
              <div className="modern-item-header">
                <div className="modern-item-main">
                  {edu.degree && <h3>{edu.degree}</h3>}

                  {edu.institute && (
                    <p className="modern-company">{edu.institute}</p>
                  )}

                  {edu.university && edu.university !== edu.institute && (
                    <p className="modern-university">{edu.university}</p>
                  )}

                  {edu.course && <p className="modern-course">{edu.course}</p>}

                  {edu.board && <p className="modern-course">{edu.board}</p>}

                  {edu.score && <p className="modern-score">{edu.score}</p>}
                </div>

                {edu.year && <span className="modern-date">{edu.year}</span>}
              </div>
            </div>
          </Section>
        )}

      {/* ================================
          SKILLS
      ================================= */}

      {sortedSkills.length > 0 && (
        <Section title="Skills">
          <div className="modern-skills">
            {sortedSkills.map((skill, index) => {
              const skillName = skill?.name || "";

              return (
                <div className="modern-skill" key={`skill-${index}`}>
                  <span>{skillName}</span>
                </div>
              );
            })}
          </div>
        </Section>
      )}

      {/* ================================
          PROJECTS
      ================================= */}

      {projects.length > 0 && (
        <Section title="Projects">
          {projects.map((project, index) => (
            <div className="modern-project-item" key={`project-${index}`}>
              <div className="modern-project-header">
                <div className="modern-item-main">
                  {project.projectName && <h3>{project.projectName}</h3>}

                  {project.yourRole && (
                    <p className="modern-company">{project.yourRole}</p>
                  )}
                </div>

                {project.technologyUsed && (
                  <span className="modern-technology">
                    {project.technologyUsed}
                  </span>
                )}
              </div>

              {project.projectDescription && (
                <p className="modern-project-description">
                  {project.projectDescription}
                </p>
              )}

              {project.projectLink && (
                <a
                  className="modern-project-link"
                  href={formatLink(project.projectLink)}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Project
                </a>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* ================================
          ACADEMIC DETAILS
      ================================= */}

      {(education.seniorSecondarySchoolName ||
        education.secondarySchoolName) && (
        <Section title="Academic Details">
          {/* SENIOR SECONDARY */}

          {education.seniorSecondarySchoolName && (
            <div className="modern-academic-item">
              <div>
                <h3>Senior Secondary</h3>

                <p className="modern-company">
                  {education.seniorSecondarySchoolName}
                </p>

                {education.seniorSecondaryBoard && (
                  <p className="modern-course">
                    {education.seniorSecondaryBoard}
                  </p>
                )}
              </div>

              <div className="modern-academic-meta">
                {education.seniorSecondaryPassingYear && (
                  <span>{education.seniorSecondaryPassingYear}</span>
                )}

                {education.seniorSecondaryPercentage && (
                  <span>{education.seniorSecondaryPercentage}</span>
                )}
              </div>
            </div>
          )}

          {/* SECONDARY */}

          {education.secondarySchoolName && (
            <div className="modern-academic-item">
              <div>
                <h3>Secondary</h3>

                <p className="modern-company">
                  {education.secondarySchoolName}
                </p>

                {education.secondaryBoard && (
                  <p className="modern-course">{education.secondaryBoard}</p>
                )}
              </div>

              <div className="modern-academic-meta">
                {education.secondaryPassingYear && (
                  <span>{education.secondaryPassingYear}</span>
                )}

                {education.secondaryPercentage && (
                  <span>{education.secondaryPercentage}</span>
                )}
              </div>
            </div>
          )}
        </Section>
      )}
    </div>
  );
};

export default ModernTemplate;
