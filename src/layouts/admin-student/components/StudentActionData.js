const AdminStudentActionData = {
    heading: "Students List",
    buttonProps: {
      variant: "tertiary",
      content: "+ Add new Student",
      width: "full",
    },
    searchWidth: "medium",
    searchbarProps: {
      variant: "custom",
      placeholder: "Student Name",
    },
    showFiltersAndReset: true,
    filterProps: [
      {
        Heading: "College",
        Content: ["GEC Thrissur", "RIT Kottayam", "NSS Plakkad"],
      },
      { Heading: "Batch", Content: ["Batch 1", "Batch 2", "Batch 3"] },
    ],
    resetProps: {
      variant: "secondary",
      content: "Reset",
      width: "full",
    },
    adduserprops: {
      options: [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
      ],
      viewCollege: true,
      heading: "Add New Student",
    }
  };
  
  export default AdminStudentActionData;
  