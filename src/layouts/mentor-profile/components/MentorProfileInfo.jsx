import React, { useState } from "react";
import UserProfileInfo from "../../common/components/UserProfileInfo";
import Modal from "../../common/components/Modal";
import BasicDetails from "../../common/components/BasicDetails";
import profilepic from "../../../assets/DP.png";
import { toast } from "react-toastify";

const MentorProfileInfo = ({ profileData, EditableData, onFormSubmit }) => {
  const [isEditDetailsOpen, setIsEditDetailsOpen] = useState(false);
  const [isDeleteDetailsIsOpen, setIsDeleteDetailsIsOpen] = useState(false);

  const handleOpenEditBasicDetails = () => {
    setIsEditDetailsOpen(true);
  };

  const handleCloseEditBasicDetails = () => {
    setIsEditDetailsOpen(false);
  };

  const handleOpenDeleteBasicDetails = () => {
    setIsDeleteDetailsIsOpen(true);
  };

  const handleCloseDeleteBasicDetails = () => {
    setIsDeleteDetailsIsOpen(false);
  };

  const handleFormSubmit = async (formData) => {
    try {
      console.log("Form Submitted with data:", formData);
      await onFormSubmit(formData);
      toast.success("Details updated successfully!");
      handleCloseEditBasicDetails();
    } catch (error) {
      toast.error("Error updating user details!");
    }
  };

  const editBox = {
    mainHeading: "Edit Basic Details",
    initialData: { ...EditableData },
    isEdit: true,
    onSubmit: handleFormSubmit,
  };

  const sample = {
    role: "mentor",
    ...profileData,
    ...EditableData,
    hasDelete: false,
    onClickEdit: handleOpenEditBasicDetails,
    onClickDelete: handleOpenDeleteBasicDetails,
  };

  return (
    <div>
      <UserProfileInfo {...sample} />
      <Modal
        isOpen={isEditDetailsOpen}
        widthVariant="medium"
        onClose={handleCloseEditBasicDetails}
      >
        <BasicDetails {...editBox} />
      </Modal>
    </div>
  );
};

export default MentorProfileInfo;
