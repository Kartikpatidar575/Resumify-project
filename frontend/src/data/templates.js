import professionalProImage from "../assets/templateImages/professionalProImage.png";
import ModernTemplate from "../assets/templateImages/modernTemplate.png";
import atsFriendlyTemplate from "../assets/templateImages/atsFriendlyTemplate.png";
const templates = [
  {
    templateId: "template01",
    templateName: "ATS Friendly",
    templateCategory: "ATS Friendly",
    templatePara:
      "An ATS-friendly resume template with a clean, structured layout, readable typography, and well-organized sections designed to help applicant tracking systems easily scan and process your resume.",
    templateImage: atsFriendlyTemplate,
    premium: false,
  },
  {
    templateId: "template02",
    templateName: "Professional Pro",
    templateCategory: "Professional",
    templatePara:
      "A polished and professional resume template with a structured layout designed to highlight experience, skills, education, and achievements.",
    templateImage: professionalProImage,
    premium: false,
  },
  {
    templateId: "template03",
    templateName: "Modern Template",
    templateCategory: "Modern",
    templatePara:
      "A sleek and modern resume template featuring a clean layout, contemporary typography, and well-organized sections to create a strong and professional impression.",
    templateImage: ModernTemplate,
    premium: false,
  },
];

export default templates;
