import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate} from 'react-router-dom';

export default function Navbar() {
  let navigate = useNavigate();

  const handleLogout = ()=>
  {
    localStorage.removeItem('token');
    navigate('/login', {replace:true});
  }

  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-green" style={{ background: 'linear-gradient(315deg, #5abe76 0%, #06247c 100%)' }}>
    <div className="container-fluid">
      <Link className="navbar-brand" to="/maintask">TODO App</Link>
        {localStorage.getItem('token') === null?
        <form className="d-flex" role="search">
        <Link to = "/login"><button className = " btn btn-primary mx -2">Login</button></Link>
        <Link to = "/signup"><button className = " btn btn-primary mx-2">Signup</button></Link>
        </form>
        :<button className='btn btn-primary mx-2' onClick={handleLogout}>Logout</button>}
    </div>
  </nav>
    </div>
  )
}
