import React from "react";
import SideBar from "../../common/components/SideBar";
import Dp from "../../../assets/DP.png";

const HomeSidebar = () => {
  return (
    <SideBar
      listItems={[
        { name: "Courses" },
        { name: "Projects" },
        { name: "Events" },
      ]}
      profileBox={{
        name: "Sana Parvin",
        profilePic: Dp,
        gmail: "sanaparvin@gmail.com",
      }}
    />
  );
};

export default HomeSidebar;
