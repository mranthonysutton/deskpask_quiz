import './App.css';
import Navbar from './Layout/Navbar';
import NewMessageForm from './Components/NewMessageForm';
import MessageBoard from './Components/MessageBoard';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto border border-slate-400 mt-4">
        <Routes>
          <Route path="/" element={<MessageBoard />} />
          <Route path="create/message" element={<NewMessageForm />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
