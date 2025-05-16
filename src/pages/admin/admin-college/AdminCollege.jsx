import React, { useState, useEffect } from "react";
import AdminCollegeAction from "../../../layouts/admin-college/components/AdminCollegeAction";
import CollegeCard from "../../../components/cards/CollegeCard";
import { DataView } from "../../../layouts/common";
import { getColleges } from "../../../services/User";
import { postColleges } from "../../../services/User";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import NoData from "../../../components/nodata/NoData";
import { useNavigate } from "react-router-dom";
import AddCollege from "../../../layouts/admin-college/components/AddCollege";
import Modal from "../../../layouts/common/components/Modal";

const AdminCollege = () => {
  const location = useLocation();
  const [collegeData, setCollegeData] = useState([]);
  const [filteredCollegeData, setFilteredCollegeData] = useState([]);
  const [userData, setUserData] = useState(null);
  const [count, setCount] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [initialData, setInitialData] = useState({
    collegeName: "",
    collegePlace: "",
    collegeDistrict: "",
    collegeState: "",
    collegeCountry: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [collegeId, setCollegeId] = useState("");
  const [newCollegeId, setNewCollegeId] = useState(null);

  useEffect(() => {
    const fetchCollegeData = async () => {
      try {
        const data = await getColleges();
        const count = data.responseData.length;
        setCount(count);
        const transformedData = data.responseData
          .map((college) => [
            college.collegeId,
            college.collegeName,
            college.collegePlace,
            college.collegeDistrict,
            college.collegeState,
            college.collegeCountry,
            college.studentsCount,
          ])
          .sort((a, b) => {
            const nameA = a[1].toLowerCase();
            const nameB = b[1].toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
          });

        setCollegeData(transformedData);
        setFilteredCollegeData(transformedData);
      } catch (error) {
        console.error("Error fetching college data:", error);
      }
    };

    fetchCollegeData();
  }, []);
  console.log("_____________________0", collegeData);

  const handleSearchChange = (college) => {
    const searchValue = college.toLowerCase();
    setSearchTerm(searchValue);

    const filteredData = collegeData.filter((college) =>
      college[1].toLowerCase().includes(searchValue)
    );
    setFilteredCollegeData(filteredData);
  };

  const handleEdit = (college) => {
    console.log("edit clicked");
    handleOpenModal();
    setInitialData({
      collegeName: college[1],
      collegePlace: college[2],
      collegeDistrict: college[3],
      collegeState: college[4],
      collegeCountry: college[5],
    });
    setIsEdit(true);
    setCollegeId(college[0]);
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleFormSubmit = async (data) => {
    console.log("Form submitted with data:", data);
    handleCloseModal();
    formSubmit(data);
  };

  const collegeCardData = {
    data: filteredCollegeData.map((college) => ({
      miniHeading: college[0],
      mainHeading: college[1],
      Count: college[6],
      cardType: "college",
      handleClick: () => handleClick(college),
      showCount: true,
      viewAnimation: college[0] === newCollegeId,
      showPlace: true,
      placeHeading: `${college[2]}, ${college[3]}`,
      handleEditClick: () => handleEdit(college),
    })),
    tableColumns: [
      { key: "miniHeading", displayName: "College ID" },
      { key: "mainHeading", displayName: "College Name" },
      { key: "Count", displayName: "Count" },
      { key: "placeHeading", displayName: "Place" },
    ],
    toggle: true,
    itemsPerPage: 12,
    cardType: "collegecard",
  };
  const handleClick = (college) => {
    console.log(`Clicked on college ${college[0]}`);
    navigate(`college-participants/${college[0]}`);
    localStorage.setItem("collegeData", JSON.stringify(college[1]));
  };

  const AdminCollegeActionData = {
    heading: "Colleges List",
    buttonProps: {
      variant: "tertiary",
      content: "+ Add New College",
      width: "full",
    },
    showDelete: false,
    searchWidth: "small",
    searchbarProps: {
      variant: "custom",
      placeholder: "Colleges",
    },
    showFiltersAndReset: false,
    searchPlaceholder: "Search Colleges",
  };

  const formSubmit = async (formData) => {
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
        const newCollege = [
          formData.collegeId,
          formData.collegeName,
          formData.collegePlace,
          formData.collegeDistrict,
          formData.collegeState,
          formData.collegeCountry,
          0,
        ];
        setCollegeData([newCollege, ...transformedData]);
        setFilteredCollegeData([newCollege, ...transformedData]);
        setNewCollegeId(formData.collegeId);

        setTimeout(() => setNewCollegeId(null), 3000);

        if (location.state && location.state.userData) {
          setUserData(location.state.userData);
        }
      } catch (error) {
        toast.error("Error creating college", {
          position: "top-center",
          autoClose: 5000,
        });
      }
      if (formData.collegeId) {
        toast.success("College updated successfully", {
          position: "top-center",
          autoClose: 5000,
        });
      } else {
        toast.success("College added successfully", {
          position: "top-center",
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error("Error adding college:", error);
    }
  };

  return (
    <div>
      {/* <Greeting {...greeting} /> */}
      <AdminCollegeAction
        count={count}
        formSubmit={formSubmit}
        AdminCollegeActionData={AdminCollegeActionData}
        onSearchChange={handleSearchChange}
      />
      {filteredCollegeData.length > 0 ? (
        <DataView CardComponent={CollegeCard} {...collegeCardData} />
      ) : (
        <NoData title="Colleges" />
      )}
      <Modal isOpen={isOpen} widthVariant="large" onClose={handleCloseModal}>
        <AddCollege
          onSubmit={handleFormSubmit}
          initialData={initialData}
          isEdit={isEdit}
          collegeId={collegeId}
        />
      </Modal>
    </div>
  );
};

export default AdminCollege;
