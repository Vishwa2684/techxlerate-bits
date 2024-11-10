// src/components/DoctorForm.js
import React, { useState } from 'react';
import { db, storage } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';

const DoctorForm = () => {
  const [name, setName] = useState('');
  const [qualification, setQualification] = useState('');
  const [certificate, setCertificate] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const userId = auth?.currentUser?.uid;

    // Upload certificate image to Firebase Storage
    const certificateRef = ref(storage, `certificates/${userId}`);
    await uploadBytes(certificateRef, certificate);
    const certificateURL = await getDownloadURL(certificateRef);

    // Store data in Firestore
    await setDoc(doc(db, 'doctors', userId), {
      name,
      qualification,
      certificateURL,
    });

    navigate('/community');
  };

  return (
    <div>
      <h2>Doctor Form</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Qualification"
        value={qualification}
        onChange={(e) => setQualification(e.target.value)}
      />
      <input
        type="file"
        onChange={(e) => setCertificate(e.target.files[0])}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default DoctorForm;
