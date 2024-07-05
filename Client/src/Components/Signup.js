import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTask } from '../Context/TaskStates';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa'; // Import icons for name, email, and password fields
import './Signup.css'; // Create this file for custom styles

export default function Signup() {
  const host = process.env.REACT_APP_HOST;
  const [creds, setCreds] = useState({ name: '', email: '', password: '' });
  const [time, setTime] = useState(2);
  const navigate = useNavigate();
  const all = useTask();

  const handleChange = (event) => {
    setCreds({ ...creds, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    all.setLoading(true);
    e.preventDefault();
    const signup = await fetch(`${host}/user/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: creds.name, email: creds.email, password: creds.password }),
    });
    all.setLoading(false);
    const signupStatus = await signup.json();
    if (signupStatus.success) {
      all.triggerToast('Signup Successful');
      document.getElementById('goforhide').style.display = 'none';
      document.getElementById('goforshow').style.display = 'block';
      setInterval(() => {
        setTime(time - 1);
      }, 1000);
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 2000);
    } else {
      all.triggerToast('Signup Failed.');
    }
  };

  return (
    <div className="signup-container">
      <div id="goforshow" style={{ display: 'none' }} className="redirect-message">
        <h4>
          <strong>Signup Successful. Redirecting to Login page in {time}</strong>
        </h4>
      </div>
      <div className="signup-card" id="goforhide">
        <h1 className="signup-title">Sign Up for TODO APP</h1>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="exampleInputName" className="form-label">
              <FaUser className="input-icon" /> Name
            </label>
            <input
              type="text"
              value={creds.name}
              onChange={handleChange}
              name="name"
              className="form-control"
              id="exampleInputName"
              aria-describedby="nameHelp"
              placeholder="Enter your name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail" className="form-label">
              <FaEnvelope className="input-icon" /> Email address
            </label>
            <input
              type="email"
              value={creds.email}
              onChange={handleChange}
              name="email"
              className="form-control"
              id="exampleInputEmail"
              aria-describedby="emailHelp"
              placeholder="Enter your email"
            />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword" className="form-label">
              <FaLock className="input-icon" /> Password
            </label>
            <input
              type="password"
              value={creds.password}
              onChange={handleChange}
              name="password"
              className="form-control"
              id="exampleInputPassword"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            disabled={creds.name.length < 3 || creds.password.length < 5}
            className="btn btn-primary btn-block"
          >
            Submit
          </button>
          <p className="form-text text-muted mt-2">
            Note: Password should be at least 5 characters long and Name should be at least 3 characters long.
          </p>
        </form>
      </div>
    </div>
  );
}
