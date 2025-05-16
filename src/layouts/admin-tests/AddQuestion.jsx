import React, { useState } from "react";
import QuestionCard from "../../components/cards/QuestionCard"; // adjust path as needed
import styles from "./AddQuestion.module.css"; // CSS module for layout
import PrimaryButton from "../../components/buttons/PrimaryButton"; // Add this import

const AddQuestion = () => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      text: "What is 2 + 2?",
      options: ["1", "2", "3", "4"],
    },
    {
      id: 2,
      text: "Capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
    },
  ]);

  const [selectedOptions, setSelectedOptions] = useState({});

  const handleOptionChange = (questionId, selectedOption) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  const handleEdit = (id) => {
    console.log("Edit clicked for question", id);
    // add edit logic here
  };

  const handleDelete = (id) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const handleAddQuestion = () => {
    console.log("Add Question clicked");
    // logic to open modal or add question
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Questions</h2>
        <PrimaryButton
          content="Add Question"
          variant="secondary"
          onClick={handleAddQuestion}
        />
      </div>

      <div className={styles.cardList}>
        
        {questions.map((question) => (
  <QuestionCard
    key={question.id}
    questionNumber={question.id}
    questionText={question.text}
    options={question.options.map((text, index) => ({ id: index, text }))}
    selectedOption={selectedOptions[question.id]}
    onOptionChange={(optionId) => handleOptionChange(question.id, optionId)}
    variant="editable"
    onEdit={() => handleEdit(question.id)}
    onDelete={() => handleDelete(question.id)}
  />
))}

      </div>
    </div>
  );
};

export default AddQuestion;
