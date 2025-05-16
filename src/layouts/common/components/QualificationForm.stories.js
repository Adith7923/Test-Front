import React from "react";
import QualificationForm from "./QualificationForm";
import { action } from "@storybook/addon-actions";

export default {
  title: "layouts/Common/Components/QualificationForm",
  component: QualificationForm,
};

const options = [
  { value: "High School", label: "High School" },
  { value: "Bachelor's Degree", label: "Bachelor's Degree" },
  { value: "Master's Degree", label: "Master's Degree" },
  { value: "Ph.D.", label: "Ph.D." },
];

const Template = (args) => <QualificationForm {...args} />;

export const AddNew = Template.bind({});
AddNew.args = {
  heading: "Add New Education Qualification",
  options: options,
  initialValues: {},
  onSubmit: action("form-submitted"),
};

const existingData = {
  degree: "High School",
  specialization: "Computer Science",
  university: "XYZ University",
  cgpa: "3.8",
  startDate: "2015-09-01",
  endDate: "2019-06-01",
};

export const EditExisting = Template.bind({});
EditExisting.args = {
  heading: "Edit Education Qualification",
  options: options,
  initialValues: existingData,
  onSubmit: action("form-submitted"),
};
