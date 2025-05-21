import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataView } from "../../../layouts/common";
import PrimaryCard from "../../../components/cards/PrimaryCard";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../components/loadingspinner/LoadingSpinner";
import NoData from "../../../components/nodata/NoData";
import secureLocalStorage from "react-secure-storage";
import AdminTestAction from "../../../layouts/admin-tests/components/AdminTestAction";

// ✅ Updated mock data to include Skill & Level
const mockTests = [
  {
    testId: 101,
    testType: "MCQ",
    testMode: "Online",
    testTitle: "Java",
    description: "A test to assess your Java knowledge.",
    rating: 4.2,
    attempted: 23,
    mentor: "Smera",
    skill: "Java",
    level: "Beginner",
  },
  {
    testId: 102,
    testType: "Coding",
    testMode: "Offline",
    testTitle: "C",
    description: "An advanced C test to test your skills.",
    rating: 4.8,
    attempted: 17,
    mentor: "Shivam",
    skill: "C",
    level: "Advanced",
  },
  {
    testId: 103,
    testType: "MCQ",
    testMode: "Online",
    testTitle: "Python Basics",
    description: "Evaluate your understanding of Python fundamentals.",
    rating: 4.5,
    attempted: 30,
    mentor: "Ananya",
    skill: "Python",
    level: "Beginner",
  },
  {
    testId: 104,
    testType: "Coding",
    testMode: "Online",
    testTitle: "Data Structures in C++",
    description: "Intermediate level test on C++ data structures.",
    rating: 4.1,
    attempted: 19,
    mentor: "Rahul",
    skill: "C++",
    level: "Intermediate",
  },
  {
    testId: 105,
    testType: "MCQ",
    testMode: "Offline",
    testTitle: "JavaScript Essentials",
    description: "MCQs covering core JavaScript concepts.",
    rating: 3.9,
    attempted: 45,
    mentor: "Priya",
    skill: "JavaScript",
    level: "Beginner",
  },
  {
    testId: 106,
    testType: "Coding",
    testMode: "Online",
    testTitle: "React Project Debugging",
    description: "Advanced React test with debugging scenarios.",
    rating: 4.6,
    attempted: 12,
    mentor: "Nikhil",
    skill: "React",
    level: "Advanced",
  },
  {
    testId: 107,
    testType: "MCQ",
    testMode: "Offline",
    testTitle: "HTML & CSS Quiz",
    description: "Quick test to verify your frontend basics.",
    rating: 3.8,
    attempted: 50,
    mentor: "Megha",
    skill: "HTML/CSS",
    level: "Beginner",
  },
  {
    testId: 108,
    testType: "Coding",
    testMode: "Online",
    testTitle: "Node.js APIs",
    description: "Test your backend development with Node.js.",
    rating: 4.3,
    attempted: 20,
    mentor: "Arjun",
    skill: "Node.js",
    level: "Intermediate",
  },
  {
    testId: 109,
    testType: "MCQ",
    testMode: "Online",
    testTitle: "Database Concepts",
    description: "Check your knowledge on SQL and database design.",
    rating: 4.0,
    attempted: 34,
    mentor: "Ritika",
    skill: "SQL",
    level: "Intermediate",
  },
  {
    testId: 110,
    testType: "Coding",
    testMode: "Offline",
    testTitle: "Django Web App",
    description: "Advanced full-stack development in Django.",
    rating: 4.7,
    attempted: 11,
    mentor: "Tanmay",
    skill: "Django",
    level: "Advanced",
  },
];



const AdminTests = () => {
  const [tests, setTests] = useState([]);
  const [filteredTests, setFilteredTests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [params, setParams] = useState({ testMode: "", testType: "" });

  const [activeFilters, setActiveFilters] = useState({
    Mentor: [],
    Skill: [],
    Level: [],
  });

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

  // ✅ Fetch tests and sort
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

  // ✅ Combined search + filters
  useEffect(() => {
    const term = searchTerm.trim().toLowerCase();

    const filtered = tests.filter((test) => {
  const term = searchTerm.trim().toLowerCase();

  const matchSearch = term === "" || (test.testTitle?.toLowerCase().includes(term));

  const matchMentor =
    !activeFilters.Mentor ||
    activeFilters.Mentor.length === 0 ||
    (test.mentor && activeFilters.Mentor.includes(test.mentor));

  const matchSkill =
    !activeFilters.Skill ||
    activeFilters.Skill.length === 0 ||
    (test.skill && activeFilters.Skill.includes(test.skill));

  const matchLevel =
    !activeFilters.Level ||
    activeFilters.Level.length === 0 ||
    (test.level && activeFilters.Level.includes(test.level));

  return matchSearch && matchMentor && matchSkill && matchLevel;
});


    setFilteredTests(filtered);
  }, [searchTerm, activeFilters, tests]);

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
        mentor: data.mentor || "Smera",
        skill: data.skill || "JavaScript",
        level: data.level || "Beginner",
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

  // ✅ Correct filter state update
  const handleFilterChange = (newFilters) => {
    setActiveFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  };

  // ✅ Reset both search and filters
 const handleReset = () => {
  setSearchTerm("");
  setParams({ testMode: "", testType: "" });

  // Ensure filters are reset to empty arrays
  setActiveFilters({
    Mentor: [],
    Skill: [],
    Level: [],
  });

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
      },
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
    miniHeading: test.level,        // Level shown in first column
    mainHeading: test.testTitle,    // Title shown in second column
    mentor: test.mentor || "Smera", // Mentor for third column
    attempted: test.attempted || 0, // Attempted for fourth column
    Description: test.description,
    rating: test.rating,
    cardType: "Test",
    handleClick: () => handleClick(test),
  })),
  tableColumns: [
    { key: "miniHeading", displayName: "Level" },
    { key: "mainHeading", displayName: "Title" },
    { key: "mentor", displayName: "Mentor" },       // added Mentor column
    { key: "attempted", displayName: "Attempted" }, // added Attempted column
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
