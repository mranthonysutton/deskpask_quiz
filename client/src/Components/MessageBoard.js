import { useEffect, useState } from 'react';
import Axios from '../Utils/useAxios';

const MessageBoard = () => {
  const [messages, SetMessages] = useState([]);

  useEffect(() => {
    Axios()
      .get('/message')
      .then((data) => SetMessages(data))
      .catch((error) => console.error(error.message));
  }, []);

  console.log(messages);

  return <h1>Message Board</h1>;
};

export default MessageBoard;
