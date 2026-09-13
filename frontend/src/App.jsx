import React from "react";
import { Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import CreateResume from "./pages/dashboard/CreateResume";
import ResumeBuilder from "./pages/dashboard/ResumeBuilder";
import Templates from "./pages/Templates";
import PublicLayout from "./layouts/PublicLayout";
import { AuthProvider } from "../context/AuthContext";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyOtp from "./pages/auth/VerifyOtp";
import SetPassword from "./pages/auth/SetPassword";
import { Navigate } from "react-router-dom";
import MyResume from "./pages/dashboard/MyResume";
import { Analytics } from "@vercel/analytics/react";

const App = () => {
  return (
    <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <AuthProvider>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/templates" element={<Templates />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/verify-register-otp"
              element={<VerifyOtp flow="register" />}
            />
            <Route
              path="/verify-reset-otp"
              element={<VerifyOtp flow="reset" />}
            />
            <Route path="/set-password" element={<SetPassword />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route
                  index
                  element={<Navigate to="/dashboard/create-resume" replace />}
                />
                <Route path="create-resume" element={<CreateResume />} />
                <Route
                  path="resume/:resumeId/edit"
                  element={<ResumeBuilder />}
                />
                <Route path="my-resume" element={<MyResume />} />
              </Route>
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Analytics />
        </AuthProvider>
      </GoogleOAuthProvider>
    </>
  );
};

export default App;
