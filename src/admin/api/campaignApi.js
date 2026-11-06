
import axios from "axios";

const API_BASE_URL = "http://localhost:5500/api/auth/campaign";

const campaignRequest = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

campaignRequest.interceptors.request.use(
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
    "Failed to process campaign request.";

  throw new Error(message);
};

const campaignApi = {
  create: async (campaignData) => {
    try {
      const response = await campaignRequest.post(
        "/create",
        campaignData
      );
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  getAll: async () => {
    try {
      const response = await campaignRequest.get("/get-all");
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  getById: async (id) => {
    try {
      if (!id) throw new Error("Campaign ID is required.");

      const response = await campaignRequest.get(
        `/get/${encodeURIComponent(id)}`
      );
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  update: async (id, payload) => {
    try {
      if (!id) throw new Error("Campaign ID is required.");

      const response = await campaignRequest.patch(
        `/update/${encodeURIComponent(id)}`,
        payload
      );
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  delete: async (id) => {
    try {
      if (!id) throw new Error("Campaign ID is required.");

      const response = await campaignRequest.delete(
        `/delete/${encodeURIComponent(id)}`
      );
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
};

export default campaignApi;
