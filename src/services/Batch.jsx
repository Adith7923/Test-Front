import axios from "axios";

const API_URL = "https://ekalavya.tarento.com/api";

export const fetchbatches = async (params) => {
  try {
    const response = await axios.get(`${API_URL}/batches`, {
      params: params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching batches:", error);
    throw error;
  }
};

export const createBatch = async (batchData = {}) => {
  try {
    const response = await axios.post(`${API_URL}/batches`, batchData);
    return response.data.responseData;
  } catch (error) {
    console.error("Error creating batch:", error);
    throw error;
  }
};

export const updateBatch = async (batchData) => {
  try {
    console.log("Updating batch with data:", batchData);
    const response = await axios.put(`${API_URL}/batches`, batchData);
    return response.data.responseData;
  } catch (error) {
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
      console.error("Error response headers:", error.response.headers);
    } else {
      console.error("Error message:", error.message);
    }
    throw error;
  }
};

export const deleteBatch = async (batchId) => {
  try {
    console.log("Deleting batch with ID:", batchId);
    const response = await axios.delete(
      `${`${API_URL}/batches`}?batchId=${batchId}`
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
      console.error("Error response headers:", error.response.headers);
    } else {
      console.error("Error message:", error.message);
    }
    throw error;
  }
  
};

export const fetchBatchParticipants = async (params = {}) => {
  try {
    const response = await axios.get(`${API_URL}/batches/participants`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching batch participants", error);
    throw error;
  }
};

export const postUserIds = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/batches/participants`, data);
    return response.data;
  } catch (error) {
    console.error("Error posting user IDs:", error);
    throw error;
  }
};
export const userBatchDelete = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}/all`, {
      params: {
        userId: userId
      }
    });
    console.log("Delete response:", response);
    return response.data;
  } catch (error) {
    console.error("Error deleting user from all batches:", error);
    throw error;
  }
};

export const batchDelete = async (batchId, userId) => {
  try {
    const response = await axios.delete(`${API_URL}/batches/participants`, {
      params: {
        batchId: batchId,
        userId: userId
      }
    });
    console.log("Delete response:", response);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
