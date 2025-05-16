import EventsDescription from "./EventsDescription";

export default {
  title: "layouts/Common/components/EventsDescription",
  component: EventsDescription,
};

export const eventPublic = {
  args: {
    eventTitle: "Exploring Future Technologies",
    eventType: "Techtalks",
    eventMode: "Offline",
    description:
      "TechTalks 2024 is a full-day event dedicated to exploring emerging technologies and their impact on various industries. Join us for insightful talks, engaging discussions, and networking opportunities with experts in the field.",
    startDate: "2024-02-15",
    endDate: "2024-02-25",
    startTime: "10:00",
    endTime: "14:00",
    location: "Auditorium 101, Engineering Building",
    speaker: "Sam Alex",
    speakerDescription: "Associate Software Engineer",
    organizer: "Nazeem",
    button: "Events",
    small: "edit",
    medium: "delete",
    large: "view participants",
    type: "public",
    smaller: "Register",
    onclick1: (e) => {
      console.log("Hello");
    },
  },
};

export const eventMentor = {
  args: {
    eventTitle: "Exploring Future Technologies",
    eventType: "Techtalks",
    eventMode: "Offline",
    description:
      "TechTalks 2024 is a full-day event dedicated to exploring emerging technologies and their impact on various industries. Join us for insightful talks, engaging discussions, and networking opportunities with experts in the field.",
    startDate: "2024-02-15",
    endDate: "2024-02-25",
    startTime: "10:00",
    endTime: "4:00",
    location: "Auditorium 101, Engineering Building",
    speaker: "Sam Alex",
    speakerDescription: "Associate Software Engineer",
    organizer: "Nazeem",
    button: "Events",
    small: "edit",
    medium: "delete",
    large: "view participants",
    type: "mentor",
    smaller: "Register",
    onclick1: (e) => {
      console.log("Hello");
    },
  },
};

export const eventAdmin = {
  args: {
    eventTitle: "Exploring Future Technologies",
    eventType: "Techtalks",
    eventMode: "Offline",
    description:
      "TechTalks 2024 is a full-day event dedicated to exploring emerging technologies and their impact on various industries. Join us for insightful talks, engaging discussions, and networking opportunities with experts in the field.",
    startDate: "2024-02-15",
    endDate: "2024-02-25",
    startTime: "10:00",
    endTime: "4:00",
    location: "Auditorium 101, Engineering Building",
    speaker: "Sam Alex",
    speakerDescription: "Associate Software Engineer",
    organizer: "Nazeem",
    button: "Events",
    small: "edit",
    medium: "delete",
    large: "view participants",
    type: "admin",
    smaller: "Register",
    onclick1: (e) => {
      console.log("Hello");
    },
    onclick2: (e) => {
      console.log("Hello");
    },
    onclick3: (e) => {
      console.log("Hello");
    },
  },
};
