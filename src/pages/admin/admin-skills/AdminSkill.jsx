import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSkillData from "../../../services/admin/skill/AdminSkillData";
import { CombinedSkillForm, Greeting } from "../../../layouts/common";
import AdminSkillAction from "../../../layouts/admin-skill/components/AdminSkillAction";
import AdminSkillsList from "../../../layouts/admin-skill/components/AdminSkillsList";
import { getUsersCountForSkill } from "../../../services/Skills";
import { SkillsProvider, setParticipants } from "./AdminSkillContext";
import secureLocalStorage from "react-secure-storage";

const AdminSkill = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [cardAnimation, setCardAnimation] = useState(false);
  const [filteredSkills, setFilteredSkills] = useState([]);

  const handleClick = (skillData) => {
    console.log("Data from skill card: ", skillData);
    if (!isValidSkill(skillData)) {
      setErrorMessage("Skill already exists.");
      console.log("Error message set:", errorMessage);
      return;
    }

    const skillParticipants = getUsersCountForSkill(skillData);
    console.log(skillParticipants);
    navigate(`/admin/skills/skill-participants`);
  };

  const isValidSkill = (skillData) => {
    return !AdminSkillData.skillExists(skillData);
  };

  const userSession = secureLocalStorage.getItem("userSession") || {};
  const loggedUserFirstName = userSession.firstName;

  const greet = {
    welcome: "Welcome back",
    name: loggedUserFirstName || "",
    info: "Here is the information about",
    profile: "skills",
    showButtons: false,
  };

  console.log("Rendering with errorMessage:", errorMessage);
console.log("filtere:",filteredSkills);
  return (
    <SkillsProvider>
      <div>
        {/* <Greeting {...greet} /> */}
        <AdminSkillAction setCardAnimation={setCardAnimation}  setFilteredSkills={setFilteredSkills}/>

        <AdminSkillsList
          handleClick={handleClick}
          skills={filteredSkills}
          cardAnimation={cardAnimation}
          setCardAnimation={setCardAnimation}
        />
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </SkillsProvider>
  );
};

export default AdminSkill;
