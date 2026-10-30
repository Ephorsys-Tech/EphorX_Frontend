
import axios from "axios";

const API_URL = "http://localhost:5500/api/auth/webinarEnroll";

// Get all webinar enrollments
export const getWebinarEnrollments = async () => {
    const response = await axios.get(`${API_URL}/get-all-webenroll`);
    return response.data;
};

// Get one webinar enrollment
export const getWebinarEnrollmentById = async (id) => {
    const response = await axios.get(`${API_URL}/get-webenroll-by/${id}`);
    return response.data;
};

// Create webinar enrollment
export const createWebinarEnrollment = async (data) => {
    const response = await axios.post(`${API_URL}/create-web-enroll`,data);
    return response.data;
};

// Update webinar enrollment
export const updateWebinarEnrollment = async (id, data) => {
    const response = await axios.patch(`${API_URL}/update-webenroll/${id}`, data);
    return response.data;
};

// Delete webinar enrollment
export const deleteWebinarEnrollment = async (id) => {
    const response = await axios.delete(`${API_URL}/delete-webenroll/${id}`);
    return response.data;
};
