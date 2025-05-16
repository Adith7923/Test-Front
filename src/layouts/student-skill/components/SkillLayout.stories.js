import React from "react";
import { action } from "@storybook/addon-actions";
import Layout from "./SkillLayout";

export default {
  title: "Layouts/Student-skill/Components/SkillLayout",
  component: Layout,
  argTypes: {
    onAddSkill: { action: "clicked" },
  },
};

const Template = (args) => <Layout {...args} />;

export const SkillLayoutDark = Template.bind({});
SkillLayoutDark.args = {
  initialSkills: [
    { Level: "Level 1", mainHeading: "JavaScript", isTrue: true },
    { Level: "Level 1", mainHeading: "React", isTrue: true },
    { Level: "Level 1", mainHeading: "CSS", isTrue: true },
    { Level: "Level 1", mainHeading: "HTML", isTrue: true },
  ],
  onAddSkill: action("Add Skill clicked"),
};
