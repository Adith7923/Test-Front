import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import Modal from "../../common/components/Modal";
import styles from "./AddQuestionModal.module.css";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import InputBox from "../../../components/inputbox/InputBox";

const AddQuestionModal = ({
  isOpen,
  onClose,
  onSave,
  initialQuestion = null, // { question: string, options: [{ text, isCorrect }] }
}) => {
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOptionIndex, setCorrectOptionIndex] = useState(null);

  const [errors, setErrors] = useState({
    question: "",
    options: [],
    correctOption: "",
  });

  useEffect(() => {
    if (initialQuestion) {
      setQuestionText(initialQuestion.question || "");
      const opts = initialQuestion.options
        ? initialQuestion.options.map((opt) => opt.text || "")
        : ["", "", "", ""];
      setOptions(opts.length >= 4 ? opts : [...opts, ...Array(4 - opts.length).fill("")]);

      const correctIndex = initialQuestion.options
        ? initialQuestion.options.findIndex((opt) => opt.isCorrect)
        : -1;
      setCorrectOptionIndex(correctIndex >= 0 ? correctIndex : null);
    } else {
      // Reset form for Add mode
      setQuestionText("");
      setOptions(["", "", "", ""]);
      setCorrectOptionIndex(null);
    }
    setErrors({ question: "", options: [], correctOption: "" });
  }, [initialQuestion, isOpen]);

  const handleOptionChange = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const handleAddOption = () => {
    if (options.length < 8) {
      setOptions([...options, ""]);
    }
  };

  const handleDeleteOption = (index) => {
    if (options.length > 4) {
      const updated = options.filter((_, i) => i !== index);
      setOptions(updated);

      if (correctOptionIndex === index) {
        setCorrectOptionIndex(null);
      } else if (correctOptionIndex > index) {
        setCorrectOptionIndex(correctOptionIndex - 1);
      }
    }
  };

  const handleSave = () => {
    const newErrors = { question: "", options: [], correctOption: "" };
    let hasError = false;

    if (!questionText.trim()) {
      newErrors.question = "Question cannot be empty.";
      hasError = true;
    }

    const optionErrors = options.map((opt) =>
      !opt.trim() ? "Option cannot be empty." : ""
    );

    if (optionErrors.some((e) => e !== "")) {
      newErrors.options = optionErrors;
      hasError = true;
    }

    if (correctOptionIndex === null) {
      newErrors.correctOption = "Please select the correct answer.";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    const questionData = {
      question: questionText.trim(),
      options: options.map((text, index) => ({
        text: text.trim(),
        isCorrect: index === correctOptionIndex,
      })),
    };

    onSave(questionData);
    // Reset form only if adding new question
    if (!initialQuestion) {
      setQuestionText("");
      setOptions(["", "", "", ""]);
      setCorrectOptionIndex(null);
      setErrors({ question: "", options: [], correctOption: "" });
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} widthVariant="medium">
      <div className={styles.modalForm}>
        <h2>{initialQuestion ? "Edit Question" : "Add Question"}</h2>

        {/* Question Input */}
        <div className={styles.modalField}>
          <label>Question</label>
          <InputBox
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder={
              initialQuestion && initialQuestion.question
                ? initialQuestion.question
                : "Enter your question"
            }
            size="large"
          />
          {errors.question && (
            <p className={styles.errorText}>{errors.question}</p>
          )}
        </div>

        {/* Options */}
        <div className={styles.modalField}>
          <div className={styles.modalOptionsHeader}>
            <label>Options</label>
            {options.length < 8 && (
              <button
                type="button"
                className={styles.addOptionButton}
                onClick={handleAddOption}
              >
                + Add Option
              </button>
            )}
          </div>

          <div className={styles.modalOptionsGrid}>
            {options.map((option, index) => (
              <div key={index} className={styles.modalOptionRow}>
                <input
                  type="radio"
                  name="correctOption"
                  className={styles.radio}
                  checked={correctOptionIndex === index}
                  onChange={() => setCorrectOptionIndex(index)}
                />
                <InputBox
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={
                    initialQuestion &&
                    initialQuestion.options &&
                    initialQuestion.options[index]
                      ? initialQuestion.options[index].text
                      : `Option ${index + 1}`
                  }
                  size="normal"
                />
                {options.length > 4 && (
                  <FaTrash
                    className={styles.deleteIcon}
                    onClick={() => handleDeleteOption(index)}
                    title="Delete Option"
                  />
                )}
                {errors.options[index] && (
                  <p className={styles.errorText}>{errors.options[index]}</p>
                )}
              </div>
            ))}
            {errors.correctOption && (
              <p className={styles.errorText}>{errors.correctOption}</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className={styles.modalButtonRow}>
          <PrimaryButton
            content={initialQuestion ? "Update" : "Submit"}
            variant="primary"
            width="full"
            className={styles["addevent-submitbutton"]}
            onClick={handleSave}
          />
        </div>
      </div>
    </Modal>
  );
};

export default AddQuestionModal;
