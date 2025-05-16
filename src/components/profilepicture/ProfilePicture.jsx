import React from "react";
import PropTypes from "prop-types";
import styles from "./ProfilePicture.module.css";

const ProfilePicture = ({ src, size }) => {
  const getSizeClassName = () => {
    return size === "small"
      ? styles["profile-picture-frame-small"]
      : styles["profile-picture-frame"];
  };

  const getPictureSizeClassName = () => {
    return size === "small"
      ? styles["profile-picture-small"]
      : styles["profile-picture"];
  };

  return (
    <div className={getSizeClassName()}>
      <img src={src} alt="Profile" className={getPictureSizeClassName()} />
    </div>
  );
};

ProfilePicture.propTypes = {
  src: PropTypes.string.isRequired,
  size: PropTypes.oneOf(["big", "small"]),
};

ProfilePicture.defaultProps = {
  size: "big",
};

export default ProfilePicture;
