import React from "react";
import styles from "./ProgressBar.module.css";

const ProgressBar = ({ showHeading, heading, percentage }) => {
  return (
    <div>
      <div className={styles.container}>
        {showHeading && <h3 className={styles.heading}>{heading}</h3>}
        <div className={styles.progressContainer}>
          <div className={styles.progressText}>
            {`${percentage}% Completed`}
          </div>
          <div className={styles.progressBarBackground}>
            <div
              className={styles.progressBarFill}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
