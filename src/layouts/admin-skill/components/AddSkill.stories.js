import React from "react";
import AddSkill from "./AddSkill";

export default {
  title: "layouts/Admin-skill/Components/Add Skill",
  component: AddSkill,
};

const Template = (args) => <AddSkill {...args} />;

export const addskill = Template.bind({});
addskill.args = {};
