import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "../css/ProgramOffered.css";
import bca from "../images/bca.png"; // Replace with actual image URL

const programs = [
  {
    id: 1,
    title: "BCA - Bachelors in Computer Application",
    description:
      "BCA is an undergraduate degree program focused on computer science, software development, and IT. It typically covers subjects like programming languages, databases, web development, networking, and software engineering.",
    seats: "35 Students seats",
    duration: "4 years course",
    image: bca, // Replace with actual image URL
  },
  {
    id: 2,
    title: "BSc CSIT - Bachelor of Science in Computer Science and Information Technology",
    description:
      "BSc CSIT is a four-year undergraduate program that focuses on computer science, information technology, and software development. It covers topics like programming, algorithms, networking, and database management.",
    seats: "40 Students seats",
    duration: "4 years course",
    image: bca, // Replace with actual image URL
  },
  {
    id: 3,
    title: "BIM - Bachelor of Information Management",
    description:
      "BIM is a four-year undergraduate program that combines IT and management. It focuses on areas like software development, database management, and business administration.",
    seats: "30 Students seats",
    duration: "4 years course",
    image: bca, // Replace with actual image URL
  },
  {
    id: 4,
    title: "BBA - Bachelor of Business Administration",
    description:
      "BBA is a four-year undergraduate program that focuses on business administration, management, and entrepreneurship. It covers topics like marketing, finance, and human resources.",
    seats: "50 Students seats",
    duration: "4 years course",
    image: bca, // Replace with actual image URL
  },
  {
    id: 5,
    title: "MBA - Master of Business Administration",
    description:
      "MBA is a two-year postgraduate program that focuses on advanced business administration, leadership, and strategic management. It is designed for professionals seeking career advancement.",
    seats: "60 Students seats",
    duration: "2 years course",
    image: bca, // Replace with actual image URL
  },
  {
    id: 6,
    title: "MCA - Master of Computer Applications",
    description:
      "MCA is a three-year postgraduate program that focuses on advanced computer science, software development, and IT management. It is ideal for students seeking expertise in IT.",
    seats: "45 Students seats",
    duration: "3 years course",
    image: bca, // Replace with actual image URL
  },
];

export default function ProgramOffered() {
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  const handleExploreCourses = () => {
    navigate("/programOptions"); // Navigate to the program options page
  };

  const handleCardClick = (programId) => {
    navigate(`/program/${programId}`); // Navigate to the program details page
  };

  const visiblePrograms = showAll ? programs : programs.slice(0, 3);

  return (
    <div className="programs-container">
      <div className="program-header">
        <h1 className="title">
          Programs <span className="highlight">Offered</span>
        </h1>
        <p className="subtitle">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore veniam...
        </p>
      </div>
      <center>
        <div className="grid">
          {visiblePrograms.map((program, index) => (
            <div
              key={index}
              className="card"
              onClick={() => handleCardClick(program.id)} // Add click handler
            >
              <img src={program.image} alt="Program" className="card-image" />
              <div className="card-content">
                <div className="card-info">
                  <span>{program.seats}</span>
                  <span>{program.duration}</span>
                </div>
                <h3 className="program-card-title">{program.title}</h3>
                <p className="card-description">{program.description}</p>
                <button className="more-button">More about it...</button>
              </div>
            </div>
          ))}
        </div>
      </center>
      {!showAll && (
        <div className="explore-container">
          <button className="explore-button" onClick={handleExploreCourses}>
            Explore courses
          </button>
        </div>
      )}
    </div>
  );
}