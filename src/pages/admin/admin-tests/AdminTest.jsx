import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataView } from "../../../layouts/common";
import PrimaryCard from "../../../components/cards/PrimaryCard";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../components/loadingspinner/LoadingSpinner";
import NoData from "../../../components/nodata/NoData";
import secureLocalStorage from "react-secure-storage";
import AdminTestAction from "../../../layouts/admin-tests/components/AdminTestAction";

// Dummy data for tests
const mockTests = [
  {
    testId: 101,
    testType: "MCQ",
    testMode: "Online",
    testTitle: "Java",
    description: "A test to assess your Java knowledge.",
    rating: 4.2,
  },
  {
    testId: 102,
    testType: "Coding",
    testMode: "Offline",
    testTitle: "C",
    description: "An advanced C test to test your skills.",
    rating: 4.8,
  },
];

const AdminTests = () => {
  const [tests, setTests] = useState([]);
  const [filteredTests, setFilteredTests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [params, setParams] = useState({ testMode: "", testType: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const userSession = secureLocalStorage.getItem("userSession") || {};
  const loggedUserFirstName = userSession.firstName;

  const greeting = {
    welcome: "Welcome back",
    name: loggedUserFirstName || "",
    info: "Here is the information about",
    profile: "Tests",
    showButtons: false,
  };

  const getTests = async () => {
    setLoading(true);
    setError(null);
    try {
      const sortedTests = [...mockTests].sort((a, b) =>
        a.testTitle.toLowerCase().localeCompare(b.testTitle.toLowerCase())
      );
      setTests(sortedTests);
      setFilteredTests(sortedTests);
    } catch (error) {
      setError("Failed to fetch tests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTests();
  }, []);

  useEffect(() => {
    let updated = [...tests];

    if (searchTerm.trim()) {
      updated = updated.filter((test) =>
        test.testTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (params.testMode) {
      updated = updated.filter((test) => test.testMode === params.testMode);
    }

    if (params.testType) {
      updated = updated.filter((test) => test.testType === params.testType);
    }

    setFilteredTests(updated);
  }, [searchTerm, params, tests]);

  const handleClick = (test) => {
    navigate(`/admin/tests/test-details/${test.testId}`);
  };

  const formSubmit = async (data) => {
    try {
      const newTest = {
        ...data,
        testId: Date.now(),
        testMode: data.testMode || "Online",
        testType: data.testType || "MCQ",
      };
      const updatedTests = [newTest, ...tests];
      setTests(updatedTests);
      toast.success("Test created successfully!");
    } catch (error) {
      toast.error("Error creating test!");
    }
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleFilterChange = (filters) => {
    setParams((prev) => ({
      ...prev,
      ...filters,
    }));
  };

  const handleReset = () => {
    setSearchTerm("");
    setParams({ testMode: "", testType: "" });
    setFilteredTests(tests);
  };

  const AdminTestActionData = {
    heading: "Tests List",
    buttonProps: {
      variant: "tertiary",
      content: "+ Add New Test",
      width: "full",
    },
    showDelete: false,
    searchWidth: "small",
    searchbarProps: {
      variant: "custom",
      placeholder: "Search Tests",
    },
    showFiltersAndReset: true,
    resetProps: {
      variant: "reset",
      content: "Reset",
      width: "full",
    },
    filterProps: [
      {
        Heading: "Mentor",
        Content: ["Smera", "Unnimanga", "Siddharth", "Shivam"],
        Value: ["Smera", "Unnimanga", "Siddharth", "Shivam"],
      },
      {
        Heading: "Skill",
        Content: ["Java", "C", "Python", "JavaScript"],
        Value: ["Java", "C", "Python", "JavaScript"],
      },
      {
        Heading: "Level",
        Content: ["Beginner", "Intermediate", "Advanced"],
        Value: ["Beginner", "Intermediate", "Advanced"],
      }
    ],
    addcourseprops: {
      organizeroptions: [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
        { value: "option4", label: "Option 4" },
      ],
    },
    searchPlaceholder: "Search Tests", 
  };

  const primaryCardData = {
    data: filteredTests.map((test) => ({
      miniHeading: test.testType,
      mainHeading: test.testTitle,
      Description: test.description,
      rating: test.rating,
      cardType: "Test",
      handleClick: () => handleClick(test),
    })),
    tableColumns: [
      { key: "miniHeading", displayName: "Type" },
      { key: "mainHeading", displayName: "Title" },
      { key: "Description", displayName: "Description" },
      { key: "rating", displayName: "Rating" },
    ],
    toggle: true,
    itemsPerPage: 12,
    cardType: "primarycard",
  };

  return (
    <div>
      <AdminTestAction
        count={filteredTests.length}
        formSubmit={formSubmit}
        AdminTestActionData={AdminTestActionData}
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
      />

      {loading && <LoadingSpinner />}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        filteredTests.length > 0 ? (
          <DataView
            cardType="primarycard"
            CardComponent={PrimaryCard}
            {...primaryCardData}
          />
        ) : (
          <NoData title="Tests" />
        )
      )}
    </div>
  );
};

export default AdminTests;
