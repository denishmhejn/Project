import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/ProgramOffered.css";
import bca from "../images/bca.png"; // Default image
import { fetchCourses } from './Services/apiService';


export default function ProgramOffered() {
  const [programs, setPrograms] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProgramData = async () => {
      try {
        const response = await fetchCourses();
        // Transform API data to match your expected format
        const formattedPrograms = response.data.map(course => ({
          id: course._id || course.id,
          title: course.name || course.title || `Program ${course._id}`,
          description: course.description || "No description available",
          seats: course.seats ? `${course.seats} Students seats` : "Seats not specified",
          duration: course.duration || "Duration not specified",
          image: course.imageUrl || bca // Use default image if none provided
        }));
        setPrograms(formattedPrograms);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch programs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProgramData();
  }, []);

  const handleExploreCourses = () => {
    navigate("/programOptions");
  };

  const handleCardClick = (programId) => {
    navigate(`/program/${programId}`);
  };

  const visiblePrograms = showAll ? programs : programs.slice(0, 3);

  if (loading) return <div className="programs-container">Loading programs...</div>;
  if (error) return <div className="programs-container">Error: {error}</div>;

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
              key={program.id} // Using program.id instead of index for better React reconciliation
              className="card"
              onClick={() => handleCardClick(program.id)}
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
      {!showAll && programs.length > 3 && (
        <div className="explore-container">
          <button className="explore-button" onClick={handleExploreCourses}>
            Explore courses
          </button>
        </div>
      )}
    </div>
  );
}