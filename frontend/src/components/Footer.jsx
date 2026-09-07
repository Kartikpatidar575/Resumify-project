import React, { useContext, useState } from "react";
import Container from "./Container";
import "../styles/Footer.css";
import toast, { Toaster } from "react-hot-toast";
import api from "../api/axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (!feedback.trim()) {
      toast.error("Please enter your feedback");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await api.post(
        "/feedback",
        {
          message: feedback.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success(res.data.message);

      setFeedback("");
    } catch (error) {
      console.error("Feedback submission error:", error);

      toast.error(
        error?.response?.data?.message || "Failed to submit feedback",
      );
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={true} />

      <Container>
        <footer className="py-4 footer-container">
          {/* Footer Links */}
          <ul className="nav justify-content-center border-bottom pb-3 mb-4 footer-ul-list">
            <li className="nav-item">
              <a href="/" className="nav-link px-2">
                Home
              </a>
            </li>

            <li className="nav-item">
              <a href="/about" className="nav-link px-2 footer-disabled">
                About
              </a>
            </li>

            <li className="nav-item">
              <a href="/contact" className="nav-link px-2 footer-disabled">
                Contact
              </a>
            </li>

            <li className="nav-item">
              <a
                href="/privacy-policy"
                className="nav-link px-2 footer-disabled"
              >
                Privacy Policy
              </a>
            </li>

            <li className="nav-item">
              <a href="/terms" className="nav-link px-2 footer-disabled">
                Terms
              </a>
            </li>
          </ul>

          {/* Feedback Form */}
          <div className="feedback-container">
            <h5 className="feedback-title">We'd love your feedback</h5>

            <p className="feedback-description">
              Help us improve Resumify by sharing your thoughts or suggestions.
            </p>

            <form className="feedback-form" onSubmit={handleSubmit}>
              <textarea
                className="feedback-input"
                placeholder="Tell us what you think..."
                rows="3"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />

              <button type="submit" className="feedback-submit-btn">
                Submit Feedback
              </button>
            </form>
          </div>

          {/* Copyright */}
          <p className="text-center mt-4 mb-0">
            © 2026 Resumify. All rights reserved.
          </p>
        </footer>
      </Container>
    </>
  );
};

export default Footer;
