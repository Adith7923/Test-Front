const EventDescriptionData = {
  defaultValues: {
    eventTitle: "Exploring Future Technologiesss",
    eventType: "Hackathon",
    eventMode: "Online",
    description:
      "TechTalks 2024 is a full-day event dedicated to exploring emerging technologies and their impact on various industries. Join us for insightful talks, engaging discussions, and networking opportunities with experts in the field.",
    startDate: "2024-02-15",
    endDate: "2024-02-25",
    startTime: "10:00",
    endTime: "14:00",
    link: "Auditorium 101, Engineering Building",
    speaker: "Sam Alex",
    speakerDescription: "Associate Software Engineer",
    organizer: "Nazeem",
  },
  buttonProps: {
    button: "Events",
    small: "Edit",
    medium: "Delete",
    large: "View Participants",
    type: "mentor",
    smaller: "Register",
    onclick1: (e) => {
      console.log("Hello");
    },
  },
};

export default EventDescriptionData;
