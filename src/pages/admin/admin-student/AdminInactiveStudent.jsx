import React from "react";
import BatchSearch from "../../../layouts/common/components/BatchSearch";
import ProfileCard from "../../../components/cards/ProfileCard";
import { DataView } from "../../../layouts/common";
import image from "../../../assets/DP.png";
import AdminBatchParticipants from "../../../layouts/admin-batches/components/AdminBatchParticipants";

const AdminInactiveStudent = ({
  participantCount,
  searchTerm,
  setSearchTerm,
}) => {
  const AdminInactiveSearchData = {
    participantCount: "23",
    navbuttonProps: {
      pageName: "Back",
    },
    showTextButton: false,
    showAdd: false,
    showReset: false,
    showSearch: true,
    searchbarProps: {
      placeholder: "Search Student Name",
    },
    showFiltersAndReset: false,
  };

  const studentData = {
    data: [
      {
        studentImage: image,
        studentName: "John Doe",
        studentId: "STDID3456",
        studentCollege: "St Christ College",
        studentMail: "johndoe@email.com",
        studentPhoneNumber: "(555) 555-5555",
        canDelete: true,
        handleDelete: console.log("Delete Icon Clicked !!!"),
        onClick: console.log("Card clicked"),
      },
      {
        studentImage: image,
        studentName: "John Doe",
        studentId: "STDID3456",
        studentCollege: "St Christ College",
        studentMail: "johndoe@email.com",
        studentPhoneNumber: "(555) 555-5555",
        canDelete: true,
        handleDelete: console.log("Delete Icon Clicked !!!"),
        onClick: console.log("Card clicked"),
      },
      {
        studentImage: image,
        studentName: "John Doe",
        studentId: "STDID3456",
        studentCollege: "St Christ College",
        studentMail: "johndoe@email.com",
        studentPhoneNumber: "(555) 555-5555",
        canDelete: true,
        handleDelete: console.log("Delete Icon Clicked !!!"),
        onClick: console.log("Card clicked"),
      },
    ],
    tableColumns: [
      { key: "name", displayName: "Name" },
      { key: "email", displayName: "Email" },
    ],
  };
  return (
    <div>
      <BatchSearch
        {...AdminInactiveSearchData}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <DataView
        CardComponent={ProfileCard}
        data={studentData.data || []}
        // tableColumns={studentData.tableColumns || {}}
        // toggle={true}
        // itemsPerPage={10}
        // viewInactive={false}
        // viewInactiveText="View Inactive Students"
        // onViewInactiveClick={() => console.log("View Inactive clicked")}
      />
    </div>
  );
};

export default AdminInactiveStudent;
