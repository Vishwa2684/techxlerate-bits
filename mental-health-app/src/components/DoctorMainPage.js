// src/components/DoctorMainPage.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig'; // Ensure you have Firebase initialized here
import { collection, addDoc, onSnapshot, doc, updateDoc } from 'firebase/firestore';

const DoctorMainPage = ({ user }) => {
  const [communityCreated, setCommunityCreated] = useState(false);
  const [availability, setAvailability] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);

  // Fetch conversations
  useEffect(() => {
    const conversationsRef = collection(db, 'doctors', user.uid, 'conversations');
    const unsubscribe = onSnapshot(conversationsRef, (snapshot) => {
      const fetchedConversations = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setConversations(fetchedConversations);
    });

    return unsubscribe;
  }, [user.uid]);

  // Handle community creation
  const handleCreateCommunity = async () => {
    if (communityCreated) return;
    try {
      const communityRef = collection(db, 'communities');
      await addDoc(communityRef, {
        doctorId: user.uid,
        doctorName: user.displayName,
        createdAt: new Date(),
      });
      setCommunityCreated(true);
    } catch (error) {
      console.error("Error creating community:", error);
    }
  };

  // Handle availability toggle
  const toggleAvailability = async () => {
    setAvailability(!availability);
    try {
      const doctorRef = doc(db, 'doctors', user.uid);
      await updateDoc(doctorRef, { availability: !availability });
    } catch (error) {
      console.error("Error updating availability:", error);
    }
  };

  return (
    <div className="doctor-main-page">
      <h2>Welcome, Dr. {user.displayName}</h2>

      {/* Community Creation */}
      <div className="community-section">
        <h3>Your Community</h3>
        {communityCreated ? (
          <p>Community created! Patients can now join your community.</p>
        ) : (
          <button onClick={handleCreateCommunity}>Create Community</button>
        )}
      </div>

      {/* Availability Toggle */}
      <div className="availability-section">
        <h3>Availability</h3>
        <button onClick={toggleAvailability}>
          {availability ? "Set Unavailable" : "Set Available"}
        </button>
        <p>{availability ? "You are available for consultations." : "You are currently unavailable."}</p>
      </div>

      {/* Conversations List */}
      <div className="conversations-section">
        <h3>Your Conversations</h3>
        <ul>
          {conversations.map((conv) => (
            <li 
              key={conv.id} 
              onClick={() => setSelectedConversation(conv)}
              style={{ cursor: 'pointer', marginBottom: '8px' }}
            >
              {conv.clientName}
            </li>
          ))}
        </ul>
      </div>

      {/* Selected Conversation Details */}
      {selectedConversation && (
        <div className="conversation-details">
          <h3>Conversation with {selectedConversation.clientName}</h3>
          <p>{selectedConversation.messages}</p>
          {/* Display messages and personal chat interface here */}
        </div>
      )}
    </div>
  );
};

export default DoctorMainPage;
