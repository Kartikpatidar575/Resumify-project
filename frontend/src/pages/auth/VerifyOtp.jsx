import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import api from "../../api/axios";
import "../../styles/VerifyOtp.css";

const VerifyOtp = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const resetEmail = sessionStorage.getItem("resetEmail");

    if (!resetEmail) {
      navigate("/forgot-password");
    }
  }, [navigate]);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);

  const inputRefs = useRef([]);

  const email = sessionStorage.getItem("resetEmail");

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleOtpChange = (index, value) => {
    // Allow only numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);

    setOtp(newOtp);

    // Move to next box
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();

    const pastedData = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pastedData) return;

    const newOtp = ["", "", "", "", "", ""];

    pastedData.split("").forEach((digit, index) => {
      newOtp[index] = digit;
    });

    setOtp(newOtp);

    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      toast.error("Please enter the 6-digit OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/verify-otp", {
        email,
        otp: otpValue,
      });

      toast.success(res.data.message);

      // Store reset token if backend sends one
      if (res.data.resetToken) {
        sessionStorage.setItem("resetToken", res.data.resetToken);
      }
      navigate("/set-password");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (timer > 0) return;

    try {
      const res = await api.post("/auth/forgot-password", {
        email,
      });

      toast.success(res.data.message);

      setOtp(["", "", "", "", "", ""]);
      setTimer(60);

      inputRefs.current[0]?.focus();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to resend OTP");
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={true} />
      <div className="auth-page">
        <div className="auth-card">
          <Link to="/forgot-password" className="back-btn">
            <IoMdArrowRoundBack size={20} />
            <span>Back</span>
          </Link>

          <div className="auth-header">
            <h1>Verify OTP</h1>

            <p>Enter the 6-digit OTP sent to</p>

            <strong>{email}</strong>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="otp-container">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(element) => {
                    inputRefs.current[index] = element;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="otp-input"
                  autoComplete="one-time-code"
                />
              ))}
            </div>

            <button
              type="submit"
              className="auth-submit-btn"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>

          <div className="resend-container">
            <span>Didn't receive the OTP?</span>

            {timer > 0 ? (
              <span className="resend-timer">Resend in {timer}s</span>
            ) : (
              <button
                type="button"
                className="resend-btn"
                onClick={handleResendOtp}
              >
                Resend OTP
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyOtp;
