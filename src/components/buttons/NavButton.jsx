import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import styles from "./NavButton.module.css";

const NavButton = ({ pageName, onClick }) => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <div className={styles.navButton} onClick={goBack}>
      <IoIosArrowBack className={styles.backArrow}/>
      <span className={styles.pageName} onClick={onClick}>
        {" "}
        {pageName}{" "}
      </span>
    </div>
  );
};

export default NavButton;
