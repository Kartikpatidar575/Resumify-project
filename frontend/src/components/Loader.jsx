import "../styles/Loader.css";

const Loader = () => {
  return (
    <div className="app-loader">
      <div className="loader-content">
        <div className="resume-loader">
          <div className="resume-header"></div>

          <div className="resume-line large"></div>
          <div className="resume-line"></div>
          <div className="resume-line short"></div>

          <div className="resume-section"></div>

          <div className="resume-line"></div>
          <div className="resume-line medium"></div>
          <div className="resume-line short"></div>
        </div>

        <div className="loader-brand">
          <span>Resumify</span>
          <small>Loading your resume</small>
        </div>

        <div className="loader-progress">
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
