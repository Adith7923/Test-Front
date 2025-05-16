import React from "react";
import BasicDetails from "./BasicDetails";

export default {
  title: "Layouts/Common/Components/Edit Basic Details ",
  component: BasicDetails,
};

const Template = (args) => <BasicDetails {...args} />;

export const Editbasicdetails = Template.bind({});

Editbasicdetails.args = {
  mainHeading: "Edit Basic Details",
  initialData: {
    dob: "1990-01-01",
    phoneNumber: "1234567890",
    houseName: "Sample House",
    city: "Sample City",
    pinCode: "123456",
    state: "Sample State",
    country: "Sample Country",
    aboutMe: "This is a sample about me",
    linkedinLink: "https://linked.in",
    githubLink: "https://github.in",
    otherLink: "https://other.in",
  },
  isEdit: true,
};
