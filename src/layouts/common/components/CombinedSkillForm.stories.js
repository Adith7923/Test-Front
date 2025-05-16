import React from "react";
import CombinedSkillForm from "./CombinedSkillForm";

export default {
  title: "Layouts/Common/Components/Combined Skill Form ",
  component: CombinedSkillForm,
};

const Template = (args) => <CombinedSkillForm {...args} />;

const options = [
  { value: "abc", label: "ABC" },
  { value: "xyz", label: "XYZ" },
  { value: "pqr", label: "PQR" },
];

export const Addnewskillstudent = Template.bind({});

Addnewskillstudent.args = {
  mainHeading: "Add New Skill",
  isSelect: true,
  isEditlevel: false,
  displaytext: "This skill is only to be placed at level 1",
  buttonTitle: "Add Skill",
  options: options,
};

export const Addnewskillmentor = Template.bind({});

Addnewskillmentor.args = {
  mainHeading: "Add New Skill",
  isSelect: true,
  isEditlevel: false,
  displaytext: "This skill is only to be placed at level 4",
  buttonTitle: "Add Skill",
  options: options,
};

export const Addnewskilladmin = Template.bind({});

Addnewskilladmin.args = {
  mainHeading: "Add New Skill",
  isSelect: false,
  isEditlevel: false,
  buttonTitle: "Add Skill",
  options: options,
};

export const Editskilladmin = Template.bind({});

Editskilladmin.args = {
  mainHeading: "Edit Skill Level",
  isSelect: false,
  isEditlevel: true,
  message: "Please update your skill level.",
  skillName: "JavaScript",
  buttonTitle: "Save",
  options: options,
  initialData: { selectedLevel: "abc" },
};
