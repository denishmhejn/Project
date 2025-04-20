import React from 'react';
import "../css/Footer.css";
import Vector from "../images/Vector.png"; // Replace with actual image URL

export default function Footer() {
  return (
    <footer className="footer">
      <div className="newsletter">
        <p className="topic">Newsletter</p>
        <div className="mail-container">
          <img src={Vector} alt="Search" className="mail-icon" />
          <input
            type="text"
            className="mail-input"
            placeholder="Enter your email address to be stay updated"
          />
          <button className="search-button">Subscribe</button>
        </div>
      </div>

      <div className="columns">
        <div className="column">
          <h2>ENTRANCE GATEWAY</h2>
          <ul>
            <li>About</li>
            <li>Contents</li>
            <li>Events</li>
          </ul>
        </div>

        <div className="column">
          <h2>Contact</h2>
          <p>Address: Your Address Here</p>
          <p>Phone: +977 98XXXXXX</p>
          <p>Email: info@blog.com</p>
        </div>

        <div className="column">
          <h2>Useful Link</h2>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms & Condition</li>
            <li>FAQ</li>
          </ul>
        </div>

        <div className="column">
          <h2>Follow Us</h2>
          <ul>
            <li>Facebook</li>
            <li>Instagram</li>
            <li>Linkedin</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}