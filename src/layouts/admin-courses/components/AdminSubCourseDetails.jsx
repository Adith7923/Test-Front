import React, { useState } from "react";
import StackCard from "../../../components/cards/StackCard";
import styles from "./../AdminCourses.module.css";
import NavButton from "../../../components/buttons/NavButton";
import { RiArrowLeftSLine } from "react-icons/ri";
import { RiArrowRightSLine } from "react-icons/ri";
import DropTextButton from "../../../components/buttons/DropTextButton";
import ProgressBar from "../../../components/progressbar/ProgressBar";

const AdminSubCourseDetails = ({
  headingnav,
  heading,
  intro,
  modules,
  progress,
}) => {
  const [activeButton, setActiveButton] = useState(null); 
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (name, index) => {
    setActiveButton(name);
    setActiveIndex(index);
    console.log("clicked", name);
    console.log("clicked index", index);
    console.log("current activeIndex", activeIndex);
  };

  const currentModule = activeIndex !== null ? modules[activeIndex] : null;

  return (
    <div className="padding">
      <div className={styles["subcourse"]}>
        <div className={styles["subcourse_nav"]}>
          {headingnav.map((item, index) => (
            <NavButton key={index} pageName={item} />
          ))}
        </div>
        <div className={styles["subcourse_body"]}>
          <div className={styles["subcourse_modules"]}>
            <div className={styles["subcourse_headLayout"]}>
              <h1 className={styles["subcourse_head"]}>{heading}</h1>
              <div className={styles["subcourse_nextbutton"]}>
                <StackCard
                  content="Previous"
                  showIcon={true}
                  icon={<RiArrowLeftSLine size={20} />}
                />
                <StackCard
                  content={<RiArrowRightSLine size={20} />}
                  showIcon={true}
                  icon="Next"
                />
              </div>
            </div>
            <div className={styles["subcourse_content"]}>
              {currentModule && (
                <>
                  <p>{currentModule.intro.content}</p>
                  <div className={styles["subcourse_subcontentsection"]}>
                    {currentModule.body.map((item, index) => (
                      <div key={index} className={styles["subcourse_subcontent"]}>
                        <h2 className={styles["subcourse_head"]}>{item.subhead}</h2>
                        {item.image && (
                          <div className={styles["subcourse_imgcontainer"]}>
                            <img
                              className={styles["subcourse_img"]}
                              src={item.image}
                              alt={item.subhead}
                            />
                          </div>
                        )}
                        <p>{item.content}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className={styles["subcourse_rightnav"]}>
            <div className={styles["rightnav_container"]}>
              <div className={styles["rightnav_progress"]}>
                <ProgressBar
                  showHeading={true}
                  heading={heading}
                  percentage={progress}
                />
              </div>
              <div className={styles["rightnav_modules"]}>
                {modules.map((moduleItem, moduleIndex) => (
                  <div key={moduleIndex} className={styles["module"]}>
                    <DropTextButton
                      color={activeButton === moduleItem.module ? "#baff66" : "white"} 
                      text={moduleItem.module}
                      list={moduleItem.submodules}
                      onclick={() => handleClick(moduleItem.module, moduleIndex)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSubCourseDetails;
