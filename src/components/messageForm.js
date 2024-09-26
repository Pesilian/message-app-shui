import React, { useState } from 'react';
import '../styles/messageForm.css';

const MessageForm = () => {
  const [userName, setUserName] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    const body = {
      userName: userName,
      text: text,
    };

    try {
      const response = await fetch(
        'https://qfd9nwfraa.execute-api.eu-north-1.amazonaws.com/default/messages-Shui',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to post message');
      }

      const data = await response.json();
      console.log(data.message);

      setUserName('');
      setText('');
    } catch (error) {
      console.error('Error posting message:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={userName}
        onChange={e => setUserName(e.target.value)}
        placeholder="Your name"
        required
      />
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Your message"
        required
      />
      <button type="submit">Post Message</button>
    </form>
  );
};

export default MessageForm;
