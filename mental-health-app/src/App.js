// src/App.js
import React, { useState, useEffect } from 'react';
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import Auth from './components/Auth';
import CommunityChat from './components/CommunityChat';

function App() {
  const [user, setUser] = useState(null);
  console.log(user);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  return (
    <div>
      <h1>Community Mental Health Support</h1>
      {user ? <CommunityChat user={user} /> : <Auth onAuthSuccess={() => setUser(auth.currentUser)} />}
    </div>
  );
}

export default App;
