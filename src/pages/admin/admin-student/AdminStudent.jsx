import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast, Slide } from "react-toastify";
import secureLocalStorage from "react-secure-storage";
import ProfileCard from "../../../components/cards/ProfileCard";
import DataView from "../../../layouts/common/components/DataView";
import Greeting from "../../../layouts/common/components/Greeting";
import Modal from "../../../layouts/common/components/Modal";
import ActionComponent from "../../../layouts/common/components/Action";
import AddUser from "../../../layouts/common/components/AddUser";
import {
  getColleges,
  postColleges,
  getUserDetails,
  updateUserDetails,
  addNewUser,
} from "../../../services/User";
import { fetchBatchParticipants, fetchbatches } from "../../../services/Batch";
import LoadingSpinner from "../../../components/loadingspinner/LoadingSpinner";
import image from "../../../assets/DP.png";
import NoData from "../../../components/nodata/NoData";

const fetchBatchData = async (setBatchData) => {
  try {
    const data = await fetchbatches();
    const transformedData = data.responseData.map((batch) => [
      batch.batchId,
      batch.batchName,
    ]);
    setBatchData(transformedData);
  } catch (error) {
    console.error("Error fetching batch data:", error);
  }
};

const fetchBatchParticipantsData = async (setParams, params) => {
  try {
    if (params.Batch) {
      var filterParams = {
        batchId: params.Batch || "",
      };
      const filteredParams = Object.fromEntries(
        Object.entries(filterParams).filter(([key, value]) => value !== "")
      );
      const participantsData = await fetchBatchParticipants(filteredParams);
      const participantsTransformedData = participantsData.responseData;

      filterParams = {
        userId: participantsTransformedData.join(",") || "",
      };
      const filteredParam = Object.fromEntries(
        Object.entries(filterParams).filter(([key, value]) => value !== "")
      );

      setParams((prevParams) => ({
        ...prevParams,
        StudentIds: participantsTransformedData.join(",") || "",
      }));
    }
  } catch (error) {
    console.error("Error fetching batch data:", error);
  }
};

