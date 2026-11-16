
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
    credentials: "include",
  });

  const text = await response.text();

  let result = null;

  try {
    result = text ? JSON.parse(text) : null;
  } catch {
    result = text;
  }

  if (!response.ok) {
    throw new Error(
      result?.message ||
      result?.error ||
      `Request failed: ${response.status}`
    );
  }

  return result;
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
