import { useState } from "react";

import AuthLayout from "../components/AuthLayout.jsx";
import LoginForm from "../components/LoginForm.jsx";
import OtpVerificationForm from "../components/OtpVerificationForm.jsx";
import ForgotPasswordForm from "../components/ForgotPasswordForm.jsx";
import ResetPasswordForm from "../components/ResetPasswordForm.jsx";
import ResetSuccess from "../components/ResetSuccess.jsx";
import { Message } from "../components/AuthUI.jsx";
import { loginAdmin, requestPasswordOtp, resetAdminPassword, verifyPasswordOtp } from "../api/authApi.js";

export default function App() {
  const [screen, setScreen] = useState("login");

  const [email, setEmail] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [resetToken, setResetToken] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const clearMessages = () => {
    setError("");
    setMessage("");
  };

  const runRequest = async (request, onSuccess) => {
    clearMessages();
    setLoading(true);

    try {
      const data = await request();
      if (onSuccess) await onSuccess(data);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (loginEmail, password, rememberMe) => {
    return runRequest(
      () => loginAdmin(loginEmail, password, rememberMe),
      () => {
        window.location.assign("/admin/dashboard");
      }
    );
  };

  const handleRequestOtp = (emailAddress) => {
    setResetEmail(emailAddress);

    return runRequest(
      () => requestPasswordOtp(emailAddress),
      () => {
        setScreen("verify-otp");
        setMessage("If this email is registered, an OTP has been sent.");
      }
    );
  };

  const handleVerifyOtp = (otp) => {
    return runRequest(
      () => verifyPasswordOtp(resetEmail, otp),
      (data) => {
        if (!data.resetToken) {
          throw new Error(
            "OTP verified, but no reset token was returned by the server."
          );
        }

        setResetToken(data.resetToken);
        setScreen("reset-password");
        setMessage("OTP verified successfully.");
      }
    );
  };

  const handleResetPassword = (
    newPassword,
    confirmPassword,
    clearForm
  ) => {
    return runRequest(
      () =>
        resetAdminPassword(
          resetEmail,
          resetToken,
          newPassword,
          confirmPassword
        ),
      () => {
        clearForm();
        setResetToken("");
        setScreen("success");
      }
    );
  };

  const handleResendOtp = () => {
    return runRequest(
      () => requestPasswordOtp(resetEmail),
      () => {
        setMessage("If this email is registered, a new OTP has been sent.");
      }
    );
  };

  const goToScreen = (nextScreen) => {
    clearMessages();
    setScreen(nextScreen);
  };

  const backToLogin = () => {
    clearMessages();
    setResetToken("");
    setScreen("login");
  };

  return (
    <AuthLayout>
      {screen === "login" && (
        <LoginForm
          email={email}
          setEmail={setEmail}
          loading={loading}
          onLogin={handleLogin}
          onForgotPassword={() => {
            setResetEmail(email.trim());
            goToScreen("forgot");
          }}
        />
      )}

      {screen === "forgot" && (
        <ForgotPasswordForm
          email={resetEmail}
          setEmail={setResetEmail}
          loading={loading}
          onSubmit={handleRequestOtp}
          onBack={backToLogin}
        />
      )}

      {screen === "verify-otp" && (
        <OtpVerificationForm
          email={resetEmail}
          loading={loading}
          onVerify={handleVerifyOtp}
          onResend={handleResendOtp}
          onBack={backToLogin}
        />
      )}

      {screen === "reset-password" && (
        <ResetPasswordForm
          loading={loading}
          onSubmit={handleResetPassword}
          onBack={backToLogin}
        />
      )}

      {screen === "success" && (
        <ResetSuccess onBackToLogin={backToLogin} />
      )}

      {screen !== "success" && (
        <Message error={error} message={message} />
      )}
    </AuthLayout>
  );
}