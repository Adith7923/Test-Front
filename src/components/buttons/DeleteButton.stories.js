import React, { Component } from "react";
import DeleteButton from "./DeleteButton";

export default {
  title: "Components/Buttons/Delete Button",
  component: DeleteButton,
};

export const DeleteButtonPrimary = {
  args: {
    content: "Delete",
    variant: "primary",
    onclick: (r) => {
      console.log("clicked");
    },
    width: "full",
  },
};

export const DeleteButtonSecondary = {
  args: {
    content: "Delete",
    variant: "secondary",
    onclick: (r) => {
      console.log("clicked");
    },
    width: "full",
  },
};

export const DeleteButtonTertiary = {
  args: {
    content: "Delete",
    variant: "tertiary",
    onclick: (r) => {
      console.log("clicked");
    },
    width: "full",
  },
};
