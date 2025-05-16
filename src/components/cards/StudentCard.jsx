import React, { useState } from "react";
import styles from "./StudentCard.module.css";
import { GoArrowUpRight } from "react-icons/go";

const StudentCard = (props) => {
  const {
    studentImage = "./image.jpeg",
    studentName,
    studentId,
    studentCollege,
    studentMail,
    studentPhoneNumber,
    cardType,
    handleClick,
  } = props;

  const transformMainName = (studentName) => {
    if (studentName.length > 16) {
      return studentName.slice(0, 15) + "...";
    }
    return studentName;
  };

  const transformMainMail = (studentMail) => {
    if (studentMail.length > 19) {
      return studentMail.slice(0, 19) + "...";
    }
    return studentMail;
  };

  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const leftCardClass = isHover ? styles.leftCardHover : styles.leftCard;
  const rightCardClass = isHover ? styles.rightCardHover : styles.rightCard;
  const maskClass = isHover ? styles.maskHover : styles.mask;
  const mask2Class = isHover ? styles.mask2Hover : styles.mask2;
  const mask3Class = isHover ? styles.mask3Hover : styles.mask3;
  const mask4Class = isHover ? styles.mask4Hover : styles.mask4;
  const arrowClass = isHover ? styles.arrowHover : styles.arrow;
  const cardsClass = isHover ? styles.cardOutlineHover : styles.cardOutline;

  return (
    <div
      className={styles.cards}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={cardsClass} onClick={handleClick}>
        <img
          src={studentImage}
          alt="profile Picture"
          className={styles.studentImage}
        />
        <div className={styles.maincontent}>
          <a className={styles.studentname} title={studentName}>{transformMainName(studentName)}</a>
          <a className={styles.studentid}>{studentId}</a>
          <a className={styles.studentcollege} title={studentCollege}>{studentCollege}</a>
        </div>
        <div className={styles.maincontent}>
          <a className={styles.studentmail} title={studentMail}>{transformMainMail(studentMail)}</a>
          <a className={styles.studentphonenumber}>{studentPhoneNumber}</a>
        </div>
      </div>

      <div className={styles.CardsOutline}>
        <div className={leftCardClass}></div>
        <div className={rightCardClass}></div>
        <div className={maskClass}></div>
        <div className={mask4Class}></div>
        <div className={mask2Class}></div>
        <div className={mask3Class}></div>
      </div>
      <div className={arrowClass}>
        <GoArrowUpRight />
      </div>
    </div>
  );
};

export default StudentCard;
