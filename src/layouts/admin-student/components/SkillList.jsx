import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import ShowCards from "../../common/components/ShowCards";
import Modal from "../../common/components/Modal";
import { CombinedSkillForm } from "../../common";
import CardRow from "./Cardrow";
import {
  adminStudentSkillState,
  studentSkillState,
} from "../../../states/Atoms";
import { useRecoilValue, useRecoilState } from "recoil";
import { Userskillpost, getSkillsForUser } from "../../../services/Skills";
import { Slide, ToastContainer, toast } from "react-toastify";
import axios from "axios";

const SkillList = ({ studentId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [studentSkills, setStudentSkills] = useRecoilState(
    adminStudentSkillState
  );
  const [allSkills, setAllSkills] = useRecoilState(studentSkillState);
  console.log("All defined skills", allSkills);

  const addSkillOptions = allSkills.map((skill) => ({
    value: skill.id,
    label: `${skill.skillName}`,
  }));

  useEffect(() => {
    const fetchSkills = async () => {
      if (studentId) {
        try {
          const skills = await axios.get(
            `https://ekalavya.tarento.com/api/skills?userId=${studentId}`
          );
          const response = skills.data.responseData;
          const options = await axios.get(
            `https://ekalavya.tarento.com/api/skills`
          );
          setAllSkills(options.data.responseData);
          if (response.length > 0 && response[0].skills) {
            const skills = response[0].skills.map((skill) => ({
              miniHeading: skill.id,
              mainHeading: skill.skillName,
              skill_id: skill.id,
              cardType: "skill",
              canEdit: false,
              canDelete: true,
              showCount: false,
            }));
            console.log("Formatted skills:", skills);
            setStudentSkills(skills);
          } else {
            console.error("Unexpected response format:", response);
            setStudentSkills([]);
          }
        } catch (error) {
          console.error("Error fetching student skills:", error);
          setStudentSkills([]);
        }
      }
    };

    fetchSkills();
  }, [studentId, setStudentSkills]);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleFormSubmit = async (formData) => {
    try {
      const submitResponse = await Userskillpost({
        userId: studentId,
        skillId: formData.selectedSkills,
      });

      if (
        submitResponse.errorMessage === "User skill combination already exists"
      ) {
        toast.info("Skill already assigned to user", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        handleCloseModal();
        return;
      }

      const selectedSkillName = addSkillOptions.find(
        (option) => option.value === formData.selectedSkills
      );

      const newSkillState = {
        miniHeading: selectedSkillName.value,
        mainHeading: selectedSkillName.label,
        skill_id: selectedSkillName.value,
        canEdit: false,
        canDelete: true,
        cardType: "skill",
        showCount: false,
      };
      setStudentSkills((prevSkills) => [newSkillState, ...prevSkills]);
      handleCloseModal();
    } catch (error) {
      console.error("Error submitting skill:", error);
      handleCloseModal();
      toast.error("An error occurred while adding the skill,please try again", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const heading = {
    heading: "Skills",
    textbuttonprops: {
      icon: <AiOutlinePlus />,
      text: "Add New Skill",
      onClick: handleOpenModal,
    },
  };

  const addSkill = {
    mainHeading: "Add New Skill",
    isSelect: false,
    isEditlevel: false,
    buttonTitle: "Add Skill",
    options: [...addSkillOptions],
  };

  console.log("From skillList, student skills---", studentSkills);

  const skillcards = {
    card: "skill",
    cardData: [...studentSkills],
  };

  return (
    <div>
      <ShowCards {...heading} />
      <Modal isOpen={isOpen} widthVariant="medium" onClose={handleCloseModal}>
        <CombinedSkillForm {...addSkill} onSubmit={handleFormSubmit} />
      </Modal>
      {studentSkills.length > 0 ? (
        <CardRow {...skillcards} userId={studentId} />
      ) : (
        <p className="nodata padding padding-top padding-bottom">
          No skills achieved yet
        </p>
      )}
      {/* <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Slide}
      /> */}
    </div>
  );
};

export default SkillList;
