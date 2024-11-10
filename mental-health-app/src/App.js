// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import Auth from './components/Auth';
import CommunityChat from './components/CommunityChat';
import JoinCommunity from './components/JoinCommunity';
import UserTypeSelection from './components/UserTypeSelection';
import DoctorForm from './components/DoctorForm';
import ClientForm from './components/ClientForm';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  return (
    <Router>
      <div>
        <h1 className='navbar'> Community Mental Health Support</h1>
        <Routes>
          <Route path="/" element={!user ? <Auth onAuthSuccess={() => setUser(auth.currentUser)} /> : <UserTypeSelection />} />
          <Route path="/doctor-form" element={<DoctorForm />} />
          <Route path="/client-form" element={<ClientForm />} />
          <Route path="/community" element={<CommunityChat user={user} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
