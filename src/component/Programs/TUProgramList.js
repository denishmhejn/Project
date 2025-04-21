import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import '../../css/TUProgramList.css';
import Head from '../Head';
import Navbar from '../navBar';
import AdDisplayRight from '../AdDisplayRight'; // Import the AdDisplayRight component
import Footer from '../Footer';
import Banner from '../Banner';
import { fetchCoursesByAffiliation, searchCourses } from '../Services/apiService';

const TUProgramList = () => {
  const [programs, setPrograms] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  useEffect(()=>{
    const fetchPrograms=async ()=>{
      try{
        const response = await fetchCoursesByAffiliation('TU');
        setPrograms(response.data);
        setFilteredPrograms(response.data);
      }catch(err){
        setError(err.message);
        console.error("failed to fetch programs", err);
      }finally{
        setLoading(false);
      }
    };
    fetchPrograms();
  },[]);

  useEffect(()=>{
    const handleSearch= async()=>{
      if(searchTerm.trim()===''){
        const response= await fetchCoursesByAffiliation('TU');
        setFilteredPrograms(response.data);
        return;
      }
      try{
        const response=await searchCourses('TU', searchTerm);
        setFilteredPrograms(response.data);
        setCurrentPage(1);

      }catch(err){
        console.error("search failed",err);
      }
    };
    const timerId=setTimeout(()=>{
      handleSearch();
    },500);
    return()=>{
      clearTimeout(timerId);
    };
  },[searchTerm]);
  const totalPages = Math.ceil(filteredPrograms.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPrograms.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (loading) return <div className="program-list-container">Loading programs...</div>;
  if (error) return <div className="program-list-container">Error: {error}</div>;

  return(
    <>
      <Navbar/>
      <Banner/>
      <div className="program-list-container">
        <input type="text"
         className="search-bar" 
         placeholder='Search Programs'
         value={searchTerm}
         onChange={handleSearchChange}
        />
        <div className="content-wrapper">
          <div className="program-list-section">
          <ul className="program-list">
              {currentItems.map((program, index) => (
                <li key={program.id} className="program-item">
                  <Link to={`/program/${program.id}`} className="program-link">
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
  );
};
export default TUProgramList;