
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {auth} from '../firebaseConfig';
import { db } from '../firebaseConfig';
import { collection, addDoc,getDoc } from 'firebase/firestore';

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
    <div className="user-type-container">
      <h2 className="user-type-title">Select Your Role</h2>
      <button className="user-type-button doctor-button" onClick={() => handleUserTypeSelection('doctor')}>Doctor</button>
      <button className="user-type-button client-button" onClick={() => handleUserTypeSelection('client')}>Client</button>
    </div>
  );
};

export default UserTypeSelection;
