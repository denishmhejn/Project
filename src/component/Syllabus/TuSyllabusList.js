import React from 'react'
import Navbar from '../navBar';
import AdDisplayRight from '../AdDisplayRight';
import "../../css/SyllabusList.css";
import { Link } from 'react-router-dom';
import Footer from '../Footer';


const SyllabusList = () => {
  const syllabus = [
    { id: "1", name: "BCA (Bachelor of Computer Application)" },
    { id: "2", name: "BE Mechanical (BE in Mechanical Engineering)" },
    { id: "bim", name: "BIM (Bachelor of Information Management)" },
    { id: "bit", name: "BIT (Bachelor in Information Technology)" },
    { id: "bsc-csit", name: "BSc CSIT (BSc Computer Science and Information Technology)" },
    { id: "mca", name: "MCA (Master of Computer Application)" },
    { id: "be-electrical", name: "BE Electrical Electronic (Bachelor of Engineering in Electrical and Electronics Engineering)" },
  ];

  return (
    <>
      
      <Navbar />
     

      <div className="syllabus-list-container">
        <input type="text" placeholder="Search syllabuss" className="search-bar" />
        <div className="content-wrapper">
          <div className="syllabus-list-section">
            <ul className="syllabus-list">
              {syllabus.map((syllabus, index) => (
                <li key={index} className="syllabus-item">
                  <Link to={`/syllabus/${syllabus.id}`} className="syllabus-link"> {/* Use Link */}
                    {syllabus.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="pagination">
              <span>Showing 1 to 100 of results</span>
              <div className="pagination-buttons">
                <button>1</button>
                <button>2</button>
                <button>3</button>
                <button>...</button>
                <button>100</button>
                <button>Next</button>
              </div>
            </div>
          </div>
          <AdDisplayRight /> {/* AdDisplayRight aligned to the right */}
          
        </div>
        
      </div>
      <Footer/>
    </>
  );
};

export default SyllabusList;