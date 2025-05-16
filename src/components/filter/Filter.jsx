import React, { useState, useRef, useEffect } from "react";
import styles from "./Filter.module.css";
import { FaAngleDown } from "react-icons/fa";

const Filter = ({
  initialHeading,
  Content,
  isOpen,
  onToggle,
  onOptionClick,
  selectedOption,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [localSelectedOption, setLocalSelectedOption] = useState(
    selectedOption || initialHeading
  );
  const headingRef = useRef(null);
  const dropRef = useRef(null);

  useEffect(() => {
    setLocalSelectedOption(selectedOption || initialHeading);
  }, [selectedOption, initialHeading]);

  const transformContent = (content) => {
    if (content.length > 24) {
      return content.slice(0, 20) + "...";
    }
    return content;
  };

  const toggleDropdown = (newIsOpen) => {
    const toggleFn = onToggle || setInternalIsOpen;
    toggleFn(newIsOpen);
  };

  const handleOptionClick = (option) => {
    setLocalSelectedOption(option);
    toggleDropdown(false);
    onOptionClick && onOptionClick(option);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropRef.current && !dropRef.current.contains(event.target)) {
        toggleDropdown(false);
      }
    };

    const currentIsOpen = isOpen !== undefined ? isOpen : internalIsOpen;

    if (currentIsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, internalIsOpen]);

  const currentIsOpen = isOpen !== undefined ? isOpen : internalIsOpen;

  const dropdownWidth = headingRef.current
    ? headingRef.current.offsetWidth
    : "auto";

  return (
    <div className={styles.filter} ref={dropRef}>
      <div
        className={styles.filterClass}
        onClick={() => toggleDropdown(!currentIsOpen)}
        ref={headingRef}
      >
        <span className={styles.selectedOption}>
          {transformContent(localSelectedOption)}
        </span>
        <div className={styles.iconAngleDown}>
          <FaAngleDown />
        </div>
      </div>
      {currentIsOpen && (
        <div className={styles.drop} style={{ minWidth: dropdownWidth }}>
          {Content.map((content, index) => (
            <div
              className={styles.dropcontent}
              key={index}
              onClick={() => handleOptionClick(content)}
            >
              <a title={content}>{transformContent(content)}</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Filter;
