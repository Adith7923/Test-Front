import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Routes, Route } from "react-router-dom";
import SideBar from "../../layouts/common/components/SideBar";
import Button from "../../components/buttons/PrimaryButton";
import Dp from "../../../src/assets/DP.png";
import edunexa from "../../../src/assets/edunexa.png";
import { MdEvent, MdAccountCircle, MdPsychology, MdMenuBook } from "react-icons/md";
import ProfileNotificationBox from "../../components/profilenotificationbox/ProfileNotificationBox";
import Footer from "../../layouts/common/components/Footer";
import MentorProfile from "./mentor-profile/MentorProfile";
import MentorEvents from "./mentor-events/MentorEvents";
import MentorSkills from "./mentor-skills/MentorSkills";
import MentorCreateEvent from "./mentor-events/MentorCreateEvent";
import MentorEventDetails from "./mentor-events/MentorEventDetails";
import { getUserDetails, updateUserDetails } from "../../services/User";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../../components/loadingspinner/LoadingSpinner";
import Modal from "../../layouts/common/components/Modal";
import LogoutBox from "../../layouts/common/components/LogoutBox";
import secureLocalStorage from "react-secure-storage";

const MentorContent = () => {
  const [Data, setData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
  });
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const userSession = secureLocalStorage.getItem("userSession");
  const userId = userSession.userId;

  const location = useLocation();

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const params = {
        userId: userId,
      };
      const data = await getUserDetails(params);
      setData(data.responseData[0]);
      console.log("mentor data:", Data);

      const storedProfilePicture = data.responseData[0].profilePicture;
      const googleProfilePicture = localStorage.getItem("profilePicture");

      if (storedProfilePicture != googleProfilePicture) {
        await updateUserDetails({
          userId: userId,
          profilePicture: googleProfilePicture,
        });
      }
    } catch (error) {
      console.error("Error fetching mentor data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!Data) {
    return <LoadingSpinner />;
  }

  const primaryData = {
    name: `${Data.firstName} ${Data.lastName}`,
    email: Data.emailId,
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
      onProfileClick: () => navigate(`/mentor/profile`),
    },
  };

  const handleSidebarItemClick = (page) => {
    navigate(`/mentor/${page}`);
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
        user="mentor"
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
              <Route path="/profile" element={<MentorProfile />} />
              <Route path="/events" element={<MentorEvents />} />
              <Route path="/skills" element={<MentorSkills />} />
              <Route
                path="/events/event-creation"
                element={<MentorCreateEvent />}
              />
              <Route
                path="/events/event-details/:eventId"
                element={<MentorEventDetails />}
              />
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

export default MentorContent;
