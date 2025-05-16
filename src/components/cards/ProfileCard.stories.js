import React from "react";
import { action } from "@storybook/addon-actions";
import ProfileCard from "./ProfileCard";
import image from "../../assets/DP.png";

export default {
  title: "Components/Cards/Profile Card",
  component: ProfileCard,
};

export const ProfilecardDelete = (args) => <ProfileCard {...args} />;

ProfilecardDelete.args = {
  studentImage: image,
  studentName: "John Doe",
  studentId: "STDID3456",
  studentCollege: "St Christ College",
  studentMail: "johndoe@email.com",
  studentPhoneNumber: "(555) 555-5555",
  canDelete: true,
  handleDelete: action("Delete Icon Clicked !!!"),
  onClick: action("Card clicked"),
};

export const Profilecard = (args) => <ProfileCard {...args} />;

Profilecard.args = {
  studentImage: image,
  studentName: "John Doe",
  studentId: "STDID3456",
  studentCollege: "St Christ College",
  studentMail: "johndoe@email.com",
  studentPhoneNumber: "(555) 555-5555",
  canDelete: false,
  onClick: action("Card clicked"),
};
