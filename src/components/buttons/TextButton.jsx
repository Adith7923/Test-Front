import React from "react";
import styles from "./TextButton.module.css";

const TextButton = (props) => {
  const { icon, text, onClick, isDelete, variant = "default" ,hoverEffect, redSpeaker} = props;
  return (
    <div
    className={`${styles.textbutton} ${styles[variant]} ${hoverEffect ? styles.redHover : ''} ${redSpeaker ? styles.redSpeaker : ''}`}
    onClick={onClick}
  >      {isDelete ? (
        <>
          <div className={`${styles.dicon} ${styles[`${variant}Icon`]}`}>{icon}</div>
          <a className={`${styles.dtext} ${styles[`${variant}Text`]}`}>{text}</a>
        </>
      ) : (
        <>
          <div className={`${styles.icon} ${styles[`${variant}Icon`]}`}>{icon}</div>
          <a className={`${styles.text} ${styles[`${variant}Text`]}`}>{text}</a>
        </>
      )}
    </div>
  );
};

export default TextButton;
