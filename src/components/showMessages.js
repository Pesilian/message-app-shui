import React, { useEffect, useState } from 'react';
import '../styles/showMessages.css';

const ShowMessages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          'https://qfd9nwfraa.execute-api.eu-north-1.amazonaws.com/default/getmessages-Shui'
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API response:', data); // Kontrollera API-svaret

        // Använd 'message' arrayen från API-svaret
        setMessages(Array.isArray(data.message) ? data.message : []);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div class="messagescontainer">
      {messages.length > 0 ? (
        <ul>
          {messages.map((messageObj, index) => (
            <li class="messagecontainer" key={index}>
              <p class="username">{messageObj.userName}:</p>{' '}
              <p class="message">{messageObj.message} </p>
              <p class="date">Created at: {messageObj.createdAt}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p class="errormessage">No messages found.</p>
      )}
    </div>
  );
};

export default ShowMessages;
