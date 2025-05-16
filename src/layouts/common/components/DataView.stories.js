import React from "react";
import { action } from "@storybook/addon-actions";
import DataView from "../components/DataView";
import PrimaryCard from "../../../components/cards/PrimaryCard";
import ProfileCard from "../../../components/cards/ProfileCard";
import SkillBatchCard from "../../../components/cards/SkillBatchCard";
import SkillCard from "../../../components/cards/SkillCard";
import SkillUser from "../../../components/cards/SkillUser";
import StudentCard from "../../../components/cards/StudentCard";
import TestimonialCard from "../../../components/cards/TestimonialCard";
import image from "../../../assets/DP.png";
import CollegeCard from "../../../components/cards/CollegeCard";

export default {
  title: "Layouts/Common/Components/DataView",
  component: DataView,
  argTypes: {
    data: {
      control: { type: "object" },
      description: "Array of data objects to be displayed",
    },
    tableColumns: {
      control: { type: "object" },
      description:
        "Values in data that shows up in table view (Array of key and displayName)",
    },
    toggle: {
      control: { type: "boolean" },
      description: "Show or hide the view toggle buttons",
    },
    itemsPerPage: {
      control: { type: "number" },
      description: "Number of items per page for pagination",
    },
  },
};

const primaryCardData = {
  data: [
    {
      miniHeading: "Capstone",
      mainHeading: "Health Management",
      startDate: "Jan 15, 2030",
      endDate: "Mar 15, 2030",
      description:
        "Unlock the power of data with our comprehensive Introduction to Data",
      cardType: "Course",
      handleClick: (e) => {
        console.log("clicked");
      },
    },
    {
      miniHeading: "Capstone",
      mainHeading: "Health Management",
      startDate: "Jan 15, 2030",
      endDate: "Mar 15, 2030",
      description:
        "Unlock the power of data with our comprehensive Introduction to Data",
      cardType: "Course",
      handleClick: (e) => {
        console.log("clicked");
      },
    },
    {
      miniHeading: "Capstone",
      mainHeading: "Health Management",
      startDate: "Jan 15, 2030",
      endDate: "Mar 15, 2030",
      description:
        "Unlock the power of data with our comprehensive Introduction to Data",
      cardType: "Course",
      handleClick: (e) => {
        console.log("clicked");
      },
    },
    {
      miniHeading: "Capstone",
      mainHeading: "Health Management",
      startDate: "Jan 15, 2030",
      endDate: "Mar 15, 2030",
      description:
        "Unlock the power of data with our comprehensive Introduction to Data",
      cardType: "Course",
      handleClick: (e) => {
        console.log("clicked");
      },
    },
    {
      miniHeading: "Capstone",
      mainHeading: "Health Management",
      startDate: "Jan 15, 2030",
      endDate: "Mar 15, 2030",
      description:
        "Unlock the power of data with our comprehensive Introduction to Data",
      cardType: "Course",
      handleClick: (e) => {
        console.log("clicked");
      },
    },
    {
      miniHeading: "Capstone",
      mainHeading: "Health Management",
      startDate: "Jan 15, 2030",
      endDate: "Mar 15, 2030",
      description:
        "Unlock the power of data with our comprehensive Introduction to Data",
      cardType: "Course",
      handleClick: (e) => {
        console.log("clicked");
      },
    },
    {
      miniHeading: "Capstone",
      mainHeading: "Health Management",
      startDate: "Jan 15, 2030",
      endDate: "Mar 15, 2030",
      description:
        "Unlock the power of data with our comprehensive Introduction to Data",
      cardType: "Course",
      handleClick: (e) => {
        console.log("clicked");
      },
    },
    {
      miniHeading: "Capstone",
      mainHeading: "Health Management",
      startDate: "Jan 15, 2030",
      endDate: "Mar 15, 2030",
      description:
        "Unlock the power of data with our comprehensive Introduction to Data",
      cardType: "Course",
      handleClick: (e) => {
        console.log("clicked");
      },
    },
  ],
  tableColumns: [
    { key: "miniHeading", displayName: "Type" },
    { key: "mainHeading", displayName: "Title" },
    { key: "startDate", displayName: "Start Date" },
    { key: "endDate", displayName: "End Date" },
    { key: "description", displayName: "Description" },
  ],
  toggle: true,
  itemsPerPage: 5,
};

