import React, { useState } from "react";
import { IoIosCloseCircle, IoIosSearch } from "react-icons/io";
import styles from "./Searchbar.module.css";
 
const SearchBar = ({ variant = "large", placeholder, onSearch, value }) => {
  const [query, setQuery] = useState(value || "");
 
  const handleSearchChange = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
    onSearch(searchQuery);
  };
 
  const clearSearch = () => {
    setQuery("");
    onSearch("");
  };
 
  let boxClassName;
  if (variant === "large") {
    boxClassName = styles.box;
  } else if (variant === "small") {
    boxClassName = styles["small-box"];
  } else if (variant === "custom") {
    boxClassName = styles["custom-box"];
  } else {
    boxClassName = styles.none;
  }
 
  return (
    <div className={boxClassName}>
      <div className={styles["search-box"]}>
        <input
          type="text"
          className={styles["search-input"]}
          placeholder={placeholder}
          value={query}
          onChange={handleSearchChange}
        />
         <button
          type="button"
          className={styles["icon-button"]}
          onClick={query ? clearSearch : () => onSearch(query)}
        >
          {query ? (
            <IoIosCloseCircle className={styles.icon} />
          ) : (
            <IoIosSearch className={styles.icon} />
          )}
        </button>
      </div>
    </div>
  );
};
 
export default SearchBar;