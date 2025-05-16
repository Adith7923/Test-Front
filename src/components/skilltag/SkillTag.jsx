import React from "react";
import styles from "./SkillTag.module.css";

const SkillTag = (props) => {
  const { title, subTitle, onCloseIcon } = props;

  return (
    <div className={styles.card}>
      <div className={styles.innerbox}>
        <a className={styles.title}>{title}</a>
      </div>
    </div>
  );
};

export default SkillTag;
