import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import EventMenus from "../../../layouts/common/components/EventMenus";
import DataView from "../../../layouts/common/components/DataView";
import PrimaryCard from "../../../components/cards/PrimaryCard";
import {
  getEnrolledEventIds,
  fetchEventsService,
} from "../../../services/Event";
import LoadingSpinner from "../../../components/loadingspinner/LoadingSpinner";
import NoData from "../../../components/nodata/NoData";
import secureLocalStorage from "react-secure-storage";

const StudentEvent = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("Upcoming");
  const [searchTerm, setSearchTerm] = useState("");

  const userSession = secureLocalStorage.getItem("userSession") || {};
  const participantId = userSession.userId;

  const fetchEnrolledEvents = useCallback(async () => {
    setLoading(true);
    try {
      const eventIds = await getEnrolledEventIds(participantId);
      let fetchedEvents = [];
      if (filter === "Upcoming") {
        fetchedEvents = eventIds.data.responseData.upcoming || [];
      } else if (filter === "Enrolled") {
        fetchedEvents = eventIds.data.responseData.enrolled || [];
      } else if (filter === "Completed") {
        fetchedEvents = eventIds.data.responseData.completed || [];
      }

      setEvents(fetchedEvents);
      applySearchFilter(fetchedEvents);
    } catch (error) {
      console.error("Error fetching enrolled events:", error);
      const eventdata = await fetchEventsService({ completed: 0 });
      let fetchedEvents = [];
      if (filter === "Upcoming") {
        fetchedEvents = eventdata || [];
      } else if (filter === "Enrolled") {
        fetchedEvents = [];
      } else if (filter === "Completed") {
        fetchedEvents = [];
      }

      setEvents(fetchedEvents);
      applySearchFilter(fetchedEvents);
    } finally {
      setLoading(false);
    }
  }, [participantId, filter]);

  const applySearchFilter = (eventsToFilter) => {
    if (searchTerm) {
      const filtered = eventsToFilter.filter((event) =>
        event.eventTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(eventsToFilter);
    }
  };

  useEffect(() => {
    fetchEnrolledEvents();
  }, [filter, fetchEnrolledEvents]);

  useEffect(() => {
    applySearchFilter(events);
  }, [searchTerm, events]);

  const primaryCardData = {
    data: filteredEvents.map((event) => ({
      id: event.eventId,
      miniHeading: event.eventType,
      mainHeading: event.eventTitle,
      startDate: event.startDate,
      endDate: event.endDate,
      Description: event.description,
      cardType: "Events",
      handleClick: () => {
        navigate(`${event.eventId}`, {
          state: { eventId: event.eventId, tab: filter },
        });
      },
    })),
    tableColumns: [
      { key: "miniHeading", displayName: "Type" },
      { key: "mainHeading", displayName: "Title" },
      { key: "startDate", displayName: "Start Date" },
      { key: "endDate", displayName: "End Date" },
      { key: "Description", displayName: "Description" },
    ],
    toggle: false,
    itemsPerPage: 10,
  };

  return (
    <div>
      <EventMenus
        explore={{
          content: "Explore Events",
          variant: "secondary",
          onClick: () => {
            navigate("/explore");
          },
          width: "half",
        }}
        statuses={[
          { name: "Upcoming", onClick: () => setFilter("Upcoming") },
          { name: "Enrolled", onClick: () => setFilter("Enrolled") },
          { name: "Completed", onClick: () => setFilter("Completed") },
        ]}
        title="Events"
        activeFilter={filter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        buttonVisible={false}
      />
      {loading ? (
        <LoadingSpinner />
      ) : filteredEvents.length > 0 ? (
        <DataView
          CardComponent={PrimaryCard}
          data={primaryCardData.data}
          tableColumns={primaryCardData.tableColumns}
          toggle={primaryCardData.toggle}
          itemsPerPage={primaryCardData.itemsPerPage}
        />
      ) : (
        <NoData title="Events" />
      )}
    </div>
  );
};

export default StudentEvent;
