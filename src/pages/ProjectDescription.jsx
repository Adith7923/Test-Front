import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import HomeProjectDescription from "../layouts/home-project-description/components/HomeProjectDescription";
import Header from "../layouts/home/components/Header";
import edunexa from "../assets/edunexa.png";
import Footer from "../layouts/common/components/Footer";
import CustomGoogleLoginButton from "../components/buttons/CustomGoogleLoginButton";

const ProjectDescription = () => {
  const headdata = {
    menuItems: [],
    imageSrc: edunexa,
    button: <CustomGoogleLoginButton />,
  };

  const footerdata = {
    Logo: edunexa,
    quoteContent: "Embark on Your Learning Journey Today!",
    copyrightContent: "All rights reserved © 2024 Tarento Group.",
    copyrightContent2: " | Privacy Policy",
    isLeftALigned: false,
  };
  return (
    <div>
      <Header {...headdata} />
      <div className="spacebtw">
        <div className="padding public common">
       <HomeProjectDescription />
        </div>
        <Footer {...footerdata} />
      </div>
    </div>
  );
};

export default ProjectDescription;
