import React, { useState, useEffect } from 'react';
import Navbar from '../navBar';
import AdDisplayRight from '../AdDisplayRight';
import "../../css/SyllabusList.css";
import { Link } from 'react-router-dom';
import Footer from '../Footer';
import { fetchSyllabus, searchSyllabus } from '../Services/apiService';

const SyllabusList = () => {
  const [syllabus, setSyllabus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const itemsPerPage = 10;

  // Debounce function to limit API calls
  const debounce = (func, delay) => {
    let timeoutId;
    return function(...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  };

  useEffect(() => {
    const loadInitialSyllabus = async () => {
      try {
        const response = await fetchSyllabus();
        setSyllabus(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
        console.error("Error fetching syllabus:", err);
      }
    };

    loadInitialSyllabus();
  }, []);

  // Search API call with debouncing
  useEffect(() => {
    const search = async () => {
      if (!searchTerm.trim()) {
        // If search term is empty, fetch all syllabuses
        try {
          const response = await fetchSyllabus();
          setSyllabus(response.data);
        } catch (err) {
          console.error("Error fetching syllabus:", err);
        }
        return;
      }

      setIsSearching(true);
      try {
        const response = await searchSyllabus(searchTerm);
        setSyllabus(response.data);
        setCurrentPage(1); // Reset to first page when searching
      } catch (err) {
        console.error("Error searching syllabus:", err);
      } finally {
        setIsSearching(false);
      }
    };

    const debouncedSearch = debounce(search, 500);
    debouncedSearch();

    return () => {
      // Cleanup function to cancel any pending searches
      clearTimeout(debouncedSearch.timeoutId);
    };
  }, [searchTerm]);

  // Filter syllabus based on search term (client-side fallback)
  const filteredSyllabus = syllabus.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredSyllabus.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSyllabus.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading syllabus...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="syllabus-list-container">
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search syllabus..." 
            className="search-bar" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {isSearching && (
            <div className="search-loading">
              <div className="spinner"></div>
            </div>
          )}
        </div>
        
        <div className="content-wrapper">
          <div className="syllabus-list-section">
            {currentItems.length > 0 ? (
              <>
                <ul className="syllabus-list">
                  {currentItems.map((item) => (
                    <li key={item.id} className="syllabus-item">
                      <Link to={`/syllabus/${item.id}`} className="syllabus-link">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                
                <div className="pagination">
                  <span>
                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredSyllabus.length)} of {filteredSyllabus.length} results
                  </span>
                  <div className="pagination-buttons">
                    <button 
                      onClick={prevPage} 
                      disabled={currentPage === 1}
                      className="pagination-button"
                    >
                      Prev
                    </button>
                    
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNumber;
                      if (totalPages <= 5) {
                        pageNumber = i + 1;
                      } else if (currentPage <= 3) {
                        pageNumber = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNumber = totalPages - 4 + i;
                      } else {
                        pageNumber = currentPage - 2 + i;
                      }
                      
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => paginate(pageNumber)}
                          className={`pagination-button ${currentPage === pageNumber ? 'active' : ''}`}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}
                    
                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <span className="pagination-ellipsis">...</span>
                    )}
                    
                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <button
                        onClick={() => paginate(totalPages)}
                        className={`pagination-button ${currentPage === totalPages ? 'active' : ''}`}
                      >
                        {totalPages}
                      </button>
                    )}
                    
                    <button 
                      onClick={nextPage} 
                      disabled={currentPage === totalPages}
                      className="pagination-button"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="no-results">
                <p>No syllabus found {searchTerm ? `matching "${searchTerm}"` : ''}</p>
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')} 
                    className="clear-search-button"
                  >
                    Clear search
                  </button>
                )}
              </div>
            )}
          </div>
          <AdDisplayRight />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SyllabusList;