import React from "react";
import ProfilePicture from "./ProfilePicture";
import profilepic from "../../assets/pic.png";

export default {
  title: "components/ProfilePicture",
  component: ProfilePicture,
  argTypes: {
    size: {
      control: { type: "radio", options: ["big", "small"] },
    },
  },
};

export const ProfilePictureSmall = (args) => <ProfilePicture {...args} />;
ProfilePictureSmall.args = {
  src: profilepic,
  size: "small",
};

export const ProfilePictureLarge = (args) => <ProfilePicture {...args} />;
ProfilePictureLarge.args = {
  src: profilepic,
  size: "large",
};
