import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ProjectsDetails } from "../../common";
import Modal from "../../common/components/Modal";
import LoginBox from "../../common/components/LoginBox";

const HomeProjectDescription = ({projectDetails}) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);


  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const loginBoxProps = {
    title: "Please Log In",
    message: "You need to log in to register for this event.",
    buttonText: "Log In with Google",
    onCancel: handleCloseLoginModal,
  };

  return (
    <div className="padding padding-top padding-bottom">
      <ProjectsDetails
        projectTitle="Custom Project Title"
        projectLevel="Advanced"
        description="This project is focused on developing a highly sophisticated AI-powered chatbot capable of engaging in complex conversations with users. The chatbot will leverage state-of-the-art natural language processing (NLP) techniques to understand and respond to user inputs in a way that mimics human conversation. 

        The chatbot will be able to process and interpret various types of user queries, ranging from simple questions to more complex scenarios requiring context awareness. One of the key objectives is to ensure that the chatbot can learn from its interactions, improving its accuracy and relevance over time through machine learning algorithms.
        
        Additionally, the project will focus on making the chatbot adaptable to different domains, allowing it to be used in diverse industries such as customer support, education, healthcare, and more. The chatbot will also support multiple languages, making it accessible to a global audience. 
        
        The development process will involve creating a robust architecture that can handle high volumes of traffic while maintaining low latency in responses. Advanced features like sentiment analysis, contextual understanding, and personalized responses will be integrated to enhance the user experience."
        
        problemStatement="The challenge is to create an intelligent chatbot capable of processing and understanding human language to a level that allows for seamless interaction with users across different domains. The project aims to overcome limitations in existing chatbots, such as poor context retention, limited understanding of complex queries, and lack of real-time learning capabilities."
        requiredFeature="Custom Feature 1, Custom Feature 2"
        stacksUsed={[" React", "Node.js", " MongoDB", " Docker", "CI/CD"]}
      />
      <Modal
        isOpen={isLoginModalOpen}
        widthVariant="small"
        onClose={handleCloseLoginModal}
      >
        <LoginBox {...loginBoxProps} />
      </Modal>
    </div>
  );
};

export default HomeProjectDescription;
