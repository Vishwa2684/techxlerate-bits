
import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const Auth = ({ onAuthSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const googleProvider = new GoogleAuthProvider();

  const handleAuth = async () => {
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onAuthSuccess();
    } catch (error) {
      console.error('Authentication error:', error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      onAuthSuccess();
    } catch (error) {
      console.error('Google Sign-In error:', error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
      <input className="auth-input" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input className="auth-input" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button className="auth-button primary-button" onClick={handleAuth}>{isSignUp ? 'Sign Up' : 'Sign In'}</button>
      <button className="auth-button toggle-button" onClick={() => setIsSignUp(!isSignUp)}>
        Switch to {isSignUp ? 'Sign In' : 'Sign Up'}
      </button>
      <div>
        <button className="auth-button google-button" onClick={handleGoogleSignIn}>Sign In with Google</button>
      </div>
    </div>
  );
};

export default Auth;
