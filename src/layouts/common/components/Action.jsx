import React, { useState } from "react";
import styles from "../Common.module.css";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import Searchbar from "../../../components/searchbar/Searchbar";
import Filter from "../../../components/filter/Filter";

const ActionComponent = ({
  count,
  onSearchChange,
  buttonProps,
  showDelete,
  deleteProps,
  heading,
  filterProps = [],
  resetProps,
  showFiltersAndReset,
  searchWidth = "full",
  onFilterChange,
  searchPlaceholder,
  combinedFilter = true,
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

    if (!combinedFilter) {
      if (filterProps[index].Heading === "College") {
        const batchIndex = filterProps.findIndex(
          (filter) => filter.Heading === "Batch"
        );
        if (batchIndex !== -1) {
          newFilterStates[batchIndex] = {
            heading: filterProps[batchIndex].Heading,
            selectedOption: filterProps[batchIndex].defaultOption || "",
            selectedOptionValue: filterProps[batchIndex].defaultValue || "",
          };
        }
      } else if (filterProps[index].Heading === "Batch") {
        const collegeIndex = filterProps.findIndex(
          (filter) => filter.Heading === "College"
        );
        if (collegeIndex !== -1) {
          newFilterStates[collegeIndex] = {
            heading: filterProps[collegeIndex].Heading,
            selectedOption: filterProps[collegeIndex].defaultOption || "",
            selectedOptionValue: filterProps[collegeIndex].defaultValue || "",
          };
        }
      }
    }

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
      <div className={styles["common-content"]}>
        <div className={styles["common-top"]}>
          <div className={styles["common-heading"]}>
            <span>{heading}</span>
            <span className={styles["common-count"]}> (Count : {count})</span>
          </div>
          <div className={styles["common-buttons"]}>
            <PrimaryButton {...buttonProps} />
          </div>
        </div>
        <div className={styles["common-bottom"]}>
          <div
            className={`${styles["common-search"]} ${
              styles[`common-${searchWidth}`]
            }`}
          >
            <Searchbar
              placeholder={searchPlaceholder}
              onSearch={handleSearchChange}
              variant="large"
            />
          </div>
          {showFiltersAndReset && (
            <div className={styles["common-right"]}>
              <div className={styles["common-filter"]}>
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
                    selectedOption={
                      filterStates[index]
                        ? filterStates[index].selectedOption
                        : ""
                    }
                  />
                ))}
              </div>
              <div className={styles["common-reset"]}>
                <PrimaryButton {...resetProps} onClick={handleReset} />
              </div>
            </div>
          )}
          {showDelete && (
            <div className={styles["common-deletebutton"]}>
              <PrimaryButton {...deleteProps} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActionComponent;
