
const API_URL = "http://localhost:5500/api/auth/trainer";

const handleResponse = async (response) => {
  const result = await response.json();

  if (!response.ok || result.success === false) {
    throw new Error(result.message || "Something went wrong");
  }

  return result;
};

// Get all trainers
export const getAllTrainers = async () => {
  const response = await fetch(`${API_URL}/get-all-trainers`);
  const result = await handleResponse(response);

  return result.data;
};

// Get a single trainer
export const getTrainerById = async (id) => {
  const response = await fetch(`${API_URL}/get-trainer/${id}`);
  const result = await handleResponse(response);

  return result.data;
};

// Create a trainer
export const createTrainer = async (trainerData) => {
  const response = await fetch(`${API_URL}/create-trainer`, {
    method: "POST",
    body: trainerData,
  });

  return handleResponse(response);
};

// Update a trainer
export const updateTrainer = async (id, trainerData) => {
  const response = await fetch(`${API_URL}/update-trainer/${id}`, {
    method: "PATCH",
    body: trainerData,
  });

  return handleResponse(response);
};

// Delete a trainer
export const deleteTrainer = async (id) => {
  const response = await fetch(`${API_URL}/delete-trainer/${id}`, {
    method: "DELETE",
  });

  return handleResponse(response);
};
