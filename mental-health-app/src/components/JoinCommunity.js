// // src/components/JoinCommunity.js
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { auth } from '../firebaseConfig';

// const JoinCommunity = () => {
//   const [selectedCommunity, setSelectedCommunity] = useState('');
//   const navigate = useNavigate();

//   const communities = [
//     'Mental Health Support',
//     'Therapist Advice',
//     'Wellness and Self-Care',
//     'Stress and Anxiety',
//     'Peer Support',
//   ];

//   const handleCommunitySelect = (community) => {
//     setSelectedCommunity(community);
//   };

//   const handleJoinCommunity = () => {
//     if (selectedCommunity) {
//       // Navigate to community chat with the selected community name
//       navigate(`/community/${selectedCommunity}`);
//     } else {
//       alert('Please select a community to join.');
//     }
//   };

//   return (
//     <div>
//       <h2>Join a Community</h2>
//       <p>Select a community to join:</p>
//       <ul>
//         {communities.map((community, index) => (
//           <li key={index}>
//             <button onClick={() => handleCommunitySelect(community)}>
//               {community}
//             </button>
//           </li>
//         ))}
//       </ul>
//       <button onClick={handleJoinCommunity} disabled={!selectedCommunity}>
//         Join {selectedCommunity || 'Community'}
//       </button>
//     </div>
//   );
// };

// export default JoinCommunity;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth,signOut } from '../firebaseConfig';  // Import Firebase auth

const JoinCommunity = () => {
  const [selectedCommunity, setSelectedCommunity] = useState('');
  const navigate = useNavigate();

  const communities = [
    'Mental Health Support',
    'Therapist Advice',
    'Wellness and Self-Care',
    'Stress and Anxiety',
    'Peer Support',
  ];

  const handleCommunitySelect = (community) => {
    setSelectedCommunity(community);
  };

  const handleJoinCommunity = () => {
    if (selectedCommunity) {
      // Navigate to community chat with the selected community name
      navigate(`/community/${selectedCommunity}`);
    } else {
      alert('Please select a community to join.');
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();  // Firebase logout
      navigate('/');  // Redirect to the login or home page after logging out
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div>
      <h2>Join a Community</h2>
      <p>Select a community to join:</p>
      <ul>
        {communities.map((community, index) => (
          <li key={index}>
            <button onClick={() => handleCommunitySelect(community)}>
              {community}
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleJoinCommunity} disabled={!selectedCommunity}>
        Join {selectedCommunity || 'Community'}
      </button>

      {/* Logout button */}
      <button onClick={handleLogout} style={{ marginTop: '20px' }}>
        Logout
      </button>
    </div>
  );
};

export default JoinCommunity;

