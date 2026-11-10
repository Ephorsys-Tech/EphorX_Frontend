
import axios from "axios";

const API_URL = "http://localhost:5500/api/auth/book-demo";


export const getAllDemoBookings = async () => {
    const response = await axios.get(`${API_URL}/get-all-demo`);
    return response.data;
};

export const getDemoBookingById = async (id) => {
    const response = await axios.get(`${API_URL}/get-demo-by/${id}`);
    return response.data;
};

export const createDemoBooking = async (data) => {
  const response = await axios.post(`${API_URL}/create-demo`, data);
  return response.data;
};

export const updateDemoBooking = async (id, data) => {
  const response = await axios.put(
    `${API_URL}/update-demo/${id}`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};
export const deleteDemoBooking = async (id) => {
    const response = await axios.delete(`${API_URL}/delete-demo/${id}`);
    return response.data;
};
