import React, { useState, useEffect } from "react";
import { Greeting } from "../../../layouts/common";
import AdminBatchSearch from "../../../layouts/admin-batches/components/AdminBatchSearch";
import AdminBatchParticipants from "../../../layouts/admin-batches/components/AdminBatchParticipants";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchbatches } from "../../../services/Batch";
import NoData from "../../../components/nodata/NoData";
import {
  fetchBatchParticipants,
  updateBatch,
  deleteBatch,
  postUserIds,
} from "../../../services/Batch";
import { getUserDetails } from "../../../services/User";
import image from "../../../assets/DP.png";
import secureLocalStorage from "react-secure-storage";

const userSession = secureLocalStorage.getItem("userSession") || {};
const loggedUserFirstName = userSession.firstName;

const greeting = {
  welcome: "Welcome back",
  name: loggedUserFirstName,
  info: "Here is the information about",
  profile: "Batches",
  showButtons: false,
};

const AdminBatchSelect = () => {
  const [participantCount, setParticipantCount] = useState(0);
  const { batchId } = useParams();
  const params = useParams();
  const location = useLocation();
  const [batchName, setBatchName] = useState(location.state?.batchName || "");
  const [batchParticipantsData, setBatchParticipantsData] = useState([]);
  const [newParticipantsData, setNewParticipantsData] = useState([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUserdetails, setFilteredUserdetails] = useState([]);
  const [batchNameapi, setBatchNameapi] = useState("");

  useEffect(() => {
    fetchData();
  }, []);
  const fetchBatchName = async (batchId) => {
    try {
      const responseData = await fetchbatches({ batchId });
      const data = responseData.responseData[0];
      setBatchNameapi(data.batchName); // Update batchNameapi
      setBatchName(data.batchName); // Update batchName state
      console.log("_______________", data.batchName);
    } catch {
      console.log("error fetching Batch Name");
    }
  };

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredUserdetails(batchParticipantsData);
    } else {
      setFilteredUserdetails(
        batchParticipantsData.filter((userDetail) =>
          userDetail.studentName
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
      );
    }
    fetchBatchName(batchId);
  }, [searchTerm, batchParticipantsData, batchId]);

  const fetchData = async () => {
    try {
      const batchId = params.batchId;
      const participantsResponse = await fetchBatchParticipants({ batchId });
      const participantIds = participantsResponse.responseData;

      if (Array.isArray(participantIds) && participantIds.length > 0) {
        const userId = participantIds.join(",");
        const userDetailsResponse = await getUserDetails({ userId });
        const userDetails = userDetailsResponse.responseData;

        const batchParticipantsData = userDetails.map((userDetail) => ({
          studentImage: image,
          studentName: `${userDetail?.firstName || ""} ${
            userDetail?.lastName || ""
          }`,
          studentId: userDetail.userId || "",
          studentCollege: userDetail?.college?.collegeName || "N/A",
          studentMail: userDetail?.emailId || "N/A",
          studentPhoneNumber: userDetail?.phoneNo || "N/A",
          canDelete: true,
          viewAnimation: false,
        }));

        batchParticipantsData.sort((a, b) =>
          a.studentName.localeCompare(b.studentName)
        );
        setBatchParticipantsData(batchParticipantsData);
        const count = batchParticipantsData.length;
        setParticipantCount(count);
        setFilteredUserdetails(batchParticipantsData);
        setNewParticipantsData([]);
      } else {
        setBatchParticipantsData([]);
        setFilteredUserdetails([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setBatchParticipantsData([]);
      setFilteredUserdetails([]);
    }
  };

  const changeBatchName = async (newBatchName) => {
    try {
      const batchId = params.batchId;
      await updateBatch({ batchId, batchName: newBatchName });
      setBatchName(newBatchName); 
      setBatchNameapi(newBatchName); 
      // toast.success("Batch name updated successfully!");
    } catch (error) {
      console.error("Error updating batch name:", error);
      toast.error("Error updating batch name!");
    }
  };

  const handleDeleteBatches = async () => {
    try {
      await deleteBatch(batchId);
      navigate(`/admin/batches`);
      toast.success("Batch deleted successfully!");
    } catch (error) {
      toast.error("Error deleting batch!");
      console.error("Error deleting batch:", error);
    }
  };

  const addParticipant = async (studentIds) => {
    try {
      const batchId = params.batchId;
      const response = await postUserIds({ batchId, userIds: studentIds });

      const newParticipantIds = studentIds.join(",");
      const newParticipantsResponse = await getUserDetails({
        userId: newParticipantIds,
      });
      const newParticipants = newParticipantsResponse.responseData;

      const newParticipantsData = newParticipants.map((userDetail) => ({
        studentImage: image,
        studentName: `${userDetail?.firstName || ""} ${
          userDetail?.lastName || ""
        }`,
        studentId: userDetail.userId || "",
        studentCollege: userDetail?.college?.collegeName || "N/A",
        studentMail: userDetail?.emailId || "N/A",
        studentPhoneNumber: userDetail?.phoneNo || "N/A",
        canDelete: true,
        viewAnimation: true,
      }));

      setNewParticipantsData(newParticipantsData);
      setBatchParticipantsData((prevData) => [
        ...newParticipantsData,
        ...prevData,
      ]);

      if (response.statusCode === 200) {
        toast.success("Added new student successfully!");
      } else {
        const errorMessage =
          response?.errorMessage?.match(/\[(.*?)\]/)?.[1] || "Unknown error";
        toast.error(errorMessage);
      }

      return response.data;
    } catch (error) {
      toast.error("Error adding participant!");
      throw error;
    }
  };

  return (
    <div>
      <AdminBatchSearch
        participantCount={participantCount}
        batchDelete={handleDeleteBatches}
        addParticipant={addParticipant}
        setBatchName={setBatchName}
        changeBatchName={changeBatchName}
        batchName={batchNameapi}
        batchId={params.batchId}
        batchParticipantsData={batchParticipantsData}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      {filteredUserdetails.length > 0 ? (
        <AdminBatchParticipants
          batchParticipantsData={{
            data: filteredUserdetails,
            tableColumns: [
              { key: "studentId", displayName: "Student ID" },
              { key: "studentName", displayName: "Name" },
              { key: "studentCollege", displayName: "College" },
              { key: "studentMail", displayName: "Email ID" },
              { key: "studentPhoneNumber", displayName: "Phone Number" },
            ],
            toggle: true,
            itemsPerPage: 15,
            deleteProps: {
              title: "Remove Participant",
              message: "Are you sure you want to Remove this participant ?",
              buttonText: "Remove",
            },
          }}
          batchId={batchId}
          fetchData={fetchData}
        />
      ) : (
        <NoData title="Students" />
      )}
    </div>
  );
};

export default AdminBatchSelect;
