import './App.css';
import TaskStates from './Context/TaskStates';
import Toastalert from './Components/Toastalert';
import Navbar from './Components/Navbar';
import { Routes, Route } from "react-router-dom";
import MainTask from "./Components/MainTask";
import Login from './Components/Login';
import Signup from './Components/Signup';

function App() {
  return (
    <>
    <TaskStates>
      <Navbar />
        <Toastalert />
        <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="*" element={<MainTask/>} />
        </Routes>
    </TaskStates>
    </>
  );
}

export default App;
