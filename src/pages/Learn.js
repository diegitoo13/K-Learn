import React, { useState, useEffect } from 'react';
import Question from '../components/Question';
import Header from '../components/Header';
import { loadState, saveState } from '../utils/localStorage';
import { useNavigate } from 'react-router-dom';

const shuffleArray = (array) => {
  let shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const Learn = ({ questions, setQuestions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedProgress = loadState('learnProgress');
    if (savedProgress && savedProgress.shuffledQuestions) {
      setShuffledQuestions(savedProgress.shuffledQuestions);
      setCurrentQuestionIndex(savedProgress.currentQuestionIndex);
    } else if (questions.length > 0) {
      const shuffled = shuffleArray(questions);
      setShuffledQuestions(shuffled);
      saveState('learnProgress', { currentQuestionIndex: 0, shuffledQuestions: shuffled });
    } else {
      navigate('/learn/get-started');
    }
  }, [questions, navigate]);

  const handleAnswer = (isCorrect) => {
    const updatedQuestions = questions.map((q) => {
      if (q.question === shuffledQuestions[currentQuestionIndex].question) {
        return { ...q, completed: isCorrect };
      }
      return q;
    });
    setQuestions(updatedQuestions);
    saveState('questions', updatedQuestions);

    if (!isCorrect) {
      const missedQuestions = loadState('missedQuestions') || [];
      missedQuestions.push(shuffledQuestions[currentQuestionIndex]);
      saveState('missedQuestions', missedQuestions);
    }

    const nextIndex = currentQuestionIndex + 1;
    saveState('learnProgress', { currentQuestionIndex: nextIndex, shuffledQuestions });
    if (nextIndex >= shuffledQuestions.length) {
      setCompleted(true);
    } else {
      setCurrentQuestionIndex(nextIndex);
    }
  };

  if (shuffledQuestions.length === 0) {
    return <div>Loading...</div>;
  }

  if (completed) {
    return (
      <div>
        <Header title="K! Learn" questionProgress={`Question ${shuffledQuestions.length} / ${shuffledQuestions.length}`} isQuestionPage />
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg text-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-6">Quiz completed!</h2>
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

  return (
    <div>
      <Header title="K! Learn" questionProgress={`Question ${currentQuestionIndex + 1} / ${shuffledQuestions.length}`} isQuestionPage />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
          <Question
            {...shuffledQuestions[currentQuestionIndex]}
            onAnswer={handleAnswer}
            isLastQuestion={currentQuestionIndex === shuffledQuestions.length - 1}
          />
        </div>
      </div>
    </div>
  );
};

export default Learn;
