import React from "react";
import CardRow from "./Cardrow";
import { action } from "@storybook/addon-actions";

export default {
  title: "layouts/Admin-student/Components/Cardrow",
  component: CardRow,
};

const primaryCardsData = [
  {
    miniHeading: "Capstone 1",
    mainHeading: "Health Management",
    startDate: "Jan 15, 2030",
    endDate: "Mar 15, 2030",
    Description:
      "Unlock the power of data with our comprehensive Introduction to Data",
    cardType: "Course",
    handleClick: action("Card clicked!"),
  },
  {
    miniHeading: "Capstone 2",
    mainHeading: "Business Management",
    startDate: "Feb 20, 2030",
    endDate: "Apr 20, 2030",
    Description: "A comprehensive course on business management strategies",
    cardType: "Course",
    handleClick: action("Card clicked!"),
  },
];

const skillCardsData = [
  {
    miniHeading: "Skill 1",
    mainHeading: "Java",
    Count: 53,
    cardType: "skill",
    handleClick: action("Card clicked!"),
    handleDeleteClick: action("Delete Icon Clicked!"),
    handleEditClick: action("Edit button clicked!"),
    canEdit: false,
  },
  {
    miniHeading: "Skill 2",
    mainHeading: "Python",
    Count: 40,
    cardType: "skill",
    handleClick: action("Card clicked!"),
    handleDeleteClick: action("Delete Icon Clicked!"),
    handleEditClick: action("Edit button clicked!"),
    canEdit: false,
  },
];

const Template = (args) => <CardRow {...args} />;
const event = "event";
const skill = "skill";

export const WithPrimaryCards = Template.bind({});
WithPrimaryCards.args = {
  cardData: primaryCardsData,
  card: event,
};

export const WithSkillCards = Template.bind({});
WithSkillCards.args = {
  cardData: skillCardsData,
  card: skill,
};
