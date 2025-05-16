import React, { useState, useEffect } from "react";
import SearchBar from "../../../components/searchbar/Searchbar";
import SkillUser from "../../../components/cards/SkillUser";
import styles from "../MentorSkill.module.css";
import Modal from "../../common/components/Modal";
import CombinedSkillForm from "../../common/components/CombinedSkillForm";
import DeleteBox from "../../common/components/DeleteBox";
import profilePic from "../../../assets/SkillUser.png";
import { getSkillsForUser } from "../../../services/Skills";
import DataView from "../../common/components/DataView";

const Skillsearch = () => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: "",
    selectedIndex: null,
  });

  const skillData = {
    heading: "Skills",
    subheading: "View skills of students",
    searchBarPlaceholder: "Search Student Name",
  };

  const options = [
    { value: "abc", label: "ABC" },
    { value: "xyz", label: "XYZ" },
    { value: "pqr", label: "PQR" },
  ];

  const [userSkillData, setUserSkillData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchInitialSkills() {
      try {
        const skillsData = await getSkillsForUser("");
        const results = skillsData.responseData || skillsData;
        if (results && results.length > 0) {
          const sortedSkills = results.sort((a, b) =>
            a.firstName.localeCompare(b.firstName)
          );
          setUserSkillData(sortedSkills);
          setError(null);
        } else {
          setError("No students found");
        }
      } catch (error) {
        setUserSkillData([]);
        setError("Failed to fetch student skills.");
      }
    }

    fetchInitialSkills();
  }, []);

  const openModal = (type, index = null) =>
    setModalState({ isOpen: true, type, selectedIndex: index });
  const closeModal = () =>
    setModalState({ isOpen: false, type: "", selectedIndex: null });

  const handleAddSkill = (data) => {
    console.log("Form submitted with data:", data);
    closeModal();
  };

  const handleDeleteSkill = () => {
    console.log("Delete Skill");
    closeModal();
  };

  const handleSearch = (searchTerm) => {
    const filtered = userSkillData.filter((user) =>
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    if (filtered && filtered.length > 0) {
      setSearchResults(filtered);
      setError(null);
    } else {
      setSearchResults([]);
      setError(`Student ${searchTerm} not found`);
    }
  };

  const clearSearch = () => {
    setSearchResults([]);
    setError(null);
  };

  return (
    <div className="padding padding-top padding-bottom">
      <div className={`${styles["skillsearch-skillssearch"]}`}>
        <h1 className={`${styles["skillsearch-skillsheading"]}`}>
          {skillData.heading}
        </h1>
        <p className={`${styles["skillsearch-subheading"]}`}>
          {skillData.subheading}
        </p>
        <div className={`${styles["skillsearch-searchbar"]}`}>
          <SearchBar
            placeholder={skillData.searchBarPlaceholder}
            onSearch={handleSearch}
            onClear={clearSearch}
          />
        </div>

        <div className={`${styles["skillsearch-cardcontainer"]}`}>
          {error && <p className={`${styles["error-message"]}`}>{error}</p>}
          <div className={`${styles["skillsearch-cardcont"]}`}>
            <DataView
              key={searchResults.length > 0 ? searchResults : userSkillData}
              CardComponent={(props) => (
                <SkillUser
                  {...props}
                  mainHeading={`${props.firstName} ${props.lastName}`}
                  miniHeading="Student"
                  profilepic={props.profilePicture || profilePic}
                  skills={(props.skills || []).map((skill) => ({
                    id: skill.id,
                    skillName: skill.skillName,
                    level: skill.skillLevel,
                  }))}
                  deleteSkill={() => openModal("delete", props.index)}
                  addSkill={() => openModal("add")}
                />
              )}
              itemsPerPage={15}
              cardType={"skilluser"}
              data={searchResults.length > 0 ? searchResults : userSkillData}
              filter={(user) => user.skills && user.skills.length > 0}
              className={`${styles["skillsearch-cardcont"]}`}
            />
          </div>
        </div>

        {modalState.isOpen && (
          <Modal
            isOpen={modalState.isOpen}
            widthVariant={modalState.type === "add" ? "medium" : "small"}
            onClose={closeModal}
          >
            {modalState.type === "add" ? (
              <CombinedSkillForm
                mainHeading="Add New Skill"
                isSelect={true}
                isEditlevel={false}
                displaytext="This skill is only to be placed at level 1"
                buttonTitle="Add Skill"
                options={options}
                onSubmit={handleAddSkill}
              />
            ) : (
              <DeleteBox
                title="Delete Skill"
                message="Are you sure you want to delete this skill?"
                buttonText="Delete"
                onCancel={closeModal}
                onConfirm={handleDeleteSkill}
              />
            )}
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Skillsearch;
