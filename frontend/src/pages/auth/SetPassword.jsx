import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";
import api from "../../api/axios";
import "../../styles/auth/SetPassword.css";

const SetPassword = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const resetToken = sessionStorage.getItem("resetToken");

    if (!resetToken) {
      navigate("/forgot-password");
    }
  }, [navigate]);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const resetToken = sessionStorage.getItem("resetToken");

    if (!resetToken) {
      toast.error("Reset session expired. Please try again.");
      navigate("/forgot-password");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post(
        "/auth/set-password",
        {
          password,
          confirmPassword,
        },
        { authToken: resetToken },
      );

      toast.success(res.data.message);

      sessionStorage.removeItem("resetToken");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
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
            <h1>Set New Password</h1>

            <p>
              Create a new password for your account. Make sure it's strong and
              easy for you to remember.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* New Password */}
            <div className="form-input-group">
              <label htmlFor="password">New Password</label>

              <div className="password-input-wrapper">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <BsEye /> : <BsEyeSlash />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="form-input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>

              <div className="password-input-wrapper">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? <BsEye /> : <BsEyeSlash />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="auth-submit-btn"
              disabled={loading}
            >
              {loading ? "Updating..." : "Set Password"}
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

export default SetPassword;
