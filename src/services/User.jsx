// service
import axios from "axios";

const API_URL = "https://ekalavya.tarento.com/api";

// Function to get user details
export const getUserDetails = async (params) => {
  try {
    const response = await axios.get(`${API_URL}/users`, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};

// Function to update user details
export const updateUserDetails = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/users`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating user details:", error);
    throw error;
  }
};

// Function to add a new user
export const addNewUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding new user:", error);
    throw error;
  }
};

// Function to delete a user
export const deleteUser = async (params) => {
  try {
    const response = await axios.delete(`${API_URL}/users`, { params });
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
// Function to get colleges data
export const getColleges = async () => {
  try {
    const response = await axios.get(`${API_URL}/colleges`);
    return response.data;
  } catch (error) {
    console.error("Error fetching colleges data:", error);
    throw error;
  }
};

// Function to add a new college
export const postColleges = async (collegeData) => {
  try {
    const response = await axios.post(`${API_URL}/colleges`, collegeData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding college:", error);
    throw error;
  }
};

