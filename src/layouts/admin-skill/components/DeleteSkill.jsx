import React, { useState } from "react";
import PropTypes from "prop-types";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import DeleteButton from "../../../components/buttons/DeleteButton";
import styles from "../AdminSkill.module.css";
import InputDropdown from "../../../components/inputdropdown/InputDropdown";
import { useSkills } from "../../../pages/admin/admin-skills/AdminSkillContext";

const DeleteSkill = ({ onSubmit, onCancel }) => {
  const { skills } = useSkills();
  const [selectedSkill, setSelectedSkill] = useState(null); 
  const [error, setError] = useState("");

  const handleInputChange = (selectedSkill) => {
    setSelectedSkill(selectedSkill); 
    setError(""); 
  };

  const validateSkill = () => {
    if (!selectedSkill) {
      return "Please select a skill.";
    }
    return "";
  };

  const handleDeleteSkill = () => {
    const validationError = validateSkill();
    if (validationError) {
      setError(validationError);
      return;
    }
    onSubmit(selectedSkill); 
    console.log(selectedSkill) ;
  };

  const options = skills.map((skill) => ({
    label: `${skill.skillName} (${skill.id})`,
    value: skill.id,
  }));
  

  return (
    <div className={`${styles["deleteskill-boxcontainer"]}`}>
      <div className={`${styles["deleteskill-layoutcontainer"]}`}>
        <p>Delete Skill</p>
        <div className={`${styles["deleteskill-inputbox"]}`}>
          <InputDropdown
            label="Select Skill"
            placeholder="Select skill..."
            options={options}
            value={selectedSkill}
            onChange={handleInputChange}
          />
        </div>
        {error && <div className={`${styles["error-message"]}`}>{error}</div>}
        <div className={`${styles["deleteskill-buttonrow"]}`}>
          <PrimaryButton
            variant="secondary"
            content="Cancel"
            onClick={onCancel}
            width="full"
          />
          <DeleteButton
            content="Delete"
            variant="tertiary"
            width="full"
            onClick={handleDeleteSkill}
          />
        </div>
      </div>
    </div>
  );
};

DeleteSkill.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default DeleteSkill;
