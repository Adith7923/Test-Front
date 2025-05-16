import React from "react";
import styles from "./QuestionCard.module.css";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const QuestionCard = ({
  questionNumber,
  questionText,
  options,         // expect array of objects: [{ id, text }]
  selectedOption,  // selected option id
  onOptionChange,
  variant = "default",
  onEdit,
  onDelete,
}) => {
  if (!questionText || !Array.isArray(options) || options.length === 0) {
    return (
      <div className={styles.card}>
        <p className={styles.noQuestions}>No questions at the moment</p>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <h3 className={styles.questionNumber}>Question {questionNumber}</h3>
      <p className={styles.questionText}>{questionText}</p>
      <div className={styles.options}>
        {options.map(({ id, text }) => (
          <label key={id} className={styles.option}>
            <input
              type="radio"
              name={`question-${questionNumber}`}
              value={id}
              checked={selectedOption === id}
              onChange={() => onOptionChange(id)}
              className={styles.radio}
            />
            {text}
          </label>
        ))}
      </div>

      {variant === "editable" && (
        <div className={styles.actionButtons}>
          <button className={styles.iconButton} onClick={onEdit}>
            <FiEdit size={18} />
            <span className={styles.actionText}>Edit</span>
          </button>
          <button className={styles.iconButton} onClick={onDelete}>
            <FiTrash2 size={18} />
            <span className={styles.actionText}>Delete</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