const studentCardData = {
  data: [
    {
      studentImage: image,
      studentName: "John Doe",
      studentId: "123",
      studentCollege: "IIT Bombay",
      studentMail: "johndoe@gmail.com",
      studentPhoneNumber: 9865321234,
      cardType: "student",
    },
    {
      studentImage: image,
      studentName: "Jane Doe",
      studentId: "124",
      studentCollege: "IIT Bombay",
      studentMail: "janedoe@gmail.com",
      studentPhoneNumber: 9865321235,
      cardType: "student",
    },
  ],
  tableColumns: [
    { key: "studentId", displayName: "ID" },
    { key: "studentName", displayName: "Name" },
    { key: "studentCollege", displayName: "College" },
    { key: "studentPhoneNumber", displayName: "Phone Number" },
    { key: "studentMail", displayName: "Email ID" },
    { key: "studentImage", displayName: "Profile Photo" },
  ],
  toggle: true,
  itemsPerPage: 11,
};

const profileCardData = {
  data: [
    {
      studentImage: image,
      studentName: "John Doe",
      studentId: "STDID3456",
      studentCollege: "St Christ College",
      studentMail: "johndoe@email.com",
      studentPhoneNumber: "(555) 555-5555",
      canDelete: false,
      onClick: action("Card clicked"),
    },
    {
      studentImage: image,
      studentName: "John Doe",
      studentId: "STDID3456",
      studentCollege: "St Christ College",
      studentMail: "johndoe@email.com",
      studentPhoneNumber: "(555) 555-5555",
      canDelete: false,
      onClick: action("Card clicked"),
    },
  ],
  tableColumns: [
    { key: "studentId", displayName: "Student ID" },
    { key: "studentName", displayName: "Name" },
    { key: "studentCollege", displayName: "College" },
    { key: "studentMail", displayName: "Email ID" },
    { key: "studentPhoneNumber", displayName: "Phone Number" },
  ],
  toggle: true,
  itemsPerPage: 11,
};

const skillCardData = {
  data: [
    {
      miniHeading: "SKILL4785",
      mainHeading: "Java",
      Count: 53,
      cardType: "skill",
      handleClick: action("Card clicked!"),
      handleDeleteClick: action("Delete Icon Clicked!"),
      handleEditClick: action("Edit button clicked!"),
      canEdit: true,
    },
    {
      miniHeading: "SKILL4785",
      mainHeading: "Java",
      Count: 53,
      cardType: "skill",
      handleClick: action("Card clicked!"),
      handleDeleteClick: action("Delete Icon Clicked!"),
      handleEditClick: action("Edit button clicked!"),
      canEdit: true,
    },
  ],
  tableColumns: [
    { key: "miniHeading", displayName: "Skill ID" },
    { key: "mainHeading", displayName: "Skill Name" },
    { key: "Count", displayName: "Count" },
  ],
  toggle: true,
  itemsPerPage: 11,
};

const batchCardData = {
  data: [
    {
      miniHeading: "B301",
      mainHeading: "Batch 1",
      Count: 28,
      cardType: "batch",
      handleClick: action("Card clicked!"),
    },
    {
      miniHeading: "B301",
      mainHeading: "Batch 1",
      Count: 28,
      cardType: "Batch",
      handleClick: action("Card clicked!"),
    },
  ],
  tableColumns: [
    { key: "miniHeading", displayName: "Batch ID" },
    { key: "mainHeading", displayName: "Batch Name" },
    { key: "Count", displayName: "Count" },
  ],
  toggle: true,
  itemsPerPage: 11,
};

const skillsCardData = {
  data: [
    {
      title: "Java",
      subtitle: "Level 1",
      showCloseIcon: true,
      onClose: () => {
        console.log("Close button clicked");
      },
    },
    {
      title: "Java",
      subtitle: "Level 1",
      showCloseIcon: true,
      onClose: () => {
        console.log("Close button clicked");
      },
    },
  ],
  tableColumns: [
    { key: "title", displayName: "Skill Name" },
    { key: "subtitle", displayName: "Skill Level" },
  ],
  toggle: true,
  itemsPerPage: 11,
};

