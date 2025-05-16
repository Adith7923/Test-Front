import React, { useState, useEffect, useRef } from "react";
import styles from ".././Home.module.css";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import star from "../../../assets/Star 2.svg";
import star2 from "../../../assets/Star 6.svg";
import star3 from "../../../assets/Star 3.svg";
import star4 from "../../../assets/Star 1.svg";
import colorfilter from "../../../assets/colorfilter.svg";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import { motion } from "framer-motion";

const Hero = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.5 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);
  return (
    <div className={styles["hero-container"]} ref={heroRef}>
      <div className={styles["hero-contentbuttondiv"]}>
        <motion.div
          className={styles["hero-contentcolumn"]}
          initial={{ y: "2rem", opacity: 0 }}
          animate={{ y: isVisible ? 0 : "2rem", opacity: isVisible ? 1 : 0 }}
          transition={{
            duration: 2,
            type: "spring",
          }}
          viewport={{ once: true }}
        >
          <div className={styles["hero-textcolumn"]}>
            <div className={styles["hero-containersection"]}>
              <div className={styles["hero-image1"]}>
                <img src={star} alt="" />
              </div>
              <h1 className={styles["hero-maincontent"]}>
                {props.mainContent[0]}
              </h1>
            </div>
            <div className={styles["hero-containersection"]}>
              <div className={styles["hero-image2"]}>
                <img src={star2} alt="" />
              </div>
              <h1 className={styles["hero-maincontent2"]}>
                {props.mainContent[1]}
              </h1>
            </div>
            <div className={styles["hero-containersection"]}>
              <div className={styles["hero-image3"]}>
                <img src={star3} alt="" />
              </div>
              <div className={styles["hero-image4"]}>
                <img src={colorfilter} alt="" />
              </div>
              <div className={styles["hero-image5"]}>
                <img src={star4} alt="" />
              </div>
              <h1 className={styles["hero-maincontent"]}>
                {props.mainContent[2]}
              </h1>
            </div>
          </div>
          <h2 className={styles["hero-semicontent"]}>{props.semiContent}</h2>
        </motion.div>
        <div className={styles["hero-buttondiv"]}>
          <Link to={props.link}>
            <PrimaryButton
              content={props.buttonContent}
              variant={props.buttonVariant}
              width={props.buttonWidth}
              onclick={props.onclick}
            />
          </Link>
        </div>
        <div className={styles["hero-statistics"]}>
          <h2 className={styles["hero-vision"]}>
            Make Yourself Industry-Ready: Elevate Your Future with Ekalavya
          </h2>
          <p className={styles["hero-visioncontent"]}>
            To seamlessly connect education and career readiness,
            empowering students with the skills, mentorship, and opportunities
            they need to thrive in the professional world.
          </p>
          {/* <div className={styles["hero-statidiv"]}>
            {props.number.map((num, index) => (
              <div
                key={index}
                className={`${styles["hero-statiunit"]} ${
                  index < 2 ? styles["hero-firsttwo"] : ""
                }`}
              >
                <h1 className={styles["hero-numbers"]}>
                  <CountUp start={100} end={num} duration={3} /> +{" "}
                </h1>
                <h1 className={styles["hero-title"]}>{props.title[index]}</h1>
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Hero;
