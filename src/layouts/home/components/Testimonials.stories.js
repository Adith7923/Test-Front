import React from "react";
import Testimonials from "./Testimonials";
import image from "../../../assets/DP.png";

export default {
  title: "layouts/Home/Components/Testimonials",
  component: Testimonials,
};

const testimonials = [
  {
    name: "Jane Smith",
    info: "Software Engineer",
    place: "ABC Corp",
    description:
      "As a marketing professional with no prior background in data science, this course provided me with a solid foundation to make a career transition. The hands-on projects and expert guidance from Dr. Rodriguez made complex concepts accessible. I now feel confident applying data science techniques to enhance my decision-making processes in marketing.",
    profilePicture: image,
  },
  {
    name: "John Appleseed",
    info: "Product Manager",
    place: "XYZ Inc.",
    description: "John is a great team player and a dedicated professional.",
    profilePicture: image,
  },
  {
    name: "Alice Johnson",
    info: "Designer",
    place: "Creative Studio",
    description:
      "Alice has an eye for detail and brings creativity to every project.",
    profilePicture: image,
  },
  {
    name: "John Appleseed",
    info: "Product Manager",
    place: "XYZ Inc.",
    description: "John is a great team player and a dedicated professional.",
    profilePicture: image,
  },
  {
    name: "John Appleseed",
    info: "Product Manager",
    place: "XYZ Inc.",
    description: "John is a great team player and a dedicated professional.",
    profilePicture: image,
  },
];

const Template = (args) => <Testimonials {...args} />;

export const TestimonialCarousel = Template.bind({});
TestimonialCarousel.args = { testimonials, heading: "Testimonials" };
