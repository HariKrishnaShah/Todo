import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter} from "react-router-dom";
import TaskStates from './Context/TaskStates';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <TaskStates>
    <App />
    </TaskStates>
    </BrowserRouter> 
  </React.StrictMode>
);


