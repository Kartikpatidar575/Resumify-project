import React, { useState } from "react";
import "../../styles/auth/SignUp.css";
import { NavLink, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import api from "../../api/axios";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import BackButton from "../../components/BackButton";

const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Loading state
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prevent multiple clicks
    if (loading) {
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/register", {
        fullName: name,
        email,
        password,
        confirmPassword,
      });

      toast.success(
        res.data?.message || "Registration successful. OTP sent to your email.",
      );

      // Store registration email
      sessionStorage.setItem("registerEmail", email);

      // IMPORTANT:
      // VerifyOtp.jsx uses registerOtpExpiry
      sessionStorage.setItem(
        "registerOtpExpiry",
        String(Date.now() + 5 * 60 * 1000),
      );

      // Clear form
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // Go to registration OTP page
      navigate("/verify-register-otp");
    } catch (error) {
      console.error("Registration error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={true} />

      <div className="register-container">
        <div className="register-card">
          <BackButton />

          <h2 className="text-center">Create Your Account</h2>

          <p className="text-center register-subtitle">
            Start building your professional resume with Resumify
          </p>

          <form onSubmit={handleSubmit}>
            {/* Full Name */}

            <div className="form-input-group">
              <label>Full Name</label>

              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
              />
            </div>

            {/* Email */}

            <div className="form-input-group">
              <label>Email Address</label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            {/* Password */}

            <div className="form-input-group">
              <label>Password</label>

              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />

                <span
                  className="password-icon"
                  onClick={() => {
                    if (!loading) {
                      setShowPassword(!showPassword);
                    }
                  }}
                >
                  {showPassword ? <BsEye /> : <BsEyeSlash />}
                </span>
              </div>
            </div>

            {/* Confirm Password */}

            <div className="form-input-group">
              <label>Confirm Password</label>

              <div className="password-input">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                />

                <span
                  className="password-icon"
                  onClick={() => {
                    if (!loading) {
                      setShowConfirmPassword(!showConfirmPassword);
                    }
                  }}
                >
                  {showConfirmPassword ? <BsEye /> : <BsEyeSlash />}
                </span>
              </div>
            </div>

            {/* Register Button */}

            <button type="submit" className="register-btn" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            {/* Login */}

            <p className="login-text">
              Already have an account?
              <NavLink to="/login" className="Navlink">
                {" "}
                Login
              </NavLink>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
