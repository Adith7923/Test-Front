import React from "react";
import BatchSearch from "../../common/components/BatchSearch";

const EventAction = ({ onSearchChange, onFilterChange, participantCount }) => {
  const EventActionData = {
    navbuttonProps: {
      pageName: "Events",
    },
    showTextButton: false,
    showAdd: false,
    showReset: true,
    searchbarProps: {
      variant: "custom",
      placeholder: "Search Events",
    },
    showFiltersAndReset: true,
    filterProps: [
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
      {
        Heading: "Mode",
        Content: ["Online", "Offline"],
        Value: ["Online", "Offline"],
      },
    ],
    resetProps: {
      variant: "reset",
      content: "Reset",
      width: "full",
    },
  };
  return (
    <div>
      <BatchSearch
        explorepage="true"
        {...EventActionData}
        participantCount={participantCount}
        onSearchChange={onSearchChange}
        onFilterChange={onFilterChange}
      />
    </div>
  );
};

export default EventAction;
