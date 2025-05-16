import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EventMenus from "../../../layouts/common/components/EventMenus";
import DataView from "../../../layouts/common/components/DataView";
import PrimaryCard from "../../../components/cards/PrimaryCard";
import { fetchEventsService } from "../../../services/Event";
import LoadingSpinner from "../../../components/loadingspinner/LoadingSpinner";
import NoData from "../../../components/nodata/NoData";
import secureLocalStorage from "react-secure-storage";

const MentorEvents = () => {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("Upcoming");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const userSession = secureLocalStorage.getItem("userSession") || {};
  const userId = userSession.userId;

  const fetchEventsByStatus = async (status) => {
    setLoading(true);
    setError(null);
    try {
      const eventList = await fetchEventsService({
        host: userId,
        completed: status === "completed" ? 1 : 0,
      });
      console.log(`Fetched ${status} events:`, eventList);
      const reversedEventList = eventList.reverse();
      setEvents(reversedEventList);
      setFilteredEvents(reversedEventList);
    } catch (error) {
      console.error(`Error fetching ${status} events:`, error);
      setError(error.message || "Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventsByStatus(selectedStatus);
  }, [selectedStatus]);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(
        events.filter((event) =>
          event.eventTitle.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, events]);

  const createEvent = {
    content: "Create Event",
    variant: "secondary",
    width: "half",
    onClick: () => {
      navigate("/mentor/events/event-creation");
    },
  };

  const handleStatusClick = (status) => {
    setSelectedStatus(status);
  };

  const handleClick = (event) => {
    console.log(`Clicked on event ${event.eventId}`);
    navigate(`/mentor/events/event-details/${event.eventId}`);
  };

  const primaryCardData = {
    data: filteredEvents.map((event) => ({
      miniHeading: event.eventType,
      mainHeading: event.eventTitle,
      startDate: event.startDate,
      endDate: event.endDate,
      Description: event.description,
      cardType: "Events",
      handleClick: () => handleClick(event),
    })),
    tableColumns: [
      { key: "miniHeading", displayName: "Type" },
      { key: "mainHeading", displayName: "Title" },
      { key: "startDate", displayName: "Start Date" },
      { key: "endDate", displayName: "End Date" },
      { key: "description", displayName: "Description" },
    ],
    toggle: false,
    itemsPerPage: 8,
  };

  return (
    <div>
      <EventMenus
        explore={createEvent}
        statuses={[
          { name: "Upcoming", onClick: () => handleStatusClick("upcoming") },
          { name: "Completed", onClick: () => handleStatusClick("completed") },
        ]}
        title="Events"
        activeFilter={selectedStatus}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      {loading && <LoadingSpinner />}
      {error && <p>Error: {error}</p>}
      {!loading &&
        !error &&
        (filteredEvents.length > 0 ? (
          <DataView CardComponent={PrimaryCard} {...primaryCardData} />
        ) : (
          <NoData title="Events" />
        ))}
    </div>
  );
};

export default MentorEvents;
