// src/MoodTracker.js
import React, { useState } from "react";
import { db } from "./firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

const MoodTracker = () => {
  const [mood, setMood] = useState("");
  const [sentiment, setSentiment] = useState(null);

  const analyzeMood = async () => {
    // Placeholder sentiment analysis - Replace with a real API or model call
    const isPositive = mood.toLowerCase().includes("happy");
    setSentiment(isPositive ? "positive" : "negative");

    // Store mood entry in Firestore
    await addDoc(collection(db, "moodEntries"), {
      mood,
      sentiment,
      timestamp: new Date()
    });
  };

  return (
    <div>
      <h3>Track Your Mood</h3>
      <textarea placeholder="How are you feeling today?" onChange={(e) => setMood(e.target.value)} />
      <button onClick={analyzeMood}>Analyze Mood</button>
      {sentiment && <p>Sentiment: {sentiment}</p>}
    </div>
  );
};

export default MoodTracker;
