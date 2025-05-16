import React, { useState } from "react";
import ActionComponent from "../../common/components/Action";
import AddUser from "../../common/components/AddUser";
import Modal from "../../common/components/Modal";
import AdminMentorActionData from "./MentorData";
import { addNewUser } from "../../../services/User";
import secureLocalStorage from "react-secure-storage";

const AdminMentorAction = ({
  count,
  onSubmit,
  onAddSuccess,
  fetchData,
  onSearchChange,
  setMentorData,
  setCardAnimation,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleFormSubmit = async (formData) => {
    try {
      const userData = {
        emailId: formData.emailId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        collegeId: formData.collegeId || 1,
        roleId: formData.roleId || 2,
        createdBy: secureLocalStorage.getItem("userSession").userId,
        modifiedBy: secureLocalStorage.getItem("userSession").userId,
      };

      const response = await addNewUser(userData);
      const newMentor = response.responseData;
      console.log("New user added successfully!");

      newMentor.newEntry = true;
      setCardAnimation(true);
      setMentorData((prevMentorsData) => [newMentor, ...prevMentorsData]);
      setSubmitError("");
      handleCloseModal();
    } catch (error) {
      console.error("Error adding new user:", error);
      setSubmitError("Email ID already registered");
    }
  };

  return (
    <div>
      <ActionComponent
        {...AdminMentorActionData}
        count={count}
        buttonProps={{
          ...AdminMentorActionData.buttonProps,
          onClick: handleOpenModal,
        }}
        searchbarProps={fetchData}
        onSearchChange={onSearchChange}
      />
      <Modal isOpen={isOpen} widthVariant="medium" onClose={handleCloseModal}>
        <AddUser
          {...AdminMentorActionData.adduserprops}
          onSubmit={handleFormSubmit}
          submitError={submitError}
        />
      </Modal>
    </div>
  );
};

export default AdminMentorAction;
