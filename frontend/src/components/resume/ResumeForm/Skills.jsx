import React, { useState } from "react";

const Skills = ({ resumeData, setResumeData }) => {
  const addSkill = () => {
    setResumeData((curr) => ({
      ...curr,
      skills: [...curr.skills, { name: "", level: "" }],
    }));
  };

  const removeSkill = (index) => {
    setResumeData((curr) => ({
      ...curr,
      skills: curr.skills.filter((_, i) => i !== index),
    }));
  };

  const handleSkillChange = (index, field, value) => {
    const updatedSkills = [...resumeData.skills];

    updatedSkills[index][field] = value;

    setResumeData((curr) => ({ ...curr, skills: updatedSkills }));
  };

  return (
    <div>
      <form className="row g-3">
        <div className="col-12">
          <p className="text-muted">
            Add your skills and select your proficiency level.
          </p>
        </div>

        {resumeData.skills.map((skill, index) => (
          <div className="col-12 d-flex gap-2" key={index}>
            {/* Skill Name */}
            <input
              type="text"
              className="form-control"
              placeholder="e.g. React.js"
              value={skill.name}
              onChange={(e) => handleSkillChange(index, "name", e.target.value)}
            />

            {/* Expertise Level */}
            <select
              className="form-select"
              value={skill.level}
              onChange={(e) =>
                handleSkillChange(index, "level", e.target.value)
              }
            >
              <option value="">Expertise Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            {/* Remove */}
            {resumeData.skills.length > 1 && (
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => removeSkill(index)}
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <div className="col-12">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={addSkill}
          >
            + Add Skill
          </button>
        </div>
      </form>
    </div>
  );
};

export default Skills;
