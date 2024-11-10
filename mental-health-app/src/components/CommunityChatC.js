// src/components/CommunityChat.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc, query, onSnapshot, orderBy } from 'firebase/firestore';
import { auth,signOut } from '../firebaseConfig'; 
import { useNavigate } from 'react-router-dom';

const CommunityChatC = ({ user }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [community, setCommunity] = useState('General');
  const navigate = useNavigate()
  const handleLogout = async () => {
    try {
      await auth.signOut();  
      navigate('/');  
    } catch (error) {
      console.error('Logout error:', error);
    }
  };


  useEffect(() => {
    const q = query(
      collection(db, `communities/${community}/messages`),
      orderBy('timestamp')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => doc.data());
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, [community]);

  const handleSend = async () => {
    if (message.trim()) {
      await addDoc(collection(db, `communities/${community}/messages`), {
        text: message,
        author: user.email,
        timestamp: new Date()
      });
      setMessage('');
    }
  };

//   

return (
  <div>
    <h2>Community: {community}</h2>
    <select onChange={(e) => setCommunity(e.target.value)}>
      <option value="General">General</option>
      <option value="Support">Support</option>
      <option value="MentalHealth">Mental Health</option>
    </select>
    <div>
      {messages.map((msg, index) => (
        <p key={index}><strong>{msg.author}:</strong> {msg.text}</p>
      ))}
    </div>
    <input
      type="text"
      placeholder="Type a message"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
    />
    <button onClick={handleSend}>Send</button>

    <button onClick={handleLogout} style={{ marginTop: '20px' }}>
      Logout
    </button>
  </div>
);
};

export default CommunityChatC;
