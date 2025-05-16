import React from "react";
import TextButton from "../../../components/buttons/TextButton";
import styles from "../Common.module.css";

const ShowCards = ({ heading, textbuttonprops }) => {
  return (
    <div className="padding padding-top">
      <div className={`${styles["showcards-container"]}`}>
        <div className={`${styles["showcards-heading"]}`}>{heading}</div>
        <div className={`${styles["showcards-addbutton"]}`}>
          <TextButton {...textbuttonprops} />
        </div>
      </div>
    </div>
  );
};

export default ShowCards;
