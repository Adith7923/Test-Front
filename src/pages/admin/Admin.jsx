import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import SideBar from "../../layouts/common/components/SideBar";
import Button from "../../components/buttons/PrimaryButton";
import edunexa from "../../../src/assets/edunexa.png";
import {
  MdEvent,
  MdViewQuilt,
  MdAccountCircle,
  MdPsychology,
  MdMenuBook,
  MdAssignment,
} from "react-icons/md";
import { RiContactsBook3Fill } from "react-icons/ri";
import ProfileNotificationBox from "../../components/profilenotificationbox/ProfileNotificationBox";
import Footer from "../../layouts/common/components/Footer";
import AdminStudent from "./admin-student/AdminStudent";
import AdminMentor from "./admin-mentor/AdminMentor";
import AdminEvent from "./admin-events/AdminEvent";
import AdminBatchList from "./admin-batches/AdminBatchList";
import AdminSkill from "./admin-skills/AdminSkill";
import AdminBatchSelect from "./admin-batches/AdminBatchSelect";
import AdminStudentDetails from "./admin-student/AdminStudentDetails";
import AdminMentorDetails from "./admin-mentor/AdminMentorDetails";
import AdminEventDetails from "./admin-events/EventDetails";
import AdminEventParticipants from "./admin-events/AdminEventParticipants";
import AdminSkillStudents from "./admin-skills/AdminSkillStudents";
import { getUserDetails, updateUserDetails } from "../../services/User";
import LoadingSpinner from "../../components/loadingspinner/LoadingSpinner";
import { SkillsProvider } from "./admin-skills/AdminSkillContext";
import { RecoilRoot } from "recoil";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import image from "../../assets/DP.png";
import Modal from "../../layouts/common/components/Modal";
import LogoutBox from "../../layouts/common/components/LogoutBox";
import { IoSchoolSharp } from "react-icons/io5";
import AdminCollege from "./admin-college/AdminCollege";
import AdminCollegeStudents from "./admin-college/AdminCollegeStudents";
import secureLocalStorage from "react-secure-storage";
import AdminInactiveStudent from "./admin-student/AdminInactiveStudent";
import CourseDetails from "./admin-courses/CourseDetails";
import AdminCourses from "./admin-courses/AdminCourses";
import SubCourseDetails from "./admin-courses/SubCourseDetails";
import AdminTests from "./admin-tests/AdminTest";
import AddTest from "./admin-tests/AdminAddTest";
import TestDetails from "./admin-tests/TestDetails";


