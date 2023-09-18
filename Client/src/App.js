import './App.css';
import Toastalert from './Components/Toastalert';
import Navbar from './Components/Navbar';
import { Routes, Route } from "react-router-dom";
import MainTask from "./Components/MainTask";
import Login from './Components/Login';
import Signup from './Components/Signup';
import Loading from './Components/Loading';
import { useTask } from './Context/TaskStates';
function App() {
  const {loading} = useTask();
  return (
    <>
      <Navbar />
      {loading && <Loading />}
        <Toastalert />
        <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="*" element={<MainTask/>} />
        </Routes>
    </>
  );
}

export default App;
