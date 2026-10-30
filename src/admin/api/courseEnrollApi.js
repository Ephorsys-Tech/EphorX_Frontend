
import axios from "axios";

const API_URL = "http://localhost:5500/api/auth/courseEnroll";

// Get all course enrollments
export const getCourseEnrollments = async () => {
    const response = await axios.get(`${API_URL}/get-all-courseenroll`);
    return response.data;
};

// Get one course enrollment
export const getCourseEnrollmentById = async (id) => {
    const response = await axios.get(`${API_URL}/get-courseenroll-by/${id}`);
    return response.data;
};

// Create course enrollment
export const createCourseEnrollment = async (data) => {
    const response = await axios.post(`${API_URL}/create-course-enroll`,data);
    return response.data;
};

// Update course enrollment
export const updateCourseEnrollment = async (id, data) => {
    const response = await axios.patch(`${API_URL}/update-courseenroll/${id}`, data);
    return response.data;
};

// Delete course enrollment
export const deleteCourseEnrollment = async (id) => {
    const response = await axios.delete(`${API_URL}/delete-courseenroll/${id}`);
    return response.data;
};
