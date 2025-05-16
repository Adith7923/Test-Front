import React, { useState } from "react";
import ActionComponent from "../../common/components/Action";
import AddUser from "../../common/components/AddUser";
import Modal from "../../common/components/Modal";
import AdminStudentActionData from "./StudentActionData";

const AdminStudentAction = () => {
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);

  const handleOpenAddStudentModal = () => {
    setIsAddStudentOpen(true);
  };

  const handleCloseAddStudentModal = () => {
    setIsAddStudentOpen(false);
  };

  const handleAddStudentFormSubmit = (formData) => {
    console.log("Form submitted with data:", formData);
    handleCloseAddStudentModal();
  };

  const actionData = {
    ...AdminStudentActionData,
    count,
    buttonProps: {
      ...AdminStudentActionData.buttonProps,
      onClick: handleOpenAddStudentModal,
    },
  };

  return (
    <div>
      <ActionComponent {...actionData} />
      <Modal
        isOpen={isAddStudentOpen}
        widthVariant="medium"
        onClose={handleCloseAddStudentModal}
      >
        <AddUser
          {...AdminStudentActionData.adduserprops}
          onSubmit={handleAddStudentFormSubmit}
        />
      </Modal>
    </div>
  );
};

export default AdminStudentAction;
