import React from "react";
import PropTypes from "prop-types";
import styles from "../Common.module.css";
import PrimaryButton from "../../../components/buttons/PrimaryButton";

const LogoutBox = ({ title, message, buttonText, onCancel, onLogout }) => {
  return (
    <div className={`${styles["deletebox-box"]}`}>
      <div className={`${styles["deletebox-content"]}`}>
        <h2 className={`${styles["deletebox-title"]}`}>{title}</h2>
        <div className={`${styles["deletebox-message"]}`}>
          <p>{message}</p>
        </div>
      </div>
      <div className={`${styles["deletebox-button"]}`}>
        <PrimaryButton
          content="Cancel"
          variant="secondary"
          width="full"
          onClick={onCancel}
        />
        <PrimaryButton
          content={buttonText}
          variant="primary"
          width="full"
          onClick={onLogout}
        />
      </div>
    </div>
  );
};

LogoutBox.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default LogoutBox;
