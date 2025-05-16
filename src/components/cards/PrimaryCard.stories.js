import PrimaryCards from "./PrimaryCard";

export default {
  title: "Components/Cards/Primary Card",
  component: PrimaryCards,
};

const courseelement = {
  miniHeading: "Capstone",
  mainHeading: "Health Management",
  startDate: "Jan 15, 2030  ",
  endDate: "Mar 15, 2030",
  Description:
    "Unlock the power of data with our comprehensive Introduction to Data ",
  cardType: "Course",
  handleClick: (e) => {
    console.log("clicked");
  },
};

export const Primarycard = {
  args: {
    ...courseelement,
  },
};
