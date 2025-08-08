import React, { useEffect, useState } from 'react';
import { checkBackend } from '../api/test';

const CheckBackend = () => {
  const [message, setMessage] = useState('⏳ Checking backend...');

  useEffect(() => {
    const testConnection = async () => {
      try {
        const data = await checkBackend(); // call the backend
        setMessage(data.message); // show the message
      } catch (error) {
        setMessage('❌ Backend not reachable');
      }
    };

    testConnection(); // run when page loads
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Backend Connection Status</h2>
      <p>{message}</p>
    </div>
  );
};

export default CheckBackend;
