import React from "react";
import ProfileNotificationBox from "./ProfileNotificationBox";
import image from "../../assets/DP.png";

export default {
  title: "Components/ProfileNotificationBox",
  component: ProfileNotificationBox,
};

const Template = (args) => <ProfileNotificationBox {...args} />;

export const ProfileNotificationbox = Template.bind({});
ProfileNotificationbox.args = {
  name: "Godwin George U",
  profilePic: image,
  gmail: "godwingeorgeu0805@gmail.com",
};
