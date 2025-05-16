import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import StudentEventDescription from "../../../layouts/student-event-description/components/StudentEventDescription";
import { fetchEventsService } from "../../../services/Event";
import { getUserDetails } from "../../../services/User";
import { enrollParticipantService } from "../../../services/Event";
import LoadingSpinner from "../../../components/loadingspinner/LoadingSpinner";
import secureLocalStorage from "react-secure-storage";

const StudentEventDetails = () => {
  const { eventId } = useParams();
  const location = useLocation();
  const [tab, setTab] = useState(location.state?.tab || "");
  const [eventDetails, setEventDetails] = useState(null);
  const [organizerName, setOrganizerName] = useState("");
  const [loading, setLoading] = useState(true);

  const userSession = secureLocalStorage.getItem("userSession") || {};
  const participantId = userSession.userId;
  const role = userSession.roleId;

  useEffect(() => {
    const getEventAndOrganizerDetails = async () => {
      try {
        const eventData = await fetchEventsService({ eventId });
        const eventDetails = eventData[0];
        console.log("Event Details:", eventDetails);
        setEventDetails(eventDetails);

        if (eventDetails.hostId) {
          const organizerData = await getUserDetails({
            userId: eventDetails.hostId,
          });
          console.log(
            "Organizer Data:",
            organizerData.responseData[0].firstName
          );
          const organizerName = `${organizerData.responseData[0].firstName} ${organizerData.responseData[0].lastName}`;
          setOrganizerName(organizerName);
        }

        const enrollmentResponse = await enrollParticipantService(
          eventId,
          participantId
        );
        if (enrollmentResponse) {
          if (eventDetails.completed == 1) {
            setTab("Completed");
          } else {
            setTab("Enrolled");
          }
        } else {
          setTab("Upcoming");
        }
      } catch (error) {
        console.error("Error fetching event or organizer details:", error);
      } finally {
        setLoading(false);
      }
    };

    getEventAndOrganizerDetails();
  }, [eventId, participantId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <StudentEventDescription
        eventDetails={eventDetails}
        participantId={participantId}
        organizerName={organizerName}
        eventId={eventId}
        tab={tab}
        role={role}
      />
    </div>
  );
};

export default StudentEventDetails;
