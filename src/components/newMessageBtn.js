import React, { useEffect, useState } from 'react';

const MyComponent = () => {
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
    <div>
      <h1>Messages:</h1>
      {messages.length > 0 ? (
        <ul>
          {messages.map((messageObj, index) => (
            <li key={index}>
              <strong>{messageObj.userName}:</strong> {messageObj.message}{' '}
              <br />
              <small>Created at: {messageObj.createdAt}</small>
            </li>
          ))}
        </ul>
      ) : (
        <p>No messages found.</p>
      )}
    </div>
  );
};

export default MyComponent;

// import React from 'react';

// const NewMessageBtn = () => {
//   return (
//     <div>
//       <button>New Message</button>
//     </div>
//   );
// };

// export default NewMessageBtn;
