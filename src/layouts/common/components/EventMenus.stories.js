import React from "react";
import EventMenus from "./EventMenus";

export default {
  title: "Layouts/Common/Components/EventMenus",
  component: EventMenus,
  argTypes: {
    statuses: { control: "object" },
    title: { control: "text" },
  },
};

const explore = {
  content: "Explore Events",
  variant: "secondary",
  onClick: () => {
    console.log("Explore Events clicked");
  },
  width: "half",
};
const createEvent = {
  content: "Create Event",
  variant: "secondary",
  onClick: () => {
    console.log("Create Event clicked");
  },
  width: "half",
};

const statuses = [
  { name: "Upcoming", onClick: () => console.log("Upcoming clicked") },
  { name: "Enrolled", onClick: () => console.log("Enrolled clicked") },
  { name: "Completed", onClick: () => console.log("Completed clicked") },
];

const Template = (args) => <EventMenus {...args} />;

export const StudentEvent = Template.bind({});
StudentEvent.args = {
  explore: explore,
  statuses: statuses,
  title: "Events",
};

export const MentorEvent = Template.bind({});
MentorEvent.args = {
  explore: createEvent,
  statuses: [
    { name: "Upcoming", onClick: () => console.log("Upcoming clicked") },
    { name: "Completed", onClick: () => console.log("Completed clicked") },
  ],
  title: "Events",
};
