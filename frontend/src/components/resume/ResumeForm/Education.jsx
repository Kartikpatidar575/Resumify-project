import React from "react";

const Education = ({ resumeData, setResumeData }) => {
  const education = resumeData?.education || {};

  const handleChange = (e) => {
    const { name, value } = e.target;

    setResumeData((curr) => ({
      ...curr,
      education: {
        ...(curr.education ?? {}),
        [name]: value,
      },
    }));
  };

  const handleQualificationChange = (e) => {
    setResumeData((curr) => ({
      ...curr,
      education: {
        ...(curr.education ?? {}),
        highestQualification: e.target.value,
      },
    }));
  };

  const qualification = education.highestQualification ?? "";

  return (
    <div>
      <form className="row g-3">
        {/* ================= Highest Qualification ================= */}

        <div className="col-12">
          <label htmlFor="highestQualification" className="form-label">
            Highest Qualification
          </label>

          <select
            id="highestQualification"
            name="highestQualification"
            value={education.highestQualification || ""}
            onChange={handleQualificationChange}
            className="form-select"
          >
            <option value="">Select qualification</option>
            <option value="10th">10th / Secondary</option>
            <option value="12th">12th / Senior Secondary</option>
            <option value="Diploma">Diploma</option>
            <option value="Graduation">Graduation</option>
            <option value="Post Graduation">Post Graduation</option>
          </select>
        </div>

        {/* ================= 10th ================= */}

        {qualification === "10th" && (
          <>
            <hr />

            <h6>10th Education Details</h6>

            <div className="col-md-6">
              <label htmlFor="secondarySchoolName" className="form-label">
                School Name
              </label>

              <input
                type="text"
                name="secondarySchoolName"
                id="secondarySchoolName"
                value={education.secondarySchoolName || ""}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter school name"
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="secondaryBoard" className="form-label">
                Board
              </label>

              <input
                type="text"
                name="secondaryBoard"
                id="secondaryBoard"
                value={education.secondaryBoard || ""}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. CBSE, MP Board"
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="secondaryPassingYear" className="form-label">
                Passing Year
              </label>

              <input
                type="text"
                name="secondaryPassingYear"
                id="secondaryPassingYear"
                value={education.secondaryPassingYear || ""}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. 2020"
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="secondaryPercentage" className="form-label">
                Percentage / C.G.P.A
              </label>

              <input
                type="text"
                name="secondaryPercentage"
                id="secondaryPercentage"
                value={education.secondaryPercentage || ""}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. 85%"
              />
            </div>
          </>
        )}

        {/* ================= 12th ================= */}

        {qualification === "12th" && (
          <>
            <hr />

            <h6>12th Education Details</h6>

            <div className="col-md-6">
              <label htmlFor="seniorSecondarySchoolName" className="form-label">
                School Name
              </label>

              <input
                type="text"
                name="seniorSecondarySchoolName"
                id="seniorSecondarySchoolName"
                value={education.seniorSecondarySchoolName || ""}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter school name"
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="seniorSecondaryBoard" className="form-label">
                Board
              </label>

              <input
                type="text"
                name="seniorSecondaryBoard"
                id="seniorSecondaryBoard"
                value={education.seniorSecondaryBoard || ""}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. CBSE, MP Board"
              />
            </div>

            <div className="col-md-6">
              <label
                htmlFor="seniorSecondaryPassingYear"
                className="form-label"
              >
                Passing Year
              </label>

              <input
                type="text"
                name="seniorSecondaryPassingYear"
                id="seniorSecondaryPassingYear"
                value={education.seniorSecondaryPassingYear || ""}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. 2022"
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="seniorSecondaryPercentage" className="form-label">
                Percentage / C.G.P.A
              </label>

              <input
                type="text"
                name="seniorSecondaryPercentage"
                id="seniorSecondaryPercentage"
                value={education.seniorSecondaryPercentage || ""}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. 85%"
              />
            </div>
          </>
        )}

        {/* ================= Diploma ================= */}

        {qualification === "Diploma" && (
          <>
            <hr />

            <h6>Diploma Education Details</h6>

            <div className="col-md-6">
              <label htmlFor="diplomaCollegeName" className="form-label">
                College / Institute Name
              </label>

              <input
                type="text"
                name="diplomaCollegeName"
                id="diplomaCollegeName"
                value={education.diplomaCollegeName || ""}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter college name"
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="diplomaUniversity" className="form-label">
                University / Board
              </label>

              <input
                type="text"
                name="diplomaUniversity"
                id="diplomaUniversity"
                value={education.diplomaUniversity || ""}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter university"
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="diplomaCourse" className="form-label">
                Course / Specialization
              </label>

              <input
                type="text"
                name="diplomaCourse"
                id="diplomaCourse"
                value={education.diplomaCourse || ""}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. Computer Engineering"
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="diplomaDegree" className="form-label">
                Degree
              </label>

              <input
                type="text"
                name="diplomaDegree"
                id="diplomaDegree"
                value={education.diplomaDegree || ""}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. Diploma"
              />
            </div>

            <div className="col-md-3">
              <label htmlFor="diplomaStartingYear" className="form-label">
                Starting Year
              </label>

              <input
                type="text"
                name="diplomaStartingYear"
                id="diplomaStartingYear"
                value={education.diplomaStartingYear || ""}
                onChange={handleChange}
                className="form-control"
                placeholder="2021"
              />
            </div>

            <div className="col-md-3">
              <label htmlFor="diplomaPassingYear" className="form-label">
                Passing Year
              </label>

              <input
                type="text"
                name="diplomaPassingYear"
                id="diplomaPassingYear"
                value={education.diplomaPassingYear || ""}
                onChange={handleChange}
                className="form-control"
                placeholder="2024"
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="diplomaPercentage" className="form-label">
                Percentage / C.G.P.A
              </label>

              <input
                type="text"
                name="diplomaPercentage"
                id="diplomaPercentage"
                value={education.diplomaPercentage || ""}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. 8.2 CGPA"
              />
            </div>
          </>
        )}

        {/* ================= Graduation ================= */}

        {qualification === "Graduation" && (
          <>
            <hr />

            <h6>Graduation Education Details</h6>

            <div className="col-md-6">
              <label htmlFor="graduationCollegeName" className="form-label">
                College Name
              </label>

              <input
                type="text"
                name="graduationCollegeName"
                id="graduationCollegeName"
                value={education.graduationCollegeName || ""}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter college name"
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="graduationUniversity" className="form-label">
                University
              </label>

              <input
                type="text"
                name="graduationUniversity"
                id="graduationUniversity"
                value={education.graduationUniversity || ""}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter university"
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="graduationCourse" className="form-label">
                Course / Specialization
              </label>

              <input
                type="text"
                name="graduationCourse"
                id="graduationCourse"
                value={education.graduationCourse || ""}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. Computer Science"
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="graduationDegree" className="form-label">
                Degree
              </label>

              <input
                type="text"
                name="graduationDegree"
                id="graduationDegree"
                value={education.graduationDegree || ""}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. B.Tech"
              />
            </div>

            <div className="col-md-3">
              <label htmlFor="graduationStartingYear" className="form-label">
                Starting Year
              </label>

              <input
                type="text"
                name="graduationStartingYear"
                id="graduationStartingYear"
                value={education.graduationStartingYear || ""}
                onChange={handleChange}
                className="form-control"
                placeholder="2020"
              />
            </div>

            <div className="col-md-3">
              <label htmlFor="graduationPassingYear" className="form-label">
                Passing Year
              </label>

              <input
                type="text"
                name="graduationPassingYear"
                id="graduationPassingYear"
                value={education.graduationPassingYear || ""}
                onChange={handleChange}
                className="form-control"
                placeholder="2024"
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="graduationPercentage" className="form-label">
                Percentage / C.G.P.A
              </label>

              <input
                type="text"
                name="graduationPercentage"
                id="graduationPercentage"
                value={education.graduationPercentage || ""}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. 8.2 CGPA"
              />
            </div>
          </>
        )}

        {/* ================= Post Graduation ================= */}

        {qualification === "Post Graduation" && (
          <>
            <hr />

            <h6>Post Graduation Education Details</h6>

            <div className="col-md-6">
              <label htmlFor="postGraduationCollegeName" className="form-label">
                College / University Name
              </label>

              <input
                type="text"
                name="postGraduationCollegeName"
                id="postGraduationCollegeName"
                value={education.postGraduationCollegeName || ""}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter college name"
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="postGraduationUniversity" className="form-label">
                University
              </label>

              <input
                type="text"
                name="postGraduationUniversity"
                id="postGraduationUniversity"
                value={education.postGraduationUniversity || ""}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter university"
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="postGraduationCourse" className="form-label">
                Course / Specialization
              </label>

              <input
                type="text"
                name="postGraduationCourse"
                id="postGraduationCourse"
                value={education.postGraduationCourse || ""}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. Computer Science"
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="postGraduationDegree" className="form-label">
                Degree
              </label>

              <input
                type="text"
                name="postGraduationDegree"
                id="postGraduationDegree"
                value={education.postGraduationDegree || ""}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. M.Tech"
              />
            </div>

            <div className="col-md-3">
              <label
                htmlFor="postGraduationStartingYear"
                className="form-label"
              >
                Starting Year
              </label>

              <input
                type="text"
                name="postGraduationStartingYear"
                id="postGraduationStartingYear"
                value={education.postGraduationStartingYear || ""}
                onChange={handleChange}
                className="form-control"
                placeholder="2024"
              />
            </div>

            <div className="col-md-3">
              <label htmlFor="postGraduationPassingYear" className="form-label">
                Passing Year
              </label>

              <input
                type="text"
                name="postGraduationPassingYear"
                id="postGraduationPassingYear"
                value={education.postGraduationPassingYear || ""}
                onChange={handleChange}
                className="form-control"
                placeholder="2026"
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="postGraduationPercentage" className="form-label">
                Percentage / C.G.P.A
              </label>

              <input
                type="text"
                name="postGraduationPercentage"
                id="postGraduationPercentage"
                value={education.postGraduationPercentage || ""}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. 8.5 CGPA"
              />
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default Education;
