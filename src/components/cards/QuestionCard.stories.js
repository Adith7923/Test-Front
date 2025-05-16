import React, { useState } from "react";
import QuestionCard from "./QuestionCard";

export default {
  title: "Components/QuestionCard",
  component: QuestionCard,
};

const Template = (args) => {
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <QuestionCard
      {...args}
      selectedOption={selectedOption}
      onOptionChange={setSelectedOption}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  questionNumber: 1,
  questionText: "What is the capital of France?",
  options: ["Paris", "London", "Rome", "Berlin"],
};

export const NoQuestion = Template.bind({});
NoQuestion.args = {
  questionNumber: 1,
  questionText: "",
  options: [],
};

export const Editable = Template.bind({});
Editable.args = {
  questionNumber: 2,
  questionText: "Which language is used for React development?",
  options: ["Java", "Python", "JavaScript", "C++"],
  variant: "editable",
  onEdit: () => alert("Edit clicked"),
  onDelete: () => alert("Delete clicked"),
};
