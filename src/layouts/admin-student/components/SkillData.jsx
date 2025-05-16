import { AiOutlinePlus } from "react-icons/ai";

const SkillData = {
  heading: {
    heading: "Skills",
    textbuttonprops: {
      icon: <AiOutlinePlus />,
      text: "Add new Skill",
    },
  },
  addSkill: {
    mainHeading: "Add New Skill",
    isSelect: false,
    isEditlevel: false,
    buttonTitle: "Add Skill",
    options: [
      { value: "abc", label: "ABC" },
      { value: "xyz", label: "XYZ" },
      { value: "pqr", label: "PQR" },
    ],
  },
  skillcards: {
    card: "skill",
    cardData: [
      {
        miniHeading: "Skill 1",
        mainHeading: "Java",
        Count: 2,
        cardType: "skill",
        canEdit: true,
        canDelete: true,
      },
      {
        miniHeading: "Skill 2",
        mainHeading: "Python",
        Count: 3,
        cardType: "skill",
        canEdit: true,
        canDelete: true,
      },
    ],
  },
};

export default SkillData;
