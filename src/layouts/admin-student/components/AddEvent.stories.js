import React from "react";
import AddEventComponent from "./AddEvent";

export default {
  title: "Layouts/Admin-student/Components/Add Event ",
  component: AddEventComponent,
};

const options = [
  { value: "abc", label: "ABC" },
  { value: "xyz", label: "XYZ" },
  { value: "pqr", label: "PQR" },
];

const Template = (args) => <AddEventComponent {...args} />;

export const Addevent = Template.bind({});
Addevent.args = {
  mainHeading: "Add Event",
  options,
};
