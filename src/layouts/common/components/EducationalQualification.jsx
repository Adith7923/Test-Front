import React, { useState } from "react";
import QualificationCard from "../../../components/cards/QualificationCard";
import Education from "./Education";
import Modal from "./Modal";
import QualificationForm from "./QualificationForm";
import DeleteBox from "./DeleteBox";
import { toast } from "react-toastify";
import DataView from "../../common/components/DataView";
import TextButton from "../../../components/buttons/TextButton";
import { IoMdAdd } from "react-icons/io";
import styles from "../Common.module.css";
import CardRow from "../../admin-student/components/Cardrow";

const EducationalQualification = ({
  qualifications = [],
  onFormSubmit,
  userId,
}) => {
  const [isAddQualificationOpen, setIsAddQualificationOpen] = useState(false);
  const [isEditQualificationOpen, setIsEditQualificationOpen] = useState(false);
  const [isDeleteQualificationOpen, setIsDeleteQualificationOpen] =
    useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleOpenAddQualification = () => {
    setIsAddQualificationOpen(true);
    setEditIndex(null);
  };

  const handleCloseAddQualification = () => {
    setIsAddQualificationOpen(false);
  };

  const handleOpenEditQualification = (index) => {
    console.log("open");

    setEditIndex(index.index);
    console.log(index.index);
    setIsEditQualificationOpen(true);
  };

  const handleCloseEditQualification = () => {
    setIsEditQualificationOpen(false);
  };

  const handleOpenDeleteQualification = (index) => {
    setEditIndex(index.index);
    setIsDeleteQualificationOpen(true);
  };

  const handleCloseDeleteQualification = () => {
    setIsDeleteQualificationOpen(false);
  };

  const handleFormConfirm = (formData) => {
    console.log(formData, "Action Confirmed");
    handleCloseDeleteQualification();
  };

  const handleFormCancel = (formData) => {
    console.log(formData, "Action Cancelled");
    handleCloseDeleteQualification();
  };

  const handleFormSubmit = async (formData) => {
    try {
      const formDataToSend = {
        userId: userId,
        qualifications: [formData],
      };
      await onFormSubmit(formDataToSend);
      handleCloseEditQualification();
      handleCloseDeleteQualification();
      handleCloseAddQualification();
      toast.success("Qualification updated successfully!");
    } catch (error) {
      toast.error("Error updating user Qualification!");
    }
  };
  const handleRemove = async (index) => {
    try {
      const qualification = qualifications[index];
      const formData = {
        userId: userId,
        qualifications: [
          {
            qualificationId: qualification?.qualificationId,
          },
        ],
      };

      console.log("Form Data:", formData);
      await onFormSubmit(formData);
      toast.success("Qualification deleted successfully!");
      handleCloseDeleteQualification();
    } catch (error) {
      console.error("Error deleting qualification!");
    }
  };

  const options = [
    { value: "High School", label: "High School" },
    { value: "Bachelor's Degree", label: "Bachelor's Degree" },
    { value: "Master's Degree", label: "Master's Degree" },
    { value: "Ph.D.", label: "Ph.D." },
  ];

  const addQualProps = {
    heading: "Add New Education Qualification",
    options: options,
    initialValues: {},
    onSubmit: handleFormSubmit,
  };

  const editQualProps = {
    heading: "Edit Education Qualification",
    options: options,
    initialValues: qualifications[editIndex] || {},
    onSubmit: handleFormSubmit,
  };

  const deleteQualProps = {
    title: "Delete Qualification",
    message: "Are you sure you want to delete this qualification?",
    buttonText: "Delete",
    onConfirm: () => {
      if (
        editIndex !== null &&
        editIndex >= 0 &&
        editIndex < qualifications.length
      ) {
        handleRemove(editIndex);
      }
      console.log("hello");
    },
    onCancel: handleCloseDeleteQualification,
  };

  const educationProps = {
    qualifications: qualifications.sort((a, b) => {
      const order = [
        "Ph.D.",
        "Master's Degree",
        "Bachelor's Degree",
        "High School",
      ];
      return order.indexOf(a.degree) - order.indexOf(b.degree);
    }),
    onClickAdd: handleOpenAddQualification,
    onClickEdit: handleOpenEditQualification,
    onClickDelete: handleOpenDeleteQualification,
  };
  return (
    <div className={`${styles["education-container"]} padding-bottom padding`}>
      <div className={`${styles["education-qualification"]}`}>
        <div className={`${styles["education-qualification-content"]}`}>
          <div className={`${styles["education-title"]}`}>
            <h2 className={`${styles["education-title2"]}`}>
              Educational Qualification
            </h2>
          </div>
          <div className={`${styles["education-qualification-add-button"]}`}>
            <div className={`${styles["education-qualification-button"]}`}>
              <TextButton
                icon={<IoMdAdd />}
                text="Add Educational Qualification"
                onClick={handleOpenAddQualification}
              />
            </div>
          </div>
        </div>
      </div>

      {educationProps.qualifications &&
      educationProps.qualifications.length > 0 ? (
        <CardRow
          card="education"
          cardData={educationProps.qualifications}
          onClickEdit={educationProps.onClickEdit}
          onClickDelete={educationProps.onClickDelete}
        />
      ) : (
        <div
          style={{ textAlign: "left", color: "var(--neutral600)" }}
          className={`${styles["education-no-qualifications"]}`}
        >
          No Qualifications to display
        </div>
      )}

      <Modal
        isOpen={isAddQualificationOpen}
        widthVariant="medium"
        onClose={handleCloseAddQualification}
      >
        <QualificationForm {...addQualProps} />
      </Modal>

      <Modal
        isOpen={isEditQualificationOpen}
        widthVariant="medium"
        onClose={handleCloseEditQualification}
      >
        <QualificationForm {...editQualProps} />
      </Modal>

      <Modal
        isOpen={isDeleteQualificationOpen}
        widthVariant="small"
        onClose={handleCloseDeleteQualification}
      >
        <DeleteBox {...deleteQualProps} />
      </Modal>
    </div>
  );
};

export default EducationalQualification;
