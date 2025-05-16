import React, { useState } from "react";
import AddTest from "../../../layouts/admin-tests/AddTest";
import AddQuestion from "../../../layouts/admin-tests/AddQuestion";

const AdminAddTest = () => {
  return (
    <div className="p-4">
      <AddTest />

      {/* Add Question layout comes right after AddTest */}
      <AddQuestion />
    </div>
  );
};

export default AdminAddTest;
