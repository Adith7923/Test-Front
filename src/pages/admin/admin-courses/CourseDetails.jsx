import React from "react";
import { AdminCourseDetails } from "../../../layouts/admin-courses";
import image from "../../../assets/DP.png";

const CourseDetails = () => {
  const json = {
    heading: "Mastering Git: Version Control for Developers ",
    objective:
      "This course is designed to provide developers with a comprehensive    understanding of Git, the most widely used version control system. By the end of this course, you'll be equipped with the skills to efficiently manage and track changes in your codebase, collaborate with other developers, and maintain a clean and organized project history.",
    skills: [
      "Version Control with Git ",
      "Branching and Merging +",
      "Collaboration in Teams using Git ",
      "Managing Project History ",
      "Conflict Resolution in Git ",
    ],
    description:"Git is an essential tool for modern software development, enabling developers to track code changes, collaborate efficiently, and manage different versions of a project. It begins with setting up Git by installing it and configuring your identity for project tracking. The core of Git lies in its basic commands like `git init`, `git add`, `git commit`, and `git status`, which allow you to initialize repositories, stage changes, commit code, and check the status of files. Additionally, Git's history commands like `git log` enable you to track changes and view project history over time. One of Git's most powerful features is **branching**, which allows developers to create separate branches of code to work on different features or bug fixes without disrupting the main codebase. These branches can later be merged back into the main project, with tools to resolve conflicts if needed. Collaboration in Git is facilitated through remote repositories, enabling teams to push, pull, and fetch changes from others. Platforms like GitHub and GitLab also support forking and pull requests, streamlining the collaboration process and ensuring that developers can work together smoothly, even on large projects.",
     
    level: "Beginner",
    lessons: 5,
    enrollment: 300,
    rate: 5,
    headingnav: ["Courses", "Mastering Git: Version Control for Developers"],
    modules: [
      {
        module: "Introduction to Version Control",
        submodules: ["What is Version Control?", "Why Use Git?"],
      },
      {
        module: "Getting Started with Git",
        submodules: [
          "Installing and configuring Git on Different Operating Systems",
          "Understanding the Git Workflow",
        ],
      },
      {
        module: "Basic Git Commands",
        submodules: [
          "git init, git clone",
          "git add, git commit",
          "git status, git log",
        ],
      },
      {
        module: "Working with Branches",
        submodules: [
          "Creating and Switching Branches",
          "Merging Branches",
          "Resolving Merge Conflicts",
        ],
      },
      {
        module: "Collaborating with Git",
        submodules: [
          "Working with Remote Repositories (git remote, git fetch, git pull, git push)",
          "Forking and Pull Requests",
          "Managing Collaborators",
        ],
      },
    ],
    mentorData: [
      {
        id: 1,
        name: "John Doe",
        title: "Software Engineer",
        imageUrl: image,
        studentId: "STDID3456",
        studentCollege: "St Christ College",
        studentMail: "johndoe@email.com",
        studentPhoneNumber: "(555) 555-5555",
      },
      {
        id: 2,
        name: "Jane Smith",
        title: "Data Scientist",
        imageUrl: image,
        studentId: "STDID5678",
        studentCollege: "Northwest University",
        studentMail: "janesmith@email.com",
        studentPhoneNumber: "(555) 123-4567",
      },
    ],
    buttonContent: "Start Learning",
  };
  return (
    <div>
      <AdminCourseDetails {...json} />
    </div>
  );
};

export default CourseDetails;
