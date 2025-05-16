import React, { useState, useEffect } from "react";
import styles from "../Common.module.css";
import ListItem from "../../../components/listitem/ListItem";
import { BsList, BsX } from "react-icons/bs";
import Logo from "../../../assets/EduNexa.png";
import ProfileBox from "../../../components/profilenotificationbox/ProfileNotificationBox";

const SideBar = ({
  button,
  listItems,
  profileBox,
  onItemClick,
  location,
  user,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isNarrowScreen, setIsNarrowScreen] = useState(window.innerWidth < 768);

  const isActive = (path) => {
    if (user === "public") {
      return false;
    }
    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };

  const handleItemClick = (index, page) => {
    setActiveIndex(index);
    setShowSidebar(false);
    if (onItemClick) {
      onItemClick(page);
    }
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsNarrowScreen(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={`${styles["sidebarcontainer"]}`}>
      <div className={`${styles["sidebar-headerresp"]}`}>
        <div className={`${styles["sidebar-headercontainer"]}`}>
          <div
            className={`${styles["sidebar-toggleout"]}`}
            onClick={toggleSidebar}
          >
            <BsList className={`${styles["sidebar-hamburger"]}`} />
          </div>
          <div className={`${styles["sidebar-headingout"]}`}>
            <img src={Logo} alt="EduNexa" />
          </div>
        </div>
      </div>
      <div
        className={`${styles["sidebar"]} ${showSidebar ? styles["show"] : ""}`}
      >
        <div className={`${styles["sidebar-headercontainer"]}`}>
          <div className={`${styles["sidebar-headingin"]}`}>
            <img src={Logo} alt="EduNexa" />
          </div>
          <div className={`${styles["sidebar-toggle"]}`}>
            <BsX
              className={`${styles["sidebar-crossicon"]}`}
              onClick={toggleSidebar}
            />
          </div>
        </div>
        <div className={`${styles["sidebar-content"]}`}>
          <div className={`${styles["sidebar-list"]}`}>
            {listItems.map((item, index) => (
              <ListItem
                key={index}
                icon={item.icon}
                name={item.name}
                viewIcon={item.viewIcon}
                active={isActive(`/${user}/${item.page}`)}
                onClick={() => handleItemClick(index, item.page)}
              />
            ))}
          </div>
          <div className={`${styles["sidebar-bottom"]}`}>
            {isNarrowScreen && (
              <div className={`${styles["sidebar-headerbutton"]}`}>
                {button}
              </div>
            )}
            <div className={`${styles["sidebar-card"]}`}>
              <ProfileBox {...profileBox} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
