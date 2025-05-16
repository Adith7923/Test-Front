import AddUser from "./AddUser";
import React from "react";

export default {
  title: "layouts/Common/Components/Add User",
  component: AddUser,
};

const student = {
  options: [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ],
  viewCollege: true,
  heading: "Add New Student",
};


const mentor = {
  viewCollege: false,
  heading: "Add New Mentor",
};

export const AddStudent = {
  args: { ...student },
};

export const AddMentor = {
  args: { ...mentor },
};
