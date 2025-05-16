import React from "react";
import Skillsearch from "./Skillsearch";
import profilePic from "../../../assets/SkillUser.png";

export default {
  title: "layouts/Mentor-skill/Components/Skillsearch",
  component: Skillsearch,
};

const skillcard = [
  {
    miniHeading: "Student",
    mainHeading: "John Doe",
    skills: ["Java", "HTML"],
    handleClick: (e) => {
      console.log("clicked");
    },
    profilepic: profilePic,
  },
];

const Template = (args) => <Skillsearch {...args} />;

export const SkillSearch = Template.bind({});
SkillSearch.args = {
  heading: "Skills",
  subheading: "add skills to students",
  searchBarPlaceholder: "Student Name/Student ID",
  skillcard: skillcard,
  onSearch: (query) => console.log(query),
};
