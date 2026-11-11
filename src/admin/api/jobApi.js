
import axios from "axios";

import { AUTH_API } from "../../config/api";

const API_URL = `${AUTH_API}/job`;
// Get all jobs
export const getAllJobs = async () => {
  const response = await axios.get(`${API_URL}/get-all-job`);
  return response.data;
};

// Get single job
export const getJobById = async (id) => {
  const response = await axios.get(`${API_URL}/get-job-by/${id}`);
  return response.data;
};

// Create job
export const createJob = async (jobData) => {
  const response = await axios.post(`${API_URL}/create-job`, jobData);
  return response.data;
};

// Update job
export const updateJob = async (id, jobData) => {
  const response = await axios.put(`${API_URL}/update-job/${id}`, jobData);
  return response.data;
};

// Delete job
export const deleteJob = async (id) => {
  const response = await axios.delete(`${API_URL}/delete-job/${id}`);
  return response.data;
};
