import React from 'react';
import { useNavigate } from 'react-router-dom';
import { saveState } from '../utils/localStorage';
import Header from '../components/Header';
import waifuImage from '../assets/waifu.webp';

const demoQuestions = [
  {
    question: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Lisbon'],
    correctAnswer: 'Paris',
    explanation: 'Paris is the capital city of France, known for its culture, history, and landmarks like the Eiffel Tower.',
  },
  {
    question: 'What is 2 + 2?',
    options: ['3', '4', '5', '6'],
    correctAnswer: '4',
    explanation: '2 + 2 equals 4 because adding two pairs gives a total of four.',
  },
  {
    question: 'Who wrote "To Kill a Mockingbird"?',
    options: ['Harper Lee', 'J.K. Rowling', 'Ernest Hemingway', 'Mark Twain'],
    correctAnswer: 'Harper Lee',
    explanation: '"To Kill a Mockingbird" was written by Harper Lee, a novel about racial injustice in the Deep South.',
  },
  {
    question: 'What is the largest planet in our solar system?',
    options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
    correctAnswer: 'Jupiter',
    explanation: 'Jupiter is the largest planet in our solar system, known for its Great Red Spot and many moons.',
  },
  {
    question: 'Which element has the chemical symbol "O"?',
    options: ['Gold', 'Oxygen', 'Osmium', 'Iron'],
    correctAnswer: 'Oxygen',
    explanation: 'Oxygen has the chemical symbol "O" and is essential for respiration in most living organisms.',
  },
];

const GetStarted = ({ setQuestions }) => {
  const navigate = useNavigate();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const questions = JSON.parse(e.target.result);
        saveState('questions', questions);
        setQuestions(questions);
        navigate('/learn');
      };
      reader.readAsText(file);
    }
  };

  const handleDemoMode = () => {
    saveState('questions', demoQuestions);
    setQuestions(demoQuestions);
    navigate('/learn');
  };

  return (
    <div className="min-h-screen bg-[#1f3545] flex flex-col items-center justify-center">
      <Header title="K! Learn" />
      <div className="flex flex-col items-center justify-center w-full max-w-lg mt-20 p-8 text-center transition duration-500">
        <img src={waifuImage} alt="Mascot" className="mb-4 w-64 h-64 object-cover" />
        <h2 className="text-3xl font-semibold text-white mb-4">Get Started</h2>
        <p className="text-lg text-white mb-6">Choose how you want to start the quiz:</p>
        <div className="flex flex-col space-y-4">
          <button 
            onClick={handleDemoMode}
            className="w-full py-3 px-6 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition duration-300"
          >
            Demo Mode
          </button>
          <label className="relative cursor-pointer bg-white text-gray-700 font-semibold py-3 px-6 rounded-full inline-flex items-center hover:bg-gray-200 transition duration-300">
            <input type="file" accept="application/json" onChange={handleFileUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            <span>Upload Custom Questions</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
