import React from "react";
import AdminSkillParticipants from "../../../layouts/admin-skill/components/AdminSkillParticipants";

function AdminSkillStudents() {
  const data = [
    ["STD001", "John Jacob", "john123@gmail.com"],
    ["STD002", "Emy Davis", "davis211@gmail.com"],
    ["STD003", "Emy John", "john123@gmail.com"],
    ["STD004", "Jacob Davis", "davis211@gmail.com"],
    ["STD005", "John", "john123@gmail.com"],
    ["STD006", "Davis", "davis211@gmail.com"],
  ];

  const headings = ["Student ID", "Student Name", "Email ID"];

  const pageName = ["Skill Name"];

  return (
    <div>
      <AdminSkillParticipants
        data={data}
        headings={headings}
        pageName={pageName}
      />
    </div>
  );
}

export default AdminSkillStudents;
