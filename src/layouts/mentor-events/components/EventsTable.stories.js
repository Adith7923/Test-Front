import EventsTable from "./EventsTable";

export default {
  title: "layouts/Mentor-events/Components/EventsTable",
  component: EventsTable,
};

const headings = ["Student Id", "Student Name", "Email", "Status"];

const data = [
  ["studentid1", "Samuel", "samuel@gmail.com"],
  ["studentid2", "Smith", "smith@gmail.com"],
  ["studentid3", "Mary", "mary@gmail.com"],
  ["studentid4", "Davis", "davis@gmail.com"],
  ["studentid5", "Smith", "smith@gmail.com"],
  ["studentid6", "Jayadev", "jayadev@gmail.com"],
  ["studentid7", "Wilson", "wilson@gmail.com"],
];

export const eventTable = {
  args: {
    data,
    headings,
    logAttendance: (attendance) => console.log("Attendance:", attendance),
  },
};
