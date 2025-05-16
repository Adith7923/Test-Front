import Education from "./Education";

export default {
  title: "Layouts/Common/Components/Education",
  component: Education,
};

const sample = {
  degree: "Bachelor of Technology (B.Tech)",
  institution: "Christ University",
  percentage: 7.2,
  startDate: "May 2022",
  endDate: "April 2024",
  specialization: "Marketing",
};

export const EducationDark = {
  args: {
    ...sample,
  },
};
