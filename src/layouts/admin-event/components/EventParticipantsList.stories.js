import React from "react";
import EventParticipantsList from "./EventParticipantsList";

export default {
  title: "layouts/Admin-event/Components/EventParticipantsList",
  component: EventParticipantsList,
  argTypes: {
    onClick: { action: "clicked" },
  },
};

const data = [
  ["STD001", "John Jacob", "john123@gmail.com"],
  ["STD002", "Emy Davis", "davis211@gmail.com"],
  ["STD003", "Emy John", "john123@gmail.com"],
  ["STD004", "Jacob Davis", "davis211@gmail.com"],
  ["STD005", "John", "john123@gmail.com"],
  ["STD006", "Davis", "davis211@gmail.com"],
];
const headings = ["StudentID", "StudentName", "email ID"];

const pageName = ["Home", "Exploring Future", "Participants"];

const Template = (args) => <EventParticipantsList {...args} />;

export const EventParticipants = Template.bind({});
EventParticipants.args = {
  data,
  headings,
  pageName,
};
