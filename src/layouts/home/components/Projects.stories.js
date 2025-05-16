import React from "react";
import Project from "./Projects";

export default {
  title: "layouts/Home/Components/Project",
  component: Project,
};

const projects = [
  {
    miniHeading: "Mini Heading 1",
    mainHeading: "This is the main heading 1",
    startDate: "2023-05-01T14:00:00Z",
    endDate: "2023-05-01T16:00:00Z",
    Description: "This is a description for the primary card 1",
    handleClick: () => console.log("Student clicked"),
  },
  {
    miniHeading: "Mini Heading 2",
    mainHeading: "This is the main heading 2",
    startDate: "2023-06-01T14:00:00Z",
    endDate: "2023-06-01T16:00:00Z",
    Description: "This is a description for the primary card 2",
    handleClick: () => console.log("Student clicked"),
  },
  {
    miniHeading: "Mini Heading 3",
    mainHeading: "This is the main heading 3",
    startDate: "2023-07-01T14:00:00Z",
    endDate: "2023-07-01T16:00:00Z",
    Description: "This is a description for the primary card 3",
    handleClick: () => console.log("Student clicked"),
  },
  {
    miniHeading: "Mini Heading 4",
    mainHeading: "This is the main heading 4",
    startDate: "2023-08-01T14:00:00Z",
    endDate: "2023-08-01T16:00:00Z",
    Description: "This is a description for the primary card 4",
    handleClick: () => console.log("Student clicked"),
  },
  {
    miniHeading: "Mini Heading 5",
    mainHeading: "This is the main heading 5",
    startDate: "2023-09-01T14:00:00Z",
    endDate: "2023-09-01T16:00:00Z",
    Description: "This is a description for the primary card 5",
    handleClick: () => console.log("Student clicked"),
  },
  {
    miniHeading: "Mini Heading 3",
    mainHeading: "This is the main heading 3",
    startDate: "2023-07-01T14:00:00Z",
    endDate: "2023-07-01T16:00:00Z",
    Description: "This is a description for the primary card 3",
    handleClick: () => console.log("Student clicked"),
  },
  {
    miniHeading: "Mini Heading 4",
    mainHeading: "This is the main heading 4",
    startDate: "2023-08-01T14:00:00Z",
    endDate: "2023-08-01T16:00:00Z",
    Description: "This is a description for the primary card 4",
    handleClick: () => console.log("Student clicked"),
  },
  {
    miniHeading: "Mini Heading 5",
    mainHeading: "This is the main heading 5",
    startDate: "2023-09-01T14:00:00Z",
    endDate: "2023-09-01T16:00:00Z",
    Description: "This is a description for the primary card 5",
    handleClick: () => console.log("Student clicked"),
  },
];

const Template = (args) => <Project {...args} />;

export const ProjectCarousel = Template.bind({});
ProjectCarousel.args = {
  projects,
  heading2: "Equipping Budding Professionals for the future ....",
  heading1: "See What you can learn with Us",
  carouselId: "carousel1"
};
