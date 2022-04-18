import './App.css';
import Navbar from './Layout/Navbar';
import NewMessageForm from './Components/NewMessageForm';

function App() {
  return (
    <div>
      <Navbar />
      <div class="container mx-auto border border-slate-400 mt-4">
        <NewMessageForm />
      </div>
    </div>
  );
}

export default App;
