import React, { useState } from "react";
import styles from "./Dropdown.module.css"; // or use Tailwind if preferred
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Dropdown = ({ title = "Dropdown", children }) => {
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => setOpen((prev) => !prev);

  return (
    <div className={styles.dropdownContainer}>
      <div className={styles.dropdownHeader} onClick={toggleDropdown}>
        <h3>{title}</h3>
        <span className={styles.icon}>{open ? <FaChevronUp /> : <FaChevronDown />}</span>
      </div>
      {open && <div className={styles.dropdownContent}>{children}</div>}
    </div>
  );
};

export default Dropdown;
