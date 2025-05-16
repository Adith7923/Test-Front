import React from "react";
import styles from "./DeleteButton.module.css";

const DeleteButton = (props) => {
  const { variant, content, onClick, width } = props;

  let widthSize;
  if (width === "full") {
    widthSize = styles.full;
  } else if (width === "half") {
    widthSize = styles.half;
  } else {
    widthSize = "";
  }

  return (
    <button
      className={`${styles.button} ${styles[variant]} ${widthSize}`}
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export default DeleteButton;
