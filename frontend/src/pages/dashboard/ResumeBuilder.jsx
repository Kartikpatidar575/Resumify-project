import React, { useRef, useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import "../../styles/ResumeBuilder.css";
import AccordionSection from "../../components/resume/ResumeForm/AccordionSection";
import PersonalDetails from "../../components/resume/ResumeForm/PersonalDetails";
import Education from "../../components/resume/ResumeForm/Education";
import Skills from "../../components/resume/ResumeForm/Skills";
import Projects from "../../components/resume/ResumeForm/Projects";
import Experience from "../../components/resume/ResumeForm/Experience";
import ResumePreview from "../../components/resume/ResumePreview/ResumePreview";
import ProfessionalSummary from "../../components/resume/ResumeForm/ProfessionalSummary";
import toast, { Toaster } from "react-hot-toast";
import {
  FiFileText,
  FiDownload,
  FiChevronDown,
  FiUser,
  FiMail,
} from "react-icons/fi";
import { FaEye } from "react-icons/fa";
import html2pdf from "html2pdf.js";
import api from "../../api/axios";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../../../context/LoginContext";
import Loader from "../../components/Loader";

const ResumeBuilder = () => {
  const { loading, startLoading, stopLoading } = useLoading();
  const [previewActive, setPreviewActive] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [accountData, setAccountData] = useState([]);
  const navigate = useNavigate();
  const { resumeId } = useParams();
  const { isAuthenticated } = useContext(AuthContext);
  const resumeRef = useRef(null);
  const [templateId, setTemplateId] = useState(null);

  const [fileName, setFileName] = useState("Untitled Resume");
  const [activeSection, setActiveSection] = useState("personal");
  const token = localStorage.getItem("token");

  const [resumeData, setResumeData] = useState({
    personalDetails: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      country: "",
      state: "",
      city: "",
      jobTitle: "",
      linkedinUrl: "",
    },

    professionalSummary: "",

    experience: {
      type: "",

      jobs: [
        {
          jobCompanyName: "",
          jobTitle: "",
          jobLocation: "",
          jobStartDate: "",
          jobEndDate: "",
          jobResponsibilities: "",
        },
      ],

      internships: [
        {
          internshipCompanyName: "",
          internshipRole: "",
          internshipLocation: "",
          internshipStartDate: "",
          internshipEndDate: "",
          internshipResponsibilities: "",
        },
      ],
    },

    education: {
      highestQualification: "",

      secondarySchoolName: "",
      secondaryBoard: "",
      secondaryPassingYear: "",
      secondaryPercentage: "",

      seniorSecondarySchoolName: "",
      seniorSecondaryBoard: "",
      seniorSecondaryPassingYear: "",
      seniorSecondaryPercentage: "",

      diplomaCollegeName: "",
      diplomaUniversity: "",
      diplomaCourse: "",
      diplomaDegree: "",
      diplomaStartingYear: "",
      diplomaPassingYear: "",
      diplomaPercentage: "",

      graduationCollegeName: "",
      graduationUniversity: "",
      graduationCourse: "",
      graduationDegree: "",
      graduationStartingYear: "",
      graduationPassingYear: "",
      graduationPercentage: "",

      postGraduationCollegeName: "",
      postGraduationUniversity: "",
      postGraduationCourse: "",
      postGraduationDegree: "",
      postGraduationStartingYear: "",
      postGraduationPassingYear: "",
      postGraduationPercentage: "",
    },

    skills: [],

    projects: [],
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get("/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAccountData(res.data.user);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const getResume = async () => {
      startLoading();
      try {
        const res = await api.get(`/resume/${resumeId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const resume = res.data.resume;
        setTemplateId(resume.templateId);
        setResumeData(res.data.resume);
        console.log(res.data.resume);
        setFileName(resume.resumeName || "Untitled Resume");
      } catch (error) {
        console.error(error);
      } finally {
        stopLoading();
      }
    };

    if (resumeId && isAuthenticated) {
      getResume();
    }
  }, [resumeId, isAuthenticated, token]);

  const handleSaveAndDownload = async () => {
    try {
      const { _id, userId, createdAt, updatedAt, __v, ...dataWithoutId } =
        resumeData;
      const dataToSave = {
        ...dataWithoutId,
        resumeName: fileName.trim(),
      };

      // Prevent blank resume name
      if (!fileName.trim()) {
        toast.error("Resume name cannot be blank");
        return;
      }

      // Update resume
      await api.patch(`/resume/${resumeId}`, dataToSave, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const element = resumeRef.current;

      if (!element) {
        toast.error("Resume preview not found");
        return;
      }

      const options = {
        margin: [10, 0, 10, 0],
        filename: fileName
          .toLowerCase()
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
        image: {
          type: "jpeg",
          quality: 0.98,
        },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },
        pagebreak: {
          mode: ["css", "legacy"],
        },
      };

      await html2pdf().set(options).from(element).save();

      toast.success("Resume saved and downloaded successfully!");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to save resume. Please try again.",
      );
    }
  };

  const details = [
    {
      title: "Personal Details",
      id: "personal",
      component: (
        <PersonalDetails
          resumeData={resumeData}
          setResumeData={setResumeData}
        />
      ),
    },
    {
      title: "Professional Summary",
      id: "professional",
      component: (
        <ProfessionalSummary
          resumeData={resumeData}
          setResumeData={setResumeData}
        />
      ),
    },
    {
      title: "Experience",
      id: "experience",
      component: (
        <Experience resumeData={resumeData} setResumeData={setResumeData} />
      ),
    },
    {
      title: "Education",
      id: "education",
      component: (
        <Education resumeData={resumeData} setResumeData={setResumeData} />
      ),
    },
    {
      title: "Skill",
      id: "skill",
      component: (
        <Skills resumeData={resumeData} setResumeData={setResumeData} />
      ),
    },
    {
      title: "Project",
      id: "project",
      component: (
        <Projects resumeData={resumeData} setResumeData={setResumeData} />
      ),
    },
  ];

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <Toaster position="top-right" reverseOrder={true} />
      <div className="editor-topbar">
        <div className="resume-title">
          <div className="text-file-wrapper">
            <FiFileText
              size={18}
              color="rgb(23, 110, 253)"
              className="text-file"
            />
          </div>
          <input
            type="text"
            placeholder="Enter resume name"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            autoFocus
          />
        </div>

        <div className="topbar-actions">
          <button className="download-btn" onClick={handleSaveAndDownload}>
            <FiDownload size={17} />
            Save & Download
          </button>
          <div className="account-wrapper">
            <div
              className="account-section"
              onClick={() => setAccountOpen(!accountOpen)}
            >
              <div className="account-avatar">
                {accountData?.fullName?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <FiChevronDown size={16} />
            </div>

            {accountOpen && (
              <div className="account-dropdown">
                <div className="account-name">
                  <FiUser />
                  <span>Name</span>
                  <strong>{accountData?.fullName}</strong>
                </div>

                <div className="account-email">
                  <FiMail />
                  <span>Email</span>
                  <strong>{accountData?.email}</strong>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="preview-btn-container">
        <button
          className="preview-btn"
          onClick={() => setPreviewActive(!previewActive)}
        >
          <FaEye />
          <span>{previewActive ? "Create Form" : "Check Preview"}</span>
        </button>
      </div>
      <div className="form_preview_container">
        <div
          className={`formsection ${previewActive ? "hide-on-preview" : ""}`}
        >
          <div className="py-4" style={{ textAlign: "center" }}>
            <nav className="resume-nav">
              <ul>
                <li className="active">Create</li>
                <li onClick={() => navigate("/create-resume")}>Templates</li>
              </ul>
            </nav>
          </div>
          {details.map((item, index) => (
            <AccordionSection
              key={index}
              title={item.title}
              id={item.id}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            >
              {item.component}
            </AccordionSection>
          ))}
        </div>

        <div
          className={`previewsection ${!previewActive ? "hide-on-form" : ""}`}
        >
          <div className="d-flex align-items-center gap-2 preview-section-top">
            <span
              className="rounded-circle bg-success"
              style={{ width: "8px", height: "8px", display: "inline-block" }}
            ></span>
            <span className="fw-semibold">Live Preview</span>
          </div>
          <div className="preview-container">
            <div ref={resumeRef} className="preview-page">
              <ResumePreview resumeData={resumeData} templateId={templateId} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumeBuilder;
