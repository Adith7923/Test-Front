import UserProfileInfo from "./UserProfileInfo";
import image from "../../../assets/profilepic.jpg";

export default {
  title: "Layouts/Common/Components/UserProfileInfo",
  component: UserProfileInfo,
};

const sample1 = {
  role: "student",
  profilepicture: image,
  name: "Emma Watson",
  college: "Christ University",
  dob: "1990-01-01",
  email: "emmawatson@gmail.com",
  phoneNumber: 8755383632,
  houseName: "Sample House",
  city: "Sample City",
  pinCode: "123456",
  state: "Sample State",
  country: "Sample Country",
  hasDelete: true,
  // onClickEdit: () => {
  //   handleOpenEditBasicDetails();
  // },
  // onClickDelete: () => {
  //   handleOpenDeleteBasicDetails();
  // },
};

const sample2 = {
  role: "student",
  profilepicture: { image },
  name: "Emma Watson",
  college: "Christ University",
  dob: "1990-01-01",
  email: "emmawatson@gmail.com",
  phoneNumber: 8755383632,
  houseName: "Sample House",
  city: "Sample City",
  pinCode: "123456",
  state: "Sample State",
  country: "Sample Country",
  hasDelete: true,
};

export const StudentProfile = {
  args: {
    ...sample1,
  },
};

export const StudentProfileAdminView = {
  args: {
    ...sample2,
  },
};
