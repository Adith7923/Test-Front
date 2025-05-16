import React, { useState } from "react";
import Greeting from "../../common/components/Greeting";
import AddCollege from "./AddCollege";
import CollegeList from "./CollegeList";
import StudentGreetingData from "./StudentGreetingData";
import Modal from "../../common/components/Modal";

const AdminStudentGreeting = () => {
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const handleOpenView = () => {
    setIsViewOpen(true);
  };

  const handleCloseView = () => {
    setIsViewOpen(false);
  };

  const handleOpenAdd = () => {
    setIsAddOpen(true);
  };

  const handleCloseAdd = () => {
    setIsAddOpen(false);
  };

  const handleFormSubmit = (formData) => {
    console.log("Form submitted with data:", formData);
    handleCloseAdd();
  };
  const GreetingData = {
    ...StudentGreetingData,
    handleClick: handleOpenView,
    handleClick2: handleOpenAdd,
  };

  return (
    <div>
      <Greeting {...GreetingData} />
      <Modal isOpen={isViewOpen} widthVariant="large" onClose={handleCloseView}>
        <CollegeList {...StudentGreetingData.viewprops} />
      </Modal>
      <Modal isOpen={isAddOpen} widthVariant="large" onClose={handleCloseAdd}>
        <AddCollege
          {...StudentGreetingData.addprops}
          onSubmit={handleFormSubmit}
        />
      </Modal>
    </div>
  );
};

export default AdminStudentGreeting;
