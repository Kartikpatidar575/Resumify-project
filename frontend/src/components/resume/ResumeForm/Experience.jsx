import React, { useState } from "react";

const Experience = ({ resumeData, setResumeData }) => {
  const emptyJob = {
    jobCompanyName: "",
    jobTitle: "",
    jobLocation: "",
    jobStartDate: "",
    jobEndDate: "",
    jobResponsibilities: "",
  };
  const [job, setJob] = useState({ ...emptyJob });

  const emptyInternship = {
    internshipCompanyName: "",
    internshipRole: "",
    internshipLocation: "",
    internshipStartDate: "",
    internshipEndDate: "",
    internshipResponsibilities: "",
  };
  const [internship, setInternship] = useState({ ...emptyInternship });

  const experience = resumeData?.experience ?? {};
  const jobs = experience.jobs ?? [];
  const internships = experience.internships ?? [];

  const handleJobChange = (e) => {
    const { name, value } = e.target;

    setJob((curr) => ({
      ...curr,
      [name]: value,
    }));
  };

  const handleInternshipChange = (e) => {
    const { name, value } = e.target;

    setInternship((curr) => ({
      ...curr,
      [name]: value,
    }));
  };

  const addJob = () => {
    setResumeData((curr) => ({
      ...curr,
      experience: {
        ...(curr.experience ?? {}),
        jobs: [...curr.experience.jobs, job],
      },
    }));
    setJob({ ...emptyJob });
  };

  const addInternship = () => {
    setResumeData((curr) => ({
      ...curr,
      experience: {
        ...(curr.experience ?? {}),
        internships: [...curr.experience.internships, internship],
      },
    }));
    setInternship({ ...emptyInternship });
  };

  const handleDelete = (type, i) => {
    setResumeData((curr) => {
      const key = type === "job" ? "jobs" : "internships";
      return {
        ...curr,
        experience: {
          ...(curr.experience ?? {}),
          [key]: curr.experience[key].filter((_, index) => index !== i),
        },
      };
    });
  };
  const handleExperienceChange = (value) => {
    setResumeData((curr) => ({
      ...curr,
      experience: {
        ...(curr.experience ?? {}),
        type: value,
      },
    }));
  };

  return (
    <div>
      {/* Experience Type */}
      <div className="row mb-4">
        <label htmlFor="experienceType" className="col-sm-3 col-form-label">
          Do you have work experience?
        </label>

        <div className="col-sm-6">
          <select
            className="form-select"
            id="experienceType"
            value={experience.type ?? ""}
            onChange={(e) => handleExperienceChange(e.target.value)}
          >
            <option value="None">None</option>
            <option value="Job">Job</option>
            <option value="Internship">Internship</option>
            <option value="Both">Both</option>
          </select>
        </div>
      </div>
      {/* Job Experience */}
      {(experience.type === "Job" || experience.type === "Both") && (
        <div>
          <h6>Job Experience</h6>

          <form>
            {/* Company Name */}
            <div className="row mb-3">
              <label
                htmlFor="jobCompanyName"
                className="col-sm-3 col-form-label"
              >
                Company Name
              </label>

              <div className="col-sm-8">
                <input
                  type="text"
                  name="jobCompanyName"
                  value={job.jobCompanyName}
                  onChange={handleJobChange}
                  className="form-control"
                  id="jobCompanyName"
                  placeholder="e.g. TCS"
                />
              </div>
            </div>

            {/* Job Title */}
            <div className="row mb-3">
              <label htmlFor="jobTitle" className="col-sm-3 col-form-label">
                Job Title
              </label>

              <div className="col-sm-8">
                <input
                  type="text"
                  name="jobTitle"
                  value={job.jobTitle}
                  onChange={handleJobChange}
                  className="form-control"
                  id="jobTitle"
                  placeholder="e.g. Software Developer"
                />
              </div>
            </div>

            {/* Location */}
            <div className="row mb-3">
              <label htmlFor="jobLocation" className="col-sm-3 col-form-label">
                Location
              </label>

              <div className="col-sm-8">
                <input
                  type="text"
                  name="jobLocation"
                  value={job.jobLocation}
                  onChange={handleJobChange}
                  className="form-control"
                  id="jobLocation"
                  placeholder="e.g. Indore, India"
                />
              </div>
            </div>

            {/* Start Date */}
            <div className="row mb-3">
              <label htmlFor="jobStartDate" className="col-sm-3 col-form-label">
                Start Date
              </label>

              <div className="col-sm-8">
                <input
                  type="month"
                  name="jobStartDate"
                  value={job.jobStartDate}
                  onChange={handleJobChange}
                  className="form-control"
                  id="jobStartDate"
                />
              </div>
            </div>

            {/* End Date */}
            <div className="row mb-3">
              <label htmlFor="jobEndDate" className="col-sm-3 col-form-label">
                End Date
              </label>

              <div className="col-sm-8">
                <input
                  type="month"
                  name="jobEndDate"
                  className="form-control"
                  value={job.jobEndDate}
                  onChange={handleJobChange}
                  id="jobEndDate"
                />
              </div>
            </div>

            {/* Responsibilities */}
            <div className="row mb-3">
              <label
                htmlFor="jobResponsibilities"
                className="col-sm-3 col-form-label"
              >
                Responsibilities & Achievements
              </label>

              <div className="col-sm-8">
                <textarea
                  className="form-control"
                  name="jobResponsibilities"
                  value={job.jobResponsibilities}
                  onChange={handleJobChange}
                  id="jobResponsibilities"
                  rows="4"
                  placeholder="Describe your responsibilities and achievements"
                ></textarea>
              </div>
            </div>

            <button type="button" className="btn btn-success" onClick={addJob}>
              Add Job
            </button>
          </form>

          <hr />
        </div>
      )}
      {/* Internship Experience */}
      {(experience.type === "Internship" || experience.type === "Both") && (
        <div>
          <h6>Internship Experience</h6>

          <form>
            {/* Company Name */}
            <div className="row mb-3">
              <label
                htmlFor="internshipCompanyName"
                className="col-sm-3 col-form-label"
              >
                Company Name
              </label>

              <div className="col-sm-8">
                <input
                  type="text"
                  name="internshipCompanyName"
                  value={internship.internshipCompanyName}
                  onChange={handleInternshipChange}
                  className="form-control"
                  id="internshipCompanyName"
                  placeholder="e.g. Infosys"
                />
              </div>
            </div>

            {/* Internship Role */}
            <div className="row mb-3">
              <label
                htmlFor="internshipRole"
                className="col-sm-3 col-form-label"
              >
                Internship Role
              </label>

              <div className="col-sm-8">
                <input
                  type="text"
                  name="internshipRole"
                  value={internship.internshipRole}
                  onChange={handleInternshipChange}
                  className="form-control"
                  id="internshipRole"
                  placeholder="e.g. React Developer Intern"
                />
              </div>
            </div>

            {/* Location */}
            <div className="row mb-3">
              <label
                htmlFor="internshipLocation"
                className="col-sm-3 col-form-label"
              >
                Location
              </label>

              <div className="col-sm-8">
                <input
                  type="text"
                  name="internshipLocation"
                  value={internship.internshipLocation}
                  onChange={handleInternshipChange}
                  className="form-control"
                  id="internshipLocation"
                  placeholder="e.g. Bhopal, India"
                />
              </div>
            </div>

            {/* Start Date */}
            <div className="row mb-3">
              <label
                htmlFor="internshipStartDate"
                className="col-sm-3 col-form-label"
              >
                Start Date
              </label>

              <div className="col-sm-8">
                <input
                  type="month"
                  name="internshipStartDate"
                  value={internship.internshipStartDate}
                  onChange={handleInternshipChange}
                  className="form-control"
                  id="internshipStartDate"
                />
              </div>
            </div>

            {/* End Date */}
            <div className="row mb-3">
              <label
                htmlFor="internshipEndDate"
                className="col-sm-3 col-form-label"
              >
                End Date
              </label>

              <div className="col-sm-8">
                <input
                  type="month"
                  name="internshipEndDate"
                  value={internship.internshipEndDate}
                  onChange={handleInternshipChange}
                  className="form-control"
                  id="internshipEndDate"
                />
              </div>
            </div>

            {/* Responsibilities */}
            <div className="row mb-3">
              <label
                htmlFor="internshipResponsibilities"
                className="col-sm-3 col-form-label"
              >
                Responsibilities & Achievements
              </label>

              <div className="col-sm-8">
                <textarea
                  className="form-control"
                  name="internshipResponsibilities"
                  value={internship.internshipResponsibilities}
                  onChange={handleInternshipChange}
                  id="internshipResponsibilities"
                  rows="4"
                  placeholder="Describe your internship responsibilities and achievements"
                ></textarea>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-success"
              onClick={addInternship}
            >
              Add Internship
            </button>
          </form>

          <hr />
        </div>
      )}
      {/* No Experience */}
      {experience.type === "None" && (
        <p className="text-muted">
          No work experience will be added to your resume.
        </p>
      )}
      {jobs.length !== 0 && (
        <>
          <h5>Job Details</h5>

          {jobs.map((job, i) => (
            <React.Fragment key={i}>
              <hr />
              <div>
                <p>
                  Company Name: <span>{job.jobCompanyName}</span>
                </p>

                <p>
                  Role: <span>{job.jobTitle}</span>
                </p>

                <p>
                  Location: <span>{job.jobLocation}</span>
                </p>

                <p>
                  Start Date: <span>{job.jobStartDate}</span>
                </p>

                <p>
                  End Date: <span>{job.jobEndDate || "Present"}</span>
                </p>

                <p>
                  Responsibilities: <span>{job.jobResponsibilities}</span>
                </p>

                <div className="d-flex justify-content-end align-items-start">
                  <button
                    type="button"
                    className="btn btn-danger mb-4"
                    onClick={() => handleDelete("job", i)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </React.Fragment>
          ))}
        </>
      )}
      {internships.length !== 0 && (
        <>
          <h5>Internship Details</h5>

          {internships.map((internship, i) => (
            <React.Fragment key={i}>
              <hr />

              <div>
                <p>
                  Company Name: <span>{internship.internshipCompanyName}</span>
                </p>

                <p>
                  Role: <span>{internship.internshipRole}</span>
                </p>

                <p>
                  Location: <span>{internship.internshipLocation}</span>
                </p>

                <p>
                  Start Date: <span>{internship.internshipStartDate}</span>
                </p>

                <p>
                  End Date:{" "}
                  <span>{internship.internshipEndDate || "Present"}</span>
                </p>

                <p>
                  Responsibilities:{" "}
                  <span>{internship.internshipResponsibilities}</span>
                </p>

                <div className="d-flex justify-content-end align-items-start">
                  <button
                    type="button"
                    className="btn btn-danger mb-4"
                    onClick={() => handleDelete("internship", i)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </React.Fragment>
          ))}
        </>
      )}
    </div>
  );
};

export default Experience;
