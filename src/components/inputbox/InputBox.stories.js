import React, { useState } from "react";
import InputBox from "./InputBox";

export default {
  title: "Components/InputBox",
  component: InputBox,
};

const Template = (args) => {
  const [value, setValue] = useState("");
  return (
    <InputBox
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const NormalSize = Template.bind({});
NormalSize.args = {
  size: "normal",
  label: "Normal Input",
  placeholders: ["Enter text"],
};

export const SmallSize = Template.bind({});
SmallSize.args = {
  size: "small",
  label: "Small Input",
  placeholders: ["Enter text"],
};

export const LargeSize = Template.bind({});
LargeSize.args = {
  size: "large",
  label: "Large Input",
  placeholders: ["Enter text"],
};

export const DatePicker = Template.bind({});
DatePicker.args = {
  size: "normal",
  label: "Date Picker",
  placeholders: ["Select date"],
  isDatePicker: true,
};

export const TimePicker = Template.bind({});
TimePicker.args = {
  size: "normal",
  label: "Time Picker",
  placeholders: ["Select time"],
  isTimePicker: true,
};

export const FileInput = Template.bind({});
FileInput.args = {
  size: "normal",
  label: "Select File",
  placeholders: ["Select file"],
  isFileInput: true,
};
