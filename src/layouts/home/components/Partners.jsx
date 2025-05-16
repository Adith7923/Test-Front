import React from "react";
import styles from "../Home.module.css";

const Partners = (props) => {
  const { title, Images } = props;
  return (
    <div className={styles[`partners-container`]}>
      <div className={styles[`partners-title`]}>
        <h1>{title}</h1>
      </div>
      <div className={styles["partners-icons"]}>
        {Images.map((image, index) => (
          <img
            src={image}
            alt={`Img${index + 1}`}
            key={index}
            className={styles["partners-profileimage"]}
          />
        ))}
      </div>
    </div>
  );
};

export default Partners;
