import React from "react";
import AddProfilelink from "./AddProfilelink";

export default {
  title: "Layouts/Common/Components/Add Profile Link ",
  component: AddProfilelink,
};

const options = [
  { value: "abc", label: "ABC" },
  { value: "xyz", label: "XYZ" },
  { value: "pqr", label: "PQR" },
];

const Template = (args) => <AddProfilelink {...args} />;

export const Addprofilelink = Template.bind({});
Addprofilelink.args = {
  mainHeading: "Add Profile links",
  options,
};
