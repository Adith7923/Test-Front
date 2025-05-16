import React, { useState } from "react";
import InputDropdown from "./InputDropdown";

export default {
  title: "Components/InputDropdown",
  component: InputDropdown,
};

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
  { value: "option4", label: "Option 4" },
];

const TemplateSingle = (args) => {
  const [value, setValue] = useState(args.value);

  return (
    <InputDropdown
      {...args}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    />
  );
};

const TemplateMulti = (args) => {
  const [value, setValue] = useState(args.value);

  return (
    <InputDropdown
      {...args}
      value={value}
      onChange={(newValues) => setValue(newValues)}
    />
  );
};

export const SingleSelect = TemplateSingle.bind({});
SingleSelect.args = {
  label: "Single Select",
  placeholder: "Select an option",
  options: options,
  value: options[0].value,
  isMulti: false,
};

export const MultiSelect = TemplateMulti.bind({});
MultiSelect.args = {
  label: "Multi Select",
  placeholder: "Select options",
  options: options,
  value: [options[0].value, options[2].value],
  isMulti: true,
};
