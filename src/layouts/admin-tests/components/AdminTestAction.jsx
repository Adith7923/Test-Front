import React, { useEffect, useState } from "react";
import ActionComponent from "../../common/components/Action";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../../../services/User";

const AdminTestAction = ({
  formSubmit,
  AdminTestActionData,
  onFilterChange,
  onSearchChange,
  count,
}) => {
  const [organizerOptions, setOrganizerOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrganizers = async () => {
      try {
        const response = await getUserDetails({ roleId: 2 });
        const options = response.responseData.map((user) => ({
          value: user.userId,
          label: `${user.firstName} ${user.lastName}`,
        }));
        setOrganizerOptions(options);
      } catch (error) {
        console.error("Error fetching test organizers:", error);
      }
    };

    fetchOrganizers();
  }, []);

  const actionData = {
    ...AdminTestActionData,
    count,
    buttonProps: {
      ...AdminTestActionData.buttonProps,
      onClick: () => navigate("/admin/tests/add"), // Navigate instead of modal
    },
  };

  return (
    <div>
      <ActionComponent
        {...actionData}
        onFilterChange={onFilterChange}
        onSearchChange={onSearchChange}
      />
    </div>
  );
};

export default AdminTestAction;
