import axios from "axios";

const BASE_URL = "https://ekalavya.tarento.com/api/skills";
const BASEURL = "https://ekalavya.tarento.com/api/skills/users";

/**
 * Fetches skills from the API.
 * @param {Object} params - Query parameters for filtering skills.
 * @returns {Promise} - Axios promise with the response data.
 */
export const SkillService = async (params = {}) => {
  try {
    const response = await axios.get(BASE_URL, { params });
    console.log("Response from API:", response.data.responseData);
    return response.data.responseData;
  } catch (error) {
    console.error("Error fetching skills:", error);
    throw error;
  }
};

/**
 * Creates a new skill.
 * @param {Object} skillData - The data of the skill to be created.
 * @returns {Promise} - Axios promise with the response data.
 */
export const createSkill = async (skillData) => {
  try {
    const response = await axios.post(BASE_URL, skillData);
    console.log("Response from API:", response);
    return response.data;
  } catch (error) {
    console.error("Error creating skill:", error);
    throw error;
  }
};

/**
 * Updates an existing skill.
 * @param {Object} skillData - The data of the skill to be updated.
 * @returns {Promise} - Axios promise with the response data.
 */
export const updateSkill = async (skillData) => {
  try {
    const response = await axios.put(BASE_URL, skillData);
    console.log("Response from API:", response);
    return response.data;
  } catch (error) {
    console.error("Error updating skill:", error);
    throw error;
  }
};

/**
 * Deletes a skill.
 * @param {number} skillId - The ID of the skill to be deleted.
 * @returns {Promise} - Axios promise with the response data.
 */
export const deleteSkill = async (skillId) => {
  try {
    const response = await axios.delete(BASE_URL, { params: { skillId } });
    console.log("Response from API:", response);
    return response.data;
  } catch (error) {
    console.error("Error deleting skill:", error);
    throw error;
  }
};

/**
 * Filters skills by name.
 * @param {string} skillName - The name of the skill to filter by.
 * @returns {Promise} - Axios promise with the response data.
 */
export const filterSkills = async (skillName) => {
  try {
    const response = await axios.get(BASE_URL, { params: { skillName } });
    console.log("Response from API:", response.data.responseData);
    return response.data.responseData;
  } catch (error) {
    console.error("Error filtering skills:", error);
    throw error;
  }
};
/**
 * Fetches the count of users and their IDs for a specific skill ID.
 * @param {number} skillId - The ID of the skill to fetch the count of users for.
 * @returns {Promise} - Axios promise with the response data.
 */
export const getUsersCountForSkill = async (skillId) => {
  try {
    const response = await axios.get(`${BASE_URL}?skillId=${skillId}`);
    console.log("Response from API:", response);
    const skillData = response.data.responseData.find(
      (skill) => skill.skillId === skillId
    );
    return {
      count: skillData.count,
      users: skillData.users,
    };
  } catch (error) {
    console.error("Error fetching user count for skill:", error);
    throw error;
  }
};

export const getSkillsForUser = async (userId) => {
  try {
    const type = userId ? "" : "all";
    const response = await axios.get(`${BASE_URL}?userId=${userId}&type=${type}`);

    // Check if response data is an array
    if (Array.isArray(response.data)) {
      // If the response is an array, assume it's the array of skills
      return response.data;
    } else if (response.data && response.data.responseData && Array.isArray(response.data.responseData)) {
      // If responseData is present and is an array, return it
      return response.data.responseData;
    } else if (response.data && response.data.skills && Array.isArray(response.data.skills)) {
      // If skills is directly available and is an array, return it
      return response.data.skills;
    } else {
      console.error("Unexpected response structure:", response);
      throw new Error("Unexpected response structure from API");
    }
  } catch (error) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.errorMessage
    ) {
      throw new Error(error.response.data.errorMessage);
    } else {
      console.error("Error fetching skills for user:", error);
      throw new Error("Error fetching skills for user.");
    }
  }
};

export const Userskillpost = async (data) => {
  try {
    const response = await axios.post(BASEURL, data);
    return response.data;
  } catch (error) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.errorMessage
    ) {
      throw new Error(error.response.data.errorMessage);
    } else {
    console.error("Error posting skill:", error);
    throw error;
    }
  }
};

/**
 * Deletes a user-skill relationship.
 * @param {number} userId - The ID of the user.
 * @param {number} skillId - The ID of the skill.
 * @returns {Promise} - Axios promise with the response data.
 */
export const UserSkillDelete = async (userId, skillId) => {
  try {
    const response = await axios.delete(BASE_URL, {
      params: { userId, skillId },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting user-skill:", error);
    throw error;
  }
};
