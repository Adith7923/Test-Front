import { isEmail, isURL, isMobilePhone, isNumeric, isBefore } from "validator";
import { countries } from "countries-list";

//Email Validation
export const validateEmail = (value) => {
  return (
    !value ||
    isEmail(value) ||
    "Invalid email address. Please enter a valid email."
  );
};

//Phone Number Validation
export const validatePhone = (value) => {
  if (!value) {
    return true;
  }
  const valueStr = value.toString();
  if (!/^\d+$/.test(valueStr)) {
    return "Invalid phone number. The phone number must contain only digits.";
  }
  console.log(valueStr.length);
  if (valueStr.length !== 10) {
    return "Invalid phone number. The phone number must contain exactly 10 digits.";
  }

  if (!isMobilePhone(valueStr)) {
    return "Invalid phone number. Please enter a valid phone number.";
  }

  return true;
};

//URL Validation
export const validateURL = (value) => {
  return !value || isURL(value) || "Invalid URL. Please enter a valid URL.";
};

//Image File Validation
export const validateImageFile = (file, setFileError, setError) => {
  if (file && !file.type.startsWith("image/")) {
    const errorMessage = "Invalid file type. Please upload an image file.";
    setFileError(errorMessage);
    setError("profilePhoto", {
      type: "manual",
      message: errorMessage,
    });
    return false;
  }
  setFileError("");
  return true;
};

//Number Validation
export const validateNumber = (type) => (value) => {
  if (type === "others") {
    const valStr = value.toString();
    return (
      !value || isNumeric(valStr) || "This field should contain only digits."
    );
  }
  if (type === "postalCode") {
    const valStr = value.toString();
    return (
      !value ||
      (isNumeric(valStr) && valStr.length === 6) ||
      "This field should contain only digits and have a length of 6."
    );
  }
  return true;
};

//Start Date Validation
export const validateStartDate = (type) => (value, allValues) => {
  if (type === "new") {
    const currentDate = new Date();
    const startDate = new Date(value);

    if (isNaN(startDate.getTime())) {
      return "Start date is required";
    }

    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();

    const startYear = startDate.getFullYear();
    const startMonth = startDate.getMonth();
    const startDay = startDate.getDate();
    if (
      startYear > currentYear ||
      (startYear === currentYear && startMonth > currentMonth) ||
      (startYear === currentYear &&
        startMonth === currentMonth &&
        startDay > currentDay) ||
      (startYear === currentYear &&
        startMonth === currentMonth &&
        startDay === currentDay)
    ) {
      return true;
    }

    return "Start date must be on or after the current date.";
  }
  if (type === "edit") {
    const currentDate = new Date();
    const startDate = new Date(value);
    if (isNaN(startDate.getTime())) {
      return "Start date is required";
    }
    return true;
  }
};

//End Date Validation
export const validateEndDate = (value, allValues) => {
  const startDate = allValues.startDate;
  if (value === undefined || !value) {
    return "End date is required";
  }
  if (startDate && isBefore(value, startDate)) {
    return "End date must be after start date.";
  }
  return true;
};

//Input Entry Validation
export const validateAndCleanInput = (value) => {
  if (/^[\s\W_]/.test(value)) {
    return "Invalid entry: the field should not start with white spaces or symbols.";
  }
  return true;
};

//Country Name Validation
export const validateCountry = (value) => {
  const countryNames = Object.values(countries).map((country) => country.name);
  return (
    !value ||
    countryNames.includes(value) ||
    "Invalid country name. Please enter a valid country."
  );
};

// State Validation
export const validateState = (value) => {
  if (!value) {
    return true;
  }

  if (/^[a-zA-Z\s]+$/.test(value)) {
    return true;
  } else {
    return "Invalid state name. Please enter a valid state without numbers or symbols.";
  }
};
