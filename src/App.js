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
        <Route path="/" element={<MainMenu questions={questions} />} />
        <Route path="/get-started" element={<GetStarted setQuestions={setQuestions} />} />
        <Route path="/quiz" element={<Learn questions={questions} setQuestions={setQuestions} />} />
        <Route path="/missed-questions" element={<MissedQuestions questions={questions} setQuestions={setQuestions} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
