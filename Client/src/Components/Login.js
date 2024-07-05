// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useTask } from '../Context/TaskStates';
// export default function Login() {
//   const host = process.env.REACT_APP_HOST;
//     const [creds, setCreds] = useState({email:"" , password: ""});
//     const  [time, setTime] = useState(2);
//     let navigate = useNavigate();
//     const all = useTask();
//     const handleChange = (event)=>
//     {
//         setCreds({...creds, [event.target.name]: event.target.value});
//     }
//     const handleSubmit = async(e)=>
//     {
//         e.preventDefault();
//         const Login = await fetch(`${host}/user/login`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//               },
//             body: JSON.stringify({"email":creds.email, "password":creds.password})
//           });
//           const LoginStatus = await Login.json();
//           if(LoginStatus.success)
//           {
//             all.triggerToast("Login Successful");
//             localStorage.setItem('token', LoginStatus.authToken);
//             document.getElementById("goforhide").innerHTML = "";
//             document.getElementById("goforshow").style.display="block";
//             setInterval(() => {
//               setTime(time-1);
//             }, 1000);
//             setTimeout(()=>
//             {
//               navigate('/maintask', { replace: true });
//             }, 2000)
            
//           }
//           else
//           {
//             all.triggerToast("Invalid Credentials");
//           }
//     }
//   return (
//     <>
//     <div id = "goforshow" style ={{display:"none"}}><h4><strong><center>Redirecting to homepage in {time}</center></strong></h4></div>
//     <div className = "container" id = "goforhide">
//     <h1>Login to use TODO</h1>
//     <form onSubmit = {handleSubmit}>
//   <div className="mb-3">
//     <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
//     <input type="email"  value= {creds.email} onChange = {handleChange} name = "email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
//     <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
//   </div>
//   <div className="mb-3">
//     <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
//     <input type="password" value = {creds.password} onChange = {handleChange} name="password" className="form-control" id="exampleInputPassword1" />
//   </div>
//   <button type="submit" disabled ={creds.password.length<5 || creds.email.length<5?true:false} className="btn btn-primary">Submit</button>
//   <p>Note:Password and Emails should be atleast length of 5.</p>
// </form>
      
//     </div>
//     </>
//   )
// }
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTask } from '../Context/TaskStates';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import './Login.css'; // We'll create this file for custom styles

export default function Login() {
  const host = process.env.REACT_APP_HOST;
  const [creds, setCreds] = useState({ email: '', password: '' });
  const [time, setTime] = useState(2);
  let navigate = useNavigate();
  const all = useTask();

  const handleChange = (event) => {
    setCreds({ ...creds, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    all.setLoading(true);
    e.preventDefault();
    const Login = await fetch(`${host}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: creds.email, password: creds.password }),
    });
    all.setLoading(false);
    const LoginStatus = await Login.json();
    if (LoginStatus.success) {
      all.triggerToast('Login Successful');
      localStorage.setItem('token', LoginStatus.authToken);
      document.getElementById('goforhide').style.display = 'none';
      document.getElementById('goforshow').style.display = 'block';
      setInterval(() => {
        setTime(time - 1);
      }, 1000);
      setTimeout(() => {
        navigate('/maintask', { replace: true });
      }, 2000);
    } else {
      all.triggerToast('Invalid Credentials');
    }
  };

  return (
    <div className="login-container">
      <div id="goforshow" style={{ display: 'none' }} className="redirect-message">
        <h4>
          <strong>Redirecting to homepage in {time}</strong>
        </h4>
      </div>
      <div className="login-card" id="goforhide">
        <h1 className="login-title">Welcome Back!</h1>
        <p className="login-subtitle">Login to use TODO</p>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="exampleInputEmail1" className="form-label">
              <FaEnvelope className="input-icon" /> Email address
            </label>
            <input
              type="email"
              value={creds.email}
              onChange={handleChange}
              name="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1" className="form-label">
              <FaLock className="input-icon" /> Password
            </label>
            <input
              type="password"
              value={creds.password}
              onChange={handleChange}
              name="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            disabled={creds.password.length < 5}
            className="btn btn-primary btn-block"
          >
            Login
          </button>
          <p className="form-text text-muted mt-2">
            Note: Password should be at least 5 characters long.
          </p>
        </form>
      </div>
    </div>
  );
}