import React, { useState, useEffect } from "react";
import BatchSearch from "../../common/components/BatchSearch";
import Modal from "../../common/components/Modal";
import UpdateSingleField from "../../common/components/UpdateSingleField";
import DeleteBox from "../../common/components/DeleteBox";
import { GoTrash } from "react-icons/go";
import { MdEdit } from "react-icons/md";
import { getUserDetails } from "../../../services/User";
import { updateBatch } from "../../../services/Batch";
import { toast } from "react-toastify";

const AdminBatchSearch = ({
  participantCount,
  batchDelete,
  addParticipant,
  changeBatchName,
  setBatchName,
  batchName,
  batchId,
  batchParticipantsData,
  searchTerm, setSearchTerm
}) => {
  const [isBatchOperationsOpen, setIsBatchOperationsOpen] = useState(false);
  const [isUpdateSingleFieldOpen, setIsUpdateSingleFieldOpen] = useState(false);
  const [isDeleteBoxOpen, setIsDeleteBoxOpen] = useState(false);
  const [userIdOptions, setUserIdOptions] = useState([]);
  const [submitError, setSubmitError] = useState(null);
  console.log("parts----", batchParticipantsData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const filterParams = {
          roleId: 3,
        };

        const data = await getUserDetails(filterParams);
        console.log("users-------", data.responseData);
        const batchParticipantIds = batchParticipantsData.map(
          (participant) => participant.studentId
        );
        const userIds = data.responseData
          .filter((user) => !batchParticipantIds.includes(user.userId))
          .map((user) => ({
            value: user.userId,
            label: `${user.firstName} ${user.lastName} (${user.userId})`,
          }));

        setUserIdOptions(userIds);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [batchParticipantsData]);

  const AdminBatchSearchData = {
    participantCount:participantCount,
    navbuttonProps: {
      pageName: batchName,
    },
    showTextButton: true,
    showAdd: true,
    showReset: false,
    textbuttonProps: {
      icon: <MdEdit />,
      text: "Edit Batch Name",
      onClick: () => {
        setIsUpdateSingleFieldOpen(true);
      },
    },
    textbuttonProps2: {
      icon: <GoTrash />,
      text: "Delete",
      onClick: () => {
        setIsDeleteBoxOpen(true);
      },
    },
    showSearch: true,
    searchbarProps:{
      placeholder:"Search Student Name"
    },
    showFiltersAndReset: false,
    addbuttonProps: {
      variant: "tertiary",
      content: "+ Add New Student",
      width: "full",
      onClick: () => {
        setIsBatchOperationsOpen(true);
      },
    },
    newprops: {
      mainHeading: "Add Student",
      labelTitle: "Add student ID",
      placeHolder: "Student ID",
      buttonTitle: "Add",
      options: userIdOptions,
      isSelect: true,
    },
    editprops: {
      mainHeading: "Edit Batch Name",
      labelTitle: "Batch Name",
      placeHolder: "",
      buttonTitle: "Save",
      initialData: batchName,
    },
    deleteprops: {
      title: "Delete Batch",
      message: "Are you sure you want to Delete this batch?",
      buttonText: "Delete",
    },
  };

  const handleFormSubmit = async (formData) => {
    try {
      await updateBatch({ batchId, batchName: formData.inputData });
      setBatchName(formData.inputData);
      toast.success("Batch name updated successfully!");
      setSubmitError(null);
      handleCloseAllModals();
      changeBatchName(formData.inputData);
    } catch (error) {
      setSubmitError("Batch name already exists");
      console.error("Error updating batch name:", error);
    }
  };

  const addStdFormSubmit = (formData) => {
    console.log("Add student form submitted with data:", formData);
    addParticipant(formData.studentIds);
    handleCloseAllModals();
  };

  const handleDeleteConfirm = () => {
    batchDelete();
    console.log("Delete confirmed");
    handleCloseAllModals();
  };

  const handleCloseAllModals = () => {
    setIsBatchOperationsOpen(false);
    setIsUpdateSingleFieldOpen(false);
    setIsDeleteBoxOpen(false);
  };

  const handleDeleteCancel = () => {
    console.log("Delete canceled");
    setIsDeleteBoxOpen(false);
  };

  return (
    <div>
      <BatchSearch {...AdminBatchSearchData} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Modal
        isOpen={isBatchOperationsOpen}
        widthVariant="medium"
        onClose={handleCloseAllModals}
      >
        <UpdateSingleField
          {...AdminBatchSearchData.newprops}
          onSubmit={addStdFormSubmit}
        />
      </Modal>
      <Modal
        isOpen={isUpdateSingleFieldOpen}
        widthVariant="medium"
        onClose={handleCloseAllModals}
      >
        <UpdateSingleField
          {...AdminBatchSearchData.editprops}
          onSubmit={handleFormSubmit}
          initialData={batchName}
          submitError={submitError}
        />
      </Modal>
      <Modal
        isOpen={isDeleteBoxOpen}
        widthVariant="small"
        onClose={handleCloseAllModals}
      >
        <DeleteBox
          {...AdminBatchSearchData.deleteprops}
          onCancel={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
        />
      </Modal>
    </div>
  );
};

export default AdminBatchSearch;
