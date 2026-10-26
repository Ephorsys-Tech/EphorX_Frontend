
import axios from "axios";

const API_BASE_URL = "http://localhost:5500/api/auth/contact";

const contactRequest = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

contactRequest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

const handleError = (error) => {
  const message =
    error.response?.data?.message ||
    error.response?.data?.error ||
    error.message ||
    "Failed to process contact request.";

  throw new Error(message);
};

export const contactApi = {
  create: async (contactData) => {
    try {
      const response = await contactRequest.post(
        "/create-contact",
        contactData
      );

      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  getAll: async () => {
    try {
      const response = await contactRequest.get("/get-all-contact");
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  getById: async (id) => {
    try {
      if (!id) throw new Error("Contact ID is required.");

      const response = await contactRequest.get(
        `/get-contact/${encodeURIComponent(id)}`
      );

      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  update: async (id, payload) => {
    try {
      if (!id) throw new Error("Contact ID is required.");

      const response = await contactRequest.patch(
        `/update-contact/${encodeURIComponent(id)}`,
        payload
      );

      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  delete: async (id) => {
    try {
      if (!id) throw new Error("Contact ID is required.");

      const response = await contactRequest.delete(
        `/delete-contact/${encodeURIComponent(id)}`
      );

      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
};

export default contactApi;
