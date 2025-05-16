const AdminEventActionData = {

    heading: "Events List",
    buttonProps: {
      variant: "tertiary",
      content: "+ Add new Event",
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
      { Heading: "Mode", Content: ["Online", "Offline"] },
      { Heading: "Type", Content: ["Workshop", "Hackathon", "Contest"] },
      { Heading: "Status", Content: ["Upcoming", "Ongoing", "Completed"] },
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
  }
};

export default AdminEventActionData;