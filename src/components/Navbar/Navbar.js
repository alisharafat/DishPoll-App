import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import { IoFastFood } from 'react-icons/io5';

const Navbar = () => {
  
  const navigate = useNavigate();
  const currentUser = window.localStorage.getItem('currentUser');

  const logoutUserHandler = () => {
    window.localStorage.removeItem('currentUser');
    navigate('/login');
  }
  return (
    <nav>
      <ul>
        <li><span><IoFastFood/></span>React Foods</li>
        <li><Link to="/dishes">All Dishes</Link></li>
        <li><Link to="/leaderboard">Leaderboard</Link></li>
        {!currentUser && <li><Link to="/login">Login</Link></li>}
        {currentUser && <li onClick={logoutUserHandler}><button>Logout</button></li>}
      </ul>
    </nav>
  )
}

export default Navbar;