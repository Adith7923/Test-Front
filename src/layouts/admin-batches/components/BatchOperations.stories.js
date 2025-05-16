import React from "react";
import Batchoperations from "./BatchOperations";

export default {
  title: "Layouts/Admin-batches/Components/Add Batch ",
  component: Batchoperations,
};

const options = [
  { value: "abc", label: "ABC" },
  { value: "xyz", label: "XYZ" },
  { value: "pqr", label: "PQR" },
];

const Template = (args) => <Batchoperations {...args} />;

export const Addbatch = Template.bind({});
Addbatch.args = {
  mainHeading: "Create Batch",
  options,
};
