import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Teams from './pages/Teams';
import TeamDetails from './pages/TeamDetails';
import Messages from './pages/Messages';
import KanbanBoard from './pages/KanbanBoard';
// import ChatBox from "./components/ChatBox"; // Optional if not using here

function App() {
  const senderId = "685d175d44af0c1684e19866"; // Replace with actual ObjectId
  const receiverId = "685d178c44af0c1684e19868";

  return (
    <>
      {/* ChatBox can be added inside specific routes like /messages if needed */}
      {/* <ChatBox senderId={senderId} receiverId={receiverId} /> */}

      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/teams/:teamId" element={<TeamDetails />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/tasks" element={<KanbanBoard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
