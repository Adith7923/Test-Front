import React, { useEffect } from "react";
import styles from "./AttendanceButton.module.css";

const AttendanceButton = ({ content, isActive, onClick, disabled }) => {
  const buttonClass = isActive ? (content === "Present" ? styles.present : styles.absent) : styles.neutral;

  const handleClick = () => {
    if (disabled) {
      console.log(`Button is disabled: ${content}`);
      return;
    }

    const newIsPresent = content === "Present";
    onClick(newIsPresent);
  };

  return (
    <div
      className={`${styles.button} ${buttonClass}`}
      onClick={handleClick}
      style={{ cursor: disabled ? "not-allowed" : "pointer" }}
    >
      {content}
    </div>
  );
};

export default AttendanceButton;
