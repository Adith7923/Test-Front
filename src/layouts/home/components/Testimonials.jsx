import React, { useState, useEffect } from "react";
import TestimonialCard from "../../../components/cards/TestimonialCard";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "../Home.module.css";

const Testimonials = ({ testimonials, heading }) => {
  const [chunkSizeTestimonial, setChunkSizeTestimonial] = useState(4);
  const [showArrows, setShowArrows] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth <= 767) {
        setChunkSizeTestimonial(1);
        setShowArrows(false);
      } else if (windowWidth >= 768 && windowWidth <= 992) {
        setChunkSizeTestimonial(2);
        setShowArrows(true);
      } else {
        setChunkSizeTestimonial(4);
        setShowArrows(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const testimonialChunks = [];
  for (let i = 0; i < testimonials.length; i += chunkSizeTestimonial) {
    testimonialChunks.push(testimonials.slice(i, i + chunkSizeTestimonial));
  }

  const handleArrow = () => {
    const arrows = document.querySelectorAll(
      ".testimonials-carousel .control-arrow"
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
      ".testimonials-carousel .control-dots .dot"
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
  }, [testimonials, chunkSizeTestimonial]);

  return (
    <div className={`${styles["carousel-header"]} ${styles["testimonials"]}`}>
      <div className={`${styles["carousel-heading"]}`}>
        <a className={`${styles["carousel-heading1"]}`}>{heading}</a>
      </div>
      <div className={`${styles["carousel-wrapper"]}`}>
        <Carousel
          className="testimonials-carousel"
          showThumbs={false}
          infiniteLoop
          useKeyboardArrows
          swipeable
          showStatus={false}
          onChange={handleDots}
          onInitialized={() => handleDots(0)}
        >
          {testimonialChunks.map((chunk, chunkIndex) => (
            <div key={chunkIndex} className={`${styles["carousel-chunk"]}`}>
              {chunk.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  name={testimonial.name}
                  info={testimonial.info}
                  place={testimonial.place}
                  description={testimonial.description}
                  profilePicture={testimonial.profilePicture}
                />
              ))}
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Testimonials;
