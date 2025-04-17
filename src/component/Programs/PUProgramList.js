import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../navBar';
import Banner from '../Banner';
import AdDisplayRight from '../AdDisplayRight';
import Footer from '../Footer';

const PUProgramList=()=>{
    const puPrograms = [
        { id: "1", name: "BCA (Bachelor of Computer Application)" },
        { id: "be-mechanical", name: "BE Mechanical (Bachelor of Engineering in Mechanical Engineering)" },
        { id: "bcis", name: "BCIS (Bachelor of Computer Information System)" },
        { id: "be-it", name: "BE IT (Bachelor of Engineering in Information Technology)" },
        { id: "bcsit", name: "BCSIT (Bachelor of Computer System and Information Technology)" },
        { id: "mca", name: "MCA (Master of Computer Application)" },
        { id: "be-electrical-electronics", name: "BE Electrical and Electronics (Bachelor of Engineering in Electrical and Electronics Engineering)" },
    ];
      const [currentPage, setCurrentPage] = useState(1);
      const itemsPerPage = 12;
      const totalPages = Math.ceil(puPrograms.length / itemsPerPage);
   
    
      // Get items for the current page
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = puPrograms.slice(indexOfFirstItem, indexOfLastItem);
    
      // Handle page changes
      const paginate = (pageNumber) => setCurrentPage(pageNumber);
      const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
      const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    return(
        <>
        <Navbar/>
        <Banner/>
        <div className="program-list-container">
            <input type="text" placeholder='Search Programs' className="search-bar" />
            <div className="content-wrapper">
                <div className="program-list-section">
                    <ul className="program-list">
                        {puPrograms.map((program, index)=>(
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
    )
    
}
export default  PUProgramList ;
