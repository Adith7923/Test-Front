import React from "react";
import styles from "./ProfileCard.module.css";
import { GoTrash } from "react-icons/go";
import { RxCross1 } from "react-icons/rx";


const ProfileCard = (props) => {
  const {
    studentImage,
    studentName,
    studentId,
    studentCollege,
    studentMail,
    studentPhoneNumber,
    onClick,
    canDelete,
    handleDelete,
    viewAnimation = false,
    attendance = false,
    percentage
  } = props;

  const transformMainMail = (studentMail) => {
    if (studentMail.length > 20) {
      return studentMail.slice(0, 20) + "...";
    }
    return studentMail;
  };

  const transformName = (studentMail) => {
    if (studentMail.length > 15) {
      return studentMail.slice(0, 15) + "...";
    }
    return studentMail;
  };

  const transformCollege = (studentMail) => {
    if (studentMail.length > 26) {
      return studentMail.slice(0, 26) + "...";
    }
    return studentMail;
  };

  const handleDeleteIcon = (event) => {
    event.stopPropagation();
    handleDelete();
  };

  return (
    <div
      className={`${styles.card} ${viewAnimation ? styles.highlight : ""}`}
      onClick={onClick}
    >
      <div className={styles["card-content"]}>
        <div className={styles["image-icon"]}>
          <img
            src={studentImage}
            alt="Profile"
            className={styles["student-image"]}
          />
          {canDelete && (
            <RxCross1
              className={styles["delete-icon"]}
              title="Remove"
              onClick={handleDeleteIcon}
            />
          )}
        </div>
        <div className={styles["titles-wrapper"]}>
          <h1 className={styles.title1} title={studentName}>
            {transformName(studentName)}
          </h1>
          <h2 className={styles.title2} title={studentId}>
            {transformName(studentId)}
          </h2>
          <h3 className={styles.title3} title={studentCollege}>
            {transformCollege(studentCollege)}
          </h3>
        </div>
        {/* 
        <div className={styles["contact-info"]}>
          <div className={styles.email} title={studentMail}>{transformMainMail(studentMail)}</div>
          <div className={styles.phone} title={studentPhoneNumber}>
            {transformMainMail(studentPhoneNumber)}
          </div>
        </div> */}

        {attendance && (
         <div className={styles["attendance"]}>
         <div className={styles.attendancecontainer}>
         <p className={styles.attendance}>Attendance:</p>  <p className={styles.percentage}> {percentage}%</p></div>
       </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
