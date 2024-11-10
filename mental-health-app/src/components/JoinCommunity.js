// src/components/JoinCommunity.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    </div>
  );
};

export default JoinCommunity;
