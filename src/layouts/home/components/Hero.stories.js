import React from "react";
import Hero from "./Hero";

export default {
  title: "layouts/Home/Components/Hero",
  component: Hero,
};

export const Heros = {
  args: {
    mainContent: ["DISCOVER", "CREATE ", "INSPIRE"],
    semiContent: "Where Learning Knows No Boundaries",
    buttonContent: "Explore",
    buttonVariant: "primary",
    buttonWidth: "full",
    onclick: (e) => {
      console.log("nfsjkd");
    },
    number: ["2000+", "300+", "500+"],
    title: ["Enrollments", "Certifications", "Projects"],
  },
};
