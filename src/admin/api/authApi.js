
import { AUTH_API } from "../../config/api";

const API_URL = `${AUTH_API}/admin`;

async function postRequest(endpoint, body) {
  const response = await fetch(`${API_URL}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    ...(body !== undefined && {
      body: JSON.stringify(body),
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong.");
  }

  return data;
}

// LOGIN
export const loginAdmin = (email, password) =>
  postRequest("login", {
    email: email.trim(),
    password,
  });

// FORGOT PASSWORD
export const requestPasswordOtp = (email) =>
  postRequest("forgot-password", {
    email: email.trim(),
  });

// VERIFY OTP
export const verifyPasswordOtp = (email, otp) =>
  postRequest("verify-otp", {
    email: email.trim(),
    otp: otp.trim(),
  });

// RESET PASSWORD
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

// LOGOUT
export const logoutAdmin = () =>
  postRequest("logout");
