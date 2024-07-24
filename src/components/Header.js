import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ title, questionProgress, isQuestionPage }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#1f3545] text-white p-4 w-full fixed top-0 left-0 transition duration-500 z-10 flex justify-between items-center">
      <div className="text-xl font-bold">
        {title}
      </div>
      {isQuestionPage && (
        <>
          <div className="text-xl font-bold">
            {questionProgress}
          </div>
          <button 
            onClick={() => navigate('/learn')}
            className="text-blue-500 hover:text-blue-700"
          >
            Exit
          </button>
        </>
      )}
    </div>
  );
};

export default Header;
