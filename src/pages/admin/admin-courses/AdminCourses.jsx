import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataView } from "../../../layouts/common";
import PrimaryCard from "../../../components/cards/PrimaryCard";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../components/loadingspinner/LoadingSpinner";
import NoData from "../../../components/nodata/NoData";
import secureLocalStorage from "react-secure-storage";
import AdminEventAction from "../../../layouts/admin-event/components/AdminEventAction";

// Dummy data for courses
const mockCourses = [
  {
    courseId: 1,
    courseType: "Workshop",
    courseTitle: "React Basics",
    description: "A workshop on the basics of React. A workshop on the basics of React. A workshop on the basics of React.",
    rating: 4,
  },
  {
    courseId: 2,
    courseType: "Webinar",
    courseTitle: "Advanced JavaScript",
    description: "An advanced webinar on JavaScript.",
    rating: 4.5,
  },
];

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const userSession = secureLocalStorage.getItem("userSession") || {};
  const loggedUserFirstName = userSession.firstName;

  const greeting = {
    welcome: "Welcome back",
    name: loggedUserFirstName || "",
    info: "Here is the information about",
    profile: "Courses",
    showButtons: false,
  };

  // Replace API call with dummy data
  const getCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      // Use dummy data instead of fetching from an API
      const sortedCourses = [...mockCourses].sort((a, b) => {
        const nameA = a.courseTitle.toLowerCase();
        const nameB = b.courseTitle.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });

      setCourses(sortedCourses);
      setFilteredCourses(sortedCourses);
    } catch (error) {
      setError("Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  const handleClick = (course) => {
    console.log(`Clicked on course ${course.courseId}`);
    navigate(`/admin/courses/course-details/${course.courseId}`);
  };

  const primaryCardData = {
    data: (searchTerm.length > 0 ? filteredCourses : courses).map((course) => ({
      miniHeading: course.courseType,
      mainHeading: course.courseTitle,
      Description: course.description,
      rating: course.rating,
      cardType: "Course",
      handleClick: () => handleClick(course),
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

  const formSubmit = async (data) => {
    // Simulate adding a course
    try {
      const newCourse = { ...data, courseId: Date.now() };
      const updatedCourses = [newCourse, ...courses];
      setCourses(updatedCourses);
      setFilteredCourses(updatedCourses);
      toast.success("Course created successfully!");
    } catch (error) {
      toast.error("Error creating course!");
    }
  };

  const handleSearchChange = (event) => {
    const searchValue = event.toLowerCase();
    setSearchTerm(searchValue);
    const filteredData = courses.filter((course) =>
      course.courseTitle.toLowerCase().includes(searchValue)
    );
    setFilteredCourses(filteredData);
  };

  const AdminCourseActionData = {
    heading: "Courses List",
    buttonProps: {
      variant: "tertiary",
      content: "+ Add New Course",
      width: "full",
    },
    showDelete: false,
    searchWidth: "small",
    searchbarProps: {
      variant: "custom",
      placeholder: "Courses",
    },
    resetProps: {
      variant: "reset",
      content: "Reset",
      width: "full",
    },
    addcourseprops: {
      organizeroptions: [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
        { value: "option4", label: "Option 4" },
      ],
    },
    searchPlaceholder: "Search Courses",
  };

  return (
    <div>
      <AdminEventAction
        count={courses.length}
        formSubmit={formSubmit}
        AdminEventActionData={AdminCourseActionData}
        onSearchChange={handleSearchChange}
      />
      {loading && <LoadingSpinner />}
      {error && <p>Error: {error}</p>}
      {!loading &&
        !error &&
        (filteredCourses.length > 0 ? (
          <DataView
            cardType="primarycard"
            CardComponent={PrimaryCard}
            {...primaryCardData}
          />
        ) : (
          <NoData title="Courses" />
        ))}
    </div>
  );
};

export default AdminCourses;
