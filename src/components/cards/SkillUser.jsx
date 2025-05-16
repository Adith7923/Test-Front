import React, { useState, useEffect, useRef } from "react";
import styles from "./SkillUser.module.css";
import { ImCross } from "react-icons/im";
import { FaPlus } from "react-icons/fa";
import NoData from "../nodata/NoData";

const SkillUser = ({
  miniHeading,
  mainHeading,
  alttext,
  profilepic,
  skills,
  handleClick,
  addSkill,
  deleteSkill,
}) => {
  const isVisible = false;

  const transformMainHeading = (heading) => {
    if (heading.length > 12) {
      return heading.slice(0, 10) + "...";
    }
    return heading;
  };

  const transformMiniHeading = (heading) => {
    if (heading.length > 17) {
      return heading.slice(0, 15) + "...";
    }
    return heading;
  };

  const transformSkillName = (heading) => {
    if (heading.length > 8) {
      return heading.slice(0, 6) + "...";
    }
    return heading;
  };

  const [showAllSkills, setShowAllSkills] = useState(false);
  const [overlap, setOverlap] = useState(false);

  const cardRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setOverlap(false);
        setShowAllSkills(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const displayedSkills = showAllSkills ? skills : skills.slice(0, 2);
  const hiddenSkillsCount = skills.length - 2;

  return (
    <div
      ref={cardRef}
      className={`container ${styles.cards} ${overlap ? styles.overlapClass : ""}`}
    >
      <div className={`row ${styles.cardsClass}`} onClick={handleClick}>
        <div className={`col-md-6 ${styles.profile}`}>
          <div className={`${styles.profilepiccontainer}`}>
            <img
              src={profilepic}
              className={`${styles.profilepicture}`}
              alt={alttext}
            />
          </div>
          <div className={`${styles.heading}`}>
            <div className={`${styles.cardsmainheading}`} title={mainHeading}>
              {transformMainHeading(mainHeading)}
            </div>
            <div className={`${styles.cardsminiheading}`} title={miniHeading}>
              {transformMiniHeading(miniHeading)}
            </div>
          </div>
        </div>

        <div className={`col-md-6 ${styles.lower}`}>
          <div className={styles.buttons}>
            <div className={`row ${styles.buttonsContainer}`}>
              {skills.length > 0 ? (
                displayedSkills.map((skill, index) => (
                  <div
                    key={index}
                    className={`col-6 ${styles.button}`}
                    title={skill.skillName}
                  >
                    {transformSkillName(skill.skillName)}
                    {isVisible && (
                      <ImCross
                        onClick={() => deleteSkill(index)}
                        style={{
                          cursor: "pointer",
                          fontSize: "10px",
                        }}
                      />
                    )}
                  </div>
                ))
              ) : (
                <a className={styles.noSkills}>No skills to display</a>
              )}
            </div>
            {skills.length > 2 && (
              <div
                className={`btn ${styles.viewButton}`}
                onClick={() => {
                  setShowAllSkills(!showAllSkills);
                  setOverlap(!overlap);
                }}
              >
                {showAllSkills ? "View Less" : `+ ${hiddenSkillsCount} more`}
              </div>
            )}
            <div className={`col-6 ${styles.addButtonContainer}`}>
              {isVisible && (
                <button
                  className={`btn ${styles.addButton}`}
                  onClick={addSkill}
                >
                  <FaPlus
                    style={{
                      cursor: "pointer",
                      fontSize: "26px",
                    }}
                  />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillUser;
