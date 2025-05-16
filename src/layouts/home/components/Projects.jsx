import React, { useState, useEffect } from "react";
import PrimaryCard from "../../../components/cards/PrimaryCard";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "../Home.module.css";

const Project = ({ projects, heading1, heading2, carouselId }) => {
  const [chunkSizeProject, setChunkSizeProject] = useState(3);
  const [showArrows, setShowArrows] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth <= 767) {
        setChunkSizeProject(1);
        setShowArrows(false);
      } else if (windowWidth >= 768 && windowWidth <= 992) {
        setChunkSizeProject(2);
        setShowArrows(true);
      } else {
        setChunkSizeProject(3);
        setShowArrows(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const projectChunks = [];
  for (let i = 0; i < projects.length; i += chunkSizeProject) {
    projectChunks.push(projects.slice(i, i + chunkSizeProject));
  }

  const handleArrow = () => {
    const arrows = document.querySelectorAll(
        `#${carouselId} .control-arrow`
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
        `#${carouselId} .control-dots .dot`
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
  }, [projects, chunkSizeProject]);

  return (
    <div className={`${styles["carousel-header"]} ${styles["projects"]}`} id={carouselId}>
      <div className={`${styles["carousel-heading"]}`}>
        <a className={`${styles["carousel-heading2"]}`}>{heading2}</a>
        <a className={`${styles["carousel-heading1"]}`}>{heading1}</a>
      </div>
      <div className={`${styles["carousel-wrapper"]}`}>
        <Carousel
          className="projects-carousel"
          showThumbs={false}
          infiniteLoop
          useKeyboardArrows
          swipeable
          showStatus={false}
          onChange={handleDots}
          onInitialized={() => handleDots(0)}
        >
          {projectChunks.map((chunk, chunkIndex) => (
            <div key={chunkIndex} className={`${styles["carousel-chunk"]}`}>
              {chunk.map((project, index) => (
                <PrimaryCard
                carousel ={true}
                  key={index}
                  miniHeading={project.miniHeading}
                  mainHeading={project.mainHeading}
                  startDate={project.startDate}
                  endDate={project.endDate}
                  Description={project.Description}
                  handleClick={project.handleClick}
                />
              ))}
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Project;
