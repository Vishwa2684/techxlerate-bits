
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
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Doctor Registration Form</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Qualification"
          value={qualification}
          onChange={(e) => setQualification(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Certificate Number"
          value={certificateNumber}
          onChange={(e) => setCertificateNumber(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </div>
  );
};

export default DoctorForm;