const testimonialCardData = {
  data: [
    {
      name: "John Doe",
      info: "Senior Software Engineer",
      place: "Sans-Francisco, USA",
      description:
        "As a marketing professional with no prior background in data science, this course provided me with a solid foundation to make a career transition. The hands-on projects and expert guidance from Dr. Rodriguez made complex concepts accessible. I now feel confident applying data science techniques to enhance my decision-making processes in marketing.",
      profilePicture: image,
    },
    {
      name: "John Doe",
      info: "Senior Software Engineer",
      place: "Sans-Francisco, USA",
      description:
        "As a marketing professional with no prior background in data science, this course provided me with a solid foundation to make a career transition. The hands-on projects and expert guidance from Dr. Rodriguez made complex concepts accessible. I now feel confident applying data science techniques to enhance my decision-making processes in marketing.",
      profilePicture: image,
    },
  ],
  tableColumns: [
    { key: "name", displayName: "Name" },
    { key: "info", displayName: "Role" },
    { key: "place", displayName: "Location" },
    { key: "description", displayName: "Testimony" },
    { key: "profilePicture", displayName: "Profile Photo" },
  ],
  toggle: true,
  itemsPerPage: 11,
};

const skillUserData = {
  data: [
    {
      miniHeading: "Student",
      mainHeading: "John Doe",
      skills: ["Java", "HTML"],
      handleClick: (e) => {
        console.log("clicked");
      },
      profilepic: image,
    },
    {
      miniHeading: "Student",
      mainHeading: "John Doe",
      skills: ["Java", "HTML"],
      handleClick: (e) => {
        console.log("clicked");
      },
      profilepic: image,
    },
  ],
  tableColumns: [
    { key: "mainHeading", displayName: "Name" },
    { key: "miniHeading", displayName: "Role" },
    { key: "skills", displayName: "Skills" },
    { key: "profilepic", displayName: "Profile Picture" },
  ],
  toggle: true,
  itemsPerPage: 11,
};

