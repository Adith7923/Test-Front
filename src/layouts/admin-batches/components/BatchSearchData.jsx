import { GoTrash } from "react-icons/go";
import { MdEdit } from "react-icons/md";

const AdminBatchSearchData = {
  navbuttonProps: {
    pageName: "Batch Name",
  },
  showTextButton: true,
  showAdd: true,
  showReset: false,
  textbuttonProps: {
    icon: <MdEdit />,
    text: "Edit Batch Name",
    onClick: (e) => {
      console.log("Edit clicked");
    },
  },
  textbuttonProps2: {
    icon: <GoTrash />,
    text: "Delete",
    onClick: (e) => {
      console.log("Delete clicked");
    },
  },
  searchbarProps: {
    variant: "custom",
    placeholder: "Student Name",
  },
  showFiltersAndReset: false,
  addbuttonProps: {
    variant: "tertiary",
    content: "+ Add new Student",
    width: "full",
  },
  newprops: {
    mainHeading: "Add Student",
    labelTitle: "Add student ID",
    placeHolder: "Student ID",
    buttonTitle: "Add",
  },
  editprops: {
    mainHeading: "Edit Batch Name",
    labelTitle: "Batch Name",
    placeHolder: "Batch Name",
    buttonTitle: "Save",
    initialData: { inputData: "Batch 1" },
  },
  deleteprops: {
    title: "Confirmation Required",
    message: "Are you sure you want to remove this batch?",
    buttonText: "Confirm",
  },
};

export default AdminBatchSearchData;
