// // src/App.js
// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from './firebaseConfig';
// import Auth from './components/Auth';
// import CommunityChat from './components/CommunityChat';
// import JoinCommunity from './components/JoinCommunity';
// import UserTypeSelection from './components/UserTypeSelection';
// import DoctorForm from './components/DoctorForm';
// import ClientForm from './components/ClientForm';
// import CommunityChatC from './components/CommunityChatC';

// function App() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });
//     return unsubscribe;
//   }, []);

//   return (
//     <Router>
//       <div>
//         <h1 className='navbar'> Community Mental Health Support</h1>
//         <Routes>
//           <Route path="/" element={!user ? <Auth onAuthSuccess={() => setUser(auth.currentUser)} /> : <UserTypeSelection />} />
//           <Route path="/doctor-form" element={<DoctorForm />} />
//           <Route path="/client-form" element={<ClientForm />} />
//           <Route path="/community" element={<CommunityChat user={user} />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


// // // src/App.js
// // import React, { useState, useEffect } from 'react';
// // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// // import { onAuthStateChanged } from 'firebase/auth';
// // import { auth } from './firebaseConfig';
// // import Auth from './components/Auth';
// // import CommunityChat from './components/CommunityChat';
// // import JoinCommunity from './components/JoinCommunity';
// // import UserTypeSelection from './components/UserTypeSelection';
// // import DoctorForm from './components/DoctorForm';
// // import ClientForm from './components/ClientForm';
// // import DoctorMainPage from './components/DoctorMainPage';

// // function App() {
// //   const [user, setUser] = useState(null);
// //   const [userType, setUserType] = useState(null); // Track if the user is a doctor or client

// //   useEffect(() => {
// //     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
// //       setUser(currentUser);
// //     });
// //     return unsubscribe;
// //   }, []);

// //   return (
// //     <Router>
// //       <div>
// //         <h1 className='navbar'>Community Mental Health Support</h1>
// //         <Routes>
// //           {/* Sign-in or User Type Selection */}
// //           <Route 
// //             path="/" 
// //             element={
// //               !user ? (
// //                 <Auth onAuthSuccess={() => setUser(auth.currentUser)} />
// //               ) : (
// //                 <UserTypeSelection onSelectUserType={setUserType} />
// //               )
// //             } 
// //           />

// //           {/* Routes for Doctor or Client based on userType */}
// //           <Route 
// //             path="/doctor-form" 
// //             element={userType === 'doctor' ? <DoctorForm /> : <Navigate to="/" />}
// //           />
// //           <Route 
// //             path="/client-form" 
// //             element={userType === 'client' ? <ClientForm /> : <Navigate to="/" />}
// //           />

// //           {/* Post-Verification Main Pages */}
// //           <Route 
// //             path="/doctor-main" 
// //             element={userType === 'doctor' ? <DoctorMainPage user={user} /> : <Navigate to="/" />}
// //           />
// //           <Route 
// //             path="/community" 
// //             element={userType === 'client' ? <CommunityChat user={user} /> : <Navigate to="/" />}
// //           />

// //           {/* Join Community Page for Clients */}
// //           <Route 
// //             path="/join-community" 
// //             element={userType === 'client' ? <JoinCommunity user={user} /> : <Navigate to="/" />}
// //           />
// //         </Routes>
// //       </div>
// //     </Router>
// //   );
// // }

// // export default App;


// // // // src/App.js
// // // import React, { useState, useEffect } from 'react';
// // // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// // // import { onAuthStateChanged } from 'firebase/auth';
// // // import { auth, db } from './firebaseConfig';
// // // import { doc, getDoc } from 'firebase/firestore';
// // // import Auth from './components/Auth';
// // // import CommunityChat from './components/CommunityChat';
// // // import JoinCommunity from './components/JoinCommunity';
// // // import UserTypeSelection from './components/UserTypeSelection';
// // // import DoctorForm from './components/DoctorForm';
// // // import ClientForm from './components/ClientForm';
// // // import DoctorMainPage from './components/DoctorMainPage';

// // // function App() {
// // //   const [user, setUser] = useState(null);
// // //   const [userType, setUserType] = useState(null);

// // //   // Function to fetch the user type (doctor or client) from Firestore
// // //   const fetchUserType = async (userId) => {
// // //     try {
// // //       const userDoc = await getDoc(doc(db, 'users', userId));
// // //       if (userDoc.exists()) {
// // //         setUserType(userDoc.data().type); // Assume "type" field is set to "doctor" or "client"
// // //       }
// // //     } catch (error) {
// // //       console.error("Error fetching user type:", error);
// // //     }
// // //   };

// // //   // Set up authentication state observer
// // //   useEffect(() => {
// // //     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
// // //       setUser(currentUser);
// // //       if (currentUser) {
// // //         await fetchUserType(currentUser.uid);
// // //       } else {
// // //         setUserType(null); // Reset userType when logged out
// // //       }
// // //     });
// // //     return unsubscribe;
// // //   }, []);

// // //   return (
// // //     <Router>
// // //       <div>
// // //         <h1 className='navbar'>Community Mental Health Support</h1>
// // //         <Routes>
// // //           {/* Authentication or User Type Selection */}
// // //           <Route 
// // //             path="/" 
// // //             element={
// // //               !user ? (
// // //                 <Auth onAuthSuccess={() => setUser(auth.currentUser)} />
// // //               ) : (
// // //                 <UserTypeSelection onSelectUserType={setUserType} />
// // //               )
// // //             } 
// // //           />

// // //           {/* Doctor or Client Form based on userType */}
// // //           <Route 
// // //             path="/doctor-form" 
// // //             element={user && userType === 'doctor' ? <DoctorForm /> : <Navigate to="/doctor-form" />}
// // //           />
// // //           <Route 
// // //             path="/client-form" 
// // //             element={user && userType === 'client' ? <ClientForm /> : <Navigate to="/client-form" />}
// // //           />

// // //           {/* Main Page after Verification */}
// // //           <Route 
// // //             path="/doctor-main" 
// // //             element={user && userType === 'doctor' ? <DoctorMainPage user={user} /> : <Navigate to="/" />}
// // //           />
// // //           <Route 
// // //             path="/community" 
// // //             element={user && userType === 'client' ? <CommunityChat user={user} /> : <Navigate to="/" />}
// // //           />

// // //           {/* Join Community Page for Clients */}
// // //           <Route 
// // //             path="/join-community" 
// // //             element={user && userType === 'client' ? <JoinCommunity user={user} /> : <Navigate to="/" />}
// // //           />
// // //         </Routes>
// // //       </div>
// // //     </Router>
// // //   );
// // // }

// // // export default App;


// src/App.js
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
  const [userType, setUserType] = useState(null); // Tracks if user is doctor or client
  const [isVerified, setIsVerified] = useState(false); // Tracks doctor verification status

  // Fetch user type and verification status from Firestore
  const fetchUserTypeAndStatus = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUserType(userData.type); // 'doctor' or 'client'
        setIsVerified(userData.verified || false); // Check if verified for doctors
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
          {/* Authentication or User Type Selection */}
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

          {/* Doctor or Client Form based on userType */}
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

          {/* Main Page after Verification */}
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

          {/* Join Community Page for Clients */}
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
