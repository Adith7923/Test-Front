import React from "react";
import styles from "./QualificationCard.module.css";
import { MdModeEdit } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import TextButton from "../buttons/TextButton";
import { format, parseISO, isValid } from "date-fns";
import { RxCross1 } from "react-icons/rx";
import { GoTrash } from "react-icons/go";

const QualificationCard = ({
  qualifications = [],
  degree = "N/A",
  institution = "N/A",
  percentage = "N/A",
  startDate = null,
  endDate = null,
  specialization = "N/A",
  handleClick = () => {},
  handleEditClick = () => {},
  onClickDelete = () => {},
  index = 0,
}) => {
  const formattedDate = (dateString) => {
    if (!dateString) return "";

    const dateStr = String(dateString);
    const date = parseISO(dateStr);

    if (isValid(date)) {
      return format(date, "dd/MM/yyyy");
    } else {
      return "Invalid date";
    }
  };

  const handleEditIconClick = (event) => {
    event.stopPropagation();
    handleEditClick(index);
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    onClickDelete(index);
  };

  const formatText = (text) => {
    if (!text) return "";
    if (text.length > 30) {
      text = text.slice(0, 28) + "... ";
    }
    return text;
  };

  const specialFormatText = (text) => {
    if (!text) return "";
    if (text.length > 50) {
      text = text.slice(0, 48) + "... ";
    }
    return text;
  };

  return (
    <div key={index} className={`${styles.cards}`} onClick={handleClick}>
      <div className={`${styles.cardContents}`}>
        <div className={styles.titleContainer}>
          <div className={`${styles["education-qualifications-list"]}`}>
            <div>
              <h3>{degree ? degree : "Degree"}</h3>
            </div>
            <div>
              <h4 className={`${styles["education-qualification-name"]}`}>
                <p>Percentage: {percentage ? `${percentage}%` : "--"}</p>
              </h4>
            </div>
            <div>
              <p
                className={`${styles["education-qualification-specialization"]}`}
                title={specialization}
              >
                {specialFormatText(specialization)}
              </p>
            </div>
            <div>
              <p
                className={`${styles["education-qualification-institution"]}`}
                title={institution}
              >
                {formatText(institution)}
              </p>
            </div>
            <div>
              <p className={`${styles["education-qualification-date"]}`}>
                {startDate && endDate
                  ? `${formattedDate(startDate)} - ${formattedDate(endDate)}`
                  : ""}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.cardsDeleteEdit}>
          <GoTrash
            onClick={handleDeleteClick}
            title="Delete"
            className={`${styles["education-qualification-remove"]}`}
          />
          <MdModeEdit
            className={styles.editIcon}
            onClick={handleEditIconClick}
            title="Edit"
          />
        </div>
      </div>
    </div>
  );
};

export default QualificationCard;
