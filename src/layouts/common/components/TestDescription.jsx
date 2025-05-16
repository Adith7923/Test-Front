import React from "react";
import styles from "../Common.module.css"; // Adjust the path accordingly
import NavButton from "../../../components/buttons/NavButton";
import PrimaryButton from "../../../components/buttons/PrimaryButton";

const TestDescription = ({
  testTitle,
  level,
  skill,
  mentor,
  topics,
  noOfQuestions,
  duration,
  passPercentage, // ✅ Add this
  buttonLabel,
  onClick,
  showButton,
}) => {

  return (
    <div className={styles["testdescription-container"]}>
      <div className={styles["testdescription-topleft"]}>
        <div className={styles["testdescription-navbutton"]}>
          <NavButton pageName="Test Details" />
        </div>
      </div>

      <div className={styles["testdescription-description"]}>
        <div className={styles["testdescription-buttondiv"]}>
          <div className={styles["testdescription-buttondiv2"]}>
            <div className={styles["testdescription-content"]}>
              <h2 className={styles["testdescription-contentheading"]}>
                Test Details
              </h2>

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
