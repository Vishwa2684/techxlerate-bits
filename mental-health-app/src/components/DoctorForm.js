
import React, { useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';

const DoctorForm = () => {
  const [name, setName] = useState('');
  const [qualification, setQualification] = useState('');
  const [certificateNumber, setCertificateNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const userId = auth?.currentUser?.uid;

      if (!userId) {
        throw new Error('User not authenticated');
      }

      // Store data in Firestore
      const doctorData = {
        name,
        userId,
        qualification,
        certificateNumber,
        verified: false,
        availability: false,
        createdAt: new Date().toISOString()
      };

      await addDoc(collection(db, 'doctors'), doctorData);
      navigate('/community');
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };




  
  return (
    <div className="doctor-form-container">
      <h2 className="doctor-form-title">Doctor Registration Form</h2>
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
     
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="doctor-form-input"
        />
        <input
          type="text"
          placeholder="Qualification"
          value={qualification}
          onChange={(e) => setQualification(e.target.value)}
          className="doctor-form-input"
        />
        <input
          type="text"
          placeholder="Certificate Number"
          value={certificateNumber}
          onChange={(e) => setCertificateNumber(e.target.value)}
          className="doctor-form-input"
        />
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="submit-button"
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
  
    </div>
  );
};

export default DoctorForm;