import React, { useState, useEffect } from "react";
import EditTest from "../../../layouts/admin-tests/EditTest";
import AddQuestion from "../../../layouts/admin-tests/AddQuestion";

const AdminEditTest = () => {
  const [initialTestData, setInitialTestData] = useState(null);

  useEffect(() => {
    // Simulate fetching test data (replace with actual API call)
    const fetchTestData = async () => {
      // Example data (replace with real test data from API)
      const data = {
        testName: "React Intermediate",
        level: "moderate",
        numOfQuestions: 15,
        duration: 45,
        skill: "react",
        topics: "Hooks, Context API, Routing",
        passPercentage: 60,
      };
      setInitialTestData(data);
    };

    fetchTestData();
  }, []);

  return (
    <div className="p-4">
      {/* Show EditTest only when data is loaded */}
      {initialTestData && (
        <EditTest
          initialData={initialTestData}
          onSubmit={(updatedData) => {
            console.log("Updated test:", updatedData);
            // Add API call to update the test here
          }}
        />
      )}

      {/* Add Question layout comes after editing test */}
      <AddQuestion />
    </div>
  );
};

export default AdminEditTest;
