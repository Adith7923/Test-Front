import React, { useState, useEffect } from "react";
import StudentCard from "../../../components/cards/StudentCard";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "../Home.module.css";

const StarPerformer = ({ studentProfiles, heading }) => {
  const [chunkSizeStudent, setChunkSizeStudent] = useState(3);
  const [showArrows, setShowArrows] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth <= 767) {
        setChunkSizeStudent(1);
        setShowArrows(false);
      } else if (windowWidth >= 768 && windowWidth <= 992) {
        setChunkSizeStudent(2);
        setShowArrows(true);
      } else {
        setChunkSizeStudent(4);
        setShowArrows(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const studentChunks = [];
  for (let i = 0; i < studentProfiles.length; i += chunkSizeStudent) {
    studentChunks.push(studentProfiles.slice(i, i + chunkSizeStudent));
  }

  const handleArrow = () => {
    const arrows = document.querySelectorAll(
      ".starperformer-carousel .control-arrow"
    );
    arrows.forEach((arrow) => {
      arrow.style.background = "none";
      arrow.style.bottom = "17%";
      if (!showArrows) {
        arrow.style.display = "none";
      } else {
        arrow.style.display = "block";
      }
    });
  };

  const handleDots = (currentSlide) => {
    const dots = document.querySelectorAll(
      ".starperformer-carousel .control-dots .dot"
    );
    const visibleNormalDots = 3;
    const visibleSmallDots = 2;
    const visibleDots = visibleNormalDots + visibleSmallDots;

    dots.forEach((dot, idx) => {
      if (
        idx >= currentSlide - Math.floor(visibleNormalDots / 2) &&
        idx <= currentSlide + Math.floor(visibleNormalDots / 2)
      ) {
        dot.style.display = "inline-block";
        dot.style.transform = "scale(1)"; 
      } else if (
        idx >= currentSlide - Math.floor(visibleDots / 2) &&
        idx < currentSlide - Math.floor(visibleNormalDots / 2)
      ) {
        dot.style.display = "inline-block";
        dot.style.transform = "scale(0.6)";
      } else if (
        idx <= currentSlide + Math.floor(visibleDots / 2) &&
        idx > currentSlide + Math.floor(visibleNormalDots / 2)
      ) {
        dot.style.display = "inline-block";
        dot.style.transform = "scale(0.6)";
      } else {
        dot.style.display = "none";
      }
    });
  };

  useEffect(() => {
    handleArrow();
    handleDots(0);
  }, [studentProfiles, chunkSizeStudent]);

  return (
    <div className={`${styles["carousel-header"]} ${styles["starperformer"]}`}>
      <div className={`${styles["carousel-heading"]}`}>
        <a className={`${styles["carousel-heading1"]}`}>{heading}</a>
      </div>
      <div className={`${styles["carousel-wrapper"]}`}>
        <Carousel
          className="starperformer-carousel"
          showThumbs={false}
          infiniteLoop
          useKeyboardArrows
          swipeable
          showStatus={false}
          onChange={handleDots}
          onInitialized={() => handleDots(0)}
        >
          {studentChunks.map((chunk, chunkIndex) => (
            <div key={chunkIndex} className={`${styles["carousel-chunk"]}`}>
              {chunk.map((student, index) => (
                <StudentCard
                  key={index}
                  studentImage={student.studentImage}
                  studentName={student.studentName}
                  studentId={student.studentId}
                  studentCollege={student.studentCollege}
                  studentMail={student.studentMail}
                  studentPhoneNumber={student.studentPhoneNumber}
                  handleClick={student.handleClick}
                />
              ))}
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default StarPerformer;
