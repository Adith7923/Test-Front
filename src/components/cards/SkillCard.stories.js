import React from "react";
import Card from "./SkillCard";

export default {
  title: "Components/cards/Skill Card",
  component: Card,
  argTypes: {
    title: { control: "text" },
    subtitle: { control: "text" },
    showCloseIcon: { control: "boolean" },
    onClose: { action: "Close button clicked" },
  },
};

const Template = (args) => <Card {...args} />;

export const Skillcard = Template.bind({});

Skillcard.args = {
  title: "Java",
  subtitle: "Level 1",
  showCloseIcon: true,
  onClose: () => {
    console.log("Close button clicked");
  },
};
