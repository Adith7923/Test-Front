import React, { useState, useEffect } from "react";
import ActionComponent from "../../common/components/Action";
import AddCollege from "./AddCollege";
import Modal from "../../common/components/Modal";

const AdminCollegeAction = ({
  formSubmit,
  AdminCollegeActionData,
  onFilterChange,
  onSearchChange,
  count,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [organizerOptions, setOrganizerOptions] = useState([]);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleFormSubmit = async (data) => {
    console.log("Form submitted with data:", data);
    handleCloseModal();
    formSubmit(data);
  };

  const actionData = {
    ...AdminCollegeActionData,
    count,
    buttonProps: {
      ...AdminCollegeActionData.buttonProps,
      onClick: handleOpenModal,
    },
  };


  return (
    <div>
      <ActionComponent
        {...actionData}
        onFilterChange={onFilterChange}
        onSearchChange={onSearchChange}
      />
      <Modal isOpen={isOpen} widthVariant="large" onClose={handleCloseModal}>
        <AddCollege
          onSubmit={handleFormSubmit}
        />
      </Modal>
    </div>
  );
};

export default AdminCollegeAction;
