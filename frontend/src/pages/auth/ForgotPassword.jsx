import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import api from "../../api/axios";
import "../../styles/ForgotPassword.css";
import { NavLink } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/auth/forgot-password", {
        email,
      });

      toast.success(res.data.message);
      sessionStorage.setItem("resetEmail", email);
      navigate("/verify-otp");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={true} />
      <div className="auth-page">
        <div className="auth-card">
          <button
            type="button"
            className="back-btn"
            onClick={() => navigate("/login")}
          >
            <IoMdArrowRoundBack size={20} />
            <span>Back to Login</span>
          </button>

          <div className="auth-header">
            <h1>Forgot Password?</h1>
            <p>
              Enter your email address and we'll send you an OTP to reset your
              password.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-input-group">
              <label htmlFor="email">Email</label>

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="auth-submit-btn">
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>

          <div className="auth-footer">
            <span>Remember your password?</span>{" "}
            <NavLink to="/login" className="auth-link">
              Login
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
