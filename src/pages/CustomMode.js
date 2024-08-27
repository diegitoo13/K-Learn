import React, { useState } from 'react';
import MemorizeQuestions from '../components/MemorizeQuestions';
import Question from '../components/Question';
import Header from '../components/Header';
import { loadState, saveState } from '../utils/localStorage';

const CustomMode = ({ questions, setQuestions }) => {
  const [phase, setPhase] = useState('memorize'); // memorize or quiz
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleStartQuiz = (shuffledQuestions) => {
    setCurrentQuestions(shuffledQuestions);
    setPhase('quiz');
    setCurrentQuestionIndex(0); // Start at the first question
  };

  const handleAnswer = (isCorrect) => {
    const updatedQuestions = questions.map((q) => {
      if (q.question === currentQuestions[currentQuestionIndex].question) {
        return { ...q, completed: isCorrect };
      }
      return q;
    });
    setQuestions(updatedQuestions);

    if (!isCorrect) {
      const missedQuestions = loadState('missedQuestions') || [];
      missedQuestions.push(currentQuestions[currentQuestionIndex]);
      saveState('missedQuestions', missedQuestions);
    }

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < currentQuestions.length) {
      setCurrentQuestionIndex(nextIndex); // Move to the next question
    } else {
      setPhase('completed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header 
        title="Custom Mode"
        questionProgress={
          phase === 'quiz' 
            ? `Question ${currentQuestionIndex + 1} / ${currentQuestions.length}`
            : phase === 'completed'
            ? 'Completed!'
            : ''
        }
        isQuestionPage
      />
      <div className="flex flex-col items-center justify-center flex-grow">
        {phase === 'memorize' && (
          <MemorizeQuestions questions={questions} onStartQuiz={handleStartQuiz} />
        )}

        {phase === 'quiz' && (
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
            <Question
              {...currentQuestions[currentQuestionIndex]}
              onAnswer={handleAnswer}
              isLastQuestion={currentQuestionIndex === currentQuestions.length - 1}
            />
          </div>
        )}

        {phase === 'completed' && (
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg text-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-6">Custom Mode Completed!</h2>
            <button
              onClick={() => setPhase('memorize')}
              className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
            >
              Restart Custom Mode
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomMode;
