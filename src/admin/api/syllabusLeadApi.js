
import axios from "axios";

const API_URL = "http://localhost:5500/api/auth/syllabus-lead";

export const getAllSyllabusLeads = async () => {
  const response = await axios.get(`${API_URL}/get-all-lead`);
  return response.data;
};

export const getSyllabusLeadById = async (id) => {
  const response = await axios.get(`${API_URL}/get-lead-by/${id}`);
  return response.data;
};

export const createSyllabusLead = async (data) => {
  const response = await axios.post(`${API_URL}/create-lead`, data);
  return response.data;
};

export const updateSyllabusLead = async (id, data) => {
  const response = await axios.put(`${API_URL}/update-lead/${id}`, data);
  return response.data;
};

export const deleteSyllabusLead = async (id) => {
  const response = await axios.delete(`${API_URL}/delete-lead/${id}`);
  return response.data;
};
