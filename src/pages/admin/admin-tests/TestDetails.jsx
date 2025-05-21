import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminTestDescription from "../../../layouts/admin-tests/components/AdminTestDescription";
import Dropdown from "../../../components/dropdown/Dropdown";
import QuestionCard from "../../../components/cards/QuestionCard";
import Table from "../../../components/table/Table";
import AddQuestionModal from "../../../layouts/admin-tests/components/AddQuestionModal";

const mockTests = [
  {
    testId: 101,
    testType: "MCQ",
    testMode: "Online",
    testTitle: "Java",
    description: "A test to assess your Java knowledge.",
    rating: 4.2,
    level: "Beginner",
    skill: "Java",
    topics: "OOP, Collections",
    numberOfQuestions: 20,
    duration: "40 minutes",
    creator: "Smera",
    passPercentage: 50,
    questions: [
      {
        id: 1,
        questionText: "What is 2 + 2?",
        options: [
          { id: "1", text: "1" },
          { id: "2", text: "2" },
          { id: "3", text: "3" },
          { id: "4", text: "4" },
        ],
        selectedOption: "4",
      },
    ],
  },
  {
    testId: 102,
    testType: "Coding",
    testMode: "Offline",
    testTitle: "C",
    description: "An advanced C test to test your skills.",
    rating: 4.8,
    level: "Advanced",
    skill: "C",
    topics: "Pointers, Memory",
    numberOfQuestions: 25,
    duration: "50 minutes",
    creator: "Shivam",
    questions: [],
  },
];

const TestDetails = () => {
  const { testId } = useParams();
  const [test, setTest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  useEffect(() => {
    const selected = mockTests.find((t) => t.testId.toString() === testId);
    setTest(selected);
  }, [testId]);

  const handleUpdate = (updatedData) => {
    console.log("Updated test data:", updatedData);
    // TODO: Call update API here
  };

  const handleDelete = () => {
    console.log("Deleted test with ID:", testId);
    // TODO: Call delete API here
  };

  const handleEditQuestion = (question) => {
    setCurrentQuestion(question);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentQuestion(null);
  };

  const handleSaveQuestion = (updatedQuestion) => {
    setTest((prevTest) => ({
      ...prevTest,
      questions: prevTest.questions.map((q) =>
        q.id === updatedQuestion.id ? updatedQuestion : q
      ),
    }));
    handleCloseModal();
  };

  if (!test) return <p style={{ padding: "2rem" }}>Loading test...</p>;

  const {
    testTitle,
    level,
    skill,
    topics,
    numberOfQuestions,
    duration,
    creator,
    passPercentage,
    questions,
  } = test;

  const fetchedFormData = {
    testName: testTitle,
    level,
    skill,
    topics,
    numberOfQuestions,
    duration,
  };

  return (
    <div style={{ padding: "2rem" }}>
      <AdminTestDescription
        formSubmit={handleUpdate}
        fetchedFormData={fetchedFormData}
        onDelete={handleDelete}
        testId={testId}
        creator={creator}
        passPercentage={passPercentage}
      />

      <div style={{ marginTop: "2rem", padding: "0 2rem", color: "#fff" }}>
        <Dropdown title="View Questions">
          {questions && questions.length > 0 ? (
            questions.map((q) => (
              <QuestionCard
                key={q.id}
                questionNumber={q.id}
                questionText={q.questionText}
                options={q.options}
                selectedOption={q.selectedOption}
                onOptionChange={() => {}}
                variant="editable"
                onEdit={() => handleEditQuestion(q)}
              />
            ))
          ) : (
            <p>No questions available.</p>
          )}
        </Dropdown>
      </div>

      <div style={{ marginTop: "2rem", padding: "0 2rem" }}>
        <Dropdown title="Student Results">
          <Table
            headings={["Std Id", "Student Name", "Percentage", "Pass/Fail"]}
            data={[
              ["101", "Alice Johnson", "85%", "Pass"],
              ["102", "Bob Smith", "48%", "Fail"],
              ["103", "Carol Davis", "72%", "Pass"],
            ]}
            noData="No student results available"
          />
        </Dropdown>
      </div>

      {isModalOpen && (
        <AddQuestionModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveQuestion}
          initialQuestion={currentQuestion}
        />
      )}
    </div>
  );
};

export default TestDetails;
