import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveState } from '../utils/localStorage';
import Header from '../components/Header';
import waifuImage from '../assets/waifu.webp';

const demoQuestions = [
  {
    question: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Lisbon'],
    correctAnswer: 'Paris',
  },
  {
    question: 'What is 2 + 2?',
    options: ['3', '4', '5', '6'],
    correctAnswer: '4',
  },
  {
    question: 'Who wrote "To Kill a Mockingbird"?',
    options: ['Harper Lee', 'J.K. Rowling', 'Ernest Hemingway', 'Mark Twain'],
    correctAnswer: 'Harper Lee',
  },
  {
    question: 'What is the largest planet in our solar system?',
    options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
    correctAnswer: 'Jupiter',
  },
  {
    question: 'Which element has the chemical symbol "O"?',
    options: ['Gold', 'Oxygen', 'Osmium', 'Iron'],
    correctAnswer: 'Oxygen',
  }
];


const GetStarted = ({ setQuestions }) => {
  const [apiKey, setApiKey] = useState('');
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

  const handleSaveApiKey = () => {
    if (apiKey) {
      localStorage.setItem('openaiApiKey', apiKey);
      alert('API Key saved successfully!');
    }
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
          <input
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter OpenAI API Key (optional)"
            className="w-full py-3 px-6 border rounded-full focus:outline-none"
          />
          <button 
            onClick={handleSaveApiKey}
            className="w-full py-3 px-6 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 transition duration-300"
          >
            Save API Key
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;