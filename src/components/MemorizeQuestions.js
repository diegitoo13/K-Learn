import React, { useState, useEffect } from 'react';
import { saveState, loadState } from '../utils/localStorage';

const MemorizeQuestions = ({ questions, onStartQuiz }) => {
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const savedProgress = loadState('memorizeProgress');
    if (savedProgress && savedProgress.shuffledQuestions) {
      setShuffledQuestions(savedProgress.shuffledQuestions);
      setCurrentQuestionIndex(savedProgress.currentQuestionIndex);
    } else {
      const shuffled = questions.map(q => ({
        ...q,
        options: [...q.options].sort(() => Math.random() - 0.5)
      })).sort(() => Math.random() - 0.5);

      setShuffledQuestions(shuffled.slice(0, 10)); // Take the first 10 questions
      saveState('memorizeProgress', { shuffledQuestions: shuffled.slice(0, 10), currentQuestionIndex: 0 });
    }
  }, [questions]);

  const handleNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < shuffledQuestions.length) {
      setCurrentQuestionIndex(nextIndex);
      saveState('memorizeProgress', { shuffledQuestions, currentQuestionIndex: nextIndex });
    } else {
      onStartQuiz(shuffledQuestions);
      localStorage.removeItem('memorizeProgress'); // Clear progress after completion
    }
  };

  if (shuffledQuestions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Memorize This Question</h2>
        <div className="flex flex-col space-y-4">
          <div key={currentQuestionIndex} className="mb-4">
            <h3 className="font-sans font-semibold text-[17.5px] mb-2">{currentQuestion.question}</h3>
            <p className="text-green-500">{currentQuestion.correctAnswer}</p>
          </div>
          <button
            onClick={handleNextQuestion}
            className="w-full py-3 px-6 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition duration-300"
          >
            {currentQuestionIndex === shuffledQuestions.length - 1 ? 'Start Quiz' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemorizeQuestions;
