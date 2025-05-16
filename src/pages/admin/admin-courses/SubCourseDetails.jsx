import React from "react";
import AdminSubCourseDetails from "../../../layouts/admin-courses/components/AdminSubCourseDetails";

const SubCourseDetails = () => {
  const data = {
    headingnav: ["Courses", "Mastering Git: Version Control for Developers "], 
    heading: " Introduction to version control", 
    
    modules: [
      {
        module: "Introduction to Version Control",
        submodules: ["What is Version Control?", "Why Use Git?"],
        intro: {
          content: "In the world of software development, maintaining a clean and organized project history is crucial. Version control systems (VCS) provide a framework to track and manage changes to codebases over time, allowing developers to collaborate efficiently and prevent errors. Among the various VCS options available, Git stands out as the most popular and powerful tool, enabling teams to handle projects of any scale with ease. ", // Intro content
          // image: "", 
        },
        body: [
          {
            subhead: "What is version control ", 
            image: "https://www.simplilearn.com/ice9/free_resources_article_thumb/Version_Control.png", 
            content:
              "Version control is a system that records changes to a file or set of files over time, allowing you to recall specific versions later. This is particularly useful in software development, where different team members may be working on the same codebase simultaneously. With version control, you can track who made changes, when they were made, and what exactly was changed. This helps in managing conflicts, reverting to previous versions when necessary, and keeping a comprehensive history of the project. ",
          },
          {
            subhead: "Why Use Git ", 
            image: "https://static.javatpoint.com/tutorial/git/images/git-benefits.png", 
    
            content: "Git is a distributed version control system, meaning every developer has a full copy of the project history. This makes Git highly reliable and efficient, even when working offline. Git allows developers to create multiple branches, work on different features in parallel, and merge them seamlessly into the main project. Its robust merging capabilities and lightweight branching model make it the go-to choice for both small and large teams. Additionally, Git is open-source and has a vast community, ensuring continuous improvements and a wealth of learning resources. ",
          },
        ],
      },
      {
        module: "Getting Started with Git",
        submodules: [
          "Installing and configuring Git on Different Operating Systems",
          "Understanding the Git Workflow",
        ],
        intro: {
          content: "In the world of software development, maintaining a clean and organized project history is crucial. Version control systems (VCS) provide a framework to track and manage changes to codebases over time, allowing developers to collaborate efficiently and prevent errors. Among the various VCS options available, Git stands out as the most popular and powerful tool, enabling teams to handle projects of any scale with ease. ", // Intro content
          // image: "", 
        },
        body: [
          {
            subhead: "What is version control ", 
            image: "https://www.simplilearn.com/ice9/free_resources_article_thumb/Version_Control.png", 
            content:
              "Version control is a system that records changes to a file or set of files over time, allowing you to recall specific versions later. This is particularly useful in software development, where different team members may be working on the same codebase simultaneously. With version control, you can track who made changes, when they were made, and what exactly was changed. This helps in managing conflicts, reverting to previous versions when necessary, and keeping a comprehensive history of the project. ",
          },
          {
            subhead: "Why Use Git ", 
            image: "https://static.javatpoint.com/tutorial/git/images/git-benefits.png", 
    
            content: "Git is a distributed version control system, meaning every developer has a full copy of the project history. This makes Git highly reliable and efficient, even when working offline. Git allows developers to create multiple branches, work on different features in parallel, and merge them seamlessly into the main project. Its robust merging capabilities and lightweight branching model make it the go-to choice for both small and large teams. Additionally, Git is open-source and has a vast community, ensuring continuous improvements and a wealth of learning resources. ",
          },
        ],
      },
      {
        module: "Basic Git Commands",
        submodules: [
          "git init, git clone",
          "git add, git commit",
          "git status, git log",
        ],
        intro: {
          content: "In the world of software development, maintaining a clean and organized project history is crucial. Version control systems (VCS) provide a framework to track and manage changes to codebases over time, allowing developers to collaborate efficiently and prevent errors. Among the various VCS options available, Git stands out as the most popular and powerful tool, enabling teams to handle projects of any scale with ease. ", // Intro content
          // image: "", 
        },
        body: [
          {
            subhead: "What is version control ", 
            image: "https://www.simplilearn.com/ice9/free_resources_article_thumb/Version_Control.png", 
            content:
              "Version control is a system that records changes to a file or set of files over time, allowing you to recall specific versions later. This is particularly useful in software development, where different team members may be working on the same codebase simultaneously. With version control, you can track who made changes, when they were made, and what exactly was changed. This helps in managing conflicts, reverting to previous versions when necessary, and keeping a comprehensive history of the project. ",
          },
          {
            subhead: "Why Use Git ", 
            image: "https://static.javatpoint.com/tutorial/git/images/git-benefits.png", 
    
            content: "Git is a distributed version control system, meaning every developer has a full copy of the project history. This makes Git highly reliable and efficient, even when working offline. Git allows developers to create multiple branches, work on different features in parallel, and merge them seamlessly into the main project. Its robust merging capabilities and lightweight branching model make it the go-to choice for both small and large teams. Additionally, Git is open-source and has a vast community, ensuring continuous improvements and a wealth of learning resources. ",
          },
        ],
      },
      {
        module: "Working with Branches",
        submodules: [
          "Creating and Switching Branches",
          "Merging Branches",
          "Resolving Merge Conflicts",
        ],
        intro: {
          content: "In the world of software development, maintaining a clean and organized project history is crucial. Version control systems (VCS) provide a framework to track and manage changes to codebases over time, allowing developers to collaborate efficiently and prevent errors. Among the various VCS options available, Git stands out as the most popular and powerful tool, enabling teams to handle projects of any scale with ease. ", // Intro content
          // image: "", 
        },
        body: [
          {
            subhead: "What is version control ", 
            image: "https://www.simplilearn.com/ice9/free_resources_article_thumb/Version_Control.png", 
            content:
              "Version control is a system that records changes to a file or set of files over time, allowing you to recall specific versions later. This is particularly useful in software development, where different team members may be working on the same codebase simultaneously. With version control, you can track who made changes, when they were made, and what exactly was changed. This helps in managing conflicts, reverting to previous versions when necessary, and keeping a comprehensive history of the project. ",
          },
          {
            subhead: "Why Use Git ", 
            image: "https://static.javatpoint.com/tutorial/git/images/git-benefits.png", 
    
            content: "Git is a distributed version control system, meaning every developer has a full copy of the project history. This makes Git highly reliable and efficient, even when working offline. Git allows developers to create multiple branches, work on different features in parallel, and merge them seamlessly into the main project. Its robust merging capabilities and lightweight branching model make it the go-to choice for both small and large teams. Additionally, Git is open-source and has a vast community, ensuring continuous improvements and a wealth of learning resources. ",
          },
        ],
      },
      {
        module: "Collaborating with Git",
        submodules: [
          "Working with Remote Repositories (git remote, git fetch, git pull, git push)",
          "Forking and Pull Requests",
          "Managing Collaborators",
        ],
        intro: {
          content: "In the world of software development, maintaining a clean and organized project history is crucial. Version control systems (VCS) provide a framework to track and manage changes to codebases over time, allowing developers to collaborate efficiently and prevent errors. Among the various VCS options available, Git stands out as the most popular and powerful tool, enabling teams to handle projects of any scale with ease. ", // Intro content
          // image: "", 
        },
        body: [
          {
            subhead: "What is version control ", 
            image: "https://www.simplilearn.com/ice9/free_resources_article_thumb/Version_Control.png", 
            content:
              "Version control is a system that records changes to a file or set of files over time, allowing you to recall specific versions later. This is particularly useful in software development, where different team members may be working on the same codebase simultaneously. With version control, you can track who made changes, when they were made, and what exactly was changed. This helps in managing conflicts, reverting to previous versions when necessary, and keeping a comprehensive history of the project. ",
          },
          {
            subhead: "Why Use Git ", 
            image: "https://static.javatpoint.com/tutorial/git/images/git-benefits.png", 
    
            content: "Git is a distributed version control system, meaning every developer has a full copy of the project history. This makes Git highly reliable and efficient, even when working offline. Git allows developers to create multiple branches, work on different features in parallel, and merge them seamlessly into the main project. Its robust merging capabilities and lightweight branching model make it the go-to choice for both small and large teams. Additionally, Git is open-source and has a vast community, ensuring continuous improvements and a wealth of learning resources. ",
          },
        ],
      },
    ],
      progress:"30"
  };

  return (
    <div>
      <AdminSubCourseDetails {...data} />
    </div>
  );
};

export default SubCourseDetails;
