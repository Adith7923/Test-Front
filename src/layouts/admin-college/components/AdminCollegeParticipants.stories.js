import React from "react";
import AdminCollegeParticipants from "./AdminCollegeParticipants";

export default {
  title: "layouts/Admin-college/Components/AdminCollegeParticipants",
  component: AdminCollegeParticipants,
  argTypes: {
    onClick: { action: "clicked" },
  },
};

const data = {
  headings: ["StudentID", "StudentName", "email ID"],
  data: [
    { StudentID: "STD001", StudentName: "John Jacob", emailID: "john123@gmail.com" },
    { StudentID: "STD002", StudentName: "Emy Davis", emailID: "davis211@gmail.com" },
    { StudentID: "STD003", StudentName: "Emy John", emailID: "john123@gmail.com" },
    { StudentID: "STD004", StudentName: "Jacob Davis", emailID: "davis211@gmail.com" },
    { StudentID: "STD005", StudentName: "John", emailID: "john123@gmail.com" },
    { StudentID: "STD006", StudentName: "Davis", emailID: "davis211@gmail.com" },
  ],
};

const pageName = "College Name";

const Template = (args) => <AdminCollegeParticipants {...args} />;

export const AdminCollegeParticipantsList = Template.bind({});
AdminCollegeParticipantsList.args = {
  pageName,
  data,
  onClick: () => {},
};
