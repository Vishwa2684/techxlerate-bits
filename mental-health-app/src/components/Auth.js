// // src/components/Auth.js
// import React, { useState } from 'react';
// import { auth } from '../firebaseConfig';
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

// const Auth = ({ onAuthSuccess }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isSignUp, setIsSignUp] = useState(false);

//   const handleAuth = async () => {
//     try {
//       if (isSignUp) {
//         await createUserWithEmailAndPassword(auth, email, password);
//       } else {
//         await signInWithEmailAndPassword(auth, email, password);
//       }
//       onAuthSuccess();
//     } catch (error) {
//       console.error('Authentication error:', error.message);
//     }
//   };

//   return (
//     <div>
//       <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
//       <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
//       <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
//       <button onClick={handleAuth}>{isSignUp ? 'Sign Up' : 'Sign In'}</button>
//       <button onClick={() => setIsSignUp(!isSignUp)}>
//         Switch to {isSignUp ? 'Sign In' : 'Sign Up'}
//       </button>
//     </div>
//   );
// };

// export default Auth;


// src/components/Auth.js
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
    <div>
      <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleAuth}>{isSignUp ? 'Sign Up' : 'Sign In'}</button>
      <button onClick={() => setIsSignUp(!isSignUp)}>
        Switch to {isSignUp ? 'Sign In' : 'Sign Up'}
      </button>
      <div>
        <button onClick={handleGoogleSignIn}>Sign In with Google</button>
      </div>
    </div>
  );
};

export default Auth;
