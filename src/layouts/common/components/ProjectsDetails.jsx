import React from "react";
import styles from "../Common.module.css";
import NavButton from "../../../components/buttons/NavButton";
import AttendanceButton from "../../../components/buttons/AttendanceButton";
import StackCard from "../../../components/cards/StackCard";
const ProjectsDetails = (props) => {
  const {
    projectTitle,
    projectLevel,
    description,
    problemStatement,
    requiredFeatures,
    stacksUsed,
  } = props;
  return (
    <div className={`${styles["projectdescription-container"]}`}>
      <div className={`${styles["projectdescription-topleft"]}`}>
        <div className={`${styles["projectdescription-navbutton"]}`}>
          <div>
            <NavButton pageName={projectTitle} />
          </div>
        </div>
      </div>

      <div className={`${styles["projectdescription-description"]}`}>
        <div className={`${styles["projectdescription-buttondiv"]}`}>
          <div className={`${styles["projectdescription-buttondiv2"]}`}>
            <div className={`${styles["projectdescription-content"]}`}>
              <div>
                <h2 className={`${styles["projectdescription-contentheading"]}`}>
                  {projectTitle}
                </h2>
              </div>
              <div className={`${styles["projectdescription-texted"]}`}>
                <a className={`${styles["projectdescription-text"]}`}>
                  Level : {projectLevel}
                </a>
              </div>
            </div>
          </div>

          <div className={`${styles["projectdescription-gap"]}`}>
            <div className={`${styles["projectdescription-headingcontent"]}`}>
              <h3>Objective</h3>
            </div>
            <div className={`${styles["projectdescription-desc"]}`}>
              <p>{description}</p>
            </div>
          </div>
          <div className={`${styles["projectdescription-gap"]}`}>
            <div className={`${styles["projectdescription-headingcontent"]}`}>
              <h3>Problem Statement</h3>
            </div>
            <div className={`${styles["projectdescription-desc"]}`}>
              <p>{problemStatement}</p>
            </div>
          </div>
          <div className={`${styles["projectdescription-gap"]}`}>
            <div className={`${styles["projectdescription-headingcontent"]}`}>
              <h3>Required Features</h3>
            </div>
            <div className={`${styles["projectdescription-desc"]}`}>
              <p>{requiredFeatures}</p>
            </div>
          </div>
          <div className={`${styles["projectdescription-gap"]}`}>
            <div className={`${styles["projectdescription-headingcontent"]}`}>
              <h3>Stack Used</h3>
            </div>
            <div className={`${styles["project-stackused"]}`}>
              {stacksUsed.map((stack, index) => (
                <div className={`${styles["project-stackusedcard"]}`}>
                  <StackCard
                    content={stack}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsDetails;
