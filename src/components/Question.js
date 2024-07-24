import React, { useState, useEffect } from 'react';

const shuffleArray = (array) => {
  let shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const Question = ({ question, options = [], correctAnswer, onAnswer, isLastQuestion }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);

  useEffect(() => {
    setShuffledOptions(shuffleArray(options));
  }, [options]);

  if (!question || !Array.isArray(options) || options.length === 0 || !correctAnswer) {
    return (
      <div className="text-center text-red-500">
        Error: Invalid question data.
      </div>
    );
  }

  const handleCheckAnswer = () => {
    setSubmitted(true);
  };

  const handleNextQuestion = () => {
    onAnswer(selectedOption === correctAnswer);
    setSubmitted(false);
    setSelectedOption(null);
  };

  return (
    <div>
      <h2 className="font-sans font-semibold text-[17.5px] mb-6">{question}</h2>
      {shuffledOptions.map((option, index) => (
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
        <button
          onClick={handleNextQuestion}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
        >
          {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
        </button>
      ) : (
        <button
          onClick={handleCheckAnswer}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
          disabled={!selectedOption}
        >
          Check Answer
        </button>
      )}
    </div>
  );
};

export default Question;
