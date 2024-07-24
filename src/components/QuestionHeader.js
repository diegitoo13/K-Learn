import React from 'react';
import { useNavigate } from 'react-router-dom';

const QuestionHeader = ({ current, total }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center mb-6">
      <div></div> {/* Empty div to balance the flex container */}
      <div className="text-gray-500 text-center">
        <i className="fa fa-file-text-o" aria-hidden="true"></i> 
        Question {current} / {total}
      </div>
      <button 
        onClick={() => navigate('/learn')}
        className="text-blue-500 hover:text-blue-700"
      >
        Exit
      </button>
    </div>
  );
};

export default QuestionHeader;
