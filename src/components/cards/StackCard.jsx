import React from "react";
import styles from "./StackCard.module.css";

const StackCard = ({ content, showIcon, icon, clickHandle }) => {
  return (
    <div className={`${styles["stackcard"]}`} onClick={clickHandle}>
      {showIcon && <div className={`${styles["icon"]}`} >{icon}</div>}
      {content}
    </div>
  );
};

export default StackCard;
