import React, { useState } from "react";
import Select from "react-select";
import styles from "./InputDropdown.module.css";

function InputDropdown({
  label,
  placeholder,
  options=[],
  value,
  onChange,
  onBlur,
  isMulti = false,
}) {
  const [isFocused, setIsFocused] = useState(false);

  // Ensure value is initialized properly in case it's undefined
  const selectedValue = isMulti
    ? (value || []).map((val) => options.find((option) => option.value === val))
    : options.find((option) => option.value === value) || null;

  const getControlStyles = (provided) => ({
    ...provided,
    minHeight: "57px",
    borderRadius: 10,
    backgroundColor: "transparent",
    borderColor: isFocused ? "var(--primary-color)" : "var(--neutral600)",
    borderWidth: 1,
    fontSize: "14px",
    boxShadow: isFocused ? "0 0 0 0.2px var(--primary-color)" : "none",
    "&:hover": { borderColor: "var(--primary-color)" },
  });

  const getOptionStyles = (provided, state) => ({
    ...provided,
    color: "var(--white)",
    height: 48,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    fontSize: "14px",
    backgroundColor: state.isSelected
      ? "var(--neutral600)"
      : "var(--neutral800)",
    "&:hover": {
      backgroundColor: "var(--neutral700)",
      color: "var(--white)",
    },
  });

  const getMultiValueStyles = (provided) => ({
    ...provided,
    backgroundColor: "var(--neutral800)",
    color: "var(--white)",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    padding: "5px 10px",
    fontSize: "14px",
    "&:hover": {
      backgroundColor: "var(--neutral700)",
    },
  });

  const getMultiValueLabelStyles = (provided) => ({
    ...provided,
    color: "var(--white)",
  });

  const getMultiValueRemoveStyles = (provided) => ({
    ...provided,
    color: "var(--white)",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "rgba(255, 0, 0, 0)",
      color: "var(--primary-color)",
    },
  });

  return (
    <div>
      {label && <label className={styles.label}>{label}</label>}
      <Select
        value={selectedValue}
        onChange={(selectedOption) =>
          isMulti
            ? onChange(selectedOption.map((option) => option.value))
            : onChange(selectedOption?.value)
        }
        options={options}
        placeholder={placeholder}
        className={styles.selectField}
        isSearchable
        isMulti={isMulti}
        onFocus={() => setIsFocused(true)}
        onBlur={(event) => {
          setIsFocused(false);
          if (onBlur) {
            onBlur(event);
          }
        }}
        noOptionsMessage={() => null}
        styles={{
          control: getControlStyles,
          option: getOptionStyles,
          multiValue: getMultiValueStyles,
          multiValueLabel: getMultiValueLabelStyles,
          multiValueRemove: getMultiValueRemoveStyles,
          singleValue: (provided) => ({
            ...provided,
            paddingLeft: "17px",
            color: "var(--neutral400)",
          }),
          menu: (provided) => ({
            ...provided,
            marginTop: 0,
            borderRadius: 0,
            borderColor: "var(--primary-color)",
            backgroundColor: "transparent",
            boxShadow: "none",
          }),
          menuList: (provided) => ({
            ...provided,
            padding: 0,
            borderColor: "var(--primary-color)",
            borderRadius: 8,
            maxHeight: "200px",
          }),
          indicatorSeparator: () => ({ display: "none" }),
          input: (provided) => ({
            ...provided,
            paddingLeft: "15px",
            color: "var(--neutral400)",
          }),
          placeholder: (provided) => ({
            ...provided,
            paddingLeft: "15px",
            color: "var(--neutral400)",
          }),
          dropdownIndicator: (provided) => ({
            ...provided,
            cursor: "pointer",
            color: isFocused ? "var(--neutral200)" : "var(--neutral600)",
            "&:hover": {
              color: "var(--neutral200)",
            },
          }),
          clearIndicator: (provided) => ({
            ...provided,
            cursor: "pointer",
            color: isFocused ? "var(--neutral200)" : "var(--neutral600)",
            "&:hover": {
              color: "var(--neutral200)",
            },
          }),
        }}
      />
    </div>
  );
}

export default InputDropdown;
