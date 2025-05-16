import React from "react";
import AboutMe from "./AboutMe";

export default {
  title: "Layouts/Common/Components/AboutMe",
  component: AboutMe,
};

const Template = (args) => <AboutMe {...args} />;

export const Aboutme = Template.bind({});
Aboutme.args = {
  title: "About Me",
  description:
    "Hey there! I'm Sam, a dedicated [Your Profession/Title] with [X] years of experience in [Your Industry/Field]. My journey in [Your Field] has been fueled by a profound interest in [What Motivates You], and a commitment to achieving [Your Goals/Objectives]. Hey there! I'm Sam, a dedicated [Your Profession/Title] with [X] years of experience in [Your Industry/Field]. My journey in [Your Field] has been fueled by a profound interest in [What Motivates You], and a commitment to achieving [Your Goals/Objectives]. Hey there! I'm Sam, a dedicated [Your Profession/Title] with [X] years of experience in [Your Industry/Field]. Hey there! I'm Sam, a dedicated [Your Profession/Title] with [X] years of experience in [Your Industry/Field]. Hey there! I'm Sam, a dedicated [Your Profession/Title] with [X] years of experience in [Your Industry/Field]. Hey there! I'm Sam, a dedicated [Your Profession/Title] with [X] years of experience in [Your Industry/Field]. Hey there! I'm Sam, a dedicated [Your Profession/Title] with [X] years of experience in [Your Industry/Field].",
};
