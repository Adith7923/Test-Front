import React, { useState } from "react";
import styles from "./DropTextButton.module.css";
import { RiArrowDownSLine } from "react-icons/ri";
import { RiArrowRightSLine } from "react-icons/ri";
import { BsDot } from "react-icons/bs";

const DropTextButton = ({ text, onclick, list, color }) => {
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(!clicked);
    if (onclick) {
      onclick(); 
    }
  };
  const handleDropClick = (index, item) => {
   
  };
  return (
    <div className={styles["textbutton"]}>
      <div
        className={styles["buttontext"]}
        onClick={handleClick}
        style={{ color }}
      >
        <div className={styles["button"]}>
          {clicked ? <RiArrowDownSLine /> : <RiArrowRightSLine />}
        </div>
        <div className={styles[""]}>
          <h4>{text}</h4>
        </div>
      </div>
      {clicked && (
        <div className={styles["list"]}>
          {list.map((item, index) => (
            <div
              key={index}
              className={styles["listitem"]}
              onClick={() => handleDropClick(index, item)}
            >
              <BsDot />
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropTextButton;
