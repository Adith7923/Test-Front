import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Common.module.css";
import NavButton from "../../../components/buttons/NavButton";
import PrimaryButton from "../../../components/buttons/PrimaryButton";

const TestDescription = ({
  testId, // ✅ Add testId to props
  testTitle,
  level,
  skill,
  mentor,
  topics,
  noOfQuestions,
  duration,
  passPercentage,
  buttonLabel,
  onClick,
  showButton,
}) => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/admin/tests/${testId}/edit-test`);
  };


  return (
    <div className={styles["testdescription-container"]}>
      {/* NavButton at the top */}
      <div className={styles["testdescription-topbar"]}>
        <NavButton pageName="Test Details" />
      </div>

      {/* Heading and Edit button */}
      <div className={styles["testdescription-headerbar"]}>
        <h2 className={styles["testdescription-contentheading"]}>
          Test Details
        </h2>
        <PrimaryButton
          content="Edit Test"
          variant="secondary"
          onClick={handleEditClick}
        />
      </div>

      <div className={styles["testdescription-description"]}>
        <div className={styles["testdescription-buttondiv"]}>
          <div className={styles["testdescription-buttondiv2"]}>
            <div className={styles["testdescription-content"]}>
              <div className={styles["testdescription-grid"]}>
                <div className={styles["testdescription-field"]}>
                  <h3>Test Name</h3>
                  <p>{testTitle}</p>
                </div>
                <div className={styles["testdescription-field"]}>
                  <h3>Level</h3>
                  <p>{level}</p>
                </div>
                <div className={styles["testdescription-field"]}>
                  <h3>Skill</h3>
                  <p>{skill}</p>
                </div>
                <div className={styles["testdescription-field"]}>
                  <h3>Mentor</h3>
                  <p>{mentor}</p>
                </div>
                <div className={styles["testdescription-field"]}>
                  <h3>Topics</h3>
                  <p>{topics}</p>
                </div>
                <div className={styles["testdescription-field"]}>
                  <h3>No. of Questions</h3>
                  <p>{noOfQuestions}</p>
                </div>
                <div className={styles["testdescription-field"]}>
                  <h3>Duration</h3>
                  <p>{duration} mins</p>
                </div>
                <div className={styles["testdescription-field"]}>
                  <h3>Pass Percentage</h3>
                  <p>{passPercentage}%</p>
                </div>
              </div>
            </div>

            {showButton && (
              <div className={styles["testdescription-primarydiv"]}>
                <PrimaryButton
                  content={buttonLabel}
                  variant="secondary"
                  onClick={onClick}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestDescription;
