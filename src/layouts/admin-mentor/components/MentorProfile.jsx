import React, { useState } from "react";
import UserProfileInfo from "../../common/components/UserProfileInfo";
import Modal from "../../common/components/Modal";
import BasicDetails from "../../common/components/BasicDetails";
import NavButton from "../../../components/buttons/NavButton";
import AboutMe from "../../common/components/AboutMe";
import profilepic from "../../../assets/DP.png";

const MentorProfileInfo = ({ mentorData, onSubmit }) => {
  const [isEditDetailsOpen, setIsEditDetailsOpen] = useState(false);

  const navProps = { pageName: "Profile" };

  const handleOpenEditBasicDetails = () => setIsEditDetailsOpen(true);
  const handleCloseEditBasicDetails = () => setIsEditDetailsOpen(false);

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
      userId: mentorData.userId,
      ...formDataWithoutAddresses,
      addresses: updatedAddresses,
    });

    handleCloseEditBasicDetails();
  };

  if (!mentorData) {
    return <div>No data found for mentor.</div>;
  }

  const homeAddress =
    mentorData.addresses &&
    mentorData.addresses.find((address) => address.addressType === "home");

  const editBox = {
    mainHeading: "Edit Basic Details",
    initialData: {
      dob: mentorData.dob,
      phoneNo: mentorData.phoneNo,
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
      aboutMe: mentorData.aboutMe,
    },
    isEdit: true,
  };

  const aboutMeProps = {
    title: "About Me",
    description: mentorData.aboutMe ? (
      mentorData.aboutMe
    ) : (
      <div
        style={{
          textAlign: "left",
          color: "var(--neutral600)",
          marginTop: "10px",
          fontSize: "15px",
        }}
      >
        No data available
      </div>
    ),
  };

  return (
    <div>
      <div className="padding">
        <NavButton {...navProps} />
      </div>
      <UserProfileInfo
        userId={mentorData.userId}
        role={mentorData.role ? mentorData.role.roleName : ""}
        profilepic={mentorData.profilePicture || profilepic}
        name={`${mentorData.firstName || "N/A"} ${
          mentorData.lastName || "N/A"
        }`}
        college={mentorData.college ? mentorData.college.collegeName : ""}
        dob={mentorData.dob}
        email={mentorData.emailId}
        phoneNo={mentorData.phoneNo}
        addresses={mentorData.addresses}
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

export default MentorProfileInfo;
