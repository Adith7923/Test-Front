import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "../Common.module.css";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import DeleteButton from "../../../components/buttons/DeleteButton";

const DeleteBox = ({ title, message, buttonText, onCancel, onConfirm }) => {
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
        <DeleteButton
          content={buttonText}
          variant="tertiary"
          width="full"
          onClick={onConfirm}
        />
      </div>
    </div>
  );
};

DeleteBox.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default DeleteBox;
