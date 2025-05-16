const AdminBatchActionData = {
  heading: "Batches List",
  buttonProps: {
    variant: "tertiary",
    content: "+ Add New Batch",
    width: "full",
  },
  showDelete: false,
  searchWidth: "large",
  searchbarProps: {
    variant: "custom",
    placeholder: "Batch",
  },
  searchPlaceholder: "Search Batch Name",
  showFiltersAndReset: false,
  batchprops: {
    mainHeading: "Create Batch",
    options: [
      { value: "abc", label: "ABC" },
      { value: "xyz", label: "XYZ" },
      { value: "pqr", label: "PQR" },
    ],
  },
};

export default AdminBatchActionData;
