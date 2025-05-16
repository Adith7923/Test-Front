import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import ShowCards from "../../common/components/ShowCards";
import Modal from "../../common/components/Modal";
import CardRow from "./Cardrow";
import AddEvent from "./AddEvent";
import styles from "../AdminStudent.module.css";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import { DeleteBox } from "../../common";
import DeleteButton from "../../../components/buttons/DeleteButton";

const EventList = ({
  participantId,
  events,
  handleDelete,
  eventOptions,
  onSubmit,
}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleOpenDelete = () => {
    setIsDeleteOpen(true);
  };

  const handleCloseDelete = () => {
    setIsDeleteOpen(false);
  };

  const handleDeleteCancel = () => {
    console.log("Delete canceled");
    handleCloseDelete();
  };

  const handleDeleteConfirm = () => {
    console.log("Delete confirmed");
    if (handleDelete) {
      handleDelete();
    }
    handleCloseDelete();
  };

  const handleFormSubmit = (formData) => {
    console.log("Form submitted with data:", formData);
    onSubmit(formData);
    handleCloseModal();
  };

  const handleCardClick = (eventId) => {
    navigate(`/admin/events/event-details/${eventId}`);
  };

  const heading = {
    heading: "Events Enrolled",
    textbuttonprops: {
      icon: <AiOutlinePlus />,
      text: "Add Events",
      onClick: handleOpenModal,
    },
  };

  const addevent = {
    mainHeading: "Add Event",
    options: eventOptions,
  };

  const eventcards = {
    card: "event",
    cardData: events.map((event) => ({
      miniHeading: event.miniHeading,
      mainHeading: event.mainHeading,
      startDate: event.startDate,
      endDate: event.endDate,
      Description: event.Description,
      cardType: event.cardType,
      eventId: event.eventId,
    })),
  };

  const deleteprops = {
    title: "Delete Student",
    message: "Are you sure you want to Delete this Student?",
    buttonText: "Delete",
  };

  const props = {
    content: "Delete Student",
    variant: "tertiary",
    onClick: handleOpenDelete,
    width: "full",
  };

  return (
    <div>
      <ShowCards {...heading} />
      <Modal isOpen={isOpen} widthVariant="medium" onClose={handleCloseModal}>
        <AddEvent {...addevent} onSubmit={handleFormSubmit} />
      </Modal>
      {events.length === 0 ? (
        <div
          style={{
            textAlign: "left",
            color: "var(--neutral600)",
            marginTop: "-26px",
          }}
          className="padding"
        >
          &nbsp;&nbsp;No events available
        </div>
      ) : (
        <CardRow {...eventcards} handleClick={handleCardClick} />
      )}
      <div className="padding">
        <div className={`${styles["eventslist-container"]}`}>
          <div className={`${styles["eventslist-deletebutton"]}`}>
            <DeleteButton {...props} />
          </div>
        </div>
      </div>
      <Modal
        isOpen={isDeleteOpen}
        widthVariant="small"
        onClose={handleCloseDelete}
      >
        <DeleteBox
          {...deleteprops}
          onCancel={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
        />
      </Modal>
    </div>
  );
};

export default EventList;
