import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AdminCollegeParticipants from "../../../layouts/admin-college/components/AdminCollegeParticipants";
import { getUserDetails } from "../../../services/User";

const AdminCollegeStudents = () => {
  const { collegeId } = useParams();
  const [count, setCount] = useState(null);
  const [collegeUserData, setCollegeUserData] = useState([]);
  const collegeData = JSON.parse(
    localStorage.getItem("collegeData")
  );
  useEffect(() => {
    const fetchCollegeData = async () => {
      try {
        const data = await getUserDetails({ collegeId });
        console.log("_____________________0", data);

        const transformedData = data.responseData
          .filter((user) => user.role.roleId == 3)
          .map((user) => [
            user.userId,
            user.firstName + " " + user.lastName,
            user.emailId,
          ])
          .sort((a, b) => {
            const nameA = a[1].toLowerCase();
            const nameB = b[1].toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
          });
        setCollegeUserData(transformedData);
        const count = transformedData.length;
        setCount(count);
      } catch (error) {
        console.error("Error fetching college data:", error);
      }
    };

    fetchCollegeData();
  }, []);

  const data = {
    headings: ["Student ID", "Student Name", "email ID"],
    data: collegeUserData,
  };

  const pageName = collegeData;
  return (
    <div>
      <AdminCollegeParticipants data={data} pageName={pageName} count={count} />
    </div>
  );
};

export default AdminCollegeStudents;
