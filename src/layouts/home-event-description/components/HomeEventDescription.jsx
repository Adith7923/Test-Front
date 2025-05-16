import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { EventsDescription } from "../../common";
import Modal from "../../common/components/Modal";
import LoginBox from "../../common/components/LoginBox";

const HomeEventDescription = ({ event, organizer , exploreEvent}) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleRegisterClick = () => {
    handleOpenLoginModal();
  };

 if (!event) {
    return null; 
  }

  const homeEvents = {
    eventTitle: event.eventTitle,
    eventType: event.eventType,
    eventMode: event.eventMode,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate,
    startTime: event.startTime,
    endTime: event.endTime,
    location: event.location,
    link: event.link,
    speaker: event.speaker,
    speakerDescription: event.speakerDescription,
    organizer: organizer ? `${organizer.firstName} ${organizer.lastName}` : "",
    button: "Events",
    buttons: event.eventTitle,
    small: "edit",
    medium: "delete",
    large: "view participants",
    type: "public",
    smaller: "Register",
    onclick1: handleRegisterClick,
  };

  const loginBoxProps = {
    title: "Please Log In",
    message: "You need to log in to register for this event.",
    buttonText: "Log In with Google",
    onCancel: handleCloseLoginModal,
  };

  return (
    <div className="padding padding-top padding-bottom">
      <EventsDescription {...homeEvents} exploreEvent={exploreEvent}/>
      <Modal
        isOpen={isLoginModalOpen}
        widthVariant="small"
        onClose={handleCloseLoginModal}
      >
        <LoginBox {...loginBoxProps} />
      </Modal>
    </div>
  );
};

export default HomeEventDescription;
