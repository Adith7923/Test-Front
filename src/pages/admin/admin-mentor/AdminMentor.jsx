import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../../../services/User";
import AdminMentorAction from "../../../layouts/admin-mentor/components/AdminMentorAction";
import ProfileCard from "../../../components/cards/ProfileCard";
import image from "../../../assets/DP.png";
import { DataView } from "../../../layouts/common";
import NoData from "../../../components/nodata/NoData";
import secureLocalStorage from "react-secure-storage";

const fetchMentorData = async (setMentorData) => {
  try {
    let params = { roleId: 2 };

    const data = await getUserDetails(params);
    const mentorsOnly =
      data.responseData?.filter(
        (item) => item.role && item.role.roleId === 2
      ) || [];

    const sortedMentors = mentorsOnly.sort((a, b) => {
      const nameA = a.firstName.toLowerCase();
      const nameB = b.firstName.toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return nameA.localeCompare(nameB);
    });

    setMentorData(sortedMentors);
  } catch (error) {
    console.error("Error fetching mentor data:", error);
  }
};

const AdminMentor = () => {
  const [adminData, setAdminData] = useState(null);
  const [mentorData, setMentorData] = useState([]);
  const [filteredMentorData, setFilteredMentorData] = useState([]);
  const [cardAnimation, setCardAnimation] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchMentorData(setMentorData);
  }, []);

  useEffect(() => {
    const searchTerms = searchTerm
      .toLowerCase()
      .split(" ")
      .filter((term) => term.trim() !== "");
    const filteredData = mentorData.filter((mentor) => {
      const mentorName = `${mentor.firstName.toLowerCase()} ${mentor.lastName.toLowerCase()}`;
      return searchTerms.every(
        (term) =>
          mentorName.includes(term) ||
          mentor.userId.toString().includes(term) ||
          mentor.emailId.toLowerCase().includes(term)
      );
    });
    setFilteredMentorData(filteredData);
  }, [searchTerm, mentorData]);

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleCardClick = (userId) => {
    const selectedMentor = mentorData.find(
      (mentor) => mentor.userId === userId
    );
    if (selectedMentor) {
      navigate(`/admin/mentor/mentor-details/${userId}`, {
        state: { mentorData: selectedMentor },
      });
    } else {
      console.error(`Mentor with userId ${userId} not found.`);
    }
  };

  const userSession = secureLocalStorage.getItem("userSession") || {};
  const loggedUserFirstName = userSession.firstName;

  const greet = {
    welcome: "Welcome back",
    name: loggedUserFirstName || "",
    info: "Here is the information about",
    profile: "Mentors",
    showButtons: false,
  };

  let firstTrueAnimationSet = false;

  const data = {
    data: filteredMentorData.map((mentor) => {
      const viewAnimation =
        !firstTrueAnimationSet && cardAnimation && mentor.newEntry;
      if (viewAnimation) {
        firstTrueAnimationSet = true;
      }
      return {
        studentImage: mentor.profilePicture || image,
        studentName: `${mentor.firstName || "N/A"} ${mentor.lastName || ""}`,
        studentId: mentor.userId || "",
        studentCollege: "",
        studentMail: mentor.emailId || "",
        studentPhoneNumber: mentor.phoneNo || "\u00A0",
        studentAddress:
          mentor.addresses && mentor.addresses.length > 0
            ? `${mentor.addresses[0].houseName}, ${mentor.addresses[0].city} - ${mentor.addresses[0].pinCode}, ${mentor.addresses[0].state}, ${mentor.addresses[0].country}`
            : "",
        canDelete: false,
        viewAnimation: viewAnimation,
      };
    }),
    tableColumns: [
      { key: "studentId", displayName: "Mentor ID" },
      { key: "studentName", displayName: "Name" },
      { key: "studentMail", displayName: "Email ID" },
      { key: "studentPhoneNumber", displayName: "Phone Number" },
      { key: "studentAddress", displayName: "Address" },
    ],
    toggle: true,
    itemsPerPage: 15,
    viewInactiveText: "View Inactive Mentors",
    viewInactive: true,
    onViewInactiveClick: () => {
      console.log("View Inactive clicked");
      navigate(`/admin/mentor/inactive-mentors`);
    },
  };

  return (
    <div>
      {/* <Greeting {...greet} /> */}
      <AdminMentorAction
        count={filteredMentorData.length}
        onAddSuccess={() => fetchMentorData(setMentorData)}
        onSearchChange={handleSearchChange}
        setMentorData={setMentorData}
        setCardAnimation={setCardAnimation}
      />

      {filteredMentorData.length > 0 ? (
        <DataView
          CardComponent={(props) => (
            <ProfileCard
              {...props}
              onClick={() => handleCardClick(props.studentId)}
            />
          )}
          {...data}
        />
      ) : (
        <NoData title="Mentors" />
      )}
    </div>
  );
};

export default AdminMentor;
