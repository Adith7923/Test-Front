import axios from "axios";

const BASE_URL = "https://ekalavya.tarento.com/api/events";

export const fetchEventsService = async (params = {}) => {
  try {
    const response = await axios.get(BASE_URL, { params });
    console.log(response);
    return response.data.responseData;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

export const addEventService = async (eventData) => {
  try {
    const response = await axios.post(BASE_URL, eventData);
    return response.data;
  } catch (error) {
    console.log("Error adding event:", error);
    throw error;
  }
};

export const deleteEventService = async (eventId,participantId) => {
  try {
    const response = await axios.delete(BASE_URL, {
      params: {
        eventId: eventId,
        participantId: participantId
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting event enrollment:', error);
    throw error;
  }
};

export const enrollParticipantService = async (
  eventId,
  participantId,
  attendance
) => {
  try {
    const response = await axios.get(
      "https://ekalavya.tarento.com/api/enrollment",
      {
        params: {
          eventId: eventId,
          participantId: participantId,
          attendance: attendance,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error enrolling participant:", error);
    throw error;
  }
};

export const addEnrollmentService = async (eventId, eventData) => {
  try {
    const response = await axios.post(
      `https://ekalavya.tarento.com/api/enrollment?eventId=${eventId}`,
      eventData
    );
    return response.data;
  } catch (error) {
    console.log("Error adding event:", error);
    throw error;
  }
};
export const getEnrolledEventIds = async (participantId) => {
  try {
    const response = await axios.get("https://ekalavya.tarento.com/api/enrollment", {
      params: {
        participantId: participantId
      }
    });
    
    if (response.data === null) {
      throw new Error('Data is null');
    }
    return response;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errorMessage) {
      throw new Error(error.response.data.errorMessage);
    } else {
      console.error("Error fetching skills for user:", error);
      throw new Error("Error fetching skills for user.");
    }
  }
};
