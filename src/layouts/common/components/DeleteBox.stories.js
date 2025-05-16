import React from "react";
import DeleteBox from "./DeleteBox";

export default {
  title: "Layouts/Common/Components/DeleteBox",
  component: DeleteBox,
};

const Template = (args) => <DeleteBox {...args} />;

export const Deletebox = Template.bind({});
Deletebox.args = {
  title: "Login Required",
  message: "Are you sure you want to remove this skill?",
  buttonText: "Confirm",
};
