import React, { useState, useEffect } from "react";
import InputBox from "../../components/inputbox/InputBox";
import InputDropdown from "../../components/inputdropdown/InputDropdown";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import styles from "./AddTest.module.css"; // or use TestForm.module.css if shared
import  NavButton from "../../components/buttons/NavButton";
const EditTest = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState({
    testName: "",
    level: "",
    numOfQuestions: "",
    duration: "",
    skill: "",
    topics: "",
    passPercentage: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const levelOptions = [
    { label: "Easy", value: "easy" },
    { label: "Moderate", value: "moderate" },
    { label: "Hard", value: "hard" },
  ];

  const skillOptions = [
    { label: "JavaScript", value: "js" },
    { label: "React", value: "react" },
    { label: "Node.js", value: "node" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDropdownChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Test Data:", formData);
    if (onSubmit) onSubmit(formData); // optional callback
  };

  return (
    <div className={styles.addTestContainer}>
      <div className={styles.editTestTopbar}>
                <NavButton pageName="Edit Test" />
              </div>
      <h2 className={styles.heading}>Edit Test</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Line 1: Test Name + Level */}
        <div className={styles.formRow}>
          <InputBox
            size="normal"
            label="Test Name"
            placeholders={["Enter test name"]}
            name="testName"
            value={formData.testName}
            onChange={handleChange}
          />
          <InputDropdown
            label="Level"
            placeholder="Select level"
            options={levelOptions}
            value={formData.level}
            onChange={(val) => handleDropdownChange("level", val)}
          />
        </div>

        {/* Line 2: No. of Questions + Duration + Skill */}
        <div className={styles.formRow}>
          <InputBox
            size="normal"
            label="No. of Questions"
            placeholders={["Enter number"]}
            name="numOfQuestions"
            value={formData.numOfQuestions}
            onChange={handleChange}
            type="number"
          />
          <InputBox
            size="normal"
            label="Duration (minutes)"
            placeholders={["Enter duration"]}
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            type="number"
          />
          <InputDropdown
            label="Skill"
            placeholder="Select skill"
            options={skillOptions}
            value={formData.skill}
            onChange={(val) => handleDropdownChange("skill", val)}
          />
        </div>

        {/* Line 3: Topics + Pass Percentage */}
        <div className={styles.formRow}>
          <InputBox
            size="normal"
            label="Topics"
            placeholders={["Enter topics (comma separated)"]}
            name="topics"
            value={formData.topics}
            onChange={handleChange}
          />
          <InputBox
            size="normal"
            label="Pass Percentage"
            placeholders={["Enter pass percentage (e.g. 50)"]}
            name="passPercentage"
            value={formData.passPercentage}
            onChange={handleChange}
            type="number"
          />
        </div>

        {/* Submit Button */}
        <div className={styles.buttonContainer}>
          <PrimaryButton
            content="Update Test"
            variant="primary"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default EditTest;
