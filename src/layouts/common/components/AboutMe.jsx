import React from "react";
import PropTypes from "prop-types";
import styles from "../Common.module.css";

const AboutMe = ({ title, description }) => {
  return (
    <div className={`${styles["aboutme-aboutsection"]} padding padding-bottom`}>
      <div className={`${styles["aboutme-abouttitle"]}`}>{title}</div>
      <div className={`${styles["aboutme-abouttext"]}`}>{description}</div>
    </div>
  );
};

AboutMe.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default AboutMe;
