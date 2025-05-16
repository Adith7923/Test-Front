import React from "react";
import styles from "./CollegeCard.module.css";
import { MdModeEdit } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import { RxCross1 } from "react-icons/rx";
import TextButton from "../buttons/TextButton";

const CollegeCard = (props) => {
  const {
    miniHeading,
    mainHeading = "",
    Count,
    cardType,
    handleClick,
    handleDeleteClick,
    handleEditClick,
    showCount,
    viewAnimation = false,
    placeHeading,
    showPlace,
  } = props;

  const transformMainHeading = (heading = "", cardType) => {
    let maxLength;
    maxLength = 30;

    if (heading.length > maxLength) {
      return heading.slice(0, maxLength - 2) + "...";
    }
    return heading;
  };
  const handleDeleteIconClick = (event) => {
    event.stopPropagation();
    handleDeleteClick();
  };

  const handleEditIconClick = (event) => {
    event.stopPropagation();
    handleEditClick();
  };

  let formattedCount;

  if (Count >= 0) {
    const countStr = Count.toString().slice(0, 15);
    const displayedCount = parseInt(countStr, 10);
    formattedCount =
      displayedCount === 1 ? "1 Student" : `${displayedCount} Students`;
  } else {
    formattedCount = "0 Students";
  }

  return (
    <div
      className={`${styles.card} ${viewAnimation ? styles.highlight : ""}`}
      onClick={handleClick}
    >
      <div className={styles.cardContents}>
        <div className={styles.titleContainer}>
          <div className={styles.miniheadingDelete}>
            <a className={styles.cardsminiheading}>{miniHeading}</a>
          </div>
          <a className={styles.cardsmainheading} title={mainHeading}>
            {transformMainHeading(mainHeading, cardType)}
          </a>
          {showPlace && (
            <a className={styles.cardsplaceheading}>
              {transformMainHeading(placeHeading, cardType)}
            </a>
          )}
          {showCount && (
            <a className={styles.cardsdiscription}>{formattedCount}</a>
          )}
        </div>
        <div className={styles.cardsDeleteEdit}>
          <MdModeEdit
            className={styles.editIcon}
            onClick={handleEditIconClick}
            title="Edit"
          />
          {/* Don't delete */}
          {/* <RxCross1
            onClick={handleDeleteClick}
            isDelete={true}
            className={styles.deleteIcon}
            text=" Remove"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default CollegeCard;
