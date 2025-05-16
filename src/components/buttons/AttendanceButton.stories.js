import AttendanceButton from "./AttendanceButton";

export default {
  title: "Components/Buttons/Attendance Button",
  component: AttendanceButton,
  argTypes: {
    onClick: { action: "clicked" },
  },
};

const Template = (args) => <AttendanceButton {...args} />;

export const PresentButton = Template.bind({});
PresentButton.args = {
  content: "Present",
  IsPresent: true,
};

export const AbsentButton = Template.bind({});
AbsentButton.args = {
  content: "Absent",
  IsPresent: false,
};
