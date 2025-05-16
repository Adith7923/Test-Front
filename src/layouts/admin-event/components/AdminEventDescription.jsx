import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EventsDescription from "../../common/components/EventsDescription";
import Modal from "../../common/components/Modal";
import DeleteBox from "../../common/components/DeleteBox";
import AddEvent from "../../admin-event/components/AddEvent";
import EventsDescriptionData from "./EventDescriptionData";
import { enrollParticipantService } from "../../../services/Event";

const AdminEventDescription = ({
  formSubmit,
  fetchedFormData,
  onDelete,
  organizer,
  eventId,
}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [headings, setHeadings] = useState([]);
  const [attendanceFraction, setAttendanceFraction] = useState("0/0");
  const [attendancePercentage, setAttendancePercentage] = useState("0%");

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await enrollParticipantService(eventId);
        if (response.statusMessage === "success") {
          const updatedParticipants = response.responseData.map(
            (participant) => {
              return participant;
            }
          );
          setParticipants(updatedParticipants);

          if (updatedParticipants.length > 0) {
            const presentCount = updatedParticipants.filter(
              (participant) => participant.attendance === true
            ).length;
            const totalParticipants = updatedParticipants.length;

            // Calculate attendance fraction
            const fraction = `${presentCount}/${totalParticipants}`;
            setAttendanceFraction(fraction);

            // Calculate attendance percentage
            const percentage = `${Math.round((presentCount / totalParticipants) * 100)}%`;
            setAttendancePercentage(percentage);
          }
        }
      } catch (error) {
        console.error("Error fetching participants:", error);
      }
    };

    fetchParticipants(); // Fetch participants when the component mounts or eventId changes
  }, [eventId]);

  const handleClick = () => {
    navigate(`/admin/events/event-details/event-participants/${eventId}`);
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteOpen(false);
  };

  const handleFormSubmit = (formData) => {
    console.log(formData);
    handleCloseModal();
    formSubmit(formData);
  };

  const handleDeleteCancel = () => {
    console.log("Delete canceled");
    handleCloseDeleteModal();
  };

  const handleDeleteConfirm = () => {
    console.log("Delete confirmed");
    handleCloseDeleteModal();
    onDelete();
    navigate(`/admin/events`);
  };

  const actionData = {
    ...fetchedFormData,
    ...EventsDescriptionData.buttonProps,
    onclick3: handleOpenModal,
    onclick2: handleOpenDeleteModal,
    onclick1: handleClick,
  };

  console.log("Participants:", participants);

  return (
    <div>
      <EventsDescription
        {...actionData}
        organizer={organizer}
        fraction={attendanceFraction}
        percentage={attendancePercentage}
      />

      <Modal isOpen={isOpen} widthVariant="large" onClose={handleCloseModal}>
        <AddEvent
          defaultValues={EventsDescriptionData.defaultValues}
          onSubmit={handleFormSubmit}
          fetchedFormData={fetchedFormData}
        />
      </Modal>
      <Modal
        isOpen={isDeleteOpen}
        widthVariant="small"
        onClose={handleCloseDeleteModal}
      >
        <DeleteBox
          {...EventsDescriptionData.deleteeventprops}
          onCancel={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
        />
      </Modal>
    </div>
  );
};

export default AdminEventDescription;