const AdminContent = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userSession = secureLocalStorage.getItem("userSession") || {};
        const userId = userSession.userId;
        if (!userId) {
          console.error("User ID is not found in session storage");
          return;
        }
        console.log("Fetched User ID:", userId);
        console.log("UserId is of type:", typeof userId);
        const params = {
          userId: userId,
        };
        const data = await getUserDetails(params);
        const firstName = data.responseData[0].firstName;
        const updatedSession = {
          ...userSession,
          firstName: firstName,
        };
        secureLocalStorage.setItem("userSession", updatedSession);
        setUserData(data.responseData[0]);

        const storedProfilePicture = data.responseData[0].profilePicture;
        const googleProfilePicture = localStorage.getItem("profilePicture");

        if (storedProfilePicture != googleProfilePicture) {
          try {
            await axios.get(googleProfilePicture);
            await updateUserDetails({
              userId: userId,
              profilePicture: googleProfilePicture,
            });
          } catch (error) {
            console.error("Error fetching profile picture");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  if (!userData) {
    return <LoadingSpinner />;
  }
  const handleLogout = () => {
    secureLocalStorage.removeItem("userSession");
    localStorage.removeItem("profilePicture");
    navigate("/");
    toast.success("Logout Successful", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const handleCancelLogout = () => {
    setIsLogoutModalOpen(false);
  };

  const handleOpenLogoutModal = () => {
    console.log("sda");
    setIsLogoutModalOpen(true);
  };

  const sidebarContent = {
    button: (
      <Button
        content="Logout"
        variant="primary"
        width="full"
        onClick={handleOpenLogoutModal}
      />
    ),
    listItems: [
      {
        icon: <MdAccountCircle />,
        name: "Student",
        viewIcon: true,
        page: "student",
      },
      {
        icon: <RiContactsBook3Fill />,
        name: "Mentor",
        viewIcon: true,
        page: "mentor",
      },
      {
        icon: <IoSchoolSharp />,
        name: "Colleges",
        viewIcon: true,
        page: "colleges",
      },
      { icon: <MdEvent />, name: "Events", viewIcon: true, page: "events" },
      {
        icon: <MdViewQuilt />,
        name: "Batches",
        viewIcon: true,
        page: "batches",
      },
      {
        icon: <MdPsychology />,
        name: "Skills",
        viewIcon: true,
        page: "skills",
      },
      {
        icon: <MdMenuBook />,
        name: "Courses",
        viewIcon: true,
        page: "courses",
      },
      {
    icon: <MdAssignment />,
    name: "Tests",
    viewIcon: true,
    page: "tests",
  },
    ],
    profileBox: {
      name: `${userData.firstName} ${userData.lastName}`,
      profilePic: `${localStorage.getItem("profilePicture")}` || image,
      gmail: userData.emailId,
      onProfileClick: () => navigate(`/admin/student`),
      onLogoutClick: handleOpenLogoutModal,
      role: "admin",
    },
  };

  const handleSidebarItemClick = (page) => {
    navigate(`/admin/${page}`, {
      state: { userData },
    });
  };

  const footercontent = {
    Logo: edunexa,
    quoteContent: "Embark on Your Learning Journey Today!",
    copyrightContent: "All rights reserved © 2024 Tarento Group. |",
    copyrightContent2: "Privacy Policy",
    isLeftALigned: true,
  };

  return (
    <div className="flexStart">
      <SideBar
        button={sidebarContent.button}
        listItems={sidebarContent.listItems}
        profileBox={sidebarContent.profileBox}
        onItemClick={handleSidebarItemClick}
        
        location={location}
        user="admin"
      />
      <div className="page">
        <div>
          <div className="profilenotificationbox padding">
            <ProfileNotificationBox
              name={sidebarContent.profileBox.name}
              profilePic={sidebarContent.profileBox.profilePic}
              gmail={sidebarContent.profileBox.gmail}
              onProfileClick={sidebarContent.profileBox.onProfileClick}
              onLogoutClick={handleOpenLogoutModal}
              role={sidebarContent.profileBox.role}
            />
          </div>
          <div className="statecontent">
            <RecoilRoot>
              <SkillsProvider>
                <Routes>
                  <Route path="student" element={<AdminStudent />} />
                  <Route path="mentor" element={<AdminMentor />} />
                  <Route path="events" element={<AdminEvent />} />
                  <Route path="batches" element={<AdminBatchList />} />
                  <Route path="skills" element={<AdminSkill />} />
                  <Route path="colleges" element={<AdminCollege />} />
                  <Route path="courses" element={<AdminCourses />} />
                  <Route path="courses/course-details" element={<CourseDetails />} />
                  <Route path="courses/course-details/modules" element={<SubCourseDetails/>} />
                  <Route path="tests" element={<AdminTests />} />
                  <Route path="tests/add" element={<AddTest />} />
                  <Route path="tests/test-details/:testId" element={<TestDetails />} />


                  <Route
                    path="skills/skill-participants"
                    element={<AdminSkillStudents />}
                  />
                  <Route
                    path="/student/inactive-students"
                    element={<AdminInactiveStudent />}
                  />
                  <Route
                    path="/mentor/inactive-mentors"
                    element={<AdminInactiveStudent />}
                  />
                  <Route
                    path="batches/batch-details/:batchId"
                    element={<AdminBatchSelect />}
                  />
                  <Route
                    path="student/student-details/:userId"
                    element={<AdminStudentDetails />}
                  />
                  <Route
                    path="mentor/mentor-details/:userId"
                    element={<AdminMentorDetails />}
                  />
                  <Route
                    path="events/event-details/:eventId"
                    element={<AdminEventDetails />}
                  />
                  <Route
                    path="events/event-details/event-participants/:eventId"
                    element={<AdminEventParticipants />}
                  />
                  <Route
                    path="colleges/college-participants/:collegeId"
                    element={<AdminCollegeStudents />}
                  />
                  <Route
                    path="/batches/batch-details/student-details/:userId"
                    element={<AdminStudentDetails />}
                  />
                </Routes>
              </SkillsProvider>
            </RecoilRoot>
          </div>
        </div>
        <div className="footer">
          <Footer {...footercontent} />
        </div>
      </div>
      <Modal
        isOpen={isLogoutModalOpen}
        widthVariant="small"
        onClose={() => setIsLogoutModalOpen(false)}
      >
        <LogoutBox
          title="Logout"
          message="Are you sure you want to logout?"
          onCancel={handleCancelLogout}
          onLogout={handleLogout}
          buttonText="Logout"
        />
      </Modal>
    </div>
  );
};

export default AdminContent;
