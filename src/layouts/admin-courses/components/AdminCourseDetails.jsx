import React from "react";
import styles from "./../AdminCourses.module.css";
import NavButton from "../../../components/buttons/NavButton";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import StackCard from "../../../components/cards/StackCard";
import { IoIosStar } from "react-icons/io";
import { BsDot } from "react-icons/bs";
import DropTextButton from "../../../components/buttons/DropTextButton";
import ProfileCard from "../../../components/cards/ProfileCard";
import image from "../../../assets/DP.png";

const AdminCourseDetails = ({
  heading,
  objective,
  buttonContent,
  skills,
  description,
  modules,
  level,
  rate,
  lessons,
  enrollment,
  mentorData,
  headingnav,
  handleClick = () => {
    console.log("clicked go to course");
  },
}) => {
  const cardData = {
    studentImage: image,
    studentName: "John Doe",
    studentId: "STDID3456",
    studentCollege: "St Christ College",
    studentMail: "johndoe@email.com",
    studentPhoneNumber: "(555) 555-5555",
    canDelete: false,
    onClick: console.log("Card clicked"),
  };
  return (
    <div className="padding">
      <div className={styles["coursedetails"]}>
        <div className={styles["coursedetails_nav"]}>
          {headingnav.map((item, index) => (
            <NavButton pageName={item} />
          ))}
        </div>
        <div className={styles["headLayout"]}>
          <div className={styles["headLayout_head"]}>
            <h1 className={styles["head"]}>{heading}</h1>
            <PrimaryButton
              content={buttonContent}
              variant="reset"
              onClick={handleClick}
            />
          </div>
          <p>{objective}</p>
          <div className={styles["details"]}>
            <div className={styles["level"]}>
              {" "}
              Level: <b>{level}</b>
            </div>
            <BsDot />
            <div className={styles["rating"]}>
              {" "}
              <IoIosStar className={styles["star"]} /> {rate}
            </div>
            <BsDot />
            <div className={styles["lessons"]}>
              {" "}
              <b> {lessons}</b> Lessons
            </div>
            <BsDot />
            <div className={styles["enrolled"]}>
              {" "}
              <b> {enrollment}</b> Enrolled students
            </div>
          </div>
        </div>

        <div className={styles["skills"]}>
          {skills.map((skill, index) => (
            <StackCard key={index} content={skill} />
          ))}
        </div>

        <div className={styles["description"]}>
          <p>{description}</p>
        </div>
        <div className={styles["modules"]}>
          <h2 className={styles["head"]}>Modules</h2>
          {modules.map((moduleItem, moduleIndex) => (
            <div key={moduleIndex} className={styles["module"]}>
              <DropTextButton
                text={moduleItem.module}
                list={moduleItem.submodules}
                onclick={(index, item) =>
                  console.log("Clicked item:", item, "at index:", index)
                }
              />
            </div>
          ))}
        </div>
        <div className={styles["mentor"]}>
          <h2 className={styles["head"]}>Mentors</h2>
          <div className={styles["mentorData"]}>
            {mentorData.map((mentor) => {
              const cardData = {
                studentImage: mentor.imageUrl,
                studentName: mentor.name,
                studentId: mentor.studentId,
                studentCollege: mentor.studentCollege,
                studentMail: mentor.studentMail,
                studentPhoneNumber: mentor.studentPhoneNumber,
                onClick: console.log("Card clicked"),
              };

              return <ProfileCard key={mentor.id} {...cardData} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCourseDetails;
