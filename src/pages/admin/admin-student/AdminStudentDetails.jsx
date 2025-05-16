import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SkillList from "../../../layouts/admin-student/components/SkillList";
import EventList from "../../../layouts/admin-student/components/EventsList";
import StudentProfileInfo from "../../../layouts/admin-student/components/StudentProfile";
import { getUserDetails, addNewUser, deleteUser } from "../../../services/User";
import LoadingSpinner from "../../../components/loadingspinner/LoadingSpinner";
import { useRecoilState } from "recoil";
import { adminStudentSkillState } from "../../../states/Atoms";
import { getSkillsForUser } from "../../../services/Skills";
import { toast } from "react-toastify";
import {
  enrollParticipantService,
  fetchEventsService,
  addEnrollmentService,
} from "../../../services/Event";
import EducationalQualification from "../../../layouts/common/components/EducationalQualification";
import secureLocalStorage from "react-secure-storage";

const fetchStudentDetails = async (userId, setStudentData) => {
  try {
    const params = { userId };
    const data = await getUserDetails(params);
    if (data && data.responseData && data.responseData.length > 0) {
      setStudentData(data.responseData[0]);
    }
  } catch (error) {
    console.error("Error fetching student details:", error);
  }
};

const AdminStudentDetails = () => {
  const [studentsData, setStudentData] = useState(null);

  const [studentSkills, setStudentSkills] = useRecoilState(
    adminStudentSkillState
  );
  const [studentEvents, setStudentEvents] = useState([]);
  const [eventOptions, setEventOptions] = useState([]);
  const [isEditDetailsOpen, setIsEditDetailsOpen] = useState(false);
  const [educationData, setEducationData] = useState(null);
  const [isEditEducationOpen, setIsEditEducationOpen] = useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { studentsData: selectedStudent } = location.state || {};

  const fetchStudentEvents = async (participantId) => {
    try {
      const response = await enrollParticipantService(
        null,
        participantId,
        null
      );
      const enrolledEvents = response.responseData.enrolled.map((event) => ({
        miniHeading: event.eventType,
        mainHeading: event.eventTitle,
        startDate: event.startDate,
        endDate: event.endDate,
        Description: event.description,
        cardType: event.eventType,
        eventId: event.eventId,
      }));
      const completedEvents = response.responseData.completed.map((event) => ({
        miniHeading: event.eventType,
        mainHeading: event.eventTitle,
        startDate: event.startDate,
        endDate: event.endDate,
        Description: event.description,
        cardType: event.eventType,
        eventId: event.eventId,
      }));
      setStudentEvents([...enrolledEvents, ...completedEvents]);
      return [...enrolledEvents, ...completedEvents];
    } catch (error) {
      console.error("Error fetching student events:", error);
      return [];
    }
  };

  const fetchEventOptions = async (enrolledEventIds) => {
    try {
      const eventData = await fetchEventsService({ completed: 0 });
      const formattedOptions = eventData
        .filter((event) => !enrolledEventIds.includes(event.eventId))
        .map((event) => ({
          value: event.eventId,
          label: `${event.eventId}-${event.eventTitle}`,
        }));
      setEventOptions(formattedOptions);
    } catch (error) {
      console.error("Error fetching event options:", error);
    }
  };

  const handleCloseEditBasicDetails = () => setIsEditDetailsOpen(false);

  const handleFormSubmit2 = async (formData) => {
    try {
      console.log("Form Data", formData);
      const response = await addNewUser({
        ...formData,
        modifiedBy: secureLocalStorage.getItem("userSession").userId,
        createdBy: secureLocalStorage.getItem("userSession").userId,
      });
      console.log("Update response:", response);
      handleCloseEditBasicDetails();
      fetchStudentDetails(userId, setStudentData);
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (selectedStudent) {
        setStudentData(selectedStudent);
      }
      if (studentsData?.userId) {
        await fetchStudentDetails(studentsData.userId, setStudentData);
        const studentEvents = await fetchStudentEvents(studentsData.userId);
        const enrolledEventIds = studentEvents.map((event) => event.eventId);
        await fetchEventOptions(enrolledEventIds);
      }
    };

    fetchData();
  }, [userId, selectedStudent, studentsData?.userId]);

  const handleFormSubmit = async (formData) => {
    try {
      const { dob, phoneNo, aboutMe, addresses, userId, education } = formData;
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

      await addNewUser({
        ...updatedData,
        modifiedBy: secureLocalStorage.getItem("userSession").userId,
      });

      const fetchData = async () => {
        await fetchStudentDetails(userId, setStudentData);
        const studentEvents = await fetchStudentEvents(userId);
        const enrolledEventIds = studentEvents.map((event) => event.eventId);
        await fetchEventOptions(enrolledEventIds);
      };
      fetchData();
      toast.success("Details updated successfully!");
    } catch (error) {
      toast.error("Error updating user details!");
    }
  };

  const handleEnrollSubmit = async (enrollmentData) => {
    try {
      await addEnrollmentService(enrollmentData.selectedEventId, {
        participantId: studentsData.userId,
      });

      const newEvents = await fetchStudentEvents(studentsData.userId);

      const newEventDetails = newEvents.find(
        (event) => event.eventId === enrollmentData.selectedEventId
      );

      setStudentEvents([
        newEventDetails,
        ...newEvents.filter(
          (event) => event.eventId !== enrollmentData.selectedEventId
        ),
      ]);

      const enrolledEventIds = newEvents.map((event) => event.eventId);
      await fetchEventOptions(enrolledEventIds);

      toast.success("Event added successfully!");
    } catch (error) {
      toast.error("Error enrolling in event!");
    }
  };

  const Education = studentsData ? studentsData.qualifications : [];

  const handleDelete = async () => {
    try {
      if (studentsData?.userId) {
        const params = { userId: studentsData.userId };
        await deleteUser(params);
        navigate("/admin/student");
        toast.success("Student deleted successfully!");
      } else {
        console.error("studentsData or studentsData.userId is not defined");
      }
    } catch (error) {
      toast.error(`Error deleting user with userId ${studentsData.userId}:`);
    }
  };

  if (!studentsData) {
    return <LoadingSpinner />;
  }

  const handleOpenEditEducation = () => {
    setEducationData(studentsData.qualifications);
    setIsEditEducationOpen(true);
  };

  return (
    <div>
      <StudentProfileInfo
        studentsData={studentsData}
        onSubmit={handleFormSubmit}
      />
      <EducationalQualification
        qualifications={Education}
        userId={studentsData.userId}
        onFormSubmit={handleFormSubmit2}
        onEditClick={handleOpenEditEducation}
      />
      <SkillList studentId={studentsData.userId} />
      <EventList
        participantId={studentsData.userId}
        events={studentEvents}
        handleDelete={handleDelete}
        eventOptions={eventOptions}
        onSubmit={handleEnrollSubmit}
      />
    </div>
  );
};

export default AdminStudentDetails;
