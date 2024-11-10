// src/components/UserTypeSelection.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserTypeSelection = () => {
  const navigate = useNavigate();

  const handleUserTypeSelection = (userType) => {
    if (userType === 'doctor') {
      navigate('/doctor-form');
    } else {
      navigate('/client-form');
    }
  };

  return (
    <div>
      <h2>Select Your Role</h2>
      <button onClick={() => handleUserTypeSelection('doctor')}>Doctor</button>
      <button onClick={() => handleUserTypeSelection('client')}>Client</button>
    </div>
  );
};

export default UserTypeSelection;
