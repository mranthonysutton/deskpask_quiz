import { useEffect, useState } from 'react';
import Axios from '../Utils/useAxios';

const MessageBoard = () => {
  const [messages, SetMessages] = useState([]);
  const [rendersMessages, setRendersMessages] = useState(false);

  useEffect(() => {
    Axios()
      .get('/message')
      .then((response) => {
        if (response.data.length > 0) {
          setRendersMessages(true);
        }

        SetMessages(response.data);
      })
      .catch((error) => console.error(error.message));
  }, []);

  return (
    <>
      <h3 className="text-4xl text-center text-blue-400 mb-4">Message Board</h3>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>Title</th>
            <th>Message</th>
            <th>Scheduled</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {rendersMessages &&
            messages.map((message) => {
              const formattedDate = new Date(message.date).toLocaleString();
              return (
                <tr key={message.ID}>
                  <td>{message.name}</td>
                  <td>{message.message}</td>
                  <td>{message.scheduled ? formattedDate : '-'}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default MessageBoard;
