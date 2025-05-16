import React, { useState, useEffect } from "react";
import DataView from "../../common/components/DataView";
import DeleteBox from "../../common/components/DeleteBox";
import ProfileCard from "../../../components/cards/ProfileCard";
import Modal from "../../common/components/Modal";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../../../services/User";
import { batchDelete } from "../../../services/Batch";
import { toast } from "react-toastify";

const AdminBatchParticipants = ({ batchParticipantsData, batchId, fetchData }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (batchParticipantsData && batchParticipantsData.data) {
      setUsers(batchParticipantsData.data);
    }
  }, [batchParticipantsData]);

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedUser(null);
  };

  const handleFormSubmit = async () => {
    if (selectedUser) {
      try {
        await batchDelete(batchId, selectedUser.studentId);
        fetchData();
        const updatedUsers = users.filter(
          (user) => user.studentId !== selectedUser.studentId
        );
        setUsers(updatedUsers);
        console.log("Deleted student ID:", selectedUser.studentId);
        toast.success("Batch participant deleted successfully!");
      } catch (error) {
        toast.error("Error deleting Batch participant!");

        console.error("Error deleting user from batches:", error);
      }
    }
    handleCloseModal();
    navigate(`/admin/batches/batch-details/${batchId}`);
  };

  const handleCardClick = async (userId) => {
    const selectedStudent = users.find(
      (student) => student.studentId === userId
    );
    if (selectedStudent) {
      try {
        const response = await getUserDetails({ userId });
        const userDetails = response.responseData[0];
        if (userDetails) {
          navigate(`/admin/batches/batch-details/student-details/${userId}`, {
            state: { studentsData: userDetails },
          });
        } else {
          console.error(`User with userId ${userId} not found.`);
        }
      } catch (error) {
        console.error(
          `Error fetching user details for userId ${userId}:`,
          error
        );
      }
    } else {
      console.error(`Student with userId ${userId} not found.`);
    }
  };

  return (
    <div>
      <DataView
        CardComponent={(props) => (
          <ProfileCard
            {...props}
            onClick={() => handleCardClick(props.studentId)}
            handleDelete={() => handleOpenModal(props)}
            attendance={true}
            percentage="99"
          />
        )}
        {...batchParticipantsData}
      />
      <Modal isOpen={isOpen} widthVariant="small" onClose={handleCloseModal}>
        <DeleteBox
          {...batchParticipantsData.deleteProps}
          onCancel={handleCloseModal}
          onConfirm={handleFormSubmit}
        />
      </Modal>
    </div>
  );
};

export default AdminBatchParticipants;
