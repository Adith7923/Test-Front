import React from "react";
import PropTypes from "prop-types";
import styles from "../Common.module.css";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import CustomGoogleLoginButton from "../../../components/buttons/CustomGoogleLoginButton";

const LoginBox = ({ title, message, buttonText, onCancel }) => {
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
          content="Close"
          variant="secondary"
          width="full"
          onClick={onCancel}
        />
        <CustomGoogleLoginButton fullWidth/>
      </div>
    </div>
  );
};

LoginBox.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default LoginBox;
