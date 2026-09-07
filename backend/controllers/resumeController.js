const Resume = require("../models/resume");
const User = require("../models/user");
const Joi = require("joi");

const resumeUpdateSchema = Joi.object({
  resumeName: Joi.string().trim().max(100),

  templateId: Joi.string().trim(),

  professionalSummary: Joi.string().trim().max(2000),

  personalDetails: Joi.object({
    firstName: Joi.string().trim().max(50),
    lastName: Joi.string().trim().max(50),
    email: Joi.string().email(),
    phoneNumber: Joi.string().trim().max(20),
    country: Joi.string().trim().max(50),
    state: Joi.string().trim().max(50),
    city: Joi.string().trim().max(50),
    jobTitle: Joi.string().trim().max(100),
    linkedinUrl: Joi.string().uri().allow(""),
  }),

  experience: Joi.object({
    type: Joi.string().valid("Job", "Internship", "Both", "None"),

    jobs: Joi.array().items(
      Joi.object({
        jobCompanyName: Joi.string().trim().max(100),
        jobTitle: Joi.string().trim().max(100),
        jobLocation: Joi.string().trim().max(100),
        jobStartDate: Joi.string(),
        jobEndDate: Joi.string(),
        jobResponsibilities: Joi.string().max(2000),
      }),
    ),

    internships: Joi.array().items(
      Joi.object({
        internshipCompanyName: Joi.string().trim().max(100),
        internshipRole: Joi.string().trim().max(100),
        internshipLocation: Joi.string().trim().max(100),
        internshipStartDate: Joi.string(),
        internshipEndDate: Joi.string(),
        internshipResponsibilities: Joi.string().max(2000),
      }),
    ),
  }),

  education: Joi.object({
    highestQualification: Joi.string().valid(
      "Secondary",
      "Senior Secondary",
      "Diploma",
      "Graduation",
      "Post Graduation",
    ),

    secondarySchoolName: Joi.string().trim(),
    secondaryBoard: Joi.string().trim(),
    secondaryPassingYear: Joi.string(),
    secondaryPercentage: Joi.string(),

    seniorSecondarySchoolName: Joi.string().trim(),
    seniorSecondaryBoard: Joi.string().trim(),
    seniorSecondaryPassingYear: Joi.string(),
    seniorSecondaryPercentage: Joi.string(),

    diplomaCollegeName: Joi.string().trim(),
    diplomaUniversity: Joi.string().trim(),
    diplomaCourse: Joi.string().trim(),
    diplomaDegree: Joi.string().trim(),
    diplomaStartingYear: Joi.string(),
    diplomaPassingYear: Joi.string(),
    diplomaPercentage: Joi.string(),

    graduationCollegeName: Joi.string().trim(),
    graduationUniversity: Joi.string().trim(),
    graduationCourse: Joi.string().trim(),
    graduationDegree: Joi.string().trim(),
    graduationStartingYear: Joi.string(),
    graduationPassingYear: Joi.string(),
    graduationPercentage: Joi.string(),

    postGraduationCollegeName: Joi.string().trim(),
    postGraduationUniversity: Joi.string().trim(),
    postGraduationCourse: Joi.string().trim(),
    postGraduationDegree: Joi.string().trim(),
    postGraduationStartingYear: Joi.string(),
    postGraduationPassingYear: Joi.string(),
    postGraduationPercentage: Joi.string(),
  }),

  skills: Joi.array().items(
    Joi.object({
      name: Joi.string().trim().required(),
      level: Joi.string().valid("Beginner", "Intermediate", "Advanced"),
    }),
  ),

  projects: Joi.array().items(
    Joi.object({
      projectName: Joi.string().trim(),
      yourRole: Joi.string().trim(),
      technologyUsed: Joi.string().trim(),
      projectDescription: Joi.string().max(2000),
      projectLink: Joi.string().uri().allow(""),
    }),
  ),
})
  .min(1)
  .unknown(false);

const deleteResumeController = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const userId = req.user.userId;

    const deletedResume = await Resume.findOneAndDelete({
      _id: resumeId,
      userId: userId,
    });

    if (!deletedResume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    return res.status(200).json({
      message: "Resume deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
const getResumeController = async (req, res) => {
  try {
    const resumes = await Resume.find({
      userId: req.user.userId,
    }).sort({ updatedAt: -1 });

    if (resumes.length === 0) {
      return res.status(404).json({
        message: "No resumes found",
        resumes: [],
      });
    }

    return res.status(200).json({
      message: "Resumes found successfully",
      resumes,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const createResumeController = async (req, res) => {
  try {
    const { templateId } = req.body;
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const resume = await Resume.findOne({
      templateId,
      userId: user._id,
    });
    if (resume) {
      return res.status(200).json({
        message: "Resume already exists",
        resume,
      });
    }

    const newResume = await Resume.create({
      templateId,
      userId: user._id,
    });

    return res.status(201).json({
      message: "Resume created successfully",
      resume: newResume,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getSingleResumeController = async (req, res) => {
  try {
    const { resumeId } = req.params;

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        message: "User does not exist",
      });
    }

    const resume = await Resume.findOne({
      _id: resumeId,
      userId: user._id,
    });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    return res.status(200).json({
      message: "Resume found successfully",
      resume,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const updateResumeController = async (req, res) => {
  try {
    console.log(req.params);
    const { resumeId } = req.params;

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "At least one field is required to update",
      });
    }

    const { error } = resumeUpdateSchema.validate(req.body);

    console.log(error);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    if (
      req.body.resumeName !== undefined &&
      req.body.resumeName.trim() === ""
    ) {
      return res.status(400).json({
        message: "Resume name cannot be blank",
      });
    }

    const updateData = {};

    const flattenObject = (obj, parentKey = "") => {
      for (const key in obj) {
        const value = obj[key];
        const newKey = parentKey ? `${parentKey}.${key}` : key;

        if (value && typeof value === "object" && !Array.isArray(value)) {
          flattenObject(value, newKey);
        } else {
          updateData[newKey] = value;
        }
      }
    };

    flattenObject(req.body);

    const resume = await Resume.findOneAndUpdate(
      {
        _id: resumeId,
        userId: req.user.userId,
      },
      {
        $set: updateData,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    return res.status(200).json({
      message: "Resume updated successfully",
      resume,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
module.exports = {
  createResumeController,
  updateResumeController,
  getSingleResumeController,
  getResumeController,
  deleteResumeController,
};
