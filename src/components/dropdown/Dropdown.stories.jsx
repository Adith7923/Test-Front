import React from "react";
import Dropdown from "./Dropdown";
import QuestionCard from "../cards/QuestionCard"; // ✅ Correct path needed

export default {
  title: "Components/Dropdown",
  component: Dropdown,
};

const Template = (args) => <Dropdown {...args} />;

export const WithQuestionCard = Template.bind({});
WithQuestionCard.args = {
  title: "Question",
  children: (
    <QuestionCard
      questionNumber={1}
      questionText="What is the capital of France?"
      options={[
        { id: "a", text: "Berlin" },
        { id: "b", text: "Madrid" },
        { id: "c", text: "Paris" },
        { id: "d", text: "Rome" },
      ]}
      selectedOption={"c"}
      onOptionChange={() => {}}
      variant="editable"
      onEdit={() => alert("Edit clicked")}
      onDelete={() => alert("Delete clicked")}
    />
  ),
};
