const API_URL = "http://localhost:5500/api/auth/webinars";

const handleResponse = async (response) => {
  const result = await response.json();

  if (!response.ok || result.success === false) {
    throw new Error(result.message || "Something went wrong");
  }

  return result;
};

// Get all webinars
export const getAllWebinars = async () => {
  const response = await fetch(`${API_URL}/get-all-webinar`);
  const result = await handleResponse(response);

  return result.data;
};

// Get webinar by ID
export const getWebinarById = async (id) => {
  const response = await fetch(`${API_URL}/get-webinar/${id}`);
  const result = await handleResponse(response);

  return result.data;
};

// Create webinar
export const createWebinar = async (webinarData) => {
  const response = await fetch(`${API_URL}/create-webinar`, {
    method: "POST",
    body: webinarData,
  });

  return handleResponse(response);
};

// Update webinar
export const updateWebinar = async (id, webinarData) => {
  const response = await fetch(`${API_URL}/update-webinar/${id}`, {
    method: "PATCH",
    body: webinarData,
  });

  return handleResponse(response);
};

// Delete webinar
export const deleteWebinar = async (id) => {
  const response = await fetch(`${API_URL}/delete-webinar/${id}`, {
    method: "DELETE",
  });

  return handleResponse(response);
};