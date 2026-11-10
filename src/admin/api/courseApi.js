
import axios from "axios";

const API_BASE_URL =
  "http://localhost:5500/api/auth/admin/courses";

// Create a shared Axios instance.
const courseRequest = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Attach authentication token to every request.
courseRequest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Let Axios set the correct multipart boundary.
    if (
      typeof FormData !== "undefined" &&
      config.data instanceof FormData
    ) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Extract a useful backend error message.
const handleError = (error) => {
  const message =
    error.response?.data?.message ||
    error.response?.data?.error ||
    error.message ||
    "Something went wrong.";

  throw new Error(message);
};

// Course API methods.
export const courseApi = {
  // GET: Fetch all courses.
  getAll: async () => {
    try {
      const response = await courseRequest.get("/getAllCourses");
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // GET: Fetch one course by ID.
  getById: async (id) => {
    try {
      if (!id) {
        throw new Error("Course ID is required.");
      }

      const response = await courseRequest.get(
        `/get-course-id/${encodeURIComponent(id)}`
      );

      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // POST: Create a course.
  create: async (formData) => {
    try {
      if (!(formData instanceof FormData)) {
        throw new Error("Course data must be provided as FormData.");
      }

      const response = await courseRequest.post(
        "/create-course",
        formData
      );

      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // PATCH: Update an existing course.
  update: async (id, formData) => {
    try {
      if (!id) {
        throw new Error("Course ID is required.");
      }

      if (!(formData instanceof FormData)) {
        throw new Error("Course data must be provided as FormData.");
      }

      const response = await courseRequest.patch(
        `/update-course/${encodeURIComponent(id)}`,
        formData
      );

      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // DELETE: Delete a course.
  delete: async (id) => {
    try {
      if (!id) {
        throw new Error("Course ID is required.");
      }

      const response = await courseRequest.delete(
        `/delete-course/${encodeURIComponent(id)}`
      );

      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
};

export default courseApi;
