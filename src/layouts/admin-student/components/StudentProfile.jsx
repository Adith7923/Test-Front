import React, { useState } from "react";
import UserProfileInfo from "../../common/components/UserProfileInfo";
import Modal from "../../common/components/Modal";
import BasicDetails from "../../common/components/BasicDetails";
import profilepic from "../../../assets/DP.png";
import NavButton from "../../../components/buttons/NavButton";
import AboutMe from "../../common/components/AboutMe";

const StudentProfileInfo = ({ studentsData, onSubmit }) => {
  const navProps = {
    pageName: "Profile",
  };
  const [isEditDetailsOpen, setIsEditDetailsOpen] = useState(false);

  const handleOpenEditBasicDetails = () => {
    setIsEditDetailsOpen(true);
  };

  const handleCloseEditBasicDetails = () => {
    setIsEditDetailsOpen(false);
  };

  const handleFormSubmit = (formData) => {
    const { addresses, ...formDataWithoutAddresses } = formData;

    const addressesChanged = addresses.some(
      (address) =>
        address.houseName ||
        address.city ||
        address.pinCode ||
        address.state ||
        address.country
    );

    const updatedAddresses = addressesChanged
      ? addresses.map((address) => ({
          ...address,
          addressId: address.addressId || "",
        }))
      : [];

    onSubmit({
      userId: studentsData.userId,
      ...formDataWithoutAddresses,
      addresses: updatedAddresses,
    });

    handleCloseEditBasicDetails();
  };

  const homeAddress =
    studentsData.addresses &&
    studentsData.addresses.find((address) => address.addressType === "home");

  const editBox = {
    mainHeading: "Edit Basic Details",
    initialData: {
      dob: studentsData.dob,
      phoneNo: studentsData.phoneNo,
      addresses: [
        {
          addressId: homeAddress ? homeAddress.addressId : "",
          houseName: homeAddress ? homeAddress.houseName : "",
          city: homeAddress ? homeAddress.city : "",
          pinCode: homeAddress ? homeAddress.pinCode : "",
          state: homeAddress ? homeAddress.state : "",
          country: homeAddress ? homeAddress.country : "",
        },
      ],
      aboutMe: studentsData.aboutMe,
    },
    isEdit: true,
  };

  const aboutMeProps = {
    title: "About Me",
    description: studentsData.aboutMe ? (
      studentsData.aboutMe
    ) : (
      <div className="nodata">No data available</div>
    ),
  };

  return (
    <div>
      <div className="padding">
        <NavButton {...navProps} />
      </div>
      <UserProfileInfo
        userId={studentsData.userId}
        role={studentsData.role ? studentsData.role.roleName : ""}
        profilepic={studentsData.profilePicture || profilepic}
        name={`${studentsData.firstName || "N/A"} ${studentsData.lastName || "N/A"}`}
        college={studentsData.college ? studentsData.college.collegeName : ""}
        dob={studentsData.dob}
        email={studentsData.emailId}
        phoneNo={studentsData.phoneNo}
        addresses={studentsData.addresses}
        hasDelete={false}
        onClickEdit={handleOpenEditBasicDetails}
      />
      <Modal
        isOpen={isEditDetailsOpen}
        widthVariant="medium"
        onClose={handleCloseEditBasicDetails}
      >
        <BasicDetails {...editBox} onSubmit={handleFormSubmit} />
      </Modal>
      <AboutMe {...aboutMeProps} />
    </div>
  );
};

export default StudentProfileInfo;
