import { AiOutlinePlus } from "react-icons/ai";

const EventData = {
  heading: {
    heading: "Events Handled",
    textbuttonprops: {
      icon: <AiOutlinePlus />,
      text: "Add Events",
    },
  },
  addevent: {
    mainHeading: "Add Event",
    options: [
      { value: "abc", label: "ABC" },
      { value: "xyz", label: "XYZ" },
      { value: "pqr", label: "PQR" },
    ],
  },
  eventcards: {
    card: "event",
    cardData: [
      {
        miniHeading: "Capstone 1",
        mainHeading: "Health Management",
        startDate: "Jan 15, 2030",
        endDate: "Mar 15, 2030",
        Description:
          "Unlock the power of data with our comprehensive Introduction to Data",
        cardType: "Course",
      },
      {
        miniHeading: "Capstone 2",
        mainHeading: "Business Management",
        startDate: "Feb 20, 2030",
        endDate: "Apr 20, 2030",
        Description: "A comprehensive course on business management strategies",
        cardType: "Course",
      },
    ],
  },
};

export default EventData;
