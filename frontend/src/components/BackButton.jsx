import React from "react";
import "../styles/BackButton.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button type="button" className="back-btn" onClick={() => navigate("/")}>
      <IoMdArrowRoundBack size={20} />
      <span>Back</span>
    </button>
  );
};

export default BackButton;
