
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import Auth from './components/Auth';
import CommunityChat from './components/CommunityChat';
import JoinCommunity from './components/JoinCommunity';
import UserTypeSelection from './components/UserTypeSelection';
import DoctorForm from './components/DoctorForm';
import ClientForm from './components/ClientForm';
import DoctorDashboard from './components/DoctorDashboard';

function App() {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null); 
  const [isVerified, setIsVerified] = useState(false); 

  
  const fetchUserTypeAndStatus = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUserType(userData.type); 
        setIsVerified(userData.verified || false); 
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Set up authentication state observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await fetchUserTypeAndStatus(currentUser.uid);
      } else {
        setUserType(null);
        setIsVerified(false);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <Router>
      <div>
        <h1 className='navbar'>Community Mental Health Support</h1>
        <Routes>
          
          <Route 
            path="/" 
            element={
              !user ? (
                <Auth onAuthSuccess={() => setUser(auth.currentUser)} />
              ) : (
                <UserTypeSelection onSelectUserType={setUserType} />
              )
            } 
          />

          <Route 
  path="/doctor-form" 
  element={<DoctorForm />} 
/>

          <Route 
            path="/client-form" 
            element={
              <ClientForm/>
            }
          />

      
          <Route 
            path="/doctor-dashboard" 
            element={
              user && userType === 'doctor' && isVerified ? (
                <DoctorDashboard user={user} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route 
            path="/community" 
            element={
              <CommunityChat/>
            }
          />

    
          <Route 
            path="/join-community" 
            element={
              user && userType === 'client' ? (
                <JoinCommunity user={user} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
