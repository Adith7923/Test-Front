import React from "react";
import UpdateSingleFieldComponent from "./UpdateSingleField";

const options = [
  { value: "abc", label: "ABC" },
  { value: "xyz", label: "XYZ" },
  { value: "pqr", label: "PQR" },
];

export default {
  title: "Layouts/Common/Components/Single Filed",
  component: UpdateSingleFieldComponent,
};

const Template = (args) => <UpdateSingleFieldComponent {...args} />;

export const Addnewstudent = Template.bind({});

Addnewstudent.args = {
  mainHeading: "Add Student",
  labelTitle: "Add student ID",
  placeHolder: "Student ID",
  buttonTitle: "Add",
  isSelect: true,
  options,
};

export const Editbatchname = Template.bind({});

Editbatchname.args = {
  mainHeading: "Edit Batch Name",
  labelTitle: "Batch Name",
  placeHolder: "Batch Name",
  buttonTitle: "Save",
  initialData: { inputData: "Batch 1" },
  isEdit: false,
};

export const Editskillname = Template.bind({});

Editskillname.args = {
  mainHeading: "Edit Skill Name",
  labelTitle: "Skill Name",
  placeHolder: "Skill Name",
  buttonTitle: "Save",
  initialData: { inputData: "Skill 1" },
  isEdit: true,
  message: "You are updating :",
  skillId: "SKILL4785",
};
