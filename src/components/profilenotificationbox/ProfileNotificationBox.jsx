import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styles from "./ProfileNotificationBox.module.css";
import { FiBell } from "react-icons/fi";

const ProfileNotificationBox = ({
  name,
  profilePic,
  gmail,
  onBellIconClick,
  onProfileClick,
  onLogoutClick,
  role = "",
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 767);
  const dropdownRef = useRef(null);
  const profileNotificationBoxRef = useRef(null);

  if (role === "admin") {
    role = "Home";
  } else {
    role = "Profile";
  }

  const handleNameClick = (event) => {
    event.stopPropagation();
    setDropdownVisible((prevVisible) => !prevVisible);
  };

  const handleClickOutside = (event) => {
    if (
      profileNotificationBoxRef.current &&
      dropdownRef.current &&
      !profileNotificationBoxRef.current.contains(event.target) &&
      !dropdownRef.current.contains(event.target)
    ) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 767);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (dropdownVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownVisible]);

  const truncatedName = name
    ? name.length > 15
      ? `${name.slice(0, 15)}...`
      : name
    : "";
  const truncatedGmail = gmail
    ? gmail.length > 22
      ? `${gmail.slice(0, 22)}...`
      : gmail
    : "";

  return (
    <div>
      <div
        className={styles.profilenotificationbox}
        onClick={handleNameClick}
        ref={profileNotificationBoxRef}
      >
        <FiBell className={styles.bellicon} onClick={onBellIconClick} />
        <img src={profilePic} alt="Profile" className={styles.profilepic} />
        <div className={styles.info}>
          <span className={styles.name} title={name}>
            {truncatedName}
          </span>
          <span className={styles.gmail} title={gmail}>
            {truncatedGmail}
          </span>
        </div>
      </div>
      {dropdownVisible && isWideScreen && (
        <div className={styles.dropdowncontainer} ref={dropdownRef}>
          <div className={styles.pointer}></div>
          <div className={styles.dropdown}>
            <div
              className={styles.button}
              onClick={(event) => {
                event.stopPropagation();
                onProfileClick();
                setDropdownVisible(false);
              }}
            >
              {role}
            </div>
            <div className={styles.line}></div>
            <div
              className={styles.button}
              onClick={(event) => {
                event.stopPropagation();
                onLogoutClick();
                setDropdownVisible(false);
              }}
            >
              Logout
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

ProfileNotificationBox.propTypes = {
  name: PropTypes.string,
  profilePic: PropTypes.string.isRequired,
  gmail: PropTypes.string,
  onBellIconClick: PropTypes.func,
  onProfileClick: PropTypes.func.isRequired,
  onLogoutClick: PropTypes.func.isRequired,
};

export default ProfileNotificationBox;
