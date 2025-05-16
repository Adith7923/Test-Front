import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminEventDescription from "../../../layouts/admin-event/components/AdminEventDescription";
import {
  addEventService,
  fetchEventsService,
  deleteEventService,
} from "../../../services/Event";
import { getUserDetails } from "../../../services/User";
import { toast } from "react-toastify";
import { eventNameState } from "../admin-student/Atom";
import { eventCompleted } from "../admin-student/Atom";
import { useRecoilState } from "recoil";

const AdminEventDetails = () => {
  const { eventId } = useParams();
  const [eventData, setEventData] = useState(null);
  const [organizerData, setOrganizerData] = useState(null);
  const [eventComplete, setEventComplete] = useRecoilState(eventCompleted);
  const [eventName, setEventName] = useRecoilState(eventNameState);

  const fetchEventData = async () => {
    try {
      const eventDataResponse = await fetchEventsService({ eventId });
      const event = eventDataResponse[0];
      setEventData(event);
      setEventName(event.eventTitle);
      setEventComplete(event.completed);
      if (event?.hostId) {
        await fetchOrganizerData(event.hostId);
      }
    } catch (error) {
      console.error("Error fetching event data:", error);
    }
  };

  const fetchOrganizerData = async (userId) => {
    try {
      const organizerDataResponse = await getUserDetails({ userId });
      if (organizerDataResponse?.responseData?.length > 0) {
        setOrganizerData(organizerDataResponse.responseData[0]);
        console.log("Organizer Data:", organizerDataResponse.responseData[0]);
      } else {
        console.log("No organizer data found");
      }
    } catch (error) {
      console.error("Error fetching organizer data:", error);
    }
  };

  useEffect(() => {
    fetchEventData();
  }, [eventId]);

  const formSubmit = async (data) => {
    data.hostId = eventData.hostId;
    try {
      const response = await addEventService(data);
      console.log("Response from API:", response);
      fetchEventData();
      toast.success("Event updated successfully!");
    } catch (error) {
      console.error("Error updating event:", error);
      toast.error("Error updating event:", error);
    }
  };

  const handleDeleteEvent = async () => {
    try {
      await deleteEventService(eventId);
      console.log("Event deleted successfully");
      toast.success("Event deleted successfully!");
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.info("Completed events cannot be deleted");
    }
  };

  return (
    <div className="padding">
      <AdminEventDescription
        organizer={
          organizerData
            ? `${organizerData.firstName} ${organizerData.lastName}`
            : ""
        }
        eventId={eventId}
        onDelete={handleDeleteEvent}
        fetchedFormData={eventData}
        formSubmit={formSubmit}
      />
    </div>
  );
};

export default AdminEventDetails;
