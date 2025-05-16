import React from "react";
import { GoTrash } from "react-icons/go";
import { MdEdit } from "react-icons/md";
import BatchSearch from "./BatchSearch";

export default {
  title: "Layouts/Common/Components/Home Action",
  component: BatchSearch,
};

const batchDetails = {
  navbuttonProps: {
    pageName: "Batch Name",
  },
  showTextButton: true,
  showAdd: true,
  showReset: false,
  textbuttonProps: {
    icon: <MdEdit />,
    text: "Edit Batch Name",
    onClick: (e) => {
      console.log("Edit clicked");
    },
  },
  textbuttonProps2: {
    icon: <GoTrash />,
    text: "Delete",
    onClick: (e) => {
      console.log("Delete clicked");
    },
  },
  searchbarProps: {
    variant: "custom",
    placeholder: "Student Name",
  },
  showFiltersAndReset: false,
  addbuttonProps: {
    variant: "tertiary",
    content: "+ Add new Student",
    width: "full",
  },
};

const homeEvents = {
  navbuttonProps: {
    pageName: "Events",
  },
  showTextButton: false,
  showAdd: false,
  showReset: true,
  searchbarProps: {
    variant: "custom",
    placeholder: "Event",
  },
  showFiltersAndReset: true,
  filterProps: [
    { Heading: "Type", Content: ["Workshop", "Hackathon", "Contest"] },
    { Heading: "Mode", Content: ["Online", "Offline"] },
  ],
  resetProps: {
    variant: "secondary",
    content: "Reset",
    width: "full",
  },
};

export const Batchsearch = {
  args: {
    ...batchDetails,
  },
};

export const ExploreEvents = {
  args: {
    ...homeEvents,
  },
};
