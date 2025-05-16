import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import ShowCards from "../../common/components/ShowCards";
import Modal from "../../common/components/Modal";
import CardRow from "../../admin-student/components/Cardrow";
import Addevent from "../../admin-student/components/AddEvent";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import { DeleteBox } from "../../common";
import styles from "../AdminMentor.module.css";
import { useNavigate } from "react-router-dom";
import DeleteButton from "../../../components/buttons/DeleteButton";
import { toast } from "react-toastify";

const MentorEventsList = ({ events, handleDelete }) => {
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
    try {
      console.log("Delete confirmed");
      if (handleDelete) {
        handleDelete();
      }
      handleCloseDelete();
      toast.success("Mentor removed successfully!");
    } catch {
      toast.error("Error removing mentor");
    }
  };

  const handleClick = (eventId) => {
    navigate(`/admin/events/event-details/${eventId}`);
  };

  const props = {
    content: "Delete Mentor",
    variant: "tertiary",
    onClick: handleOpenDelete,
    width: "full",
  };

  const deleteprops = {
    title: "Delete Mentor",
    message: "Are you sure you want to Delete this Mentor?",
    buttonText: "Delete",
  };

  const heading = {
    heading: "Events Handled",
    textbuttonprops: {},
  };

  const eventcards = {
    card: "event",
    cardData: events.map((event) => ({
      miniHeading: event.eventType,
      mainHeading: event.eventTitle,
      startDate: event.startDate,
      endDate: event.endDate,
      Description: event.description,
      cardType: event.eventType,
      eventId: event.eventId,
    })),
  };

  return (
    <div>
      <ShowCards {...heading} />

      {events.length === 0 ? (
        <div
          style={{
            textAlign: "left",
            color: "var(--neutral600)",
            marginTop: "-20px",
          }}
          className="padding"
        >
          &nbsp;&nbsp;No events to display
        </div>
      ) : (
        <CardRow {...eventcards} handleClick={handleClick} />
      )}
      <div className="padding">
        <div className={`${styles["mentoreventslist-container"]}`}>
          <div className={`${styles["mentoreventslist-deletebutton"]}`}>
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

export default MentorEventsList;
