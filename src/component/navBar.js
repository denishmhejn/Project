import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu visibility

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu visibility
  };

  return (
    <nav className="navbar">
      {/* Hamburger Icon */}
      <div className="hamburger-icon" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      {/* Navbar Menu */}
      <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
        <li className="dropdown">
          <Link to="/College">Colleges</Link>
        </li>
        <li className="dropdown">
          <span>Programs</span>
          <div className="dropdown-content">
            <Link to="/tuProgramList">Tu Program</Link>
            <Link to="/kuProgramList">KU Program</Link>
            <Link to="/purProgramList">PU Program</Link>
            <Link to="/puProgramList">PU (Pokhara) Program</Link>
          </div>
        </li>
        <li className="dropdown">
          <span>University</span>
          <div className="dropdown-content">
            <Link to="/tribhuwan-university">Tribhuwan University</Link>
            <Link to="/kathmandu-university">Kathmandu University</Link>
            <Link to="/pokhara-university">Pokhara University</Link>
            <Link to="/purbanchal-university">Purbanchal University</Link>
          </div>
        </li>
        <li>
          <Link to="/syllabus">Syllabus</Link>
        </li>
        <li className="dropdown">
          <span>Resources</span>
          <div className="dropdown-content">
            <Link to="/notes">Notes</Link>
            <Link to="/blogs">Blogs</Link>
          </div>
        </li>
        <li>
          <Link to="/training-courses">Training/Courses</Link>
        </li>
      </ul>
    </nav>
  );
}