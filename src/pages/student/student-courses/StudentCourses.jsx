import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { DataView, EventMenus } from '../../../layouts/common';
import LoadingSpinner from '../../../components/loadingspinner/LoadingSpinner';
import NoData from '../../../components/nodata/NoData';
import PrimaryCard from "../../../components/cards/PrimaryCard";

const mockEvents = [
  {
    eventId: 1,
    eventType: "Workshop",
    eventTitle: "React Basics",
    description: "A workshop on the basics of React.A workshop on the basics of React.A workshop on the basics of React.",
    rating:4 ,
  },
  {
    eventId: 2,
    eventType: "Webinar",
    eventTitle: "Advanced JavaScript",
    description: "An advanced webinar on JavaScript.",
    rating:4.5 

  },
];

const StudentCourses = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState(mockEvents);
  const [filter, setFilter] = useState("Live");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500); 
  }, []);

  const primaryCardData = {
    data: events
      .filter(event => {
        // Basic search filter by title and description
        const searchMatch = event.eventTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            event.description.toLowerCase().includes(searchTerm.toLowerCase());

        // // Filtering based on filter type
        // const filterMatch = (filter === "Live" && new Date(event.startDate) > new Date()) ||
        //                     (filter === "Enrolled") ||
        //                     (filter === "Completed" && new Date(event.endDate) < new Date());

        return searchMatch
        //  && filterMatch;
      })
      .map((event) => ({
        id: event.eventId,
        miniHeading: event.eventType,
        mainHeading: event.eventTitle,
        startDate: event.startDate,
        endDate: event.endDate,
        rating : event.rating,
        Description: event.description,
        cardType: "Course",
        handleClick: () => {
          console.log("clicked");
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
          content: "Explore Courses",
          variant: "secondary",
          onClick: () => {
            console.log("Explore Courses clicked");
            navigate("/explore");
          },
          width: "half",
        }}
        statuses={[
          { name: "Live", onClick: () => setFilter("Live") },
          { name: "Enrolled", onClick: () => setFilter("Enrolled") },
          { name: "Completed", onClick: () => setFilter("Completed") },
        ]}
        title="Courses"
        activeFilter={filter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        buttonVisible={false}
        placeholder="Search Courses"
      />
      {loading ? (
        <LoadingSpinner />
      ) : primaryCardData.data.length > 0 ? (
        <DataView
          CardComponent={PrimaryCard}
          data={primaryCardData.data}
          tableColumns={primaryCardData.tableColumns}
          toggle={primaryCardData.toggle}
          itemsPerPage={primaryCardData.itemsPerPage}
        />
      ) : (
        <NoData title="Courses" />
      )}
    </div>
  );
}

export default StudentCourses;
