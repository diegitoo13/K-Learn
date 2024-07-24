import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import GetStarted from './pages/GetStarted';
import Learn from './pages/Learn';
import MainMenu from './pages/MainMenu';
import MissedQuestions from './pages/MissedQuestions';
import { loadState } from './utils/localStorage';

const App = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const savedQuestions = loadState('questions');
    if (savedQuestions) {
      setQuestions(savedQuestions);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/learn" />} />
        <Route path="/learn" element={<MainMenu questions={questions} />} />
        <Route path="/learn/get-started" element={<GetStarted setQuestions={setQuestions} />} />
        <Route path="/learn/quiz" element={<Learn questions={questions} setQuestions={setQuestions} />} />
        <Route path="/learn/missed-questions" element={<MissedQuestions questions={questions} setQuestions={setQuestions} />} />
      </Routes>
    </Router>
  );
};

export default App;
