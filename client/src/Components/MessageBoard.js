import { useEffect, useState } from 'react';
import axios from 'axios';

const MessageBoard = () => {
  const [messages, SetMessages] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/api/v1/message')
      .then((data) => SetMessages(data))
      .catch((error) => console.error(error.message));
  }, []);

  console.log(messages);

  return <h1>Message Board</h1>;
};

export default MessageBoard;
