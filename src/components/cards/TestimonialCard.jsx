import React from "react";
import PropTypes from "prop-types";
import styles from "./TestimonialCard.module.css";

const TestimonialCard = ({
  name,
  info,
  place,
  description,
  profilePicture,
}) => {
  const truncateText = (text, limit) => {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  };
  return (
    <div className={styles.testimonialbox}>
      <div className={styles.testimonialcontent}>
        <img src={profilePicture} alt="Profile" className={styles.profile} />
        <div className={styles.details}>
          <div className={styles.name}>{name}</div>
          <div className={styles.info}>{info}</div>
          <div className={styles.place}>{place}</div>
        </div>
      </div>
      <div className={styles.description} title={description}>{truncateText(description, 350)}</div>
    </div>
  );
};

TestimonialCard.propTypes = {
  name: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  profilePicture: PropTypes.string.isRequired,
};

export default TestimonialCard;
