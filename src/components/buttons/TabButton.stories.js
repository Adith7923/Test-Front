import React from "react";
import TabButton from "./TabButton";

export default {
  title: "Components/Buttons/TabButton",
  component: TabButton,
  argTypes: {
    status: { control: "text" },
    onClick: { action: "clicked" },
    isActive: { control: "boolean" },
  },
};

const Template = (args) => <TabButton {...args} />;

export const Tabbutton = Template.bind({});
Tabbutton.args = {
  status: "Upcoming",
  isActive: false,
  onClick: () => {
    console.log("Button clicked");
  },
};