const collegeCardData = {
  data: [
    {
      miniHeading: '101',
      mainHeading: 'College of Science Thrissur',
      Count: 150,
      cardType: 'college',
      handleClick: console.log('Card clicked'),
      showCount: true,
      viewAnimation: false,
      showPlace:true,
      placeHeading:'Irinjalakuda, Thrissur',
    },
    {
      miniHeading: '101',
      mainHeading: 'College of Science Thrissur',
      Count: 150,
      cardType: 'college',
      handleClick: console.log('Card clicked'),
      showCount: true,
      viewAnimation: false,
      showPlace:true,
      placeHeading:'Irinjalakuda, Thrissur',
    },
    {
      miniHeading: '101',
      mainHeading: 'College of Science Thrissur',
      Count: 150,
      cardType: 'college',
      handleClick: console.log('Card clicked'),
      showCount: true,
      viewAnimation: false,
      showPlace:true,
      placeHeading:'Irinjalakuda, Thrissur',
    },
    {
      miniHeading: '101',
      mainHeading: 'College of Science Thrissur',
      Count: 150,
      cardType: 'college',
      handleClick: console.log('Card clicked'),
      showCount: true,
      viewAnimation: false,
      showPlace:true,
      placeHeading:'Irinjalakuda, Thrissur',
    },
    {
      miniHeading: '101',
      mainHeading: 'College of Science Thrissur',
      Count: 150,
      cardType: 'college',
      handleClick: console.log('Card clicked'),
      showCount: true,
      viewAnimation: false,
      showPlace:true,
      placeHeading:'Irinjalakuda, Thrissur',
    },
    {
      miniHeading: '101',
      mainHeading: 'College of Science Thrissur',
      Count: 150,
      cardType: 'college',
      handleClick: console.log('Card clicked'),
      showCount: true,
      viewAnimation: false,
      showPlace:true,
      placeHeading:'Irinjalakuda, Thrissur',
    },
    {
      miniHeading: '101',
      mainHeading: 'College of Science Thrissur',
      Count: 150,
      cardType: 'college',
      handleClick: console.log('Card clicked'),
      showCount: true,
      viewAnimation: false,
      showPlace:true,
      placeHeading:'Irinjalakuda, Thrissur',
    },
    {
      miniHeading: '101',
      mainHeading: 'College of Science Thrissur',
      Count: 150,
      cardType: 'college',
      handleClick: console.log('Card clicked'),
      showCount: true,
      viewAnimation: false,
      showPlace:true,
      placeHeading:'Irinjalakuda, Thrissur',
    },
    {
      miniHeading: '101',
      mainHeading: 'College of Science Thrissur',
      Count: 150,
      cardType: 'college',
      handleClick: console.log('Card clicked'),
      showCount: true,
      viewAnimation: false,
      showPlace:true,
      placeHeading:'Irinjalakuda, Thrissur',
    },  {
      miniHeading: '101',
      mainHeading: 'College of Science Thrissur',
      Count: 150,
      cardType: 'college',
      handleClick: console.log('Card clicked'),
      showCount: true,
      viewAnimation: false,
      showPlace:true,
      placeHeading:'Irinjalakuda, Thrissur',
    },  {
      miniHeading: '101',
      mainHeading: 'College of Science Thrissur',
      Count: 150,
      cardType: 'college',
      handleClick: console.log('Card clicked'),
      showCount: true,
      viewAnimation: false,
      showPlace:true,
      placeHeading:'Irinjalakuda, Thrissur',
    },  {
      miniHeading: '101',
      mainHeading: 'College of Science Thrissur',
      Count: 150,
      cardType: 'college',
      handleClick: console.log('Card clicked'),
      showCount: true,
      viewAnimation: false,
      showPlace:true,
      placeHeading:'Irinjalakuda, Thrissur',
    },  {
      miniHeading: '101',
      mainHeading: 'College of Science Thrissur',
      Count: 150,
      cardType: 'college',
      handleClick: console.log('Card clicked'),
      showCount: true,
      viewAnimation: false,
      showPlace:true,
      placeHeading:'Irinjalakuda, Thrissur',
    },  {
      miniHeading: '101',
      mainHeading: 'College of Science Thrissur',
      Count: 150,
      cardType: 'college',
      handleClick: console.log('Card clicked'),
      showCount: true,
      viewAnimation: false,
      showPlace:true,
      placeHeading:'Irinjalakuda, Thrissur',
    },  {
      miniHeading: '101',
      mainHeading: 'College of Science Thrissur',
      Count: 150,
      cardType: 'college',
      handleClick: console.log('Card clicked'),
      showCount: true,
      viewAnimation: false,
      showPlace:true,
      placeHeading:'Irinjalakuda, Thrissur',
    },
  ],
  tableColumns: [
    { key: "miniHeading", displayName: "College ID" },
    { key: "mainHeading", displayName: "College Name" },
    { key: "Count", displayName: "Count" },
    { key: "placeHeading", displayName: "Place" },

  ],
  toggle: true,
  itemsPerPage: 12,
};

export const CollegeCardView = (args) => (
  <DataView CardComponent={CollegeCard} {...args} />
);
CollegeCardView.args = collegeCardData;


export const PrimaryCardView = (args) => (
  <DataView CardComponent={PrimaryCard} {...args} />
);
PrimaryCardView.args = primaryCardData;

export const ProfileCardView = (args) => (
  <DataView CardComponent={ProfileCard} {...args} />
);
ProfileCardView.args = profileCardData;

export const SkillCardView = (args) => (
  <DataView CardComponent={SkillBatchCard} {...args} />
);
SkillCardView.args = skillCardData;

export const BatchCardView = (args) => (
  <DataView CardComponent={SkillBatchCard} {...args} />
);
BatchCardView.args = batchCardData;

export const SkillsCardView = (args) => (
  <DataView CardComponent={SkillCard} {...args} />
);
SkillsCardView.args = skillsCardData;

export const SkillUserView = (args) => (
  <DataView CardComponent={SkillUser} {...args} />
);
SkillUserView.args = skillUserData;

export const StudentCardView = (args) => (
  <DataView CardComponent={StudentCard} {...args} />
);
StudentCardView.args = studentCardData;

export const TestimonialCardView = (args) => (
  <DataView CardComponent={TestimonialCard} {...args} />
);
TestimonialCardView.args = testimonialCardData;
