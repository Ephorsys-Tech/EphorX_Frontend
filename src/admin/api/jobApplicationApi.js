
import axios from "axios";

import { AUTH_API } from "../../config/api";

const API_URL = `${AUTH_API}/job-apply`;
export const getAllJobApplications = async () => {
  const response = await axios.get(`${API_URL}/get-all-job`);
  return response.data;
};

export const getJobApplicationById = async (id) => {
  const response = await axios.get(`${API_URL}/get-job-by/${id}`);
  return response.data;
};

export const createJobApplication = async (applicationData) => {
  const response = await axios.post(
    `${API_URL}/create-job`,
    applicationData
  );
  return response.data;
};

export const updateJobApplication = async (id, applicationData) => {
  const response = await axios.put(
    `${API_URL}/update-job/${id}`,
    applicationData
  );
  return response.data;
};

export const deleteJobApplication = async (id) => {
  const response = await axios.delete(`${API_URL}/delete-job/${id}`);
  return response.data;
};
