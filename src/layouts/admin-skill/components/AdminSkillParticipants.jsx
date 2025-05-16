import React, { useState } from "react";
import styles from "../AdminSkill.module.css";
import Table from "../../../components/table/Table";
import NavButton from "../../../components/buttons/NavButton";
import { useRecoilValue } from "recoil";
import { participantsState, skillState } from "../../../states/Atoms";
import { deleteSkill } from "../../../services/Skills";
import Modal from "../../common/components/Modal";
import { toast } from "react-toastify";
import { DeleteBox } from "../../common";
import { useNavigate } from "react-router-dom";
import DeleteButton from "../../../components/buttons/DeleteButton";

const AdminSkillParticipants = ({ data, headings, onClick, pageName }) => {
  const skillsData = useRecoilValue(skillState);
  const skillParticipantDetails = JSON.parse(
    localStorage.getItem("skillParticipantDetails")
  );
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteSkillId, setDeleteSkillId] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleOpenDelete = () => {
    setDeleteSkillId(skillsData.id);
    console.log("delete skill id is:", deleteSkillId);
    setIsDeleteOpen(true);
    setError("");
  };

  console.log("Participant page data", skillParticipantDetails);

  const handleCloseDelete = () => {
    setIsDeleteOpen(false);
    setDeleteSkillId(null);
    setError("");
  };

  const handleDeleteCancel = () => {
    console.log("Delete canceled");
    handleCloseDelete();
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteSkill(deleteSkillId);
      console.log("Delete confirmed");
      handleCloseDelete();
      toast.success("Skill removed successfully!");
      navigate(`/admin/skills`);
    } catch (error) {
      console.error("Error removing skill: ", error);
      toast.error("Error removing skill");
    }
  };

  const props = {
    content: "Delete Skill",
    variant: "tertiary",
    width: "full",
    onClick: () => handleOpenDelete(),
  };

  const deleteprops = {
    title: "Delete Skill ",
    message: "Are you sure you want to Delete this skill?",
    buttonText: "Delete",
  };

  return (
    <div
      className={`${styles["adminskillparticipants-container"]} ${["padding"]} ${["padding-top"]} ${["padding-bottom"]}`}
    >
      <div className={`${styles["adminskillparticipants-header"]}`}>
        <div className={`${styles["adminskillparticipants-navbuttons"]}`}>
          {pageName.map((name, index) => (
            <div className={`${styles["adminskillparticipants-nav"]}`}>
              {" "}
              <NavButton
                key={index}
                pageName={skillParticipantDetails.title}
                onClick={onClick}
              />
              (Count:{skillParticipantDetails.participantDetails.length})
            </div>
          ))}
        </div>
        <div className={`${styles["adminskillparticipants-deletebutton"]}`}>
          <DeleteButton {...props} />
        </div>
        <Modal
          isOpen={isDeleteOpen}
          widthVariant="small"
          onClose={handleCloseDelete}
        >
          <DeleteBox
            {...deleteprops}
            onCancel={handleDeleteCancel}
            onConfirm={handleDeleteConfirm}
          />
        </Modal>
      </div>
      <div className={`${styles["adminskillparticipants-table"]}`}>
        {skillParticipantDetails &&
        skillParticipantDetails.participantDetails.length > 0 ? (
          <Table
            data={skillParticipantDetails.participantDetails}
            headings={headings}
          />
        ) : (
          <p className="nodata">No Students to display</p>
        )}
      </div>
    </div>
  );
};

export default AdminSkillParticipants;
