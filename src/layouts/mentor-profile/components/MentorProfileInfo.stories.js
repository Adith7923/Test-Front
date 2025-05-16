import MentorProfileInfo from "./MentorProfileInfo";

const sample = {
  role: "mentor",
  name: "Emma Watson",
  college: "Christ University",
  dob: "Jan 21 2001",
  email: "emmawatson@gmail.com",
  phone: "(+91) 8337254637",
  hasDelete: false,
};

export default {
  title: "Layouts/Common/Components/MentorProfile",
  component: MentorProfileInfo,
};

export const UserView = {
  args: {
    ...sample,
  },
};
