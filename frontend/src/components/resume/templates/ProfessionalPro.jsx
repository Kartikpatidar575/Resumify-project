import React from "react";
import "../templatesCss/ProfessionalPro.css";

const ProfessionalPro = ({ resumeData = {} }) => {
  const {
    personalDetails = {},
    professionalSummary = "",
    experience = {},
    education = {},
    skills = [],
    projects = [],
  } = resumeData;

  const fullName = `${personalDetails.firstName || ""} ${
    personalDetails.lastName || ""
  }`.trim();

  return (
    <div className="professional-pro">
      {/* ================= LEFT SIDEBAR ================= */}
      <aside className="professional-sidebar">
        <div className="professional-avatar">
          <div className="avatar-placeholder">👤</div>
        </div>

        <h1>{fullName || "Your Name"}</h1>

        <p className="professional-job-title">
          {personalDetails.jobTitle || "Professional Title"}
        </p>

        {/* ================= CONTACT ================= */}
        <div className="pp-section">
          <h3>CONTACT</h3>

          {personalDetails.email && <p>{personalDetails.email}</p>}

          {personalDetails.phoneNumber && <p>{personalDetails.phoneNumber}</p>}

          {(personalDetails.city ||
            personalDetails.state ||
            personalDetails.country) && (
            <p>
              {[
                personalDetails.city,
                personalDetails.state,
                personalDetails.country,
              ]
                .filter(Boolean)
                .join(", ")}
            </p>
          )}

          {personalDetails.linkedinUrl && (
            <p className="pp-link">{personalDetails.linkedinUrl}</p>
          )}
        </div>

        {/* ================= SKILLS ================= */}
        {skills.length > 0 && (
          <div className="pp-section">
            <h3>SKILLS</h3>

            <div className="pp-skills">
              {skills.map((skill, index) => (
                <div className="pp-skill" key={index}>
                  {skill.name}

                  {skill.level && (
                    <small className="skill-level">{skill.level}</small>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= EDUCATION ================= */}
        <div className="pp-section">
          <h3>EDUCATION</h3>

          {/* Graduation */}
          {education.graduationCollegeName && (
            <div className="pp-education-item">
              <strong>
                {education.graduationDegree || education.graduationCourse}
              </strong>

              <p>{education.graduationCollegeName}</p>

              {education.graduationUniversity &&
                education.graduationUniversity !==
                  education.graduationCollegeName && (
                  <p>{education.graduationUniversity}</p>
                )}

              {education.graduationCourse && (
                <p>{education.graduationCourse}</p>
              )}

              {(education.graduationStartingYear ||
                education.graduationPassingYear) && (
                <small>
                  {education.graduationStartingYear}
                  {education.graduationStartingYear &&
                  education.graduationPassingYear
                    ? " - "
                    : ""}
                  {education.graduationPassingYear}
                </small>
              )}

              {education.graduationPercentage && (
                <small>{education.graduationPercentage}</small>
              )}
            </div>
          )}

          {/* Post Graduation */}
          {education.postGraduationCollegeName && (
            <div className="pp-education-item">
              <strong>
                {education.postGraduationDegree ||
                  education.postGraduationCourse}
              </strong>

              <p>{education.postGraduationCollegeName}</p>

              {education.postGraduationUniversity &&
                education.postGraduationUniversity !==
                  education.postGraduationCollegeName && (
                  <p>{education.postGraduationUniversity}</p>
                )}

              {(education.postGraduationStartingYear ||
                education.postGraduationPassingYear) && (
                <small>
                  {education.postGraduationStartingYear}
                  {education.postGraduationStartingYear &&
                  education.postGraduationPassingYear
                    ? " - "
                    : ""}
                  {education.postGraduationPassingYear}
                </small>
              )}

              {education.postGraduationPercentage && (
                <small>{education.postGraduationPercentage}</small>
              )}
            </div>
          )}

          {/* Diploma */}
          {education.diplomaCollegeName && (
            <div className="pp-education-item">
              <strong>
                {education.diplomaDegree || education.diplomaCourse}
              </strong>

              <p>{education.diplomaCollegeName}</p>

              {education.diplomaUniversity &&
                education.diplomaUniversity !==
                  education.diplomaCollegeName && (
                  <p>{education.diplomaUniversity}</p>
                )}

              {(education.diplomaStartingYear ||
                education.diplomaPassingYear) && (
                <small>
                  {education.diplomaStartingYear}
                  {education.diplomaStartingYear && education.diplomaPassingYear
                    ? " - "
                    : ""}
                  {education.diplomaPassingYear}
                </small>
              )}

              {education.diplomaPercentage && (
                <small>{education.diplomaPercentage}</small>
              )}
            </div>
          )}
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="professional-main">
        {/* ================= SUMMARY ================= */}
        {professionalSummary && (
          <section className="pp-main-section">
            <h2>PROFESSIONAL SUMMARY</h2>

            <p className="pp-summary">{professionalSummary}</p>
          </section>
        )}

        {/* ================= EXPERIENCE ================= */}
        {experience.type !== "None" && (
          <section className="pp-main-section">
            <h2>EXPERIENCE</h2>

            {/* ================= JOBS ================= */}
            {experience.jobs?.map((job, index) => (
              <div className="pp-experience" key={`job-${index}`}>
                <div className="pp-experience-header">
                  <div>
                    <h3>{job.jobTitle || "Job Position"}</h3>

                    {job.jobCompanyName && (
                      <strong>{job.jobCompanyName}</strong>
                    )}

                    {job.jobLocation && <p>{job.jobLocation}</p>}
                  </div>

                  {(job.jobStartDate || job.jobEndDate) && (
                    <span>
                      {job.jobStartDate}

                      {job.jobStartDate && job.jobEndDate ? " - " : ""}

                      {job.jobEndDate}
                    </span>
                  )}
                </div>

                {job.jobResponsibilities && <p>{job.jobResponsibilities}</p>}
              </div>
            ))}

            {/* ================= INTERNSHIPS ================= */}
            {experience.internships?.map((internship, index) => (
              <div className="pp-experience" key={`internship-${index}`}>
                <div className="pp-experience-header">
                  <div>
                    <h3>{internship.internshipRole || "Intern"}</h3>

                    {internship.internshipCompanyName && (
                      <strong>{internship.internshipCompanyName}</strong>
                    )}

                    {internship.internshipLocation && (
                      <p>{internship.internshipLocation}</p>
                    )}
                  </div>

                  {(internship.internshipStartDate ||
                    internship.internshipEndDate) && (
                    <span>
                      {internship.internshipStartDate}

                      {internship.internshipStartDate &&
                      internship.internshipEndDate
                        ? " - "
                        : ""}

                      {internship.internshipEndDate}
                    </span>
                  )}
                </div>

                {internship.internshipResponsibilities && (
                  <p>{internship.internshipResponsibilities}</p>
                )}
              </div>
            ))}
          </section>
        )}

        {/* ================= PROJECTS ================= */}
        {projects.length > 0 && (
          <section className="pp-main-section">
            <h2>PROJECTS</h2>

            {projects.map((project, index) => (
              <div className="pp-project" key={index}>
                <h3>{project.projectName || "Project"}</h3>

                {project.yourRole && <strong>{project.yourRole}</strong>}

                {project.projectDescription && (
                  <p>{project.projectDescription}</p>
                )}

                {project.technologyUsed && (
                  <div className="pp-project-tech">
                    {project.technologyUsed.split(",").map((technology, i) => (
                      <span key={i}>{technology.trim()}</span>
                    ))}
                  </div>
                )}

                {project.projectLink && (
                  <p className="pp-link">{project.projectLink}</p>
                )}
              </div>
            ))}
          </section>
        )}

        {/* ================= ACADEMIC DETAILS ================= */}
        {(education.secondarySchoolName ||
          education.seniorSecondarySchoolName) && (
          <section className="pp-main-section">
            <h2>ACADEMIC DETAILS</h2>

            {/* Senior Secondary */}
            {education.seniorSecondarySchoolName && (
              <div className="pp-academic">
                <strong>Senior Secondary</strong>

                <p>{education.seniorSecondarySchoolName}</p>

                <small>
                  {education.seniorSecondaryBoard}

                  {education.seniorSecondaryPassingYear &&
                    ` • ${education.seniorSecondaryPassingYear}`}

                  {education.seniorSecondaryPercentage &&
                    ` • ${education.seniorSecondaryPercentage}`}
                </small>
              </div>
            )}

            {/* Secondary */}
            {education.secondarySchoolName && (
              <div className="pp-academic">
                <strong>Secondary</strong>

                <p>{education.secondarySchoolName}</p>

                <small>
                  {education.secondaryBoard}

                  {education.secondaryPassingYear &&
                    ` • ${education.secondaryPassingYear}`}

                  {education.secondaryPercentage &&
                    ` • ${education.secondaryPercentage}`}
                </small>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
};

export default ProfessionalPro;
