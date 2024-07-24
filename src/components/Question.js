import React, { useState } from 'react';
import axios from 'axios';
import Modal from './Modal';

const Question = ({ question, options = [], correctAnswer, onAnswer, isLastQuestion }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [explanation, setExplanation] = useState('');
  const [error, setError] = useState('');

  const fetchExplanation = async () => {
    try {
      const apiKey = localStorage.getItem('openaiApiKey');
      if (!apiKey) throw new Error('API key not found');
      
      console.log('API Key:', apiKey);  // Debugging: Check API Key
      
      const prompt = `Question: ${question}\nOptions: ${options.join(', ')}\nCorrect Answer: ${correctAnswer}\nExplain why the correct answer is correct and why the other options are incorrect.`;
      console.log('Prompt:', prompt);  // Debugging: Check Prompt

      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'system', content: 'You are an assistant that explains quiz answers.' }, { role: 'user', content: prompt }],
        max_tokens: 150,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      });

      console.log('API Response:', response);  // Debugging: Check Response

      setExplanation(response.data.choices[0].message.content);
      setError('');
    } catch (err) {
      console.error('Error fetching explanation:', err);
      setError('Error fetching explanation. Please try again later.');
      setExplanation('');
    }
  };

  const handleCheckAnswer = () => {
    setSubmitted(true);
  };

  const handleNextQuestion = () => {
    onAnswer(selectedOption === correctAnswer);
    setSubmitted(false);
    setSelectedOption(null);
    setShowExplanation(false);
    setExplanation('');
    setError('');
  };

  return (
    <div>
      <h2 className="font-sans font-semibold text-[17.5px] mb-6">{question}</h2>
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
          {!showExplanation && (
            <button
              onClick={() => {
                setShowExplanation(true);
                fetchExplanation();
              }}
              className="mt-2 ml-4 px-4 py-2 text-blue-500"
            >
              See Explanation
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
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <p>{explanation}</p>
        )}
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
