import Footer from "./Footer";
import image from "./../../assets/Logo.png";

export default {
  title: "Components/Footer",
  component: Footer,
};

export const FooterCentreAligned = {
  args: {
    Logo: image,
    quoteContent: "Embark on Your Learning Journey Today!",
    copyrightContent: "All rights reserved © 2024 Tarento Group.",
    copyrightContent2: " | Privacy Policy",
    isLeftALigned: false,
  },
};

export const FooterLeftAligned = {
  args: {
    Logo: image,
    quoteContent: "Embark on Your Learning Journey Today!",
    copyrightContent: "All rights reserved © 2024 Tarento Group.",
    copyrightContent2: " | Privacy Policy",
    isLeftALigned: true,
  },
};
