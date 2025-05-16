import React, { useState, useEffect } from "react";
import { Greeting } from "../../../layouts/common";
import AboutMe from "../../../layouts/common/components/AboutMe";
import Upcoming from "../../../layouts/student-profile/components/Upcoming";
import StudentProfileInfo from "../../../layouts/student-profile/components/StudentProfileInfo";
import EducationalQualification from "../../../layouts/common/components/EducationalQualification";
import { getUserDetails, updateUserDetails } from "../../../services/User";
import profilepic from "../../../assets/DP.png";
import LoadingSpinner from "../../../components/loadingspinner/LoadingSpinner";
import { fetchEventsService } from "../../../services/Event";
import { toast } from "react-toastify";
import secureLocalStorage from "react-secure-storage";

const StudentProfile = () => {
  const [studentData, setStudentData] = useState(null);
  const [eventData, setEventData] = useState(null);

  const fetchData = async () => {
    try {
      const userSession = secureLocalStorage.getItem("userSession") || {};
      const userId = userSession.userId;
      const params = {
        userId: userId,
      };
      const data = await getUserDetails(params);
      const eventdata = await fetchEventsService({ completed: 0 });
      console.log(eventdata);
      setEventData(eventdata);

      if (data.responseData[0]) {
        setStudentData(data.responseData[0]);
      } else {
        console.error("No student data found");
      }
      console.log("Student data:", data.responseData);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleFormSubmit = async (formData) => {
    try {
      console.log("Form Submitted with data:", formData);
      const response = await updateUserDetails(formData);
      console.log("Update response:", response);
      fetchData();
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  if (!studentData) {
    return <LoadingSpinner />;
  }
  const transformEventData = (events) => {
    return events.slice(0, 4).map((event) => ({
      eventId: event.eventId,
      main: event.eventTitle,
      sub: event.description,
      start: new Date(`1970-01-01T${event.startTime}`)
        .toLocaleTimeString([], { hour: "2-digit", hour12: true })
        .toLowerCase(),
      end: new Date(`1970-01-01T${event.endTime}`)
        .toLocaleTimeString([], { hour: "2-digit", hour12: true })
        .toLowerCase(),
      status: "upcoming",
      date: new Date(event.startDate).getDate(),
    }));
  };

  const transformedEventData = eventData ? transformEventData(eventData) : [];
  console.log(transformedEventData);

  const about = {
    title: "About Me",
    description: studentData.aboutMe ? (
      studentData.aboutMe
    ) : (
      <div
        style={{
          textAlign: "left",
          color: "var(--neutral600)",
          marginTop: "10px",
          fontSize: "15px",
        }}
      >
        No data available
      </div>
    ),
  };

  const homeAddress = studentData.addresses.find(
    (address) => address.addressType === "home"
  );

  const EditableData = {
    userId: studentData.userId,
    dob: studentData.dob,
    phoneNo: studentData.phoneNo,
    addresses: [
      {
        addressId: homeAddress?.addressId || "",
        houseName: homeAddress?.houseName || "",
        city: homeAddress?.city || "",
        pinCode: homeAddress?.pinCode || "",
        state: homeAddress?.state || "",
        country: homeAddress?.country || "",
      },
    ],
    aboutMe: studentData.aboutMe || "",
  };

  const profileData = {
    profilepic: localStorage.getItem("profilePicture") || profilepic,
    name: `${studentData.firstName} ${studentData.lastName}`,
    college: studentData.college?.collegeName || "",
    email: studentData.emailId,
  };

  const Education = studentData.qualifications || [];

  const greet = {
    welcome: "Welcome back",
    name: `${studentData.firstName}`,
    showButtons: false,
  };

  return (
    <div>
      {/* <Greeting {...greet} /> */}
      <StudentProfileInfo
        profileData={profileData}
        EditableData={EditableData}
        onFormSubmit={handleFormSubmit}
      />
      <AboutMe {...about} />
      <EducationalQualification
        qualifications={Education}
        userId={studentData.userId}
        onFormSubmit={handleFormSubmit}
      />
      <Upcoming events={transformedEventData} />
    </div>
  );
};

export default StudentProfile;
