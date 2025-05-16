import React from "react";
import StarPerformer from "./StarPerformer";
import image from "../../../assets/DP.png";

export default {
  title: "layouts/Home/Components/StarPerformer",
  component: StarPerformer,
};

const studentProfiles = [
  {
    studentImage: image,
    studentName: "John Doe",
    studentId: "12345",
    studentCollege: "XYZ University",
    studentMail: "john.doe@example.com",
    studentPhoneNumber: "123-456-7890",
    handleClick: () => console.log("Student clicked"),
  },
  {
    studentImage: image,
    studentName: "Jane Doe",
    studentId: "54321",
    studentCollege: "ABC University",
    studentMail: "jane.doe@example.com",
    studentPhoneNumber: "987-654-3210",
    handleClick: () => console.log("Student clicked"),
  },
  {
    studentImage: image,
    studentName: "John Doe",
    studentId: "12345",
    studentCollege: "XYZ University",
    studentMail: "john.doe@example.com",
    studentPhoneNumber: "123-456-7890",
    handleClick: () => console.log("Student clicked"),
  },
  {
    studentImage: image,
    studentName: "Jane Doe",
    studentId: "54321",
    studentCollege: "ABC University",
    studentMail: "jane.doe@example.com",
    studentPhoneNumber: "987-654-3210",
    handleClick: () => console.log("Student clicked"),
  },
  {
    studentImage: image,
    studentName: "John Doe",
    studentId: "12345",
    studentCollege: "XYZ University",
    studentMail: "john.doe@example.com",
    studentPhoneNumber: "123-456-7890",
    handleClick: () => console.log("Student clicked"),
  },
  {
    studentImage: image,
    studentName: "Jane Doe",
    studentId: "54321",
    studentCollege: "ABC University",
    studentMail: "jane.doe@example.com",
    studentPhoneNumber: "987-654-3210",
    handleClick: () => console.log("Student clicked"),
  },
];

const Template = (args) => <StarPerformer {...args} />;

export const StudentCarousel = Template.bind({});
StudentCarousel.args = { studentProfiles, heading: "Star Performers" };
