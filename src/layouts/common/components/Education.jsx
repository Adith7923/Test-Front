import React from "react";
import TextButton from "../../../components/buttons/TextButton";
import { MdEdit, MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import styles from "../Common.module.css";
import { format, parse } from "date-fns";
import { MdDeleteOutline } from "react-icons/md";
import { GoTrash } from "react-icons/go";

const Education = ({
  qualifications,
  onClickAdd,
  onClickEdit,
  onClickDelete,
}) => {
  const formattedDate = (dateString) => {
    if (!dateString) return "";
    const date = parse(dateString, "yyyy-MM-dd", new Date());
    const day = format(date, "do");
    const monthYear = format(date, "MMMM, yyyy");
    return `${day} ${monthYear}`;
  };

  return (
    <div className={`${styles["education-container"]} padding-bottom padding`}>
      <div className={`${styles["education-qualification"]}`}>
        <div className={`${styles["education-qualification-content"]}`}>
          <div className={`${styles["education-title"]}`}>
            <h2 className={`${styles["education-title2"]}`}>
              Educational Qualification
            </h2>
          </div>
          <div className={`${styles["education-qualification-add-button"]}`}>
            <div className={`${styles["education-qualification-button"]}`}>
              <TextButton
                icon={<IoMdAdd />}
                text="Add Educational Qualification"
                onClick={onClickAdd}
              />
            </div>
          </div>
        </div>
        <div className={`${styles["education-qualifications-list"]}`}>
          <div>
            <ol type="1" className={`${styles["education-list-box"]}`}>
              {qualifications && qualifications.length > 0 ? (
                qualifications.map((qualification, index) => (
                  <li
                    key={qualification.qualificationId}
                    className={`${styles["education-qualification-instance"]}`}
                  >
                    <div className={`${styles["education-maindiv"]}`}>
                      <h3
                        className={`${styles["education-qualification-name"]}`}
                      >
                        {qualification.degree}
                      </h3>
                      <p>{qualification.institution}</p>
                      <p>Percentage: {qualification.percentage}</p>
                      <p>
                        {formattedDate(qualification.startDate)} -{" "}
                        {formattedDate(qualification.endDate)}
                      </p>
                      <p>Specialization: {qualification.specialization}</p>
                    </div>
                    <div
                      className={`${styles["education-qualification-mod-buttons"]}`}
                    >
                      <div
                        className={`${styles["education-qualification-button"]}`}
                      >
                        <TextButton
                          icon={<MdEdit />}
                          text="Edit"
                          onClick={() => onClickEdit(index)}
                        />
                      </div>
                      <div
                        className={`${styles["education-qualification-button"]}`}
                      >
                        <TextButton
                          onClick={onClickDelete}
                          icon={<GoTrash />}
                          isDelete="true"
                          text="Delete"
                        />
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <div
                  style={{ textAlign: "left", color: "var(--neutral600)" }}
                  className={`${styles["education-no-qualifications"]}`}
                >
                  No qualifications to display
                </div>
              )}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
