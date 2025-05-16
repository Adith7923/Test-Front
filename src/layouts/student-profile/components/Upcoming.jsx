import React from "react";
import styles from "../StudentProfile.module.css";
import EventCard from "../../../components/cards/EventCard";
import { useNavigate } from "react-router-dom";

const Upcoming = (props) => {
  const { mode = "dark", events = [] } = props;
  const navigate = useNavigate();

  const handleClick = (event) => {
    console.log(`Clicked on event `);
    navigate(`/student/events`);
  };

  const handleClick2 = (eventId) => {
    console.log(`Clicked on event ${eventId}`);
    navigate(`/student/events/${eventId}`);
  };

  return (
    <div className={`padding padding-bottom`}>
      <div className={`${styles["upcoming-outer"]} ${styles[mode]}`}>
        <div className={`${styles["upcoming-head-container"]}`}>
          <h1 className={`${styles["upcoming-head"]}`}>Upcoming Events</h1>
          <h1 className={`${styles["upcoming-link"]}`}>
            <a onClick={handleClick}>See all</a>
          </h1>
        </div>
        <div className={`${styles["upcoming-event-cards-container"]}`}>
          {events.map((event, index) => (
            <EventCard
              key={index}
              {...event}
              mode={mode}
              handleClick={() => handleClick2(event.eventId)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Upcoming;
