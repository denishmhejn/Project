import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import AdDisplayRight from '../AdDisplayRight';
import Footer from '../Footer';
import Navbar from '../navBar';
import Banner from '../Banner';

const KUProgramList=()=>{
    const kuPrograms = [
        { id: "bit", name: "BIT (Bachelor in Information Technology)" },
        { id: "be-mechanical", name: "BE Mechanical (BE in Mechanical Engineering)" },
        { id: "bbis", name: "BBIS (Bachelor of Business Information Systems)" },
        { id: "bsc-cs", name: "BSc CS (BSc in Computer Science)" },
        { id: "be-electrical", name: "BE Electrical Electronics (Bachelor of Engineering in Electrical and Electronics Engineering)" },
        { id: "mse-computer", name: "MSE Computer (Master of Science in Computer Engineering)" },
    ];
      const [currentPage, setCurrentPage] = useState(1);
      const itemsPerPage = 12;
      const totalPages = Math.ceil(kuPrograms.length / itemsPerPage);
      
    
      // Get items for the current page
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = kuPrograms.slice(indexOfFirstItem, indexOfLastItem);
    
      // Handle page changes
      const paginate = (pageNumber) => setCurrentPage(pageNumber);
      const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
      const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
return(
    <>
    <Navbar/>
    <Banner/>
    <div className="program-list-container">
        <input type="text" placeholder='Search Program' className="search-bar" />
        <div className="content-wrapper">
            <div className="program-list-section">
                <ul className="program-list">
                    {kuPrograms.map((program, index)=>(
                        <li key={index} className="program-item">
                            <Link to={`/program/${program.id}`} className='program-link'>
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
            <AdDisplayRight/>
        </div>
    </div>
    <Footer/>
    </>
 
) ;  
};

export default  KUProgramList;
  
