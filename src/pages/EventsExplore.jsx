import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EventAction from "../layouts/home/components/EventAction";
import CardLayout from "../layouts/home/components/CardLayout";
import { fetchEventsService } from "../services/Event";
import LoadingSpinner from "../components/loadingspinner/LoadingSpinner";

const EventsExplore = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useState({
    eventTitle: "",
    eventType: "",
    eventMode: "",
  });

  useEffect(() => {
    const getEvents = async () => {
      try {
        const filterParams = {
          eventTitle: params.eventTitle || "",
          eventType: params.Type || "",
          eventMode: params.Mode || "",
        };
        const filteredParams = Object.fromEntries(
          Object.entries(filterParams).filter(([key, value]) => value !== "")
        );
        console.log("Fetching events with params:", filteredParams);
        const response = await fetchEventsService(filteredParams);
        setEvents(response || []);
        setLoading(false);
        console.log("Fetched events:", response);
      } catch (error) {
        console.log("Error fetching events:", error);
        setLoading(false);
      }
    };

    getEvents();
  }, [params]);

  const handleClick = (eventId) => {
    console.log(`Clicked on event ${eventId}`);
    navigate(`/explore/event-details/${eventId}`);
  };

  const handleFilterChange = (filters) => {
    setParams((prevParams) => ({
      ...prevParams,
      ...filters,
    }));
  };

  const handleSearchChange = (value) => {
    setParams((prevParams) => ({
      ...prevParams,
      eventTitle: value,
    }));
  };

  return (
    <div>
      <EventAction
        onFilterChange={handleFilterChange}
        onSearchChange={handleSearchChange}
        participantCount={events.length} 
        searchPlaceholder="Search events"
      />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {events.length === 0 ? (
            <p style={{ color: "white", paddingLeft: "80px", paddingTop: "30px" }}>
              No events available
            </p>
          ) : (
            <CardLayout events={events} onEventClick={handleClick} />
          )}
        </>
      )}
    </div>
  );
};

export default EventsExplore;
