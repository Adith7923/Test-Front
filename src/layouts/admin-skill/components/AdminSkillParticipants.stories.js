import React from "react";
import AdminSkillParticipants from "./AdminSkillParticipants";

export default {
  title: "layouts/Admin-skill/Components/AdminSkillParticipants",
  component: AdminSkillParticipants,
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
const pageName = ["Skill Name"];
const Template = (args) => <AdminSkillParticipants {...args} />;

export const AdminSkillParticipantsList = Template.bind({});
AdminSkillParticipantsList.args = {
  data,
  headings,
  pageName,
};
