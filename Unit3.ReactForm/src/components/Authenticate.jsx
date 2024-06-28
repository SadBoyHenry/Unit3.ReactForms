import React, { useState } from 'react';

const Authenticate = ({ token }) => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  const handleClick = async () => {
    try {
      const response = await fetch('https://fsa-jwt-practice.herokuapp.com/authenticate', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      const data = await response.json();
      if (data.message) {
        setSuccessMessage(data.message);
        if (data.data && data.data.username) {
          setUserData(data.data.username); // Store username in state
        }
      } else {
        setError("Authentication failed");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="authenticate-container">
      <h2>Authenticate</h2>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      {userData && <p className="username-info">Logged in as: {userData}</p>}
      <button onClick={handleClick}>Authenticate Token</button>
    </div>
  );
};

export default Authenticate;



