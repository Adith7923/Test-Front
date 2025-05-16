import React from 'react';
import ProjectsDetails from './ProjectsDetails';

export default {
  title: 'Components/ProjectsDetails',
  component: ProjectsDetails,
};

const Template = (args) => <ProjectsDetails {...args} />;

// export const Default = Template.bind({});
// Default.args = {
//   projectTitle: 'Advanced Project Management System',
//   projectLevel: 'Expert',
//   description: 'This project aims to develop an advanced project management system designed to handle complex project requirements. The system features multi-level task management, real-time collaboration, and comprehensive reporting tools. It is designed for teams that need robust project planning and execution capabilities, including task dependencies, milestones, and automated notifications.',
//   problemStatement: 'Many existing project management tools fail to address the needs of large teams with complex workflows. They often lack flexibility in task dependencies, real-time collaboration features, and comprehensive reporting. This project seeks to create a solution that integrates these features seamlessly, providing users with an intuitive interface and powerful tools to manage their projects efficiently.',
//   requiredFeatures: [
//     'Multi-level task management with dependencies and milestones',
//     'Real-time collaboration and chat',
//     'Customizable reporting and dashboards',
//     'Automated notifications and reminders',
//     'Integration with popular tools like Slack, Jira, and GitHub',
//     'Mobile support with a responsive design',
//     'Advanced search and filtering capabilities',
//   ],
//   stacksUsed: [
//     'Frontend: React, Redux, Tailwind CSS',
//     'Backend: Node.js, Express',
//     'Database: MongoDB',
//     'Deployment: Docker, Kubernetes',
//     'CI/CD: GitHub Actions',
//     'Cloud Provider: AWS (S3, EC2, RDS)',
//   ],
// };

export const CustomProject = Template.bind({});
CustomProject.args = {
  projectTitle: 'Custom Project Title',
  projectLevel: 'Advanced',
  description: 'Detailed description for a custom project with extended information.',
  problemStatement: 'This is a more complex problem statement for the custom project.',
  requiredFeatures: 
    'Custom Feature 2',
  
  stacksUsed: [
    'Angular',
    'Express',
    'PostgreSQL',
  ],
};
