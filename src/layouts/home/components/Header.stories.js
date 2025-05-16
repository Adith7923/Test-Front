import React from "react";
import Header from "./Header";
import edunexa from "../../../assets/edunexa.png";
import Button from "../../../components/buttons/PrimaryButton";

const sample = {
  content: "Login",
  variant: "primary",
  onClick: () => {
    console.log("Button clicked");
  },
  width: "full",
};

export default {
  title: "Layouts/Home/Components/Header",
  component: Header,
  args: {
    menuItems: [
      {
        name: "Leaderboard",
        onClick: () => console.log("Leaderboard clicked"),
        type: "aTag",
        atag: "https://www.google.com",
      },
      {
        name: "Track",
        onClick: () => console.log("Track clicked"),
        type: "link",
        atag: "https://www.tarento.com",
      },
      {
        name: "Top performers",
        onClick: () => console.log("Top performers clicked"),
        type: "link",
        link: `https://www.googlr.com`,
      },
      {
        name: "Testimonials",
        onClick: () => console.log("Testimonials clicked"),
      },
    ],
    imageSrc: edunexa,
    button: <Button {...sample} />,
  },
};

export const HeaderComponent = (args) => <Header {...args} />;

export const WithMenu = HeaderComponent.bind({});
WithMenu.args = {
  ...HeaderComponent.args,
  showMenu: true,
};

export const WithoutMenu = HeaderComponent.bind({});
WithoutMenu.args = {
  ...HeaderComponent.args,
  showMenu: false,
  showResponsiveMenu: false,
};
