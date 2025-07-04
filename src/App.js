import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Teams from './pages/Teams';
import TeamDetails from './pages/TeamDetails';
import Messages from './pages/Messages';
import KanbanBoard from './pages/KanbanBoard';
import AllUsers from "./pages/AllUsers";// import ChatBox from "./components/ChatBox"; // Optional if not using here
import Signup from './pages/Signup';

function App() {
  const senderId = "..."; 
  const receiverId = "...";

  return (
    
    <>
      {/* ChatBox can be added inside specific routes like /messages if needed */}
      {/* <ChatBox senderId={senderId} receiverId={receiverId} /> */}

      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/teams/:teamId" element={<TeamDetails />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/tasks" element={<KanbanBoard />} />
          <Route path="/users" element={<AllUsers />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
    
  );
}

export default App;
