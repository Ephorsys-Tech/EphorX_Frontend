const API_URL = "http://localhost:5500/api/auth/admin";

async function postRequest(endpoint, body) {
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

export const loginAdmin = (email, password) =>
  postRequest("login", {
    email: email.trim(),
    password,
  });

export const requestPasswordOtp = (email) =>
  postRequest("forgot-password", {
    email: email.trim(),
  });

export const verifyPasswordOtp = (email, otp) =>
  postRequest("verify-otp", {
    email: email.trim(),
    otp: otp.trim(),
  });

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