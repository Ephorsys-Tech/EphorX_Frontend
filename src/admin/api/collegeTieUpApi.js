
import axios from "axios";

import { AUTH_API } from "../../config/api";

const API_BASE_URL = `${AUTH_API}/college-tie-up`;
const collegeTieUpRequest = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

collegeTieUpRequest.interceptors.request.use(
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
    "Failed to process college tie-up request.";

  throw new Error(message);
};

export const collegeTieUpApi = {
  create: async (collegeData) => {
    try {
      const response = await collegeTieUpRequest.post(
        "/create",
        collegeData
      );
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  getAll: async () => {
    try {
      const response = await collegeTieUpRequest.get("/get-all");
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  getById: async (id) => {
    try {
      if (!id) throw new Error("College ID is required.");

      const response = await collegeTieUpRequest.get(
        `/get/${encodeURIComponent(id)}`
      );

      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  update: async (id, payload) => {
    try {
      if (!id) throw new Error("College ID is required.");

      const response = await collegeTieUpRequest.patch(
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
      if (!id) throw new Error("College ID is required.");

      const response = await collegeTieUpRequest.delete(
        `/delete/${encodeURIComponent(id)}`
      );

      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
};

export default collegeTieUpApi;
