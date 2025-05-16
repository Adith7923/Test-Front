import React from "react";
import LoginBox from "./LoginBox";

export default {
  title: "Layouts/Common/Components/DeleteBox",
  component: LoginBox,
};

const Template = (args) => <LoginBox {...args} />;

export const Loginbox = Template.bind({});
Loginbox.args = {
  title: "Confirmation Required",
  message: "Are you sure you want to remove this skill?",
  buttonText: "Confirm",
};
