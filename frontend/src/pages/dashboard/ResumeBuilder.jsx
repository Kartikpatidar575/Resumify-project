import React, {
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  useContext,
} from "react";
import { useParams } from "react-router-dom";
import "../../styles/dashboard/ResumeBuilder.css";
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
import { useLoading } from "../../../context/LoadingContext";
import Loader from "../../components/Loader";

// A4 in px at 96dpi — matches the CSS `210mm` / `297mm` used in ResumeBuilder.css
const A4_WIDTH_PX = 793.7;
const A4_HEIGHT_PX = 1122.52;

const ResumeBuilder = () => {
  const { loading, startLoading, stopLoading } = useLoading();
  const [previewActive, setPreviewActive] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [accountData, setAccountData] = useState([]);
  const navigate = useNavigate();
  const { resumeId } = useParams();
  const { isAuthenticated } = useContext(AuthContext);
  const resumeRef = useRef(null);
  const previewContainerRef = useRef(null);
  const [templateId, setTemplateId] = useState(null);
  const [pageScale, setPageScale] = useState(1);
  const [contentHeight, setContentHeight] = useState(A4_HEIGHT_PX);

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
      type: "Both",

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
      highestQualification: "Graduation",

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

    skills: [
      {
        name: "",
        level: "",
      },
    ],

    projects: [
      {
        projectName: "",
        yourRole: "",
        projectDescription: "",
        technologyUsed: "",
        projectLink: "",
      },
    ],
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    const fetchUser = async () => {
      try {
        const res = await api.get("/user/me");

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
        const res = await api.get(`/resume/${resumeId}`);

        const resume = res.data.resume;
        setTemplateId(resume.templateId);
        setResumeData(res.data.resume);
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

  // Fit the A4 page to the available WIDTH only. Height is never part of
  // this calculation — the preview scrolls vertically instead of being
  // squeezed to fit the viewport. On laptops (wide but short viewports)
  // fitting by height used to force the page down to ~45-50% scale even
  // though there was plenty of horizontal room; fitting by width alone
  // keeps the page legible and consistent regardless of screen height,
  // and naturally supports resumes that run onto a second page (no more
  // silent clipping from a wrapper sized for exactly one A4 page).
  useLayoutEffect(() => {
    const container = previewContainerRef.current;
    if (!container) return;

    const computeScale = () => {
      // Skip transient measurements — e.g. the instant this ResizeObserver
      // attaches, or right as the mobile form/preview toggle flips
      // `display: none` off, clientWidth can briefly read 0 before layout
      // settles. Acting on that would flash pageScale to ~0. Bail out and
      // wait for the next, real callback instead.
      if (container.clientWidth === 0 || container.offsetParent === null) {
        return;
      }

      const styles = getComputedStyle(container);
      const padX =
        parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);

      const availableWidth = container.clientWidth - padX;

      const scale = Math.min(
        availableWidth / A4_WIDTH_PX,
        1, // never zoom past 100% — keeps text crisp
      );

      setPageScale(scale > 0 ? scale : 1);
    };

    computeScale();

    const observer = new ResizeObserver(computeScale);
    observer.observe(container);
    window.addEventListener("resize", computeScale);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", computeScale);
    };
  }, [previewActive]); // re-measure when the mobile form/preview toggle changes what's visible

  // Track the resume's REAL (unscaled) height so the scale-wrapper reserves
  // the correct footprint — whether the resume is half a page or three
  // pages long — instead of assuming a single fixed A4 height.
  useLayoutEffect(() => {
    const page = resumeRef.current;
    if (!page) return;

    const measure = () => setContentHeight(page.scrollHeight);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(page);

    return () => observer.disconnect();
  }, [resumeData, templateId]);

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
      await api.patch(`/resume/${resumeId}`, dataToSave);

      const element = resumeRef.current;

      if (!element) {
        toast.error("Resume preview not found");
        return;
      }

      // Temporarily render at true 1:1 scale so the exported PDF is never
      // captured shrunk — regardless of how small it's currently shown on screen.
      element.style.transition = "none";
      element.style.transform = "none";

      const options = {
        margin: 0,
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
          windowHeight: element.scrollHeight,
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

      await html2pdf()
        .set(options)
        .from(element)
        .toPdf()
        .get("pdf")
        .then((pdf) => {
          const totalPages = pdf.internal.getNumberOfPages();
          const expectedPages = Math.ceil(contentHeight / A4_HEIGHT_PX);

          if (totalPages > expectedPages) {
            pdf.deletePage(totalPages);
          }
        })
        .save();

      toast.success("Resume saved and downloaded successfully!");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to save resume. Please try again.",
      );
    } finally {
      // Restore the on-screen scaled preview
      if (resumeRef.current) {
        resumeRef.current.style.transition = "";
        resumeRef.current.style.transform = `scale(${pageScale})`;
      }
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
                <li onClick={() => navigate("/dashboard/create-resume")}>
                  Templates
                </li>
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
          <div className="preview-container" ref={previewContainerRef}>
            <div
              className="preview-page-scale-wrapper"
              style={{
                width: A4_WIDTH_PX * pageScale,
                height: contentHeight * pageScale,
              }}
            >
              <div
                ref={resumeRef}
                className="preview-page"
                style={{ transform: `scale(${pageScale})` }}
              >
                <ResumePreview
                  resumeData={resumeData}
                  templateId={templateId}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumeBuilder;
