import React from "react";
import { DataView } from "../../common";
import PrimaryCard from "../../../components/cards/PrimaryCard";
import styles from "../Home.module.css";

const CardLayout = ({ events, onEventClick }) => {
  const cardData = {
    data: events.map((event) => ({
      miniHeading: event.eventType,
      mainHeading: event.eventTitle,
      startDate: event.startDate,
      endDate: event.endDate,
      Description: event.description,
      cardType: "Events",
      handleClick: () => onEventClick(event.eventId),
    })),
    tableColumns: [
      { key: "miniHeading", displayName: "Type" },
      { key: "mainHeading", displayName: "Title" },
      { key: "startDate", displayName: "Start Date" },
      { key: "endDate", displayName: "End Date" },
      { key: "description", displayName: "Description" },
    ],
    toggle: false,
    itemsPerPage: 12,
    cardType : "primarycard"
  };

  return (
    <div className={`${styles["cardlayout-content"]}`}>
      <div className="padding">
        <div className={`${styles["cardlayout-heading"]}`}>Events</div>
      </div>
      <DataView  cardType = "primarycard" CardComponent={PrimaryCard} {...cardData} />
    </div>
  );
};

export default CardLayout;


