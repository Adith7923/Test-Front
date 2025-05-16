import React from "react";
import styles from "./SkillBatchCard.module.css";
import { FaTrash } from "react-icons/fa6";
import { MdModeEdit } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import TextButton from "../buttons/TextButton";
import { RxCross1 } from "react-icons/rx";

const SkillBatchCard = (props) => {
  const {
    miniHeading,
    mainHeading = "",
    Count,
    cardType,
    handleClick,
    handleDeleteClick,
    handleEditClick,
    canEdit,
    canDelete,
    showCount,
    viewAnimation = false,
    creationDate=false,
  } = props;

  const transformMainHeading = (heading = "", cardType) => {
    let maxLength;

    if (cardType === "skill") {
      maxLength = 13;
    } else {
      maxLength = 25;
    }

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

  if (cardType === "skill" && canEdit && canDelete) {
    const level = Count !== undefined ? Math.min(Math.max(Count, 1), 5) : 1;
    formattedCount = `Level ${level}`;
  } else {
    if (Count >= 0) {
      const countStr = Count.toString().slice(0, 15);
      const displayedCount = parseInt(countStr, 10);
      formattedCount =
        displayedCount === 1 ? "1 Student" : `${displayedCount} Students`;
    } else {
      formattedCount = "0 Students";
    }
  }

  return (
    <div
      className={
        cardType === "skill"
          ? `${styles.rightCard} ${viewAnimation ? styles.highlight : ""}`
          : `${styles.leftCard} ${viewAnimation ? styles.highlight : ""}`
      }
      onClick={handleClick}
    >
      <div className={styles.titleContainer}>
        <div className={styles.miniheadingDelete}>
          <a className={styles.cardsminiheading}>{miniHeading}</a>
          {cardType === "skill" && (
            <div className={styles.cardsDeleteEdit}>
              {canDelete ? (
                // <TextButton
                //   onClick={handleDeleteIconClick}
                //   isDelete={true}
                //   className={styles.deleteTextIcon}
                //   icon={<RxCross1 size={19} />}
                //   text=" Remove"
                // />
                <RxCross1
                  className={styles.deleteTextIcon}
                  onClick={handleDeleteIconClick}
                  text=" Remove"
                  title=" Remove"
                />
              ) : canEdit ? (
                <MdModeEdit
                  className={styles.deleteIcon}
                  onClick={handleEditIconClick}
                  title="Edit"
                />
              ) : null}
              {canEdit && canDelete && (
                <MdModeEdit
                  className={styles.editIcon}
                  onClick={handleEditIconClick}
                  title="Edit"
                />
              )}
            </div>
          )}
        </div>
        <a
          className={styles.cardsmainheading}
          style={cardType === "skill" ? { width: "90%" } : { width: "auto" }}
        >
          {transformMainHeading(mainHeading, cardType)}
        </a>
        <div className={styles.cardsbottom}>
          {showCount && (
            <a className={styles.cardsdiscription}>{formattedCount}</a>
          )}
          {creationDate && (
            <div className={styles.creationDate}>
              Created on: {new Date(creationDate).toLocaleDateString()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillBatchCard;
