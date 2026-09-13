import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import api from "../../api/axios";
import "../../styles/auth/VerifyOtp.css";
import { AuthContext } from "../../../context/AuthContext";

const VerifyOtp = ({ flow }) => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const OTP_DURATION = 5 * 60;

  const inputRefs = useRef([]);
  const verificationCompleted = useRef(false);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  // Different storage key for registration and password reset
  const expiryKey =
    flow === "register" ? "registerOtpExpiry" : "resetOtpExpiry";

  // Get email according to current flow
  const email =
    flow === "register"
      ? sessionStorage.getItem("registerEmail")
      : sessionStorage.getItem("resetEmail");

  // Get remaining OTP time
  const getRemainingTime = () => {
    const expiry = sessionStorage.getItem(expiryKey);

    if (!expiry) {
      return 0;
    }

    const remaining = Math.ceil((Number(expiry) - Date.now()) / 1000);

    return Math.max(remaining, 0);
  };

  const [timer, setTimer] = useState(getRemainingTime);

  // --------------------------------------------------
  // Check email
  // --------------------------------------------------

  useEffect(() => {
    // Do not redirect after successful verification
    if (verificationCompleted.current) {
      return;
    }

    if (!email) {
      if (flow === "register") {
        navigate("/register", {
          replace: true,
        });
      } else {
        navigate("/forgot-password", {
          replace: true,
        });
      }
    }
  }, [email, flow, navigate]);

  // --------------------------------------------------
  // OTP Timer
  // --------------------------------------------------

  useEffect(() => {
    const updateTimer = () => {
      const remaining = getRemainingTime();

      setTimer(remaining);

      return remaining;
    };

    // Set timer immediately
    const initialRemaining = updateTimer();

    // If already expired, don't create interval
    if (initialRemaining <= 0) {
      return;
    }

    // Update timer every second
    const interval = setInterval(() => {
      const remaining = updateTimer();

      if (remaining <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    // Cleanup interval
    return () => {
      clearInterval(interval);
    };
  }, [expiryKey]);

  // --------------------------------------------------
  // OTP Input
  // --------------------------------------------------

  const handleOtpChange = (index, value) => {
    // Numbers only
    if (!/^\d*$/.test(value)) {
      return;
    }

    const newOtp = [...otp];

    // Keep only one digit
    newOtp[index] = value.slice(-1);

    setOtp(newOtp);

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // --------------------------------------------------
  // Backspace
  // --------------------------------------------------

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // --------------------------------------------------
  // Paste OTP
  // --------------------------------------------------

  const handlePaste = (event) => {
    event.preventDefault();

    const pastedData = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pastedData) {
      return;
    }

    const newOtp = ["", "", "", "", "", ""];

    pastedData.split("").forEach((digit, index) => {
      newOtp[index] = digit;
    });

    setOtp(newOtp);

    const nextIndex = Math.min(pastedData.length, 5);

    inputRefs.current[nextIndex]?.focus();
  };

  // --------------------------------------------------
  // Verify OTP
  // --------------------------------------------------

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading) {
      return;
    }

    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      toast.error("Please enter the 6-digit OTP");
      return;
    }

    if (!email) {
      toast.error("Email not found. Please start again.");
      return;
    }

    try {
      setLoading(true);

      // ==============================================
      // REGISTRATION FLOW
      // ==============================================

      if (flow === "register") {
        const res = await api.post("/auth/verify-register-otp", {
          email,
          otp: otpValue,
        });

        // Backend must return JWT token
        if (!res.data?.token) {
          throw new Error("Authentication token was not received");
        }

        // Store JWT
        login(res.data.token);

        verificationCompleted.current = true;

        toast.success(res.data?.message || "Registration successful");

        // Remove temporary registration data
        sessionStorage.removeItem("registerEmail");
        sessionStorage.removeItem("registerOtpExpiry");

        // Go directly to create resume
        navigate("/dashboard/create-resume", {
          replace: true,
        });

        return;
      }

      // ==============================================
      // PASSWORD RESET FLOW
      // ==============================================

      const res = await api.post("/auth/verify-otp", {
        email,
        otp: otpValue,
      });

      // Backend must return reset token
      if (!res.data?.resetToken) {
        throw new Error("Reset token was not received");
      }

      verificationCompleted.current = true;
      // Store reset token
      sessionStorage.setItem("resetToken", res.data.resetToken);
      toast.success(res.data?.message || "OTP verified successfully");

      // Remove temporary reset data
      sessionStorage.removeItem("resetEmail");
      sessionStorage.removeItem("resetOtpExpiry");

      // Go to set password
      navigate("/set-password", {
        replace: true,
      });
    } catch (error) {
      console.error("OTP verification error:", error);

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Invalid or expired OTP",
      );
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // Resend OTP
  // --------------------------------------------------

  const handleResendOtp = async () => {
    if (timer > 0 || resendLoading) {
      return;
    }

    if (!email) {
      toast.error("Email not found. Please start again.");
      return;
    }

    try {
      setResendLoading(true);

      if (flow === "register") {
        const res = await api.post("/auth/resend-register-otp", {
          email,
        });

        toast.success(res.data?.message || "OTP sent successfully");
      } else {
        const res = await api.post("/auth/forgot-password", {
          email,
        });

        toast.success(res.data?.message || "OTP sent successfully");
      }

      // Clear old OTP
      setOtp(["", "", "", "", "", ""]);

      // Create new 5-minute expiry
      const newExpiry = Date.now() + OTP_DURATION * 1000;

      sessionStorage.setItem(expiryKey, String(newExpiry));

      // Immediately show 5:00
      setTimer(OTP_DURATION);

      // IMPORTANT:
      // Start a NEW interval because the old
      // interval was already cleared at 0.
      const interval = setInterval(() => {
        const remaining = Math.max(
          Math.ceil((newExpiry - Date.now()) / 1000),
          0,
        );

        setTimer(remaining);

        if (remaining <= 0) {
          clearInterval(interval);
        }
      }, 1000);

      // Focus first input
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    } catch (error) {
      console.error("Resend OTP error:", error);

      toast.error(error?.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  // --------------------------------------------------
  // Format Timer
  // --------------------------------------------------

  const formatTimer = () => {
    const minutes = Math.floor(timer / 60);

    const seconds = timer % 60;

    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  };

  // --------------------------------------------------
  // Back URL
  // --------------------------------------------------

  const backUrl = flow === "register" ? "/register" : "/forgot-password";

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <>
      <Toaster position="top-right" reverseOrder={true} />

      <div className="auth-page">
        <div className="auth-card">
          {/* Back Button */}

          <Link to={backUrl} className="back-btn">
            <IoMdArrowRoundBack size={20} />

            <span>Back</span>
          </Link>

          {/* Header */}

          <div className="auth-header">
            <h1>Verify OTP</h1>

            <p>Enter the 6-digit OTP sent to</p>

            <strong>{email}</strong>
          </div>

          {/* OTP Form */}

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
                  onChange={(event) =>
                    handleOtpChange(index, event.target.value)
                  }
                  onKeyDown={(event) => handleKeyDown(index, event)}
                  onPaste={handlePaste}
                  className="otp-input"
                  autoComplete={index === 0 ? "one-time-code" : "off"}
                  disabled={loading}
                />
              ))}
            </div>

            {/* Verify Button */}

            <button
              type="submit"
              className="auth-submit-btn"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>

          {/* Resend OTP */}

          <div className="resend-container">
            <span>Didn't receive the OTP?</span>

            {timer > 0 ? (
              <span className="resend-timer">Resend in {formatTimer()}</span>
            ) : (
              <button
                type="button"
                className="resend-btn"
                onClick={handleResendOtp}
                disabled={resendLoading}
              >
                {resendLoading ? "Sending..." : "Resend OTP"}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyOtp;
