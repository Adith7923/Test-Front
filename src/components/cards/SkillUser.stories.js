import skillUser from "./SkillUser";
import profilePic from "../../assets/SkillUser.png";

export default {
  title: "components/cards/Skill User Card",
  component: skillUser,
};

const skillcard = {
  miniHeading: "Student",
  mainHeading: "John Doe",
  skills: ["Java", "HTML"],
  handleClick: (e) => {
    console.log("clicked");
  },
  profilepic: profilePic,
};

export const Skilluser = {
  args: {
    ...skillcard,
  },
};
