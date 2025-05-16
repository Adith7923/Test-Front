import EventCard from "./EventCard";

export default {
  title: "components/cards/Event Card",
  component: EventCard,
};

const sample = {
  main: "All hands meeting",
  sub: "http:// www.zoom.com",
  start: "10:30am",
  end: "11:30am",
  status: "due",
  mode: "dark",
  date: 17,
  onclick: (e) => {
    console.log("Event card clicked!");
  },
};

export const EventcardDark = {
  args: {
    ...sample,
  },
};
