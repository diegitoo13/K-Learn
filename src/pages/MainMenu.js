import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { loadState } from '../utils/localStorage';

const MainMenu = ({ questions }) => {
  const navigate = useNavigate();
  const [hasQuestions, setHasQuestions] = useState(false);
  const [hasMissedQuestions, setHasMissedQuestions] = useState(false);
  const [allCompleted, setAllCompleted] = useState(false);

  useEffect(() => {
    const questions = loadState('questions') || [];
    const missedQuestions = loadState('missedQuestions') || [];
    setHasQuestions(questions.length > 0);
    setHasMissedQuestions(missedQuestions.length > 0);

    if (questions.length > 0 && questions.every((q) => q.completed)) {
      setAllCompleted(true);
    }
  }, []);

  const resetProcess = () => {
    window.localStorage.removeItem('learnProgress');
    navigate('/learn/get-started');
  };

  const startOver = () => {
    window.localStorage.clear();
    navigate('/learn/get-started');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <Header title="K! Learn" />
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Choose Your Learning Path</h2>
        <p className="text-gray-600 mb-6">
          Select one of the options below to start your learning journey. You can learn new questions, review missed questions, reset your progress, or start over.
        </p>
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => navigate('/learn/quiz')}
            className={`w-full py-3 px-6 rounded-full font-semibold transition duration-300 ${
              hasQuestions && !allCompleted ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!hasQuestions || allCompleted}
          >
            Learn
          </button>
          <button
            onClick={() => navigate('/learn/missed-questions')}
            className={`w-full py-3 px-6 rounded-full font-semibold transition duration-300 ${
              hasMissedQuestions ? 'bg-yellow-500 text-white hover:bg-yellow-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!hasMissedQuestions}
          >
            Missed Questions
          </button>
          <button
            onClick={resetProcess}
            className="w-full py-3 px-6 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition duration-300"
          >
            Reset Process
          </button>
          <button
            onClick={startOver}
            className="w-full py-3 px-6 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 transition duration-300"
          >
            Start Over
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
