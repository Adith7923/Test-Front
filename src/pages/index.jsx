import { React, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../layouts/home/components/Hero";
import { Header } from "../layouts/home";
import Button from "../components/buttons/PrimaryButton";
import edunexa from "../../src/assets/edunexa.png";
import Partners from "../layouts/home/components/Partners";
import image1 from "../../src/assets/udemy-.png";
import image2 from "../../src/assets/linkln.png";
import image3 from "../../src/assets/tarento.png";
import image4 from "../../src/assets/Stack-over-flow.png";
import image5 from "../../src/assets/coursera.png";
import Project from "../layouts/home/components/Projects";
import StarPerformer from "../layouts/home/components/StarPerformer";
import image from "../../src/assets/DP.png";
// import image6 from "../../src/assets/nxt.png";
import Testimonials from "../layouts/home/components/Testimonials";
import Footer from "../layouts/common/components/Footer";
import CustomGoogleLoginButton from "../components/buttons/CustomGoogleLoginButton";
import ProjectDescription from "./ProjectDescription";

const Home = () => {
  const starPerformerRef = useRef(null);
  const testimonialsRef = useRef(null);
  const navigate = useNavigate();

  const scrollToCenter = (ref) => {
    if (ref.current) {
      const element = ref.current;
      const elementTop =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offset =
        elementTop - window.innerHeight / 2 + element.clientHeight / 2;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  const HeroContent = {
    mainContent: ["DISCOVER", "CREATE ", "INSPIRE"],
    semiContent: "Where Learning Knows No Boundaries",
    buttonContent: "Explore",
    buttonVariant: "primary",
    buttonWidth: "full",
    onclick: (e) => {
      console.log("nfsjkd");
    },
    number: ["2000", "300", "500"],
    title: ["Enrollments", "Certifications", "Projects"],
    link: "/explore",
  };

  const sample = {
    content: "Login",
    variant: "primary",
    onClick: () => {
      console.log("Button clicked");
    },
    width: "full",
  };

  const header = {
    menuItems: [
      // {
      //   name: "Leaderboard",
      //   onClick: () => console.log("Leaderboard clicked"),
      //   type: "aTag",
      //   atag: "https://www.google.com",
      // },
      // {
      //   name: "Track",
      //   onClick: () => console.log("Track clicked"),
      //   type: "link",
      //   atag: "https://www.tarento.com",
      // },
      // {
      //   name: "Top Performers",
      //   onClick: () => {
      //     scrollToCenter(starPerformerRef);
      //   },
      //   type: "link",
      //   link: `https://www.google.com`,
      // },
      {
        name: "Courses",
        onClick: () => {
          scrollToCenter(starPerformerRef);
        },
        type: "link",
        link: `https://www.google.com`,
      },
      {
        name: "Projects",
        onClick: () => {
          scrollToCenter(starPerformerRef);
        },
        type: "link",
        link: `https://www.google.com`,
      },
      {
        name: "Testimonials",
        onClick: () => {
          scrollToCenter(testimonialsRef);
        },
      },
    ],
    imageSrc: edunexa,
    button: <CustomGoogleLoginButton />,
  };

  const partners = {
    title: "Academic Partners",
    Images: [
      // image1, image2,
      image3,
      //  image4, image5
    ],
  };

  const partners2 = {
    title: "Hiring Partners",
    Images: [
      // image1, image2,
      image3,
      // image4, image5
    ],
  };

  const projects = [
    {
      miniHeading: "Project Alpha",
      mainHeading: "Developing a Responsive Website",
      startDate: "2023-01-15T09:00:00Z",
      endDate: "2023-01-15T17:00:00Z",
      Description:
        "This project involves creating a fully responsive website using HTML, CSS, and JavaScript.",
      handleClick: () => navigate(`/projects`),
    },
    {
      miniHeading: "Project Beta",
      mainHeading: "Implementing a RESTful API",
      startDate: "2023-02-20T10:00:00Z",
      endDate: "2023-02-20T18:00:00Z",
      Description:
        "The goal is to develop a RESTful API for an e-commerce platform using Node.js and Express.",
      handleClick: () => console.log("User clicked on Project Beta"),
    },
    {
      miniHeading: "Project Gamma",
      mainHeading: "Designing a Mobile Application",
      startDate: "2023-03-10T11:00:00Z",
      endDate: "2023-03-10T19:00:00Z",
      Description:
        "Creating a cross-platform mobile application using Flutter.",
      handleClick: () => console.log("User clicked on Project Gamma"),
    },
    {
      miniHeading: "Project Delta",
      mainHeading: "Building a Data Pipeline",
      startDate: "2023-04-05T08:00:00Z",
      endDate: "2023-04-05T16:00:00Z",
      Description:
        "Establishing a data pipeline for real-time analytics using Apache Kafka and Spark.",
      handleClick: () => console.log("User clicked on Project Delta"),
    },
    {
      miniHeading: "Project Epsilon",
      mainHeading: "Creating an AI Chatbot",
      startDate: "2023-05-15T09:00:00Z",
      endDate: "2023-05-15T17:00:00Z",
      Description:
        "Developing an AI-powered chatbot for customer support using Python and TensorFlow.",
      handleClick: () => console.log("User clicked on Project Epsilon"),
    },
    {
      miniHeading: "Project Zeta",
      mainHeading: "Automating Infrastructure Deployment",
      startDate: "2023-06-20T10:00:00Z",
      endDate: "2023-06-20T18:00:00Z",
      Description:
        "Using Terraform to automate the deployment of cloud infrastructure on AWS.",
      handleClick: () => console.log("User clicked on Project Zeta"),
    },
    {
      miniHeading: "Project Eta",
      mainHeading: "Developing a Blockchain Solution",
      startDate: "2023-07-10T11:00:00Z",
      endDate: "2023-07-10T19:00:00Z",
      Description:
        "Building a blockchain-based application for secure transactions using Solidity and Ethereum.",
      handleClick: () => console.log("User clicked on Project Eta"),
    },
    {
      miniHeading: "Project Theta",
      mainHeading: "Creating a Machine Learning Model",
      startDate: "2023-08-01T08:00:00Z",
      endDate: "2023-08-01T16:00:00Z",
      Description:
        "Developing a machine learning model for predictive analytics using Python and Scikit-Learn.",
      handleClick: () => console.log("User clicked on Project Theta"),
    },
  ];

  const projectcarousel = {
    projects,
    heading2: "Equipping Budding Professionals for the future ....",
    heading1: "See What you can learn with Us",
    carouselId: "carouselId1",
  };

  const projectcarousel2 = {
    projects,
    heading1: "Gain Hands on Experience with real world Projects ",
    carouselId: "carouselId2",
  };

  const studentProfiles = [
    {
      studentImage:
        "https://images.generated.photos/MDBbyLpT38M3HT12RqoVEEa5diyfCQssR6l0Qi4-dLM/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MTQxMjg4LmpwZw.jpg",
      studentName: "Rahul Sharma",
      studentId: "001",
      studentCollege: "Indian Institute of Technology Bombay",
      studentMail: "rahul.sharma@iitb.ac.in",
      studentPhoneNumber: "987-654-3210",
      handleClick: () => console.log("Student clicked"),
    },
    {
      studentImage:
        "https://images.generated.photos/1QhsKZWoqr3w1mhOioxFd5rvgNKUjASHgEZJhukCd84/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MjQ5MjMwLmpwZw.jpg",
      studentName: "Priya Patel",
      studentId: "12345",
      studentCollege: "Indian Institute of Management Ahmedabad",
      studentMail: "priya.patel@iima.ac.in",
      studentPhoneNumber: "987-654-3210",
      handleClick: () => console.log("Student clicked"),
    },
    {
      studentImage:
        "https://images.generated.photos/QelpGTPahgIS10moMJy328x-qjPidCwAE2lvh8XlYzw/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NDkxNTEyLmpwZw.jpg",
      studentName: "Amit Kumar",
      studentId: "003",
      studentCollege: "Birla Institute of Technology and Science, Pilani",
      studentMail: "amit.kumar@bits-pilani.ac.in",
      studentPhoneNumber: "987-654-3210",
      handleClick: () => console.log("Student clicked"),
    },
    {
      studentImage:
        "https://images.generated.photos/C1OEzfuAkb6QY7Oke8yZJux6pZ-KHota2DVpOyAdekY/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NDA4MTUyLmpwZw.jpg",
      studentName: "Divya Singh",
      studentId: "004",
      studentCollege: "Indian Institute of Technology Delhi",
      studentMail: "divya.singh@iitd.ac.in",
      studentPhoneNumber: "987-654-3210",
      handleClick: () => console.log("Student clicked"),
    },
    {
      studentImage:
        "https://images.generated.photos/WRU6biSor0J_PsR2nTOO79zw_Y0cJnpjXhg98OAQ1wY/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/ODkyNjkyLmpwZw.jpg",
      studentName: "Ankit Sharma",
      studentId: "005",
      studentCollege: "Indian Institute of Technology Kharagpur",
      studentMail: "ankit.sharma@iitkgp.ac.in",
      studentPhoneNumber: "987-654-3210",
      handleClick: () => console.log("Student clicked"),
    },
    {
      studentImage:
        "https://images.generated.photos/RdiDLkdrHHqTZlZGlb3M7Yf51N1PGNRij7mc5m1wOXY/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NDgxNDQ5LmpwZw.jpg",
      studentName: "Swati Gupta",
      studentId: "006",
      studentCollege: "Indian Institute of Science Bangalore",
      studentMail: "swati.gupta@iisc.ac.in",
      studentPhoneNumber: "987-654-3210",
      handleClick: () => console.log("Student clicked"),
    },
    {
      studentImage:
        "https://images.generated.photos/FVWSBQjtSj6NjQQxtJ-bdgpW7KVllWJFf6YGWFLii18/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MzA1MzIzLmpwZw.jpg",
      studentName: "Rajesh Khanna",
      studentId: "007",
      studentCollege: "Indian Institute of Technology Madras",
      studentMail: "rajesh.khanna@iitm.ac.in",
      studentPhoneNumber: "987-654-3210",
      handleClick: () => console.log("Student clicked"),
    },
    {
      studentImage:
        "https://images.generated.photos/OCUgve5CbD4th7Aru7O-camY4luoJP9wuD7OeEaHXVw/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NTAyNzEwLmpwZw.jpg",
      studentName: "Anjali Verma",
      studentId: "008",
      studentCollege: "Indian Institute of Technology Kanpur",
      studentMail: "anjali.verma@iitk.ac.in",
      studentPhoneNumber: "987-654-3210",
      handleClick: () => console.log("Student clicked"),
    },
  ];

  const starperformer = { studentProfiles, heading: "Top Performers" };

  const testimonials = [
    {
      name: "Arun Kumar",
      info: "Software Engineer",
      place: "Tech Innovations Ltd.",
      description:
        "This course provided me with a solid foundation to transition into data science. The hands-on projects and expert guidance made complex concepts accessible. I now feel confident applying data science techniques in my software development work.",
      profilePicture:
        "https://images.generated.photos/eZo0DY8ArBNj1kRQgFC0CAFfkUYXkoDXoiGhPiJpLiY/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MTU0NTIzLmpwZw.jpg",
    },
    {
      name: "Ananya Gupta",
      info: "UX Designer",
      place: "Creative Studio",
      description:
        "I enjoy paying attention to detail and bringing creativity to my projects. Understanding user needs and translating them into intuitive designs has been key to improving our product's user experience.",
      profilePicture:
        "https://images.generated.photos/JyCgrFEjKuMm1lWTOBslf6uy5Up-4f-2ND7WFM8fkS0/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NzU0ODc3LmpwZw.jpg",
    },
    {
      name: "Deepak Patel",
      info: "Marketing Specialist",
      place: "Marketing Solutions Co.",
      description:
        "The training I received has transformed my approach to marketing. The comprehensive coverage of data-driven techniques and practical applications has empowered me to make more informed marketing decisions and achieve better results.",
      profilePicture:
        "https://images.generated.photos/l6EOoJmaglsKyOkq6x4ljxT_EEbJLYJ879a9rAMspvk/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NzE4OTI5LmpwZw.jpg",
    },
    {
      name: "Rahul Verma",
      info: "Product Manager",
      place: "XYZ Inc.",
      description:
        "The course was instrumental in enhancing my product management skills. It covered all the key areas of product development and management, and I am now better equipped to lead my team and drive our product strategies effectively.",
      profilePicture:
        "https://images.generated.photos/_T8ZT3u3Pn1b1iawfyGg2I_zydn_QUCCCkl8Hq850qU/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NDkwNzE5LmpwZw.jpg",
    },
    {
      name: "Sneha Joshi",
      info: "Data Analyst",
      place: "Analytics Corp.",
      description:
        "This course was a game-changer for my career in data analysis. The in-depth coverage of analytical tools and methods, combined with practical projects, has significantly enhanced my ability to interpret data and provide actionable insights.",
      profilePicture:
        "https://images.generated.photos/xcFg_X_K83MfJuKWE9DcuxuANQi2wpzBHuuk7hmVGdk/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTcyOTExLmpwZw.jpg",
    },
    {
      name: "Neha Sharma",
      info: "Project Coordinator",
      place: "Global Solutions Inc.",
      description:
        "The project management training offered practical insights and techniques that I have successfully applied to my work. The real-world examples and hands-on exercises have made me a more effective and efficient project coordinator.",
      profilePicture:
        "https://images.generated.photos/b8xM_82SIAGvWl3tlLO0Lo7J_18BwLuGGsR4UmAjxP0/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MzQyNzU3LmpwZw.jpg",
    },
  ];

  const testimonialsdata = { testimonials, heading: "Testimonials" };

  const footerdata = {
    Logo: edunexa,
    quoteContent: "Embark on Your Learning Journey Today!",
    copyrightContent: "All rights reserved © 2024 Tarento Group. |",
    copyrightContent2: "Privacy Policy",
    isLeftALigned: false,
  };
  return (
    <div>
      <Header {...header} />
      <Hero {...HeroContent} />
      <Partners {...partners} />
      <Partners {...partners2} />
      <Project {...projectcarousel} />
      <Project {...projectcarousel2} />
      {/* <div ref={starPerformerRef}>
        <StarPerformer {...starperformer} />
      </div> */}
      <div ref={testimonialsRef}>
        <Testimonials {...testimonialsdata} />
      </div>

      <Footer {...footerdata} />
    </div>
  );
};

export default Home;
