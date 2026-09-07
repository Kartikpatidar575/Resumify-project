import React, { useState } from "react";
import "../../styles/SignUp.css";
import { NavLink } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import api from "../../api/axios";
import { BsEyeSlash } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
import BackButton from "../../components/BackButton";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await api.post("/auth/register", {
        fullName: name,
        email,
        password,
        confirmPassword,
      });
      toast.success(res.data.message);
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message);
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
            <div className="form-input-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-input-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-input-group">
              <label>Password</label>

              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <span
                  className="password-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <BsEye /> : <BsEyeSlash />}
                </span>
              </div>
            </div>

            <div className="form-input-group">
              <label>Confirm Password</label>
              <div className="password-input">
                {" "}
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span
                  className="password-icon"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <BsEye /> : <BsEyeSlash />}
                </span>
              </div>
            </div>

            <button className="register-btn">Create Account</button>

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
