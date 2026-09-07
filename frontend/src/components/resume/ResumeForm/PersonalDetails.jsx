import React, { useState } from "react";

const PersonalDetails = ({ resumeData, setResumeData }) => {
  const personalDetails = resumeData?.personalDetails ?? {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResumeData((curr) => ({
      ...curr,
      personalDetails: { ...(curr.personalDetails || {}), [name]: value },
    }));
  };
  return (
    <form className="row g-3">
      <div className="col-md-6">
        <label htmlFor="inputFirstName" className="form-label">
          First Name
        </label>
        <input
          type="email"
          className="form-control"
          id="inputFirstName"
          name="firstName"
          value={personalDetails?.firstName ?? ""}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="inputLastName" className="form-label">
          Last Name
        </label>
        <input
          type="email"
          className="form-control"
          id="inputLastName"
          name="lastName"
          value={personalDetails?.lastName ?? ""}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="inputEmail" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="inputEmail"
          name="email"
          value={personalDetails?.email ?? ""}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="inputPhone" className="form-label">
          Phone No.
        </label>
        <input
          type="password"
          className="form-control"
          id="inputPhone"
          name="phoneNumber"
          value={personalDetails?.phoneNumber ?? ""}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-3">
        <label htmlFor="inputCountry" className="form-label">
          Country
        </label>
        <select
          id="inputCountry"
          className="form-select"
          name="country"
          value={personalDetails?.country ?? ""}
          onChange={handleChange}
        >
          <option selected>Choose...</option>
          <option>India</option>
          <option>Nepal</option>
          <option>Sri Lanka</option>
        </select>
      </div>
      <div className="col-md-3">
        <label htmlFor="inputState" className="form-label">
          State
        </label>
        <select
          id="inputState"
          className="form-select"
          name="state"
          value={personalDetails?.state ?? ""}
          onChange={handleChange}
        >
          <option selected>Choose...</option>
          <option>Madhya Pradesh</option>
          <option>Uttar Pradesh</option>
          <option>Rajasthan</option>
        </select>
      </div>
      <div className="col-md-6">
        <label htmlFor="inputCity" className="form-label">
          City
        </label>
        <input
          type="text"
          name="city"
          value={personalDetails?.city ?? ""}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="inputJobTitle" className="form-label">
          Job Title
        </label>
        <input
          type="email"
          className="form-control"
          id="inputJobTitle"
          name="jobTitle"
          value={personalDetails?.jobTitle ?? ""}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="linkedinUrl" className="form-label">
          LinkedIn URL (optional)
        </label>
        <input
          type="url"
          className="form-control"
          id="linkedinUrl"
          name="linkedinUrl"
          placeholder="https://linkedin.com/in/username"
          value={personalDetails?.linkedinUrl ?? ""}
          onChange={handleChange}
        />
      </div>
    </form>
  );
};

export default PersonalDetails;
