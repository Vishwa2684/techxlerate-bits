// // src/components/ClientForm.js
// import React, { useState } from 'react';
// import { db } from '../firebaseConfig';
// import { doc, setDoc } from 'firebase/firestore';
// import { useNavigate } from 'react-router-dom';
// import { auth } from '../firebaseConfig';

// const ClientForm = () => {
//   const [name, setName] = useState('');
//   const [nickname, setNickname] = useState('');
//   const [age, setAge] = useState('');
//   const [gender, setGender] = useState('');
//   const [diseases, setDiseases] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async () => {
//     const userId = auth.currentUser.uid;

//     // Store data in Firestore
//     await setDoc(doc(db, 'clients', userId), {
//       name,
//       nickname,
//       age,
//       gender,
//       diseases,
//     });

//     navigate('/community');
//   };

//   return (
//     <div>
//       <h2>Client Form</h2>
//       <input
//         type="text"
//         placeholder="Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Nickname"
//         value={nickname}
//         onChange={(e) => setNickname(e.target.value)}
//       />
//       <input
//         type="number"
//         placeholder="Age"
//         value={age}
//         onChange={(e) => setAge(e.target.value)}
//       />
//       <select onChange={(e) => setGender(e.target.value)} value={gender}>
//         <option value="">Select Gender</option>
//         <option value="male">Male</option>
//         <option value="female">Female</option>
//         <option value="other">Other</option>
//       </select>
//       <input
//         type="text"
//         placeholder="Diseases"
//         value={diseases}
//         onChange={(e) => setDiseases(e.target.value)}
//       />
//       <button onClick={handleSubmit}>Submit</button>
//     </div>
//   );
// };

// export default ClientForm;




// src/components/ClientForm.js
import React, { useState } from 'react';
import { db, auth } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const ClientForm = () => {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [diseases, setDiseases] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // Check if the user is authenticated
    if (!auth.currentUser) {
      setError('User not authenticated. Please log in.');
      return;
    }
    console.log(auth?.currentUser)
    // Check if all required fields are filled
    if (!name || !nickname || !age || !gender || !diseases) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError(null);
    
    const userId = auth.currentUser.uid;

    try {
      // Store data in Firestore
      await setDoc(doc(db, 'clients', userId), {
        name,
        nickname,
        userId:auth?.currentUser.uid,
        age: parseInt(age), // Store age as a number
        gender,
        diseases,
      });
      
      setLoading(false);
      navigate('/community');
    } catch (e) {
      console.error('Error saving data to Firestore:', e);
      setError('Failed to save data. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Client Form</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
    
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <select onChange={(e) => setGender(e.target.value)} value={gender}>
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <input
        type="text"
        placeholder="Diseases"
        value={diseases}
        onChange={(e) => setDiseases(e.target.value)}
      />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </div>
  );
};

export default ClientForm;
