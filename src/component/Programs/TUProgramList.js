import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import '../../css/TUProgramList.css';
import Head from '../Head';
import Navbar from '../navBar';
import AdDisplayRight from '../AdDisplayRight'; // Import the AdDisplayRight component
import Footer from '../Footer';
import Banner from '../Banner';

const TUProgramList = () => {
  const programs = [
    { id: "1", name: "BCA (Bachelor of Computer Application)" },
    { id: "2", name: "BE Mechanical (BE in Mechanical Engineering)" },
    { id: "bim", name: "BIM (Bachelor of Information Management)" },
    { id: "bit", name: "BIT (Bachelor in Information Technology)" },
    { id: "bsc-csit", name: "BSc CSIT (BSc Computer Science and Information Technology)" },
    { id: "mca", name: "MCA (Master of Computer Application)" },
    { id: "be-electrical", name: "BE Electrical Electronic (Bachelor of Engineering in Electrical and Electronics Engineering)" },
  ];
  const [currentPage, setCurrentPage]=useState(1);
  const itemsPerPage=5;
  const totalPages=Math.ceil(programs.length/itemsPerPage);
  
  const indexOfLastItem=currentPage * itemsPerPage;
  const indexOfFirstItem= indexOfLastItem- itemsPerPage;
  const currentItems=programs.slice(indexOfFirstItem, indexOfLastItem);

  const paginate=(pageNumber)=>setCurrentPage(pageNumber);
  const nextPage=()=>setCurrentPage((prev)=>Math.min(prev+1,totalPages));
  const prevPage=()=>setCurrentPage((prev)=>Math.max(prev-1,1));

  return (
    <>
      
      <Navbar />
      <Banner />

      <div className="program-list-container">
        <input type="text" placeholder="Search Programs" className="search-bar" />
        <div className="content-wrapper">
          <div className="program-list-section">
            <ul className="program-list">
              {programs.map((program, index) => (
                <li key={index} className="program-item">
                  <Link to={`/program/${program.id}`} className="program-link"> {/* Use Link */}
                    {program.name}
                  </Link>
                </li>
              ))}
            </ul>
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
          <AdDisplayRight /> {/* AdDisplayRight aligned to the right */}
          
        </div>
        
      </div>
      <Footer/>
    </>
  );
};

export default TUProgramList;