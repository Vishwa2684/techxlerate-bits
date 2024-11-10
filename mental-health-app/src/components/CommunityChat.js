
import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc, query, onSnapshot, orderBy } from 'firebase/firestore';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

const CommunityChat = ({ user }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [community, setCommunity] = useState('General');
  const navigate = useNavigate();

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

  // Generate random sentiment score between 8 and 10
  const getRandomSentiment = () => (Math.random() * (10 - 8) + 8).toFixed(1);

  // Hardcoded messages for demonstration
  const chatMessages = [
    { author: 'User', text: 'Hi, I need some support.', type: 'transactional' },
    { author: 'Doctor', text: 'Sure, how can I help you?', type: 'transactional' },
    { author: 'User', text: 'I feel overwhelmed with work.', type: 'transactional' },
    { author: 'Doctor', text: 'Let’s discuss a few techniques to manage stress.', type: 'transactional' },
    { author: 'User', text: 'I’m experiencing a lot of anxiety lately.', type: 'abnormal', sentiment: getRandomSentiment() },
    { author: 'Doctor', text: 'Can you tell me what triggers this anxiety?', type: 'transactional' },
    { author: 'User', text: 'I can’t sleep well at night.', type: 'abnormal', sentiment: getRandomSentiment() },
    { author: 'Doctor', text: 'Sleep issues can increase stress. Have you tried any relaxation techniques?', type: 'transactional' },
    { author: 'User', text: 'Not yet, but I would like to try.', type: 'transactional' },
    { author: 'Doctor', text: 'Let’s start with a few breathing exercises.', type: 'transactional' },
    { author: 'User', text: 'I feel like I’m losing control over things.', type: 'abnormal', sentiment: getRandomSentiment() }
  ];

  const abnormalMessages = chatMessages.filter((msg) => msg.type === 'abnormal');

  return (
    <div style={{ display: 'flex', height: '100vh', padding: '20px' }}>
      {/* Left Side - Community and Message Input */}
      <div style={{ flex: 1, marginRight: '20px', display: 'flex', flexDirection: 'column' }}>
        <h2>Community: {community}</h2>
        <select onChange={(e) => setCommunity(e.target.value)} value={community}>
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

        {/* Abnormal Messages Table */}
        <div style={{ marginTop: '20px', borderTop: '1px solid #ccc', paddingTop: '10px' }}>
          <h4>Abnormal Messages</h4>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr>
                <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Author</th>
                <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Message</th>
                <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Sentiment Score</th>
              </tr>
            </thead>
            <tbody>
              {abnormalMessages.map((msg, index) => (
                <tr key={index}>
                  <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{msg.author}</td>
                  <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{msg.text}</td>
                  <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{msg.sentiment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Side - Chat Messages */}
      <div style={{ flex: 1, border: '1px solid #ccc', borderRadius: '8px', padding: '10px', overflowY: 'auto' }}>
        <h3>Chat History</h3>
        <div>
          {chatMessages.map((msg, index) => (
            <p
              key={index}
              style={{
                backgroundColor: msg.type === 'abnormal' ? '#ffcccb' : '#e0f7fa',
                padding: '8px',
                borderRadius: '8px',
                textAlign: msg.author === 'User' ? 'left' : 'right',
                marginBottom: '8px'
              }}
            >
              <strong>{msg.author}:</strong> {msg.text}
            </p>
          ))}
        </div>

        {/* Non-functional Text Area */}
        <textarea
          placeholder="Type a message here..."
          style={{
            width: '100%',
            height: '80px',
            marginTop: '20px',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            resize: 'none',
          }}
          disabled
        />
      </div>
    </div>
  );
};

export default CommunityChat;
