import React, { useState, useEffect } from "react";
import EventForm from "../../../layouts/mentor-events/components/EventsForm";
import { addEventService } from "../../../services/Event";
import secureLocalStorage from "react-secure-storage";

const MentorCreateEvent = () => {
  const userSession = secureLocalStorage.getItem("userSession") || {};
  const hostId = userSession.userId;

  const submitEvent = async (data) => {
    try {
      const formData = { ...data, hostId };
      const response = await addEventService(formData);
      console.log("Response from API:", response);
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <div>
      <EventForm hostId={hostId} onSubmit={submitEvent} />
    </div>
  );
};

export default MentorCreateEvent;
