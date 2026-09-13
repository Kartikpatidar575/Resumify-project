import "../../styles/dashboard/CreateResume.css";
import TemplateSelector from "../../components/TemplateSelector";

const CreateResume = () => {
  return (
    <div className="resume-container">
      <div className="text-container">
        <h1 className="resume-heading">
          Create Your <span className="resume-heading-span">Resume</span>
        </h1>

        <p className="resume-para">
          Create a professional resume by choosing a template and giving it a
          unique name. Your resume will be easy to edit, organized for applicant
          tracking systems (ATS), and designed to make a strong impression on
          recruiters.
        </p>
      </div>

      <h3 className="template-heading">Choose Your Template</h3>
      <TemplateSelector />
    </div>
  );
};

export default CreateResume;
