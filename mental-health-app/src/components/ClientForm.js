
import React, { useState } from 'react';
import { db, auth } from '../firebaseConfig';
import { doc, setDoc,signOut } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const ClientForm = () => {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [diseases, setDiseases] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // Check if the user is authenticated
    navigate('/community');

    setLoading(true);
    setError(null);
    
    const userId = auth.currentUser.uid;

  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/'); // Redirect to login page after logout
    } catch (error) {
      console.error('Error logging out:', error);
      setError('Failed to log out. Please try again.');
    }
  };

return (
  <div className="client-form-container">
    <h2 className="client-form-title">Client Form</h2>
    {error && <p className="error-message">{error}</p>}
    <input
      type="text"
      placeholder="Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="client-form-input"
    />
    <input
      type="text"
      placeholder="Nickname"
      value={nickname}
      onChange={(e) => setNickname(e.target.value)}
      className="client-form-input"
    />
    <input
      type="number"
      placeholder="Age"
      value={age}
      onChange={(e) => setAge(e.target.value)}
      className="client-form-input"
    />
    <select
      onChange={(e) => setGender(e.target.value)}
      value={gender}
      className="client-form-select"
    >
      <option value="">Select Gender</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="other">Other</option>
    </select>
    <input
      type="text"
      placeholder="Diseases"
      value={diseases}
      onChange={(e) => setDiseases(e.target.value)}
      className="client-form-input"
    />
    <button onClick={handleSubmit} disabled={loading} className="submit-button">
      {loading ? 'Submitting...' : 'Submit'}
    </button>
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  </div>
);
};

export default ClientForm;
