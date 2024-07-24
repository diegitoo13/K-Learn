import React, { useState, useEffect } from 'react';
import Question from '../components/Question';
import Header from '../components/Header';
import { loadState, saveState } from '../utils/localStorage';
import { useNavigate } from 'react-router-dom';

const MissedQuestions = () => {
  const [missedQuestions, setMissedQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedMissedQuestions = loadState('missedQuestions') || [];
    if (storedMissedQuestions.length === 0) {
      navigate('/learn/get-started');
    } else {
      setMissedQuestions(storedMissedQuestions);
    }
  }, [navigate]);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      const updatedMissedQuestions = missedQuestions.filter(
        (q, index) => index !== currentQuestionIndex
      );
      setMissedQuestions(updatedMissedQuestions);
      saveState('missedQuestions', updatedMissedQuestions);
    }
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex >= missedQuestions.length) {
      setCompleted(true);
    } else {
      setCurrentQuestionIndex(nextIndex);
    }
  };

  if (missedQuestions.length === 0) {
    return (
      <div>
        <Header title="K! Learn" questionProgress={`Missed Questions`} isQuestionPage />
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg text-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-6">No missed questions to review!</h2>
            <button 
              onClick={() => navigate('/learn')}
              className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
            >
              Go to Main Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (completed) {
    return (
      <div>
        <Header title="K! Learn" questionProgress={`Missed Questions`} isQuestionPage />
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg text-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-6">Missed questions review completed!</h2>
            <button 
              onClick={() => navigate('/learn')}
              className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
            >
              Go to Main Menu
            </button>
            <button 
              onClick={() => {
                window.localStorage.removeItem('missedQuestions');
                navigate('/learn/get-started');
              }}
              className="mt-6 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600"
            >
              Reset Process
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header title="K! Learn" questionProgress={`Question ${currentQuestionIndex + 1} / ${missedQuestions.length}`} isQuestionPage />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
          <Question
            {...missedQuestions[currentQuestionIndex]}
            onAnswer={handleAnswer}
            isLastQuestion={currentQuestionIndex === missedQuestions.length - 1}
          />
        </div>
      </div>
    </div>
  );
};

export default MissedQuestions;
