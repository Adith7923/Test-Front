import AddCollege from "./AddCollege";
import React from "react";

export default {
  title: "layouts/Admin-college/Components/AddCollege",
  component: AddCollege,
};

const Template = (args) => <AddCollege {...args} />;

export const AddCollegeForm = Template.bind({});
AddCollegeForm.args = {
  initialData: {
    collegeName: "jdoqiwjd",
    collegePlace: "1234567890",
    collegeDistrict: "Sample House",
    collegeState: "Sample City",
    collegeCountry: "123456",
  },
  onSubmit: (data) => {
    console.log("submitted", data);
  },
};
