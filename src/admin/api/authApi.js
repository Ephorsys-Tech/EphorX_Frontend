
import { AUTH_API } from "../../config/api";

const API_URL = `${AUTH_API}/admin`;

async function postRequest(endpoint, body = {}) {
  const response = await fetch(`${API_URL}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong.");
  }

  return data;
}

// Login
export const loginAdmin = (email, password) =>
  postRequest("login", {
    email: email.trim(),
    password,
  });

// Get logged-in admin profile
export const getAdminProfile = async () => {
  const response = await fetch(`${API_URL}/profile`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Unauthorized");
  }

  return data;
};

// Logout
export const logoutAdmin = () => postRequest("logout");

// Forgot Password
export const requestPasswordOtp = (email) =>
  postRequest("forgot-password", {
    email: email.trim(),
  });

// Verify OTP
export const verifyPasswordOtp = (email, otp) =>
  postRequest("verify-otp", {
    email: email.trim(),
    otp: otp.trim(),
  });

// Reset Password
export const resetAdminPassword = (
  email,
  resetToken,
  newPassword,
  confirmPassword
) =>
  postRequest("reset-password", {
    email: email.trim(),
    resetToken,
    newPassword,
    confirmPassword,
  });
