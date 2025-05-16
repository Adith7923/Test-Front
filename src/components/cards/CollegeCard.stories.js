import React from "react";
import CollegeCard from "./CollegeCard";
import { action } from "@storybook/addon-actions";

export default {
  title: "components/cards/CollegeCard",
  component: CollegeCard,
};

const Template = (args) => <CollegeCard {...args} />;

export const Collegecard = Template.bind({});
Collegecard.args = {
    miniHeading: '101',
    mainHeading: 'College of Science Thrissur',
    Count: 150,
    cardType: 'college',
    handleClick: console.log('Card clicked'),
    showCount: true,
    viewAnimation: false,
    showPlace:true,
    placeHeading:'ssqwswswsqssqswsqws',
  };
