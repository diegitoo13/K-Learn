import React, { useState, useEffect } from 'react';
import Modal from './Modal';

const Question = ({ question = '', options = [], correctAnswer = '', explanation = '', onAnswer, isLastQuestion }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [fontSize, setFontSize] = useState('text-[17.5px]');

  useEffect(() => {
    if (question) {

      // Dynamically adjust font size based on the length of the question
      if (question.length > 100) {
        setFontSize('text-[15px]');
      } else if (question.length > 200) {
        setFontSize('text-[13px]');
      } else {
        setFontSize('text-[17.5px]');
      }
    } else {
      console.error("Question text is missing or invalid.");
    }
  }, [question, explanation]);

  const handleCheckAnswer = () => {
    console.log("Checking Answer:", selectedOption);
    setSubmitted(true);
  };

  const handleNextQuestion = () => {
    console.log("Next Question:", selectedOption === correctAnswer);
    if (onAnswer) {
      onAnswer(selectedOption === correctAnswer);
    }
    setSubmitted(false);
    setSelectedOption(null);
    setShowExplanation(false);
  };

  if (!question) {
    return <div>Error: Question text is missing or invalid.</div>;
  }

  return (
    <div>
      <h2 className={`font-sans font-semibold mb-6 ${fontSize}`}>{question}</h2>
      {options.map((option, index) => (
        <div key={index} className="mb-4">
          <button
            onClick={() => setSelectedOption(option)}
            className={`block w-full p-4 border rounded cursor-pointer text-left ${
              submitted
                ? option === correctAnswer
                  ? 'border-green-500 text-green-500'
                  : option === selectedOption
                  ? 'border-red-500 text-red-500'
                  : 'border-gray-300'
                : option === selectedOption
                ? 'border-blue-500'
                : 'border-gray-300'
            }`}
            disabled={submitted}
          >
            <span className="font-sans font-medium text-[16.5px]">{option}</span>
          </button>
        </div>
      ))}
      {submitted ? (
        <div>
          <button
            onClick={handleNextQuestion}
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
          >
            {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
          </button>
          {explanation ? (
            <button
              onClick={() => setShowExplanation(true)}
              className="mt-2 ml-4 px-4 py-2 text-blue-500"
            >
              See Explanation
            </button>
          ) : (
            <button
              className="mt-2 ml-4 px-4 py-2 text-gray-500 cursor-not-allowed"
              disabled
            >
              Explanation Not Available
            </button>
          )}
        </div>
      ) : (
        <button
          onClick={handleCheckAnswer}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
          disabled={!selectedOption}
        >
          Check Answer
        </button>
      )}

      <Modal isOpen={showExplanation} onClose={() => setShowExplanation(false)}>
        <p>{explanation}</p>
        <button
          onClick={() => setShowExplanation(false)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default Question;
