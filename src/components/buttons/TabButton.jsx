import React from "react";
import styles from "./TabButton.module.css";

const transformStatus = (status) => {
  if (status.length > 9) {
    return status.slice(0, 8) + "...";
  }
  return status;
};
const TabButton = ({ status, onClick, isActive }) => {
  return (
    <div>
      <h1
        className={`${styles["event-status"]} ${isActive ? styles.active : ""}`}
        onClick={onClick}
      >
        {transformStatus(status)}
      </h1>
    </div>
  );
};

export default TabButton;
