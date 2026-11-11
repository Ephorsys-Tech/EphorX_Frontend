
import { AUTH_API } from "../../config/api";

const BASE_URL = `${AUTH_API}/category`;
async function request(url, options = {}) {
  const token = localStorage.getItem("token");

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    // Keep this if your backend uses cookie-based sessions.
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `Request failed: ${response.status}`);
  }

  if (response.status === 204) return null;
  return response.json();
}

export const categoryApi = {
  getAll() {
    return request(`${BASE_URL}/get-all`);
  },

  getById(id) {
    return request(`${BASE_URL}/getById/${encodeURIComponent(id)}`);
  },

  create(data) {
    return request(`${BASE_URL}/create-category`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  update(id, data) {
    return request(`${BASE_URL}/update/${encodeURIComponent(id)}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  remove(id) {
    return request(`${BASE_URL}/delete/${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
  },
};
