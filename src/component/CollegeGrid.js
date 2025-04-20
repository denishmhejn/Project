import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../css/CollegeGrid.css";
import acem from "../images/acem.png"; // Example image
import instagramIcon from "../images/instagram.png"; // Example icon
import linkedinIcon from "../images/linkedin.png"; // Example icon
import { fetchColleges } from "./Services/apiService";


const CollegeGrid=()=>{
  const [colleges, setColleges]=useState([]);
  const[loading, setLoading]=useState(true);
  const [error, setError]=useState(null);
  const [showMore, setShowMore]=useState(false);
  const navigate=useNavigate();

  useEffect(()=>{
    const loadColleges=async()=>{
      try{
        const response=await fetchColleges();
        setColleges(response.data);
        setLoading(false);
      }catch(err){
        setError(err.response?.data?.message || err.message);
        setLoading(false);
        console.error("error fetching colleges",err);
      }
    };
    loadColleges();
  },[]);

  const handleSeeMore=()=>{
    navigate('/College')
  };
  
  const handleCardClick=(collegeID)=>{
    navigate(`/college/${collegeID}`);
  };

  const visibleColleges= showMore? colleges: colleges.slice(0,3);

  if (loading) {
    return (
      <div className="collegebody">
        <div className="loading-message">Loading colleges...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="collegebody">
        <div className="error-container">
          Error: {error}
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return(
    <div className="collegebody">
      <div className="grid-container">
        <h1 className="title">Colleges In Nepal</h1>
        <p className="text">
          See the Colleges available in Nepal. Maybe some could grab your interest.
        </p>
        <div className="card-container">
          {visibleColleges.map((college)=>(
            <div className="card"
              key={college.id}
              onClick={()=>handleCardClick(college.id)}
            >
              <div className="image-container">
                <img src={college.imageUrl || "/default-college.png"}
                 alt={college.name}
                 className="college-image"
                 onError={(e)=>{
                  e.target.src="/default-college.png";
                 }} 
                />
              </div>
              <div className="college-info">
                <h2 className="college-name">{college.name}</h2>
                <p className="college-location">{college.location || college.address}</p>
                <p className="college-description">
                  {college.description || `${college.name} is a renowned institution in Nepal`}
                </p>
                <div className="college-meta">
                  <a href={college.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="college-webaite"
                  >
                    Visit website
                  </a>
                  <div className="social-links">
                    {college.socialLinks ?.map((link, index)=>(
                      <a href={link.url}
                        key={index}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                      >
                        <span className={`social-icon${link.platform}`}>
                        {link.platform === 'instagram' && <i className="fab fa-instagram"></i>}
                          {link.platform === 'facebook' && <i className="fab fa-facebook"></i>}
                          {link.platform === 'linkedin' && <i className="fab fa-linkedin"></i>}
                          {link.platform === 'twitter' && <i className="fab fa-twitter"></i>}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
        {!showMore && colleges.length>3 &&(
          <button className="see-more-button" onClick={handleSeeMore}>
            See More
          </button>
        )}

      </div>
    </div>
  );
};
export default CollegeGrid;