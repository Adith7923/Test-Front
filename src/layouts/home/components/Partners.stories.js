import React from "react";
import Partners from "./Partners";
import image1 from "../../../assets/udemy-.png";
import image2 from "../../../assets/linkln.png";
import image3 from "../../../assets/tarento.png";
import image4 from "../../../assets/Stack-over-flow.png";
import image5 from "../../../assets/coursera.png";

export default {
  title: "layouts/Home/Components/Partners",
  component: Partners,
};

export const Partner = (args) => <Partners {...args} />;

Partner.args = {
  title: "Academic Partners",
  Images: [image1, image2, image3, image4, image5],
};
