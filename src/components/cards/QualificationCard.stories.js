import QualificationCard from "./QualificationCard";
import { action } from "@storybook/addon-actions";

export default {
  title: "components/cards/Qualification Card",
  component: QualificationCard,
};

const qualification = {
  degree: "Master's Degree ",
  institution: "Rajive Gandhi Institute of Technology",
  percentage: "",
  startDate: "",
  endDate: "",
  specialization: "",
  handleClick: action("Card clicked!"),
  handleEditClick: action("Edit button clicked!"),
  handleDeleteClick: action("Delete Icon Clicked!"),
  showCount: true,
  viewAnimation: false,
};

export const QualificationCardStory = {
  args: {
    ...qualification,
    showCount: false
  },
};
