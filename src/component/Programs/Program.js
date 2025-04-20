import React, { useState } from "react";
import bca from "../../images/bca.png";
import AdLayout from "../AdLayout";
import "../../css/Program.css";
import Navbar from "../navBar";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const programs = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  title: `BCA - Bachelors in Computer Application ${i + 1}`,
  description:
    "BCA is an undergraduate degree program focused on computer science, software development, and IT. It typically covers subjects like programming languages, databases, web development, networking, and software engineering.",
  seats: "35 Students seats",
  duration: "4 years course",
  image: bca,
}));

const ProgramCard = ({ program, onClick }) => {
  return (
    <div className="program-card" onClick={onClick}> {/* Add onClick handler */}
      <img src={program.image} alt={program.title} className="program-image" />
      <div className="programs-details">
        <span>{program.seats}</span>
        <span>{program.duration}</span>
      </div>
      <div className="program-info">
        <h2 className="program-title">{program.title}</h2>
        <p className="program-description">{program.description}</p>
        <button className="program-button">More about it...</button>
      </div>
    </div>
  );
};

const Program = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const totalPages = Math.ceil(programs.length / itemsPerPage);
  const navigate = useNavigate(); // Initialize useNavigate

  // Get items for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = programs.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page changes
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  // Handle card click
  const handleCardClick = (programId) => {
    navigate(`/program/${programId}`); // Navigate to the program details page
  };

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
              onClick={() => handleCardClick(program.id)} // Pass onClick handler
            />
          ))}
        </div>

        {/* Pagination */}
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
      </div>
      <Footer />
    </>
  );
};

export default Program;