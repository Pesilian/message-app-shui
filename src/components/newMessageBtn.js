import React, { useEffect, useState } from 'react';

const MyComponent = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMessage = async () => {
      const response = await fetch(
        'https://qrv0yuoh9l.execute-api.eu-north-1.amazonaws.com'
      );
      const data = await response.json();
      setMessage(data.message);
    };

    fetchMessage();
  }, []);

  return (
    <div>
      <h1>{message}</h1>
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
