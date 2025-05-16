import React, { useState } from "react";
import styles from "../Common.module.css";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import Searchbar from "../../../components/searchbar/Searchbar";
import Filter from "../../../components/filter/Filter";
import NavButton from "../../../components/buttons/NavButton";
import TextButton from "../../../components/buttons/TextButton";

const BatchSearch = ({
  participantCount,
  textbuttonProps,
  textbuttonProps2,
  navbuttonProps,
  addbuttonProps,
  searchbarProps,
  filterProps = [],
  resetProps,
  showFiltersAndReset,
  showTextButton,
  showReset,
  showAdd,
  showSearch = true,
  onSearchChange,
  onFilterChange,
  searchTerm,
  setSearchTerm,
  explorepage  
}) => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [filterStates, setFilterStates] = useState(
    filterProps.map((filter) => ({
      heading: filter.Heading,
      selectedOption: filter.defaultOption || "",
      selectedOptionValue: filter.defaultValue || "",
    }))
  );

  const handleToggle = (index) => {
    setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleOptionClick = (index, arrayIndex, option) => {
    const newFilterStates = [...filterStates];
    newFilterStates[index] = {
      heading: filterProps[index].Heading,
      selectedOption: option,
      selectedOptionValue: filterProps[index].Value[arrayIndex],
    };
    setFilterStates(newFilterStates);
    const filtersObject = {};
    newFilterStates.forEach((filter) => {
      filtersObject[filter.heading] = filter.selectedOptionValue;
    });
    onFilterChange(filtersObject);
    setOpenDropdownIndex(null);
  };

  const handleReset = () => {
    const defaultStates = filterProps.map((filter) => ({
      heading: filter.Heading,
      selectedOption: filter.defaultOption || "",
      selectedOptionValue: null,
    }));
    setFilterStates(defaultStates);
    const filtersObject = {};
    defaultStates.forEach((filter) => {
      filtersObject[filter.heading] = filter.selectedOptionValue;
    });
    filtersObject.StudentIds = "";
    onFilterChange(filtersObject);
  };

  const handleSearchChange = async (value) => {
    console.log(value);
    onSearchChange(value);
  };

  return (
    <div className="padding">
      <div className={`${styles["batchsearch-content"]}`}>
        <div className={`${styles["batchsearch-top"]}`}>
          <div className={`${styles["batchsearch-heading"]}`}>
            <b>
              <NavButton {...navbuttonProps} />
            </b>{" "}
            <a style={{ fontSize: "16px" }}> (Count: {participantCount})</a>
          </div>
          {showTextButton && (
            <div className={`${styles["batchsearch-textbutton"]}`}>
              <div>
                <TextButton {...textbuttonProps} />
              </div>
              <div>
                <TextButton isDelete="true" {...textbuttonProps2} />
              </div>
            </div>
          )}
        </div>
        <div className={`${styles["batchsearch-bottom"]}`}>
          {showSearch && (
            <div className={`${styles["batchsearch-search"]}`}>
              <Searchbar
                {...searchbarProps}
                onSearch={explorepage ?handleSearchChange  : setSearchTerm}
                value={searchTerm}
              />
            </div>
          )}
          <div className={`${styles["batchsearch-right"]}`}>
            {showFiltersAndReset && (
              <div className={`${styles["batchsearch-filter"]}`}>
                {filterProps.map((props, index) => (
                  <Filter
                    key={index}
                    initialHeading={props.Heading}
                    Content={props.Content}
                    isOpen={openDropdownIndex === index}
                    onToggle={() => handleToggle(index)}
                    onOptionClick={(option) =>
                      handleOptionClick(
                        index,
                        props.Content.indexOf(option),
                        option
                      )
                    }
                    selectedOption={filterStates[index].selectedOption} // Pass the selectedOption property
                  />
                ))}
              </div>
            )}
            {showAdd && (
              <div className={`${styles["batchsearch-addbutton"]}`}>
                <PrimaryButton {...addbuttonProps} />
              </div>
            )}
            {showReset && (
              <div className={`${styles["batchsearch-addbutton"]}`}>
                <PrimaryButton {...resetProps} onClick={handleReset} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchSearch;
