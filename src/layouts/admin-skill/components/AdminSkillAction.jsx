import React, { useState, useEffect } from "react";
import ActionComponent from "../../common/components/Action";
import Modal from "../../common/components/Modal";
import AddSkill from "./AddSkill";
import { createSkill } from "../../../services/Skills";
import { useSkills } from "../../../pages/admin/admin-skills/AdminSkillContext";
import debounce from "lodash/debounce";

const AdminSkillAction = ({ setCardAnimation, count, setFilteredSkills }) => {
  const { skills, setSkills, setChanged } = useSkills();
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [localFilteredSkills, updateFilteredSkills] = useState([]);

  useEffect(() => {
    updateFilteredSkills(skills);
  }, [skills]);

  useEffect(() => {
    const filterSkills = debounce((term) => {
      const lowercasedTerm = term.toLowerCase();
      const filtered = skills.filter((skill) =>
        skill.skillName.toLowerCase().includes(lowercasedTerm)
      );
      updateFilteredSkills(filtered);
      setFilteredSkills(filtered);
    });

    filterSkills(searchTerm);

    return () => filterSkills.cancel();
  }, [searchTerm, skills]);

  const handleOpenModal = () => {
    setIsOpen(true);
    setError("");
    setCardAnimation(false);
  };

  const handleCloseModal = () => {
    setError("");
    setIsOpen(false);
  };

  const handleFormSubmit = async (skill) => {
    try {
      const response = await createSkill({ skillName: skill });
      const newSkill = {
        skillName: response.responseData[0].skillName,
        id: response.responseData[0].id,
        count: response.responseData[0].count,
      };
      newSkill.newEntry = true;
      setCardAnimation(true);
      setSkills([newSkill, ...skills]);
      handleCloseModal();
      setError("");
    } catch (error) {
      console.error("Error adding skill:", error);
      setError("Skill name already exists");
    }
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const AdminSkillActionData = {
    heading: "Skills List",
    buttonProps: {
      variant: "tertiary",
      content: "+ Add New Skill",
      width: "full",
    },
    deleteProps: {
      variant: "primary",
      content: "\u00A0Remove a Skill\u00A0",
      width: "full",
    },
    searchWidth: "large",
    searchbarProps: {
      variant: "custom",
      placeholder: "Skill",
    },
    showFiltersAndReset: false,
    searchPlaceholder: "Search Skill Name",
  };

  const actionData = {
    ...AdminSkillActionData,
    count: localFilteredSkills.length,
    buttonProps: {
      ...AdminSkillActionData.buttonProps,
      onClick: handleOpenModal,
    },
  };

  return (
    <div>
      <ActionComponent
        {...actionData}
        count={localFilteredSkills.length}
        onSearchChange={handleSearchChange}
        skills={localFilteredSkills} 
      />
      <Modal isOpen={isOpen} widthVariant="medium" onClose={handleCloseModal}>
        <AddSkill
          onSubmit={handleFormSubmit}
          error={error}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default AdminSkillAction;
