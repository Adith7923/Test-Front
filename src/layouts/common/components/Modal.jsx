import React from "react";
import ReactModal from "react-modal";
import PropTypes from "prop-types";
import styles from "../Common.module.css";

const widthVariants = {
  small: "549px",
  medium: "704px",
  large: "914px",
};

const Modal = ({
  children,
  isOpen,
  onClose,
  widthVariant = "large",
  closeTimeoutMS = 200,
  shouldCloseOnOverlayClick = true,
  shouldCloseOnEsc = true,
  ariaHideApp = true,
  overlayClassName = styles["modal-modalOverlay"],
  ...otherProps
}) => {
  const modalClass = `${styles["modal-modalContent"]} ${styles[`modal-width-${widthVariant}`]}`;

  ReactModal.setAppElement(ariaHideApp ? "#root" : "");

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={modalClass}
      overlayClassName={overlayClassName}
      closeTimeoutMS={closeTimeoutMS}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      shouldCloseOnEsc={shouldCloseOnEsc}
      {...otherProps}
    >
       <div className={styles["modal-contentScrollable"]}>{children}
       </div>
    </ReactModal>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  widthVariant: PropTypes.oneOf(["small", "medium", "large"]),
  closeTimeoutMS: PropTypes.number,
  shouldCloseOnOverlayClick: PropTypes.bool,
  shouldCloseOnEsc: PropTypes.bool,
  ariaHideApp: PropTypes.bool,
  overlayClassName: PropTypes.string,
};

export default Modal;

