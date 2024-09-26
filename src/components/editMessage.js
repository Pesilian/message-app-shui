import React, { useState } from 'react';
import axios from 'axios';

const UpdateMessageOverlay = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [id, setId] = useState('');
  const [text, setText] = useState('');
  const [userName, setUserName] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        ' https://qfd9nwfraa.execute-api.eu-north-1.amazonaws.com/default/editmessage-shui',
        {
          id,
          userName,
          text,
        }
      );
      setResponseMessage(response.data.message);
    } catch (error) {
      setResponseMessage(
        `Error: ${error.response?.data?.message || error.message}`
      );
    }
  };

  return (
    <div>
      <button onClick={() => setShowOverlay(true)}>Update Message</button>

      {showOverlay && (
        <div className="overlay">
          <div className="overlay-content">
            <h2>Update Message</h2>
            <input
              type="text"
              placeholder="Enter ID"
              value={id}
              onChange={e => setId(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter User Name"
              value={userName}
              onChange={e => setUserName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter New Text"
              value={text}
              onChange={e => setText(e.target.value)}
            />
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={() => setShowOverlay(false)}>Close</button>
          </div>
        </div>
      )}

      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default UpdateMessageOverlay;
