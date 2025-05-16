import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EventsTable from "../../../layouts/mentor-events/components/EventsTable";
import {
  enrollParticipantService,
  addEnrollmentService,
} from "../../../services/Event";
import { eventNameState } from "../admin-student/Atom";
import { eventCompleted } from "../admin-student/Atom";
import { useRecoilValue } from "recoil";
import { toast } from "react-toastify";
import NavButton from "../../../components/buttons/NavButton";

const AdminEventParticipants = () => {
  const { eventId } = useParams();
  const eventName = useRecoilValue(eventNameState);
  const eventComp = useRecoilValue(eventCompleted);
  const [participants, setParticipants] = useState([]);
  const [headings, setHeadings] = useState([]);
  const pageNames = [`${eventName}`, "participants"];

  const handleNavButtonClick = (pageName) => {
    console.log(`Navigating to ${pageName}`);
  };

  useEffect(() => {
    fetchParticipants();
  }, [eventId]);

  const fetchParticipants = async () => {
    try {
      const response = await enrollParticipantService(eventId);
      if (response.statusMessage === "success") {
        const updatedParticipants = response.responseData.map((participant) => {
          return participant;
        });
        setParticipants(updatedParticipants);

        if (updatedParticipants.length > 0) {
          const keys = Object.keys(updatedParticipants[0]);
          const filteredHeadings = keys.filter((key) => key !== "attendance");
          const formattedHeadings = filteredHeadings.map((key) => {
            return key.replace(/([A-Z])/g, " $1").trim();
          });
          setHeadings(formattedHeadings);
        }
      }
    } catch (error) {
      console.error("Error fetching participants:", error);
    }
  };

  const handleAttendanceUpdate = async (attendance) => {
    try {
      const response = await addEnrollmentService(eventId, attendance);
      console.log("Enrollment response:", response);
      fetchParticipants();
    } catch (error) {
      console.error("Error updating enrollment:", error);
    }
  };

  const tableContent = {
    data: participants.map((participant) => [
      participant.participantId,
      participant.name,
      participant.userName,
      participant.attendance,
    ]),
    headings: ["Participant ID", "Name", "Email ID", "Attendance"],
    logAttendance: () => {},
    onAttendanceUpdate: handleAttendanceUpdate,
    disableAttendance: eventComp === 0, 
    onClick: handleNavButtonClick,
    pageNames: pageNames.join(' > '), 
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "10px", paddingLeft: "4vw" }}>
        <NavButton pageName={eventName} />
        <NavButton pageName="Participants" />
      </div>

      <EventsTable {...tableContent} eventName={eventName} />
    </div>
  );
};

export default AdminEventParticipants;
