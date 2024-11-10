
import React, { useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import { addDoc, collection, query, onSnapshot } from "firebase/firestore";

const Forum = () => {
  const [message, setMessage] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "forumPosts"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsubscribe;
  }, []);

  const postMessage = async () => {
    await addDoc(collection(db, "forumPosts"), {
      message,
      timestamp: new Date()
    });
    setMessage("");
  };

  return (
    <div>
      <h3>Community Forum</h3>
      <textarea placeholder="Share your thoughts..." value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={postMessage}>Post</button>
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <p>{post.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forum;
