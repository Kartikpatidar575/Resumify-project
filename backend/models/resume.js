const mongoose = require("mongoose");

const personalDetailsSchema = new mongoose.Schema(
  {
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    phoneNumber: { type: String, trim: true },
    country: { type: String, trim: true },
    state: { type: String, trim: true },
    city: { type: String, trim: true },
    jobTitle: { type: String, trim: true },
    linkedinUrl: { type: String, trim: true },
  },
  { _id: false },
);

const jobSchema = new mongoose.Schema(
  {
    jobCompanyName: { type: String, trim: true },
    jobTitle: { type: String, trim: true },
    jobLocation: { type: String, trim: true },
    jobStartDate: { type: String },
    jobEndDate: { type: String },
    jobResponsibilities: { type: String },
  },
  { _id: false },
);

const internshipSchema = new mongoose.Schema(
  {
    internshipCompanyName: { type: String, trim: true },
    internshipRole: { type: String, trim: true },
    internshipLocation: { type: String, trim: true },
    internshipStartDate: { type: String },
    internshipEndDate: { type: String },
    internshipResponsibilities: { type: String },
  },
  { _id: false },
);
const experienceSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["Job", "Internship", "Both", "None"],
      default: "None",
    },
    jobs: { type: [jobSchema], default: [] },
    internships: { type: [internshipSchema], default: [] },
  },
  { _id: false },
);

const educationSchema = new mongoose.Schema(
  {
    highestQualification: {
      type: String,
      enum: [
        "Secondary",
        "Senior Secondary",
        "Diploma",
        "Graduation",
        "Post Graduation",
      ],
    },
    secondarySchoolName: { type: String, trim: true },
    secondaryBoard: { type: String, trim: true },
    secondaryPassingYear: { type: String },
    secondaryPercentage: { type: String },

    seniorSecondarySchoolName: { type: String, trim: true },
    seniorSecondaryBoard: { type: String, trim: true },
    seniorSecondaryPassingYear: { type: String },
    seniorSecondaryPercentage: { type: String },

    diplomaCollegeName: { type: String, trim: true },
    diplomaUniversity: { type: String, trim: true },
    diplomaCourse: { type: String, trim: true },
    diplomaDegree: { type: String, trim: true },
    diplomaStartingYear: { type: String },
    diplomaPassingYear: { type: String },
    diplomaPercentage: { type: String },

    graduationCollegeName: { type: String, trim: true },
    graduationUniversity: { type: String, trim: true },
    graduationCourse: { type: String, trim: true },
    graduationDegree: { type: String, trim: true },
    graduationStartingYear: { type: String },
    graduationPassingYear: { type: String },
    graduationPercentage: { type: String },

    postGraduationCollegeName: { type: String, trim: true },
    postGraduationUniversity: { type: String, trim: true },
    postGraduationCourse: { type: String, trim: true },
    postGraduationDegree: { type: String, trim: true },
    postGraduationStartingYear: { type: String },
    postGraduationPassingYear: { type: String },
    postGraduationPercentage: { type: String },
  },
  { _id: false },
);

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
      default: "Beginner",
    },
  },
  { _id: false },
);

const projectSchema = new mongoose.Schema(
  {
    projectName: { type: String, trim: true },
    yourRole: { type: String, trim: true },
    technologyUsed: { type: String, trim: true },
    projectDescription: { type: String },
    projectLink: { type: String, trim: true },
  },
  { _id: false },
);

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    templateId: { type: String, required: true },
    resumeName: {
      type: String,
      required: true,
      trim: true,
      default: "Untitled Resume",
    },
    personalDetails: { type: personalDetailsSchema, default: {} },
    professionalSummary: { type: String, trim: true },
    experience: { type: experienceSchema, default: {} },
    education: { type: educationSchema, default: {} },
    skills: { type: [skillSchema], default: [] },
    projects: { type: [projectSchema], default: [] },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Resume", resumeSchema);
