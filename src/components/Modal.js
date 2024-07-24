import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white p-8 rounded shadow-md w-full max-w-lg">
        <button className="absolute top-0 right-0 p-2 text-black" onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
