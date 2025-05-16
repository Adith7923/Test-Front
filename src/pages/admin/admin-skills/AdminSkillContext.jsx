import React, { createContext, useContext, useState } from "react";

const SkillsContext = createContext();

export const SkillsProvider = ({ children }) => {
  const [skills, setSkills] = useState([]);
  const [changed, setChanged] = useState(false);
  const [participants, setParticipants] = useState([]);

  return (
    <SkillsContext.Provider
      value={{
        skills,
        setSkills,
        changed,
        setChanged,
        participants,
        setParticipants,
      }}
    >
      {children}
    </SkillsContext.Provider>
  );
};

export const useSkills = () => useContext(SkillsContext);
