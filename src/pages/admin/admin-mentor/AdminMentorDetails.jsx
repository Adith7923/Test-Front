import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MentorProfileInfo from "../../../layouts/admin-mentor/components/MentorProfile";
import MentorEventsList from "../../../layouts/admin-mentor/components/MentorEventsList";
import {
  getUserDetails,
  updateUserDetails,
  deleteUser,
  addNewUser,
} from "../../../services/User";
import { fetchEventsService } from "../../../services/Event";
import LoadingSpinner from "../../../components/loadingspinner/LoadingSpinner";
import EducationalQualification from "../../../layouts/common/components/EducationalQualification";
import Modal from "../../../layouts/common/components/Modal";
import BasicDetails from "../../../layouts/common/components/BasicDetails";
import { toast } from "react-toastify";
import secureLocalStorage from "react-secure-storage";

const fetchMentorDetails = async (userId, setMentorData) => {
  try {
    const params = { userId };
    const data = await getUserDetails(params);
    if (data && data.responseData && data.responseData.length > 0) {
      setMentorData(data.responseData[0]);
    }
  } catch (error) {
    console.error("Error fetching mentor details:", error);
  }
};

const AdminMentorDetails = () => {
  const [mentorData, setMentorData] = useState(null);
  const [events, setEvents] = useState([]);
  const [isEditDetailsOpen, setIsEditDetailsOpen] = useState(false);
  const [educationData, setEducationData] = useState(null);
  const [isEditEducationOpen, setIsEditEducationOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { mentorData: selectedMentor } = location.state || {};
  const { userId } = useParams();

  useEffect(() => {
    if (selectedMentor) {
      setMentorData(selectedMentor);
    }
  }, [selectedMentor]);

  useEffect(() => {
    if (userId) {
      fetchMentorDetails(userId, setMentorData);
    }
  }, [userId]);

  useEffect(() => {
    const fetchEvents = async () => {
      if (mentorData && mentorData.userId) {
        try {
          const data = await fetchEventsService({ host: mentorData.userId });
          setEvents(data);
        } catch (error) {
          console.error("Error fetching events:", error);
        }
      }
    };

    fetchEvents();
  }, [mentorData]);

  const handleCloseEditBasicDetails = () => setIsEditDetailsOpen(false);

  const handleFormSubmit2 = async (formData) => {
    try {
      console.log("Form Data", formData);
      const response = await addNewUser({
        ...formData,
        modifiedBy: secureLocalStorage.getItem("userSession").userId,
      });
      console.log("Add user response:", response);

      if (
        response &&
        response.statusCode === 400 &&
        response.errorMessage === "Email ID already in use"
      ) {
        toast.error("Email ID already in use");
      } else {
        handleCloseEditBasicDetails();
        fetchMentorDetails(userId, setMentorData);
        toast.success("User added successfully!");
      }
    } catch (error) {
      console.error("Error adding user details:", error);
      toast.error("Failed to add user!");
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      const { dob, phoneNo, aboutMe, addresses, userId } = formData;
      const updatedAddresses = addresses.map((address) => ({
        ...address,
        addressId: address.addressId || "",
      }));
      const updatedData = {
        userId,
        dob,
        phoneNo,
        aboutMe,
        addresses: updatedAddresses,
      };
      await updateUserDetails(updatedData);
      fetchMentorDetails(userId, setMentorData);
      toast.success("Details updated successfully!");
    } catch (error) {
      toast.error("Failed to update details!");
      console.error("Error updating user details:", error);
    }
  };

  const handleDelete = async () => {
    try {
      if (mentorData && mentorData.userId) {
        const params = { userId: mentorData.userId };
        await deleteUser({
          ...params,
          modifiedBy: secureLocalStorage.getItem("userSession").userId,
        });
        navigate("/admin/mentor");
      } else {
        console.error("mentorData or mentorData.userId is not defined");
      }
    } catch (error) {
      console.error(
        `Error deleting user with userId ${mentorData.userId}:`,
        error
      );
    }
  };

  if (!mentorData) {
    return <LoadingSpinner />;
  }

  const Education = mentorData ? mentorData.qualifications : [];

  const homeAddress =
    mentorData.addresses &&
    mentorData.addresses.find((address) => address.addressType === "home");

  const editBox = {
    mainHeading: "Edit Basic Details",
    initialData: {
      dob: mentorData.dob,
      phoneNo: mentorData.phoneNo,
      addresses: [
        {
          addressId: homeAddress ? homeAddress.addressId : "",
          houseName: homeAddress ? homeAddress.houseName : "",
          city: homeAddress ? homeAddress.city : "",
          pinCode: homeAddress ? homeAddress.pinCode : "",
          state: homeAddress ? homeAddress.state : "",
          country: homeAddress ? homeAddress.country : "",
        },
      ],
      aboutMe: mentorData.aboutMe,
    },
    isEdit: true,
  };

  const handleOpenEditEducation = () => {
    setEducationData(mentorData.qualifications);
    setIsEditEducationOpen(true);
  };

  return (
    <div>
      <MentorProfileInfo mentorData={mentorData} onSubmit={handleFormSubmit} />
      <Modal
        isOpen={isEditDetailsOpen}
        widthVariant="medium"
        onClose={handleCloseEditBasicDetails}
      >
        <BasicDetails {...editBox} onSubmit={handleFormSubmit} />
      </Modal>
      <EducationalQualification
        qualifications={Education}
        userId={mentorData.userId}
        onFormSubmit={handleFormSubmit2}
        onEditClick={handleOpenEditEducation}
      />
      <MentorEventsList events={events} handleDelete={handleDelete} />
    </div>
  );
};

export default AdminMentorDetails;
