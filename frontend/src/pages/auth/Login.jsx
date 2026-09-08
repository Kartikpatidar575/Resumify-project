import "../../styles/Login.css";
import { NavLink, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import api from "../../api/axios";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import BackButton from "../../components/BackButton";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const res = await api.post("/auth/google", {
        credential: credentialResponse.credential,
      });
      toast.success(res.data.message);
      login(res.data.token);
      navigate("/create-resume");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      toast.success(res.data.message);
      setEmail("");
      setPassword("");
      login(res.data.token);
      navigate("/create-resume");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="login-card">
          <BackButton />
          <h2 className="text-center">Welcome Back</h2>

          <p className="text-center text-muted mb-4">
            Login to continue building your resume
          </p>
          <div className="mb-3">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => console.error("Google Login Failed")}
            />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="Enter your email"
                autoComplete="email"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type={isShowPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Enter your password"
                autoComplete="current-password"
              />
            </div>

            <div className="d-flex justify-content-between mb-3">
              <div>
                <input
                  type="checkbox"
                  checked={isShowPassword}
                  onChange={(e) => setIsShowPassword(e.target.checked)}
                />
                <span
                  className="ms-2"
                  onClick={() => setIsShowPassword(!isShowPassword)}
                >
                  Show password
                </span>
              </div>

              <NavLink to="/forgot-password">Forgot Password?</NavLink>
            </div>

            <button className="btn btn-primary w-100">Login</button>
          </form>

          <p className="text-center mt-4">
            Don't have an account?
            <NavLink to="/Register" className="ms-1">
              Register
            </NavLink>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
