import React from "react";
import ProgressBar from "./ProgressBar";

export default {
  title: "Components/ProgressBar",
  component: ProgressBar,
  argTypes: {
    showHeading: { control: "boolean" },
    heading: { control: "text" },
    percentage: { control: "number", min: 0, max: 100 },
  },
};

const Template = (args) => <ProgressBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  showHeading: true,
  heading: "Course Progress",
  percentage: 40,
};

export const WithoutHeading = Template.bind({});
WithoutHeading.args = {
  showHeading: false,
  heading: "Course Progress",
  percentage: 40,
};
