import React, { useState, forwardRef } from "react";
import { FaRegImage } from "react-icons/fa";
import PropTypes from "prop-types";
import styles from "./InputBox.module.css";

const InputBox = forwardRef(
  (
    {
      size,
      label,
      placeholders,
      value,
      onChange,
      onBlur,
      isDatePicker,
      isTimePicker,
      isFileInput,
      isDropdown,
      options,
      icon,
      ...rest
    },
    ref
  ) => {
    const [clicked, setClicked] = useState(false);
    const [fileName, setFileName] = useState("");

    const handleFocus = () => setClicked(true);

    const handleBlur = (event) => {
      setClicked(false);
      if (onBlur) onBlur(event);
    };

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) setFileName(file.name);
      if (onChange) onChange(event);
    };

    const handleSelectChange = (event) => {
      onChange(event);
      setClicked(false);
    };

    return (
      <div className={`${styles["input-container"]} ${clicked ? styles.clicked : ""}`}>
        <div className={styles["input-label-container"]}>
          <label htmlFor={rest.id} className={styles["input-label"]}>
            {label}
          </label>
          {icon && <span className={styles["input-icon"]}>{icon}</span>}
        </div>

        {(placeholders || [""]).map((placeholder, index) => (
          <React.Fragment key={index}>
            {isDatePicker ? (
              <input
                ref={ref}
                type="date"
                {...rest}
                value={value}
                onChange={onChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={`${styles.input} ${size === "normal" ? styles["normal-size"] : ""} ${size === "small" ? styles["small-size"] : ""}`}
                placeholder={placeholder}
              />
            ) : isTimePicker ? (
              <input
                ref={ref}
                type="time"
                {...rest}
                value={value}
                onChange={onChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={`${styles.input} ${size === "normal" ? styles["normal-size"] : ""} ${size === "small" ? styles["small-size"] : ""}`}
                placeholder={placeholder}
              />
            ) : isFileInput ? (
              <div className={styles["file-input-wrapper"]}>
                <FaRegImage
                  className={`${styles["file-input-icon"]} ${fileName ? styles["file-input-icon-uploaded"] : ""}`}
                />
                <span className={styles["file-input-label"]}>
                  {fileName || placeholder}
                </span>
                <input
                  ref={ref}
                  type="file"
                  {...rest}
                  onChange={handleFileChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  className={`${styles.input} ${styles["large-size"]} ${styles["file-input"]}`}
                />
              </div>
            ) : isDropdown ? (
              <select
                ref={ref}
                {...rest}
                value={value}
                onChange={handleSelectChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={`${styles.input} ${size === "normal" ? styles["normal-size"] : ""} ${size === "small" ? styles["small-size"] : ""}`}
              >
                {options?.map((option, idx) => (
                  <option key={idx} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : size === "large" ? (
              <textarea
                ref={ref}
                {...rest}
                value={value}
                onChange={onChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={`${styles.input} ${styles["large-size"]}`}
                placeholder={placeholder}
              />
            ) : (
              <input
                ref={ref}
                {...rest}
                value={value}
                onChange={onChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={`${styles.input} ${size === "normal" ? styles["normal-size"] : ""} ${size === "small" ? styles["small-size"] : ""}`}
                placeholder={placeholder}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }
);

// ✅ Default Props
InputBox.defaultProps = {
  placeholders: [""],
  options: [],
  size: "normal",
  label: "",
  isDatePicker: false,
  isTimePicker: false,
  isFileInput: false,
  isDropdown: false,
  icon: null,
};

// ✅ Prop Types (optional but helpful)
InputBox.propTypes = {
  size: PropTypes.oneOf(["small", "normal", "large"]),
  label: PropTypes.string,
  placeholders: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.any,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  isDatePicker: PropTypes.bool,
  isTimePicker: PropTypes.bool,
  isFileInput: PropTypes.bool,
  isDropdown: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.any,
    })
  ),
  icon: PropTypes.element,
};

export default InputBox;
