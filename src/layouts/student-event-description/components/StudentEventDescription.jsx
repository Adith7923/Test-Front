import React, { useState, useEffect } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EventsDescription } from "../../common";
import {
  addEnrollmentService,
  deleteEventService,
} from "../../../services/Event";
import { useNavigate } from "react-router-dom";

const StudentEventDescription = ({
  eventDetails,
  participantId,
  tab,
  organizerName,
  role, 
}) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (tab === "Enrolled") {
      setIsRegistered(true);
    }
  }, [tab]);

  const handleRegister = async () => {
    try {
      const eventData = { participantId };

      await addEnrollmentService(eventDetails.eventId, eventData);

      toast.success("Event registered successfully!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setIsRegistered(true);
    } catch (error) {
      console.error("Error registering event:", error);
      toast.error("Failed to register event. Please try again later.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleUnenroll = async () => {
    try {
      await deleteEventService(eventDetails.eventId, participantId);

      toast.success("Unregistered successfully!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setIsRegistered(false);
    } catch (error) {
      console.error("Error unenrolling from event:", error);
      toast.error("Failed to unenroll from event. Please try again later.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleCompleted = () => {
    toast.info("Can't register for this event", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  if (!eventDetails) {
    return <div>No event details available</div>;
  }

  let smallerButtonLabel = "";
  let onClickAction = () => {};
  let showButton = true;

  switch (tab) {
    case "Upcoming":
      smallerButtonLabel = isRegistered ? "Unenroll" : "Register";
      onClickAction = isRegistered ? handleUnenroll : handleRegister;
      break;
    case "Enrolled":
      smallerButtonLabel = isRegistered ? "Unenroll" : "Register";
      onClickAction = isRegistered ? handleUnenroll : handleRegister;
      break;
    case "Completed":
      smallerButtonLabel = "Completed";
      onClickAction = handleCompleted;
      showButton = false;
      break;
    default:
      smallerButtonLabel = "Register";
      onClickAction = handleRegister;
      break;
  }

  const eventData = {
    eventTitle: eventDetails.eventTitle,
    eventType: eventDetails.eventType,
    eventMode: eventDetails.eventMode,
    description: eventDetails.description,
    startDate: eventDetails.startDate,
    endDate: eventDetails.endDate,
    startTime: eventDetails.startTime,
    endTime: eventDetails.endTime,
    link: eventDetails.link,
    location: eventDetails.location,
    speaker: eventDetails.speaker,
    speakerDescription: eventDetails.speakerDescription,
    organizer: organizerName,
    button: "Events",
    buttons: eventDetails.eventTitle,
    small: "edit",
    medium: "delete",
    large: "view participants",
    type: "public",
    smaller: smallerButtonLabel,
    onclick1: onClickAction,
    showButton,
    isRegistered,
    role,
  };

  return (
    <div className="padding padding-top padding-bottom">
      <EventsDescription {...eventData} />
      {/* <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Slide}
      /> */}
    </div>
  );
};

export default StudentEventDescription;

