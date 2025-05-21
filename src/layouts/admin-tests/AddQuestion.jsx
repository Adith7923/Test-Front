import React, { useState } from "react";
import QuestionCard from "../../components/cards/QuestionCard";
import styles from "./AddQuestion.module.css";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import AddQuestionModal from "./components/AddQuestionModal";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null); // 👈 Track if editing

  const handleOptionChange = (questionId, selectedOption) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  const handleEdit = (id) => {
    const question = questions.find((q) => q.id === id);
    setEditingQuestion({
      id: question.id,
      question: question.text,
      options: question.options.map((text) => ({ text })),
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const handleAddQuestion = () => {
    setEditingQuestion(null); // 👈 Ensure fresh modal
    setIsModalOpen(true);
  };

  const handleSaveQuestion = (newQuestion) => {
    if (editingQuestion) {
      // Editing existing question
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === editingQuestion.id
            ? {
                ...q,
                text: newQuestion.question,
                options: newQuestion.options.map((opt) => opt.text),
              }
            : q
        )
      );
    } else {
      // Adding new question
      const nextId = questions.length ? Math.max(...questions.map((q) => q.id)) + 1 : 1;
      setQuestions((prev) => [
        ...prev,
        {
          id: nextId,
          text: newQuestion.question,
          options: newQuestion.options.map((opt) => opt.text),
        },
      ]);
    }
    setIsModalOpen(false);
    setEditingQuestion(null);
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

      <AddQuestionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingQuestion(null);
        }}
        onSave={handleSaveQuestion}
        initialQuestion={editingQuestion} // 👈 Pass for editing
      />
    </div>
  );
};

export default AddQuestion;
