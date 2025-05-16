import StudentCard from "./StudentCard";
import image from "../../assets/DP.png";

export default {
  title: "Components/Cards/Student Card",
  component: StudentCard,
};

const studentobject = {
  studentImage: image,
  studentName: "John Doe",
  studentId: "123",
  studentCollege: "IIT Bomaby",
  studentMail: "johndoe@gmail.com",
  studentPhoneNumber: 9865321234,
  cardType: "student",
  handleClick: (e) => {
    console.log("clicked");
  },
};

export const Studentcard = {
  args: {
    ...studentobject,
  },
};