const AdminStudent = () => {
  const [collegeData, setCollegeData] = useState([]);
  const [batchData, setBatchData] = useState([]);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [studentsData, setStudentsData] = useState([]);
  const [filteredStudentData, setFilteredStudentData] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [cardAnimation, setCardAnimation] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [params, setParams] = useState({
    College: "",
    Batch: "",
    StudentIds: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const fetchStudentsData = async (setStudentsData, params) => {
    try {
      var filterParams = {
        roleId: 3,
      };
      if (params.College) {
        filterParams = {
          collegeId: params.College || "",
        };
      }
      if (params.StudentIds && Number.isInteger(Number(params.StudentIds))) {
        filterParams = {
          userId: Number(params.StudentIds),
        };
      } else if (params.StudentIds && typeof params.StudentIds === "string") {
        filterParams = {
          name: params.StudentIds,
        };
      }
      if (params.Batch && !params.StudentIds) {
        setStudentsData([]);
        return;
      }
      const filteredParams = Object.fromEntries(
        Object.entries(filterParams).filter(([key, value]) => value !== "")
      );

      const data = await getUserDetails(filteredParams);
      const studentsOnly =
        data.responseData?.filter(
          (item) => item.role && item.role.roleId === 3
        ) || [];

      var sortedStudents = null;
      if (studentsOnly) {
        sortedStudents = [...studentsOnly].sort((a, b) => {
          const nameA = a.firstName.toLowerCase();
          const nameB = b.firstName.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
      }

      setStudentsData(sortedStudents);
      setFilteredStudentData(sortedStudents);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    const fetchCollegeData = async () => {
      try {
        const data = await getColleges();
        const transformedData = data.responseData
          .map((college) => [
            college.collegeId,
            college.collegeName,
            college.collegePlace,
            college.collegeDistrict,
            college.collegeState,
            college.collegeCountry,
          ])
          .sort((a, b) => a[1].localeCompare(b[1]));

        setCollegeData(transformedData);

        if (location.state && location.state.userData) {
          setUserData(location.state.userData);
        }
      } catch (error) {
        console.error("Error fetching college data:", error);
      }
    };

    fetchCollegeData();
    fetchStudentsData();
  }, [setStudentsData, params]);

  useEffect(() => {
    fetchStudentsData(setStudentsData, params);
    fetchBatchData(setBatchData, params);
    fetchBatchParticipantsData(setParams, params);
  }, [params]);

  if (!collegeData.length) {
    return <LoadingSpinner />;
  }

  const handleSearchChange = (student) => {
    const searchValue = student.toLowerCase();
    setSearchTerm(searchValue);
    const filteredData = studentsData.filter((student) =>
      `${student.firstName} ${student.lastName}`
        .toLowerCase()
        .includes(searchValue)
    );
    setFilteredStudentData(filteredData);
    console.log("dhiuahd_________________", filteredData);
  };

  const userSession = secureLocalStorage.getItem("userSession");
  const loggedUserFirstName = userSession.firstName;

  const AdminStudentData = {
    greetingData: {
      welcome: "Welcome back",
      name: loggedUserFirstName || "",
      info: "Here is the information about",
      profile: "Students",
      showButtons: false,
      viewprops: {
        data: collegeData,
        headings: [
          "College ID",
          "College Name",
          "Place",
          "District",
          "State",
          "Country",
        ],
      },
      addprops: {},
    },
    heading: "Students List",
    buttonProps: {
      variant: "tertiary",
      content: "+ Add New Student",
      width: "full",
    },
    searchWidth: "medium",
    searchbarProps: {
      variant: "custom",
      placeholder: "Student Name",
    },
    showFiltersAndReset: true,
    filterProps: [
      {
        Heading: "College",
        Content: collegeData.map((college) => college[1]),
        Value: collegeData.map((college) => college[0]),
      },

      //Don't Remove below code

      // {
      //   Heading: "Batch",
      //   Content: batchData.map((batch) => batch[1]),
      //   Value: batchData.map((batch) => batch[0]),
      // },
    ],
    resetProps: {
      variant: "reset",
      content: "Reset",
      width: "full",
    },
    adduserprops: {
      options: collegeData.map((college) => ({
        value: college[0],
        label: college[1],
      })),
      viewCollege: true,
      heading: "Add New Student",
    },
    searchPlaceholder: "Search Student ID/Name",
    combinedFilter: false,
  };

  let firstTrueAnimationSet = false;

  const dataView = {
    data: (searchTerm.length > 0 ? filteredStudentData : studentsData).map(
      (student) => {
        const viewAnimation =
          !firstTrueAnimationSet && cardAnimation && student.newEntry;
        if (viewAnimation) {
          firstTrueAnimationSet = true;
        }

        return {
          studentImage: student.profilePicture || image,
          studentName: `${student.firstName || ""} ${student.lastName || ""}`,
          studentId: student.userId || "",
          studentCollege: student.college.collegeName || "",
          studentMail: student.emailId || "",
          studentPhoneNumber: student.phoneNo || "",
          canDelete: false,
          viewAnimation: viewAnimation,
        };
      }
    ),
    tableColumns: [
      { key: "studentId", displayName: "Student ID" },
      { key: "studentName", displayName: "Name" },
      { key: "studentCollege", displayName: "College" },
      { key: "studentMail", displayName: "Email ID" },
      { key: "studentPhoneNumber", displayName: "Phone Number" },
    ],
    toggle: true,
    itemsPerPage: 15,
    viewInactiveText: "View Inactive Students",
    viewInactive: true,
    onViewInactiveClick: () => {
      console.log("View Inactive clicked");
      navigate(`/admin/student/inactive-students`);
    },
  };

  const handleOpenView = () => {
    setIsViewOpen(true);
  };

  const handleCloseView = () => {
    setIsViewOpen(false);
  };

  const handleOpenAdd = () => {
    setIsAddOpen(true);
  };

  const handleCloseAdd = () => {
    setIsAddOpen(false);
  };

  const handleFormSubmit = async (formData) => {
    try {
      const response = await postColleges(formData);
      try {
        const data = await getColleges();
        const transformedData = data.responseData.map((college) => [
          college.collegeId,
          college.collegeName,
          college.collegePlace,
          college.collegeDistrict,
          college.collegeState,
          college.collegeCountry,
        ]);
        setCollegeData(transformedData);

        if (location.state && location.state.userData) {
          setUserData(location.state.userData);
        }
      } catch (error) {
        toast.error("Error creating college", {
          position: "top-center",
          autoClose: 5000,
        });
      }
      toast.success("College Added", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      handleCloseAdd();
    } catch (error) {
      console.error("Error adding college:", error);
    }
  };

  const GreetingData = {
    ...AdminStudentData.greetingData,
    handleClick: handleOpenView,
    handleClick2: handleOpenAdd,
  };

  const handleOpenAddStudentModal = () => {
    setCardAnimation(false);
    setSubmitError(null);
    setIsAddStudentOpen(true);
  };

  const handleCloseAddStudentModal = () => {
    setSubmitError(null);
    setIsAddStudentOpen(false);
  };

  const getCollegeName = (collegeId) => {
    const college = collegeData.find((c) => c[0] === collegeId);
    return college ? college[1] : "";
  };

  const handleAddStudentFormSubmit = async (formData) => {
    try {
      formData.roleId = 3;
      // formData.profilePicture =
      //   "https://as2.ftcdn.net/v2/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg";

      const response = await addNewUser({
        ...formData,
        modifiedBy: secureLocalStorage.getItem("userSession").userId,
        createdBy: secureLocalStorage.getItem("userSession").userId,});
      const newStudent = response.responseData;
      newStudent.college = {
        collegeId: formData.collegeId,
        collegeName: getCollegeName(formData.collegeId),
      };
      newStudent.newEntry = true;
      setCardAnimation(true);
      setStudentsData((prevStudentsData) => [newStudent, ...prevStudentsData]);
      setSubmitError(null);
      handleCloseAddStudentModal();
    } catch (error) {
      console.error("Error adding student:", error);
      setSubmitError("Email ID already registered");
    }
  };

  const actionData = {
    ...AdminStudentData,
    buttonProps: {
      ...AdminStudentData.buttonProps,
      onClick: handleOpenAddStudentModal,
    },
  };

  const handleFilterChange = (filters) => {
    setParams((prevParams) => ({
      ...prevParams,
      ...filters,
      StudentIds: filters.StudentIds || "",
    }));
  };

  // const handleSearchChange = (value) => {
  //   setParams((prevParams) => ({
  //     ...prevParams,
  //     StudentIds: value,
  //   }));
  // };

  const handleCardClick = (userId) => {
    const selectedStudent = studentsData.find(
      (student) => student.userId === userId
    );
    if (selectedStudent) {
      navigate(`/admin/student/student-details/${userId}`, {
        state: { studentsData: selectedStudent },
      });
    } else {
      console.error(`Mentor with userId ${userId} not found.`);
    }
  };

  return (
    <div>
      <Greeting {...GreetingData} />
      {/* <Modal isOpen={isViewOpen} widthVariant="large" onClose={handleCloseView}>
        {collegeData.length > 0 ? (
          <CollegeList {...AdminStudentData.greetingData.viewprops} />
        ) : (
          <div>No colleges available</div>
        )}
      </Modal> */}
      {/* <Modal isOpen={isAddOpen} widthVariant="large" onClose={handleCloseAdd}>
        <AddCollege onSubmit={handleFormSubmit} />
      </Modal> */}

      <ActionComponent
        {...actionData}
        count={studentsData.length}
        onFilterChange={handleFilterChange}
        onSearchChange={handleSearchChange}
      />
      <Modal
        isOpen={isAddStudentOpen}
        widthVariant="medium"
        onClose={handleCloseAddStudentModal}
      >
        <AddUser
          {...AdminStudentData.adduserprops}
          onSubmit={handleAddStudentFormSubmit}
          submitError={submitError}
        />
      </Modal>

      {filteredStudentData.length > 0 ? (
        <div>
          <DataView
            CardComponent={(props) => (
              <ProfileCard
                {...props}
                onClick={() => handleCardClick(props.studentId)}
                attendance={true}
                percentage="99"
              />
            )}
            {...dataView}
          />
        </div>
      ) : (
        <NoData title="Students" />
      )}
      {/* <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Slide}
      /> */}
    </div>
  );
};

export default AdminStudent;
