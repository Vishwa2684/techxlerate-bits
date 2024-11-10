// src/components/DoctorDashboard.js
import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import { collection, query, where, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import './DoctorDashboard.css';

const DoctorDashboard = () => {
  const [availability, setAvailability] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [conversations, setConversations] = useState([]);

  const toggleAvailability = async () => {
    setAvailability(!availability);
    // Update doctor's availability status in Firestore
    const doctorRef = doc(db, 'doctors', auth.currentUser.uid);
    await updateDoc(doctorRef, { availability: !availability });
  };

  useEffect(() => {
    // Fetch notifications with high sentiment scores
    const notificationsRef = collection(db, 'notifications');
    const highSentimentQuery = query(notificationsRef, where('sentimentScore', '>', 0.7)); // Example threshold
    onSnapshot(highSentimentQuery, (snapshot) => {
      const newNotifications = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotifications(newNotifications);
    });

    // Fetch active conversations
    const conversationsRef = collection(db, 'conversations');
    onSnapshot(conversationsRef, (snapshot) => {
      const newConversations = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setConversations(newConversations);
    });
  }, []);

  return (
    <div className="doctor-dashboard">
      {/* Navbar */}
      <nav className="navbar">
        <h1>Community Mental Health Support - Doctor Dashboard</h1>
        <button onClick={() => signOut(auth)}>Logout</button>
      </nav>

      {/* Sidebar for availability toggle and notifications */}
      <aside className="sidebar">
        <div className="availability-toggle">
          <h2>Availability</h2>
          <button onClick={toggleAvailability}>
            {availability ? 'Available' : 'Unavailable'}
          </button>
        </div>
        <div className="notifications">
          <h2>Notifications</h2>
          <ul>
            {notifications.map((notification) => (
              <li key={notification.id}>{notification.message}</li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main conversation area */}
      <div className="conversation-area">
        <h2>Conversations</h2>
        {conversations.map((conversation) => (
          <div key={conversation.id} className="conversation">
            <p><strong>{conversation.userName}</strong></p>
            <p>{conversation.lastMessage}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorDashboard;
