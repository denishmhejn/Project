import React, { useEffect } from 'react';
import "../css/Header.css";
import search from '../images/search.png';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from './Services/apiService';

export default function Head() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Check if user is logged in

  useEffect(() => {
    if (token) {
      console.log('User is logged in');
    } else {
      console.log('User is not logged in');
    }
  }, [token]);

  const handleLogin = () => {
    navigate('/Login');
  };

  const handleSignup = () => {
    navigate('/Signup');
  };

  const handleLogout = async () => {
    try {
      // await logoutUser(); // Call the logout API
      localStorage.removeItem('token'); // Remove the token from localStorage
      localStorage.removeItem('user'); // Optionally remove user data
      navigate('/'); // Redirect to home page
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <header className="header">
      <Link to="/">
        <div className="header-logo">
          <span className="brand">ENTRANCE</span> <span className="highlight">GATEWAY</span>
        </div>
      </Link>
      <div className="header-search">
        <div className="search-container">
          <img src={search} alt="Search" className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="What do you want to learn"
          />
          <button className="search-button">Search Course</button>
        </div>
      </div>
      <div className="header-buttons">
        {token ? (
          <button className="btn btn-primary" onClick={handleLogout}>Log out</button>
        ) : (
          <>
            <button className="btn btn-outline-primary" onClick={handleLogin}>Log in</button>
            <button className="btn btn-primary" onClick={handleSignup}>Sign up</button>
          </>
        )}
      </div>
    </header>
  );
}