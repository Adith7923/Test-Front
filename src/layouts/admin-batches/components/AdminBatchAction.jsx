import React, { useState } from "react";
import ActionComponent from "../../common/components/Action";
import Modal from "../../common/components/Modal";
import AdminBatchActionData from "./BatchActionData";
import BatchOperations from "./BatchOperations";
import { createBatch } from "../../../services/Batch";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminBatchAction = ({
  onSearchChange,
  batchData,
  setBatchData,
  count,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setSubmitError("");
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setSubmitError("");
    setIsOpen(false);
  };

  const handleFormSubmit = async (formData) => {
    try {
      const { batchName } = formData;
      const response = await createBatch({ batchName: batchName });
      if (batchData[0]?.viewAnimation !== undefined) {
        batchData[0].viewAnimation = false;
      }
      const newBatch = {
        miniHeading: `B${response[0].batchId}`,
        mainHeading: response[0].batchName || "",
        Count: response[0].participantCount,
        cardType: "batch",
        showCount: true,
        viewAnimation: true,
        handleClick: () =>
          handleClick(response[0].batchId, response[0].batchName),
      };

      setBatchData([newBatch, ...(batchData || [])]);
      setIsOpen(false);
      setSubmitError("");
      toast.success("Batch created successfully!");
    } catch (error) {
      toast.error("Error adding batch!");
      console.error("Error adding batch:", error);
      setSubmitError("Batch name already exists");
    }
  };
  const handleClick = (batchId, batchName) => {
    navigate(`/admin/batches/batch-details/${batchId}`, {
      state: { batchName },
    });
  };

  const actionData = {
    ...AdminBatchActionData,
    count,
    buttonProps: {
      ...AdminBatchActionData.buttonProps,
      onClick: handleOpenModal,
    },
  };

  return (
    <div>
      <ActionComponent {...actionData} onSearchChange={onSearchChange} />
      <Modal isOpen={isOpen} widthVariant="medium" onClose={handleCloseModal}>
        <BatchOperations
          mainHeading="Create New Batch"
          onSubmit={handleFormSubmit}
          submitError={submitError}
        />
      </Modal>
    </div>
  );
};

export default AdminBatchAction;
