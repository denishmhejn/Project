import React, { useState, useEffect } from "react";
import bca from "../../images/bca.png";
import AdLayout from "../AdLayout";
import "../../css/Program.css";
import Navbar from "../navBar";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import { fetchCourses } from "../Services/apiService";


const ProgramCard = ({ program, onClick }) => {
  return (
    <div className="program-card" onClick={onClick}>
      <img 
        src={program.image || bca} // Use default image if none provided
        alt={program.title} 
        className="program-image" 
      />
      <div className="programs-details">
        <span>{program.seats || "Seats not specified"}</span>
        <span>{program.duration || "Duration not specified"}</span>
      </div>
      <div className="program-info">
        <h2 className="program-title">{program.title}</h2>
        <p className="program-description">{program.description || "No description available"}</p>
        <button className="program-button">More about it...</button>
      </div>
    </div>
  );
};

const Program = () => {
  const [programs, setPrograms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 12;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetchCourses();
        // Transform API data to match your expected format
        const formattedPrograms = response.data.map(course => ({
          id: course._id || course.id,
          title: course.name || course.title || `Course ${course._id}`,
          description: course.description || "No description available",
          seats: course.seats ? `${course.seats} Students seats` : "Seats not specified",
          duration: course.duration || "Duration not specified",
          image: course.imageUrl // API might provide image URL
        }));
        setPrograms(formattedPrograms);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch programs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  // Get items for the current page
  const totalPages = Math.ceil(programs.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = programs.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page changes
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  // Handle card click
  const handleCardClick = (programId) => {
    navigate(`/program/${programId}`);
  };

  if (loading) return <div className="program-container">Loading programs...</div>;
  if (error) return <div className="program-container">Error: {error}</div>;

  return (
    <>
      <Navbar />
      <AdLayout />
      <div className="program-container">
        <h1 className="program-heading">Programs Offered</h1>
        <div className="programs-list">
          {currentItems.map((program) => (
            <ProgramCard
              key={program.id}
              program={program}
              onClick={() => handleCardClick(program.id)}
            />
          ))}
        </div>

        {/* Pagination - only show if we have programs */}
        {programs.length > 0 && (
          <div className="pagination">
            <button onClick={prevPage} disabled={currentPage === 1}>
              &laquo; Prev
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={currentPage === i + 1 ? "active" : ""}
              >
                {i + 1}
              </button>
            ))}
            <button onClick={nextPage} disabled={currentPage === totalPages}>
              Next &raquo;
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Program;