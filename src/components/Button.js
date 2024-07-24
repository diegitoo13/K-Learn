import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ to, text, disabled }) => (
  <Link to={to} className={`btn ${disabled ? 'btn-disabled' : 'btn-primary'}`}>
    {text}
  </Link>
);

export default Button;
