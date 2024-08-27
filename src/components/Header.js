import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ title, questionProgress, isQuestionPage }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#1f3545] text-white p-4 w-full fixed top-0 left-0 transition duration-500 z-10 flex items-center justify-between">
      <div className="text-xl font-bold truncate max-w-[45%]">
        {title}
      </div>
      {isQuestionPage && (
        <div className="flex items-center justify-center flex-grow">
          <div className="text-xl font-bold text-center flex-grow">
            {questionProgress}
          </div>
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-500 text-white font-semibold py-2 px-4 ml-4 rounded-full hover:bg-blue-600 transition duration-300 shadow-md whitespace-nowrap"
          >
            Exit
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
