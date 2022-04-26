import { useEffect, useState } from 'react';

const MessageBoard = () => {
  const [messages, SetMessages] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/message')
      .then((res) => res.json())
      .then((data) => SetMessages(data))
      .catch((error) => console.error(error.message));
  }, []);

  console.log(messages);

  return <h1>Message Board</h1>;
};

export default MessageBoard;
