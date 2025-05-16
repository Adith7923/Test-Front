import React, { useState, useEffect } from "react";
import Card from "../../../components/cards/SkillCard";
import { GoPlus } from "react-icons/go";
import styles from "../StudentSkill.module.css";
import Modal from "../../common/components/Modal";
import DeleteBox from "../../common/components/DeleteBox";
import CombinedSkillForm from "../../common/components/CombinedSkillForm";
import { toast } from "react-toastify";
import {
  getSkillsForUser,
  Userskillpost,
  SkillService,
  UserSkillDelete,
} from "../../../services/Skills";
import secureLocalStorage from "react-secure-storage";

const Layout = () => {
  const [userSkills, setUserSkills] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [skillAdded, setSkillAdded] = useState(false);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    index: null,
  });
  const [options, setOptions] = useState([]);

  const userSession = secureLocalStorage.getItem("userSession") || {};
  const userId = userSession.userId;

  useEffect(() => {
    fetchSkills();
  }, []);

  useEffect(() => {
    fetchUserSkills();
  }, []);

  useEffect(() => {
    setUserSkills(userSkills);
    setSkillAdded(false);
  }, [skillAdded]);

  const fetchUserSkills = async () => {
    try {
      const skills = await getSkillsForUser(userId);
      setUserSkills(skills[0].skills);
      console.log("Fetched user skills:", skills);
    } catch (error) {
      console.error("Error fetching user skills", error);
    }
  };

  const fetchSkills = async () => {
    try {
      const skillsResponse = await SkillService();
      console.log("Skill respose", skillsResponse);
      setOptions(
        skillsResponse.map((skill) => ({
          value: skill.id,
          label: `${skill.skillName.charAt(0).toUpperCase() + skill.skillName.slice(1)}  (${skill.id})`,
          originalName: skill.skillName.toLowerCase(),
        }))
      );
    } catch (error) {
      console.error("Error fetching skills", error);
    }
  };

  const capitalizeFirstLetter = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleAddSkill = async (formData) => {
    try {
      const { skill } = formData;
      const postData = {
        userId,
        skillId: skill,
      };
      const newSkillResponse = await Userskillpost(postData);

      const newSkill = {
        skillName:
          options.find((opt) => opt.value === skill)?.originalName ||
          "undefined",
        skillLevel: 1,
        id: newSkillResponse.responseData[0].skill_id,
        ...newSkillResponse,
      };
      console.log("test ", newSkill);
      setUserSkills((prevSkills) => [...prevSkills, newSkill]);
      setSkillAdded(true);
      console.log("Skill added successfully:", newSkill);
      toast.success("New skill added successfully!");
      setIsOpen(false);
    } catch (error) {
      toast.info(error.message || "Error adding skill!");
      console.error("Error adding skill:", error);
    }
  };

  const handleFormSubmit = (formData) => {
    try {
      console.log("Here's the form data:", formData);
      handleAddSkill(formData);
    } catch (error) {
      toast.error("Error adding skill!");
    }
  };

  const handleDeleteSkill = async () => {
    const skillToDelete = userSkills[deleteModal.index];
    console.log(
      "Skill id for skill to delete: ",
      userSkills[deleteModal.index].id,
      userSkills,
      "Skill to delete from user skills",
      userSkills[deleteModal.index]
    );
    if (!skillToDelete) {
      console.error("Skill to delete not found");
      return;
    }

    const { id } = skillToDelete;

    if (!id) {
      console.error("Skill id undefined for skill:", skillToDelete);
      return;
    }

    try {
      await UserSkillDelete(userId, id);
      console.log("Skill deleted successfully");

      const updatedSkills = userSkills.filter(
        (_, index) => index !== deleteModal.index
      );
      setUserSkills(updatedSkills);
      toast.success("Skill deleted successfully!");
    } catch (error) {
      toast.error("Error deleting skill!");
    } finally {
      setDeleteModal({ isOpen: false, index: null });
    }
  };

  return (
    <div className={`${styles["skilllayout-container"]} padding-top padding`}>
      <div className={styles["skilllayout-skilltitle"]}>
        <h3>Skills </h3>
        <div className={styles["skilllayout-layoutcontainer"]}>
          {userSkills.length > 0 ? (
            userSkills.map((skill, index) => (
              <div key={index} className={styles["skilllayout-skillcontainer"]}>
                <Card
                  subtitle={`Level ${skill.skillLevel}`}
                  title={capitalizeFirstLetter(skill.skillName)}
                  showCloseIcon={true}
                  onClose={() => setDeleteModal({ isOpen: true, index: index })}
                />
              </div>
            ))
          ) : (
            <p className={styles["skilllayout-nodata"]}>No skills available</p>
          )}
          <div className={styles["skilllayout-addbutton"]}>
            <GoPlus
              className={styles["skilllayout-plusicon"]}
              onClick={() => setIsOpen(true)}
            />
          </div>
          <Modal
            isOpen={isOpen}
            widthVariant="large"
            onClose={() => setIsOpen(false)}
          >
            <CombinedSkillForm
              mainHeading="Add New Skill"
              isSelect={true}
              isEditlevel={false}
              displaytext="This skill is only to be placed at level 1"
              buttonTitle="Add Skill"
              options={options}
              onSubmit={handleFormSubmit}
            />
          </Modal>
          <Modal
            isOpen={deleteModal.isOpen}
            widthVariant="small"
            onClose={() => setDeleteModal({ isOpen: false, index: null })}
          >
            <DeleteBox
              title="Delete Skill"
              message="Are you sure you want to delete this skill?"
              buttonText="Delete"
              onCancel={() => setDeleteModal({ isOpen: false, index: null })}
              onConfirm={handleDeleteSkill}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Layout;
