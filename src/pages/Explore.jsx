import React from "react";
import { SideBar } from "../layouts/common";
import {
  BsHouseFill,
} from "react-icons/bs";

import image from "../../src/assets/edunexa.png";
import EventsExplore from "./EventsExplore";
import Footer from "../layouts/common/components/Footer";

const Explore = () => {
  const sidebardata = {
    listItems: [
      { icon: <BsHouseFill />, name: "Events", viewIcon: false }
    ],
    user:"public"
  };
  const footerdata = {
    Logo: image,
    quoteContent: "Embark on Your Learning Journey Today!",
    copyrightContent: "All rights reserved © 2024 Tarento Group.",
    copyrightContent2: " | Privacy Policy",
    isLeftALigned: true,
  };
  return (
    <div>
      <div className="flexStart">
        <SideBar {...sidebardata} />
        <div className="page public">
          <EventsExplore/>
          <Footer {...footerdata} />
        </div>
      </div>
    </div>
  );
};

export default Explore;
