import './App.css';
import Navbar from './Layout/Navbar';
import NewMessageForm from './Components/NewMessageForm';
import MessageBoard from './Components/MessageBoard';
import MessageBanner from './Components/MessageBanner';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

function App() {
  const [isBannerHidden, setIsBannerHidden] = useState(true);
  const socketUrl = 'ws://localhost:8080/ws';
  var client = new W3CWebSocket(socketUrl);

  client.onmessage = (message) => {
    JSON.parse(message.data);

    setIsBannerHidden(false);

    // Sets the amount of time the banner is displayed for 2.5 seconds
    setTimeout(() => {
      setIsBannerHidden(true);
    }, 2500);
  };

  client.onerror = (error) => {
    console.error('ERROR:', error);
  };

  return (
    <div>
      <Navbar />
      <MessageBanner showBanner={isBannerHidden} />
      <div className="container mx-auto border border-slate-400 mt-4">
        <Routes>
          <Route path="/" element={<MessageBoard />} />
          <Route
            path="create/message"
            element={<NewMessageForm client={client} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
