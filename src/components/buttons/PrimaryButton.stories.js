import React, { Component } from "react";
import PrimaryButton from "./PrimaryButton";

export default {
  title: "Components/Buttons/Primary Button",
  component: PrimaryButton,
};

export const PrimarybuttonFull = {
  args: {
    content: "Submit",
    variant: "primary",
    onclick: (r) => {
      console.log("clicked");
    },
    width: "full",
  },
};

export const SecondarybuttonHalf = {
  args: {
    content: "Submit",
    variant: "secondary",
    onclick: (r) => {
      console.log("clicked");
    },
    width: "half",
  },
};

export const TertiarybuttonHalf = {
  args: {
    content: "Submit",
    variant: "tertiary",
    onclick: (r) => {
      console.log("clicked");
    },
    width: "half",
  },
};

export const Resetbutton = {
  args: {
    content: "Submit",
    variant: "reset",
    onclick: (r) => {
      console.log("clicked");
    },
    width: "half",
  },
};
