import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../common/components/Modal";
import AddTest from "../AddTest";
import TestDescriptionData from "./TestDescriptionData";
import TestDescription from "../../common/components/TestDescription"; // ✅ Import your replacement

const AdminTestDescription = ({
  formSubmit,
  fetchedFormData,
  testId,
  creator,
}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleEditClick = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  const handleFormSubmit = (formData) => {
    formSubmit(formData);
    handleCloseModal();
  };

  return (
    <div>
      <TestDescription
        {...fetchedFormData}
        creator={creator}
        percentage={"-"}
        fraction={"-"}
        type="admin"
        large={TestDescriptionData.buttonProps.large}
        medium={null} // ⛔ Removed delete button
        small={TestDescriptionData.buttonProps.small}
        onclick1={() => navigate("/admin/tests")}
        onclick2={null} // ⛔ Removed delete button handler
        onclick3={handleEditClick}
      />

      <Modal isOpen={isOpen} widthVariant="large" onClose={handleCloseModal}>
        <AddTest
          defaultValues={TestDescriptionData.defaultValues}
          fetchedFormData={fetchedFormData}
          onSubmit={handleFormSubmit}
        />
      </Modal>
    </div>
  );
};

export default AdminTestDescription;
