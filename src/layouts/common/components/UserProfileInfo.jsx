import React from "react";
import styles from "../Common.module.css";
import ProfilePicture from "../../../components/profilepicture/ProfilePicture";
import TextButton from "../../../components/buttons/TextButton";
import { MdEdit, MdDelete } from "react-icons/md";
import { IoMdMail } from "react-icons/io";
import { FaPhone, FaGithub, FaLinkedin } from "react-icons/fa";

const UserProfileInfo = (props) => {
  const {
    role,
    profilepic,
    name,
    userId,
    college,
    dob,
    email,
    phoneNo,
    linkedin,
    github,
    aboutMe,
    hasDelete,
    onClickEdit,
    onClickDelete,
    addresses,
    ...rest
  } = props;

  return (
    <div className={`${styles["userprofile-main"]} padding-top padding`}>
      <div className={`${styles["userprofile-user-details"]}`}>
        <div className={`${styles["userprofile-title"]}`}>
          <h2 className={`${styles["userprofile-title1"]}`}>Details</h2>
          <div className={`${styles["userprofile-controlbuttons"]}`}>
            <div className={`${styles["userprofile-controlbutton"]}`}>
              <TextButton
                icon={<MdEdit />}
                text="Edit"
                onClick={onClickEdit}
              />
            </div>
            {hasDelete && (
              <div className={`${styles["userprofile-controlbutton"]}`}>
                <TextButton
                  icon={<MdDelete />}
                  text="Delete"
                  onClick={onClickDelete}
                />
              </div>
            )}
          </div>
        </div>

        <div className={`${styles["userprofile-details-section"]}`}>
          <div className={`${styles["userprofile-basic-info"]}`}>
            <div className={`${styles["userprofile-profile-picture"]}`}>
              <ProfilePicture src={profilepic} />
            </div>
            <div className={`${styles["userprofile-info-text"]}`}>
              <h3 className={`${styles["userprofile-name"]}`}>{name}</h3>
              <h4 className={`${styles["userprofile-student-id"]}`}>
                <b>{role.charAt(0).toUpperCase() + role.slice(1)} ID:</b>{" "}
                {userId}
              </h4>
              {role === "student" && (
                <h4 className={`${styles["userprofile-college"]}`}>
                  {college}
                </h4>
              )}
              <h4 className={`${styles["userprofile-dob"]}`}><b>DOB:</b> {dob? dob : <a className="nodata">N/A</a>}</h4>
            </div>
          </div>

          <div className={`${styles["userprofile-bio"]}`}>
            <h4 className={`${styles["userprofile-email"]}`}>
              <IoMdMail /> {email}
            </h4>
            <h4 className={`${styles["userprofile-phone"]}`}>
              <FaPhone /> {phoneNo ? phoneNo : <a className="nodata">N/A</a>}
            </h4>
            {linkedin && (
              <h4 className={`${styles["userprofile-linkedin"]}`}>
                <a
                  className={`${styles["userprofile-social-links"]}`}
                  href={`https://${linkedin}`}
                >
                  <FaLinkedin /> LinkedIn :{linkedin}
                </a>
              </h4>
            )}
            {github && (
              <h4 className={styles["userprofile-github"]}>
                <a
                  className={`${styles["userprofile-social-links"]}`}
                  href={`https://${github}`}
                >
                  <FaGithub /> GitHub : {github}
                </a>
              </h4>
            )}
            <br />
            <h4 className={`${styles["userprofile-address"]}`}>
              <b>Address:</b>
            </h4>
            {addresses && addresses.length > 0 ? (
              <div>
                {addresses.map((address, index) => (
                  <h4
                    key={index}
                    className={`${styles["userprofile-address"]}`}
                  >
                    {address.houseName && (
                      <>
                        {address.houseName}
                        {address.city && ` , `}
                      </>
                    )}
                    {address.city && (
                      <>
                        {address.city}
                        {address.pinCode && ` - `}
                      </>
                    )}
                    {address.pinCode && (
                      <>
                        {address.pinCode}
                        {address.state && `, `}
                      </>
                    )}
                    {address.state && (
                      <>
                        {address.state}
                        {address.country && `, `}
                      </>
                    )}
                    {address.country && <>{address.country}</>}
                  </h4>
                ))}
              </div>
            ) : (
              <div className="nodata"> N/A</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileInfo;
