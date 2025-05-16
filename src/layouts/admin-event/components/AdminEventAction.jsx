import React, { useState, useEffect } from "react";
import ActionComponent from "../../common/components/Action";
import AddEvent from "./AddEvent";
import Modal from "../../common/components/Modal";
import { getUserDetails } from "../../../services/User";

const AdminEventAction = ({
  formSubmit,
  AdminEventActionData,
  onFilterChange,
  onSearchChange,
  count,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [organizerOptions, setOrganizerOptions] = useState([]);

  useEffect(() => {
    const fetchOrganizers = async () => {
      try {
        const response = await getUserDetails({ roleId: 2 });
        const options = response.responseData.map((user) => ({
          value: user.userId,
          label: `${user.firstName} ${user.lastName}`,
        }));
        setOrganizerOptions(options);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchOrganizers();
  }, []);

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
    ...AdminEventActionData,
    count,
    buttonProps: {
      ...AdminEventActionData.buttonProps,
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
        <AddEvent
          {...AdminEventActionData.addeventprops}
          organizeroptions={organizerOptions}
          isOrganizer={true}
          onSubmit={handleFormSubmit}
        />
      </Modal>
    </div>
  );
};

export default AdminEventAction;
