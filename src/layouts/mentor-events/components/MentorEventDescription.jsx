import React, { useState } from "react";
import EventsDescription from "../../common/components/EventsDescription";
import EventDescriptionData from "./EventDescriptionData";
import Modal from "../../common/components/Modal";
import AddEvent from "../../admin-event/components/AddEvent";
 
const MentorEventDescription = ({ formSubmit, fetchedFormData, showButton}) => {
  const [isOpen, setIsOpen] = useState(false);
 
  const handleOpenModal = () => {
    setIsOpen(true);
  };
 
  const handleCloseModal = () => {
    setIsOpen(false);
  };
 
  const handleFormSubmit = (formData) => {
    console.log("Form Submitted with data:", formData);
    handleCloseModal();
    formSubmit(formData);
  };
 
  const actionData = {
    ...fetchedFormData,
    ...EventDescriptionData.buttonProps,
    onclick1: handleOpenModal,
  };
 
  return (
    <div className="padding padding-top">
      <EventsDescription {...actionData} showButton={showButton} />
      <Modal isOpen={isOpen} widthVariant="large" onClose={handleCloseModal}>
        <AddEvent {...EventDescriptionData} onSubmit={handleFormSubmit} fetchedFormData={fetchedFormData}/>
      </Modal>
    </div>
  );
};
 
export default MentorEventDescription;
 