import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import styles from "../AdminSkill.module.css";
import Input from "../../../components/inputbox/InputBox";

const AddSkill = ({ onSubmit, onCancel, error }) => {
  const [skill, setSkill] = useState("");
  const [localError, setLocalError] = useState("");

  const handleInputChange = (event) => {
    setSkill(event.target.value);
    setLocalError("");
  };

  const addSkillRef = useRef(null);

  useEffect(() => {
    if (addSkillRef.current) {
      addSkillRef.current.focus();
    }
  }, []);

  const validateSkill = (skill) => {
    if (!skill.trim()) {
      return "Skill cannot be empty.";
    }
    if (/^\s/.test(skill)) {
      return "Skill cannot start with a space.";
    }
    if (!/[a-zA-Z]/.test(skill)) {
      return "Skill must contain at least one letter.";
    }
    return "";
  };

  const handleAddSkill = () => {
    const validationError = validateSkill(skill);
    if (validationError) {
      setLocalError(validationError);
      return;
    }
    onSubmit(skill);
  };

  return (
    <div className={`${styles["addskill-boxcontainer"]}`}>
      <div className={`${styles["addskill-layoutcontainer"]}`}>
        <p>Create New Skill</p>
        <div className={`${styles["addskill-inputbox"]}`}>
          <Input
            ref={addSkillRef}
            size="normal"
            label="Create Skills"
            placeholders={["Skills"]}
            value={skill}
            onChange={handleInputChange}
            id="normal-input"
          />
        </div>
        {(localError || error) && (
          <div className={`${styles["error-message"]}`}>
            {localError || error}
          </div>
        )}
        <div className={`${styles["addskill-buttonrow"]}`}>
          <PrimaryButton
            variant="secondary"
            content="Cancel"
            onClick={onCancel}
            width="full"
          />
          <PrimaryButton
            variant="primary"
            content="Add"
            onClick={handleAddSkill}
            width="full"
          />
        </div>
      </div>
    </div>
  );
};

AddSkill.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default AddSkill;
