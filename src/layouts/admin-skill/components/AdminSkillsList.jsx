import React, { useState, useEffect } from "react";
import DataView from "../../common/components/DataView";
import SkillBatchCard from "../../../components/cards/SkillBatchCard";
import Modal from "../../common/components/Modal";
import UpdateSingleField from "../../../layouts/common/components/UpdateSingleField";
import {
  SkillService,
  getUsersCountForSkill,
  updateSkill,
} from "../../../services/Skills";
import { useSkills } from "../../../pages/admin/admin-skills/AdminSkillContext";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  participantsState,
  studentSkillState,
  skillState,
} from "../../../states/Atoms";
import LoadingSpinner from "../../../components/loadingspinner/LoadingSpinner";
import { toast } from "react-toastify";
import NoData from "../../../components/nodata/NoData";

const capitalizeFirstLetter = (string) => {
  return string.trim().charAt(0).toUpperCase() + string.slice(1);
};

const AdminSkillsList = ({ handleClick, cardAnimation, setCardAnimation ,skills}) => {
  const { skills: contextSkills, setSkills, changed, setChanged } = useSkills();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [participants, setParticipants] = useRecoilState(participantsState);
  const [studentkills, setStudentSkills] = useRecoilState(studentSkillState);
  const [skillsData, setSkillsData] = useRecoilState(skillState);

  const localSkills = skills || contextSkills;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await SkillService();
        const capitalizedSkills = response.map((skill) => ({
          ...skill,
          skillName: capitalizeFirstLetter(skill.skillName),
        }));
        capitalizedSkills.sort((skill1, skill2) =>
          skill1.skillName > skill2.skillName
            ? 1
            : skill1.skillName < skill2.skillName
              ? -1
              : 0
        );
        console.log("All defined skills[+]", capitalizedSkills);
        setSkills(capitalizedSkills);
        setStudentSkills(capitalizedSkills);
        console.log("Student skill List --------------------", studentkills);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchSkills();
    setChanged(false);
  }, [changed, setChanged]);

  const handleOpenModal = (skill) => {
    setSelectedSkill(skill);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedSkill(null);
  };

  const handleFormSubmit = async (data) => {
    if (selectedSkill) {
      try {
        const response = await updateSkill({
          skillId: selectedSkill.id,
          skillName: data.inputData,
        });
        const updatedSkills = skills.map((skill) =>
          skill.id === selectedSkill.id
            ? { skillName: capitalizeFirstLetter(data.inputData), ...skill }
            : skill
        );
        setSkills(updatedSkills);
        setChanged(true);
        toast.success("Skill updated successfully!");
      } catch (error) {
        toast.error("Error updating skill!");
        console.error("Error updating skill: ", error);
      }
    }
    handleCloseModal();
  };

  let firstTrueAnimationSet = false;
console.log("here:",skills);
  const skillData = {
    itemsPerPage : 20,
    data:localSkills && localSkills.map((skill) => {
      let viewAnimation = false;
      if (!firstTrueAnimationSet && cardAnimation && skill.newEntry) {
        viewAnimation = true;
        firstTrueAnimationSet = true;
      }

      return {
        ...skill,
        mainHeading: capitalizeFirstLetter(skill.skillName),
        miniHeading: skill.id,
        Count: skill.count,
        canEdit: true,
        cardType: "skill",
        creationDate:false,
        showCount: true,
        viewAnimation,
        handleClick: async () => {
          try {
            const response = await getUsersCountForSkill(skill.id);
            console.log("Participant data from skilll list", response);
            const participantData = response.users.map((user) => [
              user.userId,
              user.UserName,
              user.emailId,
            ]);
            const skillsData = {
              id: skill.id,
              skillName: skill.skillName,
            };
            const skillParticipantDetails = {
              title: skillsData.skillName,
              participantDetails: participantData,
            };
            localStorage.setItem(
              "skillParticipantDetails",
              JSON.stringify(skillParticipantDetails)
            );
            setSkillsData(skillsData);
            setParticipants(participantData);
            navigate(`/admin/skills/skill-participants`);
          } catch (error) {
            console.error("Error fetching skill participants: ", error);
          }
        },
        handleEditClick: () => handleOpenModal(skill),
      };
    }),
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {skillData.data && skillData.data.length > 0 ? (
        <div>
          <DataView CardComponent={SkillBatchCard} {...skillData} />
        </div>
      ) : (
        <NoData title="Skills"/>
      )}

      <Modal isOpen={isOpen} widthVariant="medium" onClose={handleCloseModal}>
        {selectedSkill && (
          <UpdateSingleField
            mainHeading="Edit Skill"
            labelTitle="Skill Name"
            placeHolder="Skill Name"
            buttonTitle="Save"
            initialData={selectedSkill.skillName}
            onSubmit={handleFormSubmit}
            isEdit={true}
            message="You are updating :"
            skillId={selectedSkill.skillName}
          />
        )}
      </Modal>
    </div>
  );
};

export default AdminSkillsList;
