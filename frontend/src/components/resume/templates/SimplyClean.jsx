import React from "react";
import "../templatesCss/SimplyClean.css";

const SimplyClean = ({ resumeData = {} }) => {
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
    <div className="simply-clean">
      {/* ================= LEFT SIDEBAR ================= */}
      <aside className="simply-clean-sidebar">
        <div className="profile">
          <div className="profile-image">
            <div className="avatar-head"></div>
            <div className="avatar-body"></div>
          </div>

          <h1>{fullName || "YOUR NAME"}</h1>

          <h2>{personalDetails.jobTitle || "PROFESSIONAL TITLE"}</h2>

          <div className="small-line"></div>
        </div>

        {/* ================= CONTACT ================= */}
        <section className="sidebar-section">
          <h3>👤 CONTACT</h3>
          <div className="sidebar-line"></div>

          {personalDetails.email && <p>✉ {personalDetails.email}</p>}

          {personalDetails.phoneNumber && (
            <p>☎ {personalDetails.phoneNumber}</p>
          )}

          {(personalDetails.city ||
            personalDetails.state ||
            personalDetails.country) && (
            <p>
              📍{" "}
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
            <p>in {personalDetails.linkedinUrl}</p>
          )}
        </section>

        {/* ================= SKILLS ================= */}
        {skills.length > 0 && (
          <section className="sidebar-section">
            <h3>▥ SKILLS</h3>
            <div className="sidebar-line"></div>

            <ul>
              {skills.map((skill, index) => (
                <li key={index}>{skill.name}</li>
              ))}
            </ul>
          </section>
        )}

        {/* ================= EDUCATION ================= */}
        {(education.graduationCollegeName ||
          education.postGraduationCollegeName ||
          education.diplomaCollegeName) && (
          <section className="sidebar-section">
            <h3>🎓 EDUCATION</h3>
            <div className="sidebar-line"></div>

            {/* Graduation */}
            {education.graduationCollegeName && (
              <div>
                <h4>
                  {education.graduationDegree || education.graduationCourse}
                </h4>

                <p>{education.graduationCollegeName}</p>

                {education.graduationCourse && education.graduationDegree && (
                  <p>{education.graduationCourse}</p>
                )}

                {(education.graduationStartingYear ||
                  education.graduationPassingYear) && (
                  <strong>
                    {education.graduationStartingYear}
                    {education.graduationStartingYear &&
                    education.graduationPassingYear
                      ? " – "
                      : ""}
                    {education.graduationPassingYear}

                    {education.graduationPercentage &&
                      ` | ${education.graduationPercentage}`}
                  </strong>
                )}
              </div>
            )}

            {/* Post Graduation */}
            {education.postGraduationCollegeName && (
              <div>
                <h4>
                  {education.postGraduationDegree ||
                    education.postGraduationCourse}
                </h4>

                <p>{education.postGraduationCollegeName}</p>

                {(education.postGraduationStartingYear ||
                  education.postGraduationPassingYear) && (
                  <strong>
                    {education.postGraduationStartingYear}
                    {education.postGraduationStartingYear &&
                    education.postGraduationPassingYear
                      ? " – "
                      : ""}
                    {education.postGraduationPassingYear}

                    {education.postGraduationPercentage &&
                      ` | ${education.postGraduationPercentage}`}
                  </strong>
                )}
              </div>
            )}

            {/* Diploma */}
            {education.diplomaCollegeName && (
              <div>
                <h4>{education.diplomaDegree || education.diplomaCourse}</h4>

                <p>{education.diplomaCollegeName}</p>

                {(education.diplomaStartingYear ||
                  education.diplomaPassingYear) && (
                  <strong>
                    {education.diplomaStartingYear}
                    {education.diplomaStartingYear &&
                    education.diplomaPassingYear
                      ? " – "
                      : ""}
                    {education.diplomaPassingYear}

                    {education.diplomaPercentage &&
                      ` | ${education.diplomaPercentage}`}
                  </strong>
                )}
              </div>
            )}
          </section>
        )}
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="simply-clean-main">
        {/* ================= PROFESSIONAL SUMMARY ================= */}
        {professionalSummary && (
          <section>
            <div className="section-title">
              <span>●</span>
              <h2>PROFESSIONAL SUMMARY</h2>
              <div></div>
            </div>

            <p className="summary">{professionalSummary}</p>
          </section>
        )}

        {/* ================= EXPERIENCE ================= */}
        {experience.type !== "None" &&
          (experience.jobs?.length > 0 ||
            experience.internships?.length > 0) && (
            <section>
              <div className="section-title">
                <span>▣</span>
                <h2>EXPERIENCE</h2>
                <div></div>
              </div>

              <div className="timeline">
                {/* ================= JOBS ================= */}
                {experience.jobs?.map((job, index) => (
                  <div className="experience" key={`job-${index}`}>
                    <span className="timeline-dot"></span>

                    <div className="experience-header">
                      <div>
                        <h3>{job.jobTitle || "Job Position"}</h3>

                        {job.jobCompanyName && (
                          <strong>{job.jobCompanyName}</strong>
                        )}
                      </div>

                      <div className="date">
                        {job.jobStartDate}
                        {job.jobStartDate && job.jobEndDate ? " – " : ""}
                        {job.jobEndDate}

                        {job.jobLocation && (
                          <>
                            <br />
                            {job.jobLocation}
                          </>
                        )}
                      </div>
                    </div>

                    {job.jobResponsibilities && (
                      <p>{job.jobResponsibilities}</p>
                    )}
                  </div>
                ))}

                {/* ================= INTERNSHIPS ================= */}
                {experience.internships?.map((internship, index) => (
                  <div className="experience" key={`internship-${index}`}>
                    <span className="timeline-dot"></span>

                    <div className="experience-header">
                      <div>
                        <h3>{internship.internshipRole || "Intern"}</h3>

                        {internship.internshipCompanyName && (
                          <strong>{internship.internshipCompanyName}</strong>
                        )}
                      </div>

                      <div className="date">
                        {internship.internshipStartDate}

                        {internship.internshipStartDate &&
                        internship.internshipEndDate
                          ? " – "
                          : ""}

                        {internship.internshipEndDate}

                        {internship.internshipLocation && (
                          <>
                            <br />
                            {internship.internshipLocation}
                          </>
                        )}
                      </div>
                    </div>

                    {internship.internshipResponsibilities && (
                      <p>{internship.internshipResponsibilities}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

        {/* ================= PROJECTS ================= */}
        {projects.length > 0 && (
          <section>
            <div className="section-title">
              <span>□</span>
              <h2>PROJECTS</h2>
              <div></div>
            </div>

            <div className="projects">
              {projects.map((project, index) => (
                <div className="project" key={index}>
                  <span>●</span>

                  <div>
                    <h3>{project.projectName || "Project"}</h3>

                    {project.yourRole && <small>{project.yourRole}</small>}

                    {project.projectDescription && (
                      <p>{project.projectDescription}</p>
                    )}

                    {project.projectLink && (
                      <a
                        href={project.projectLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View Project
                      </a>
                    )}
                  </div>

                  {project.technologyUsed && (
                    <strong>{project.technologyUsed}</strong>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ================= ACADEMIC DETAILS ================= */}
        {(education.secondarySchoolName ||
          education.seniorSecondarySchoolName) && (
          <section>
            <div className="section-title">
              <span>🎓</span>
              <h2>ACADEMIC DETAILS</h2>
              <div></div>
            </div>

            <div className="academic">
              {/* Senior Secondary */}
              {education.seniorSecondarySchoolName && (
                <div>
                  <h3>Senior Secondary</h3>

                  <p>{education.seniorSecondarySchoolName}</p>

                  <span>
                    {education.seniorSecondaryBoard}

                    {education.seniorSecondaryPassingYear &&
                      ` | ${education.seniorSecondaryPassingYear}`}

                    {education.seniorSecondaryPercentage &&
                      ` | ${education.seniorSecondaryPercentage}`}
                  </span>
                </div>
              )}

              {/* Secondary */}
              {education.secondarySchoolName && (
                <div>
                  <h3>Secondary</h3>

                  <p>{education.secondarySchoolName}</p>

                  <span>
                    {education.secondaryBoard}

                    {education.secondaryPassingYear &&
                      ` | ${education.secondaryPassingYear}`}

                    {education.secondaryPercentage &&
                      ` | ${education.secondaryPercentage}`}
                  </span>
                </div>
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default SimplyClean;
