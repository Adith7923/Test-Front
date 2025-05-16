import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import SideBar from "../../layouts/common/components/SideBar";
import Button from "../../components/buttons/PrimaryButton";
import Dp from "../../../src/assets/DP.png";
import edunexa from "../../../src/assets/edunexa.png";
import { MdEvent, MdAccountCircle, MdPsychology, MdMenuBook } from "react-icons/md";
import ProfileNotificationBox from "../../components/profilenotificationbox/ProfileNotificationBox";
import Footer from "../../layouts/common/components/Footer";
import StudentProfile from "./student-profile/StudentProfile";
import StudentEvent from "./student-events/StudentEvents";
import StudentEventDetails from "./student-events/StudentEventDetails";
import SkillLayout from "../../layouts/student-skill/components/SkillLayout";
import LoadingSpinner from "../../components/loadingspinner/LoadingSpinner";
import { getUserDetails, updateUserDetails } from "../../services/User";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../../layouts/common/components/Modal";
import LogoutBox from "../../layouts/common/components/LogoutBox";
import secureLocalStorage from "react-secure-storage";
import { GrResources } from "react-icons/gr";
import StudentCourses from "./student-courses/StudentCourses";

const StudentContent = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
  });
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const userSession = secureLocalStorage.getItem("userSession");
  const userId = userSession.userId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          userId: userId,
        };
        const data = await getUserDetails(params);
        setUserData(data.responseData[0]);

        const storedProfilePicture = data.responseData[0].profilePicture;
        const googleProfilePicture = localStorage.getItem("profilePicture");

        if (storedProfilePicture != googleProfilePicture) {
          await updateUserDetails({
            userId: userId,
            profilePicture: googleProfilePicture,
          });
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

  const primaryData = {
    name: `${userData.firstName} ${userData.lastName}`,
    email: userData.emailId,
  };

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
        name: "Profile",
        viewIcon: true,
        page: "profile",
      },
      { icon: <MdEvent />, name: "Events", viewIcon: true, page: "events" },
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
    ],
    profileBox: {
      name: primaryData.name,
      profilePic: `${localStorage.getItem("profilePicture")}` || Dp,
      gmail: primaryData.email,
      onProfileClick: () => navigate(`/student/profile`),
    },
  };

  const handleSidebarItemClick = (page) => {
    navigate(`/student/${page}`);
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
        user="student"
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
            />
          </div>
          <div className="statecontent">
            <Routes>
              <Route exact path="/profile" element={<StudentProfile />} />
              <Route exact path="/events" element={<StudentEvent />} />
              <Route path="events/:eventId" element={<StudentEventDetails />} />
              <Route exact path="skills" element={<SkillLayout />} />
              <Route exact path="courses" element={<StudentCourses />} />
            </Routes>
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

export default StudentContent;
