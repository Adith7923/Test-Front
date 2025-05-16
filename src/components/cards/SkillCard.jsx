import React from "react";
import { IoIosCloseCircle } from "react-icons/io";
import styles from "./SkillCard.module.css";

const SkillCard = ({ title, subtitle, showCloseIcon, onClose }) => {
  const handleClose = () => {
    if (typeof onClose === "function") {
      onClose();
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.innerBox}>
        <div className={styles.content}>
          {" "}
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
        <div className={styles.iconContainer}>
          {" "}
          {showCloseIcon && (
            <IoIosCloseCircle
              className={styles.closeIcon}
              onClick={handleClose}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
