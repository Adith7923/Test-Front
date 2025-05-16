import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Greeting, DataView } from "../../../layouts/common";
import AdminEventAction from "../../../layouts/admin-event/components/AdminEventAction";
import PrimaryCard from "../../../components/cards/PrimaryCard";
import { addEventService } from "../../../services/Event";
import { fetchEventsService } from "../../../services/Event";
import { toast } from "react-toastify";
import EventMenus from "../../../layouts/common/components/EventMenus";
import LoadingSpinner from "../../../components/loadingspinner/LoadingSpinner";
import NoData from "../../../components/nodata/NoData";
import secureLocalStorage from "react-secure-storage";

const AdminEvent = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("Upcoming");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [params, setParams] = useState({
    eventTitle: "",
    eventType: "",
    eventMode: "",
  });

  const userSession = secureLocalStorage.getItem("userSession") || {};
  const loggedUserFirstName = userSession.firstName;

  const greeting = {
    welcome: "Welcome back",
    name: loggedUserFirstName || "",
    info: "Here is the information about",
    profile: "Events",
    showButtons: false,
  };

  const getEventsByStatus = async (status) => {
    setLoading(true);
    setError(null);
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
      var sortedEvents = null;
      if (response) {
        sortedEvents = [...response].sort((a, b) => {
          const nameA = a.eventTitle.toLowerCase();
          const nameB = b.eventTitle.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
      }
      const now = new Date();
      const eventsByStatus = sortedEvents?.filter((event) => {
        const eventEndDate = new Date(event.endDate);
        return status === "Upcoming" ? eventEndDate >= now : eventEndDate < now;
      });
      setEvents(eventsByStatus || []);
      setFilteredEvents(eventsByStatus || []);
      console.log("Fetched events:", response);
    } catch (error) {
      console.log("Error fetching events:", error);
      setError(error.message || "Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEventsByStatus(selectedStatus);
  }, [params, selectedStatus]);

  const handleClick = (event) => {
    console.log(`Clicked on event ${event.eventId}`);
    navigate(`/admin/events/event-details/${event.eventId}`);
  };

  const primaryCardData = {
    data: (searchTerm.length > 0 ? filteredEvents : events).map((event) => ({
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
      { key: "Description", displayName: "Description" },
    ],
    toggle: true,
    itemsPerPage: 12,
    cardType: "primarycard",
  };

  console.log("primaryCardData:", primaryCardData);

  const formSubmit = async (data) => {
    try {
      const response = await addEventService(data);
      const updatedEvents = [response, ...events];
      setEvents(updatedEvents);
      setFilteredEvents(updatedEvents);
      toast.success("Event created successfully!");
    } catch (error) {
      toast.error("Error creating event!");
    }
  };
  const handleFilterChange = (filters) => {
    setParams((prevParams) => ({
      ...prevParams,
      ...filters,
    }));
  };

  const handleSearchChange = (event) => {
    const searchValue = event.toLowerCase();
    setSearchTerm(searchValue);
    const filteredData = events.filter((event) =>
      event.eventTitle.toLowerCase().includes(searchValue)
    );
    setFilteredEvents(filteredData);
  };

  const AdminEventActionData = {
    heading: "Events List",
    buttonProps: {
      variant: "tertiary",
      content: "+ Add New Event",
      width: "full",
    },
    showDelete: false,
    searchWidth: "small",
    searchbarProps: {
      variant: "custom",
      placeholder: "Events",
    },
    showFiltersAndReset: true,
    filterProps: [
      {
        Heading: "Mode",
        Content: ["Online", "Offline"],
        Value: ["Online", "Offline"],
      },
      {
        Heading: "Type",
        Content: [
          "Workshop",
          "Hackathon",
          "Contest",
          "Conference",
          "Webinar",
          "Session",
        ],
        Value: [
          "Workshop",
          "Hackathon",
          "Contest",
          "Conference",
          "Webinar",
          "Session",
        ],
      },
    ],
    resetProps: {
      variant: "reset",
      content: "Reset",
      width: "full",
    },
    addeventprops: {
      organizeroptions: [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
        { value: "option4", label: "Option 4" },
      ],
    },
    searchPlaceholder: "Search Events",
  };

  const handleStatusClick = (status) => {
    setSelectedStatus(status);
  };

  return (
    <div>
      {/* <Greeting {...greeting} /> */}
      <AdminEventAction
        count={events.length}
        formSubmit={formSubmit}
        AdminEventActionData={AdminEventActionData}
        onFilterChange={handleFilterChange}
        onSearchChange={handleSearchChange}
      />
      <div style={{ marginTop: "-30px" }}>
        <EventMenus
          statuses={[
            { name: "Upcoming", onClick: () => handleStatusClick("Upcoming") },
            {
              name: "Completed",
              onClick: () => handleStatusClick("Completed"),
            },
          ]}
          showButton={false}
          showSearchBar={false}
          activeFilter={selectedStatus}
        />
      </div>
      {loading && <LoadingSpinner />}
      {error && <p>Error: {error}</p>}
      {!loading &&
        !error &&
        (filteredEvents.length > 0 ? (
          <DataView
            cardType="primarycard"
            CardComponent={PrimaryCard}
            {...primaryCardData}
          />
        ) : (
          <NoData title="Events" />
        ))}
    </div>
  );
};

export default AdminEvent;
