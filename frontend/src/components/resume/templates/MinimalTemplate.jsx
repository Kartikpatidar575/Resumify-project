import React from "react";
import "../templatesCss/MinimalTemplate.css";

const MinimalTemplate = ({ resumeData }) => {
  const { personalDetails, education, skills, projects } = resumeData;

  return (
    <div className="minimal-resume">
      {/* Header */}
      <header className="resume-header">
        <h1>
          {personalDetails.firstName} {personalDetails.lastName}
        </h1>

        <div className="contact-info">
          <span>{personalDetails.email}</span>
          <span>{personalDetails.phoneNumber}</span>
          <span>
            {personalDetails.city}, {personalDetails.state}
          </span>
        </div>

        <div className="links">
          <span>{personalDetails.linkedinUrl}</span>
          <span>{personalDetails.githubUrl}</span>
          <span>{personalDetails.portfolioUrl}</span>
        </div>
      </header>

      {/* Skills */}
      <section className="resume-section">
        <h2>Skills</h2>

        <div className="skills-list">
          {skills.map((skill, index) => (
            <span key={index} className="skill-badge">
              {skill.name}
            </span>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="resume-section">
        <h2>Projects</h2>

        {projects.map((project, index) => (
          <div key={index} className="project-item">
            <div className="project-header">
              <h4>{project.projectName}</h4>
              <span>{project.yourRole}</span>
            </div>

            <p>
              <strong>Tech:</strong> {project.technologyUsed}
            </p>

            <p>{project.projectDescription}</p>

            <p>{project.projectLink}</p>
          </div>
        ))}
      </section>

      {/* Education */}
      <section className="resume-section">
        <h2>Education</h2>

        <div className="education-item">
          <div className="edu-header">
            <h4>{education.graduationDegree}</h4>

            <span>
              {education.graduationStartingYear} -{" "}
              {education.graduationPassingYear}
            </span>
          </div>

          <p>{education.graduationCourse}</p>

          <p>{education.graduationCollegeName}</p>

          <p>{education.graduationUniversity}</p>

          <p>{education.graduationPercentage}</p>
        </div>

        <div className="education-item">
          <div className="edu-header">
            <h4>Senior Secondary</h4>

            <span>{education.seniorSecondaryPassingYear}</span>
          </div>

          <p>{education.seniorSecondarySchoolName}</p>

          <p>
            {education.seniorSecondaryBoard} •{" "}
            {education.seniorSecondaryPercentage}
          </p>
        </div>

        <div className="education-item">
          <div className="edu-header">
            <h4>Secondary</h4>

            <span>{education.secondaryPassingYear}</span>
          </div>

          <p>{education.secondarySchoolName}</p>

          <p>
            {education.secondaryBoard} • {education.secondaryPercentage}
          </p>
        </div>
      </section>
    </div>
  );
};

export default MinimalTemplate;
