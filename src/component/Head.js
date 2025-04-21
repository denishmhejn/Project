import React, { useEffect, useState } from 'react';
import "../css/Header.css";
import search from '../images/search.png';
import { Link, useNavigate } from 'react-router-dom';
import { globalSearch, loginUser, logoutUser } from './Services/apiService';

export default function Head() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (token) {
      console.log('User is logged in');
    } else {
      console.log('User is not logged in');
    }
  }, [token]);
  const handleLogin = () => {
   
    navigate('/Login');
  };

  const handleSignup = () => {
    navigate('/Signup');
  };
  
  const handleLogout=async()=>{
    try{
      await logoutUser();
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/');
    }catch(error){
      console.error("Logout failed",error);
    }
  };
  const handleSearchChange=(e)=>{
    setSearchQuery(e.target.value);
  };
  const handleSearchSubmit=async(e)=>{
    e.preventDefault();
    if(!searchQuery.trim()) return;

    try{
      setIsSearching(true);
      const response=await globalSearch(searchQuery);
      setSearchResults(response.data);
      setShowResults(true);
    }catch(error){
      console.error('Search failed', error);
      setSearchResults([]);
    }finally{
      setIsSearching(false);
    }
  };
  const handleResultClick = (result) => {
    // Navigate to the appropriate page based on result type
    if (result.type === 'course') {
      navigate(`/course/${result.id}`);
    } else if (result.type === 'college') {
      navigate(`/college/${result.id}`);
    }
    setShowResults(false);
    setSearchQuery('');
  };

  const handleSearchBlur = () => {
    setTimeout(() => {
      setShowResults(false);
    }, 200);
  };

  const handleSearchFocus = () => {
    if (searchResults.length > 0) {
      setShowResults(true);
    }
  };
  return(
    <header className="header">
      <Link to="/">
        <div className="header-logo">
          <span className="brand">ENTRANCE</span> <span className="highlight">GATEWAY</span>
        </div>
      </Link>
      <div className="header-search">
        <form className="search-container" onSubmit={handleSearchSubmit}>
          {/* <img src={search} alt="Search" className="search-icon" /> */}
          <input
            type="text"
            className="search-input"
            placeholder="What do you want to learn"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
          />
          <button 
            type="submit" 
            className="header-search-button"
            disabled={isSearching}
          >
            {isSearching ? 'Searching...' : 'Search '}
          </button>
          {showResults && searchResults.length > 0 && (
            <div className="search-results-dropdown">
              {searchResults.map((result) => (
                <div
                  key={`${result.type}-${result.id}`}
                  className="search-result-item"
                  onClick={() => handleResultClick(result)}
                >
                  <div className="result-title">{result.title}</div>
                  <div className="result-type">{result.type}</div>
                </div>
              ))}
            </div>
          )}
        </form>
      </div>
      <div className="header-buttons">
        {token ? (
          <button className="btn btn-primary" onClick={handleLogout}>Log out</button>
        ) : (
          <>
            <button className="btn btn-outline-primary" onClick={handleLogin}>Log in</button>
            <button className="btn btn-primary" onClick={handleSignup}>Sign up</button>
          </>
        )}
      </div>
    </header>
  );
}
