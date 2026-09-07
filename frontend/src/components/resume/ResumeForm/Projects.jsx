import React, { useState } from "react";

const Projects = ({ resumeData, setResumeData }) => {
  const [project, setProject] = useState({
    projectName: "",
    yourRole: "",
    technologyUsed: "",
    projectDescription: "",
    projectLink: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((curr) => ({ ...curr, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setResumeData((curr) => ({
      ...curr,
      projects: [...(curr.projects || []), project],
    }));
    setProject({
      projectName: "",
      yourRole: "",
      technologyUsed: "",
      projectDescription: "",
      projectLink: "",
    });
  };

  const handleDelete = (index) => {
    setResumeData((curr) => ({
      ...curr,
      projects: (curr.projects || []).filter((_, i) => i !== index),
    }));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <label htmlFor="projectName" className="col-sm-2 col-form-label">
            Project Name
          </label>

          <div className="col-sm-8">
            <input
              type="text"
              name="projectName"
              value={project.projectName ?? ""}
              onChange={handleChange}
              className="form-control"
              id="projectName"
              placeholder="Enter project name"
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="yourRole" className="col-sm-2 col-form-label">
            Your Role
          </label>

          <div className="col-sm-8">
            <input
              type="text"
              name="yourRole"
              value={project.yourRole ?? ""}
              onChange={handleChange}
              className="form-control"
              id="yourRole"
              placeholder="e.g. Frontend Developer"
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="technologyUsed" className="col-sm-2 col-form-label">
            Technology Used
          </label>

          <div className="col-sm-8">
            <input
              type="text"
              name="technologyUsed"
              value={project.technologyUsed ?? ""}
              onChange={handleChange}
              className="form-control"
              id="technologyUsed"
              placeholder="e.g. React, Node.js, MongoDB"
            />
          </div>
        </div>

        <div className="row mb-3">
          <label
            htmlFor="projectDescription"
            className="col-sm-2 col-form-label"
          >
            Project Description
          </label>

          <div className="col-sm-8">
            <textarea
              className="form-control"
              name="projectDescription"
              value={project.projectDescription ?? ""}
              onChange={handleChange}
              id="projectDescription"
              placeholder="Describe your project"
              rows="4"
            ></textarea>
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="projectLink" className="col-sm-2 col-form-label">
            Project Link
          </label>

          <div className="col-sm-8">
            <input
              type="url"
              name="projectLink"
              value={project.projectLink ?? ""}
              onChange={handleChange}
              className="form-control"
              id="projectLink"
              placeholder="https://example.com"
            />
          </div>
        </div>

        <button className="btn btn-primary">Add Project</button>
      </form>
      <div>
        {resumeData?.projects?.length > 0 &&
          resumeData.projects.map((project, i) => {
            return (
              <React.Fragment key={i}>
                <hr />
                <div>
                  <p>
                    Project Name : <span>{project?.projectName || ""}</span>
                  </p>
                  <p>
                    Your Role : <span>{project?.yourRole || ""}</span>
                  </p>
                  <p>
                    Technology Used :{" "}
                    <span>{project?.technologyUsed || ""}</span>{" "}
                  </p>
                  <p>
                    Project Description :{" "}
                    <span>{project?.projectDescription || ""}</span>
                  </p>
                  <div className="d-flex justify-content-between align-items-start">
                    <p>
                      Project Link : <span>{project?.projectLink || ""}</span>
                    </p>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleDelete(i)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
      </div>
    </>
  );
};

export default Projects;
