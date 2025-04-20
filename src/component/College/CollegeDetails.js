import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../css/CollegeDetails.css";
import Navbar from "../navBar";
import AdLayout from "../AdLayout";
import Footer from "../Footer";

import { fetchCollegeById } from "../Services/apiService";

const CollegeDetails = () => {
  const { id } = useParams(); // Get the college ID from the URL
  const [college, setCollege] = useState(null);
  const [loading, setLoading]=useState(true);
  const [error, setError]=useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt]=useState(false);
  const navigate= useNavigate();

  // check if user is logged in ore not
  const isLoggedIn=localStorage.getItem('authToken') || localStorage.getItem('token');

  useEffect(()=>{
    const loadCollegeDetails=async()=>{
      try{
        const response=await fetchCollegeById(id);
        setCollege(response.data);
        setLoading(false);
      }catch (err){
        setError(err.response?.data?.message || err.message);
        setLoading(false);
        
      }
    };
    loadCollegeDetails();
  },[id]);

  const handleApplyClick=()=>{
    if(!isLoggedIn){
      setShowLoginPrompt(true);
      return;
    }
    setShowForm(true);
  };

  const handleNavigateToLogin=()=>{
    navigate('/Login',{state:{from:`/college/${id}`}});
    setShowLoginPrompt(false);
  };

  const closeAllModals=()=>{
    setShowForm(false);
    setShowLoginPrompt(false);
  };

  if(loading){
    return(
      <div className="loading-container">
        <p>Loading College details...</p>
      </div>
    );
  }
  if(error){
    return(
      <div className="error-container">
        <p>
          Error:{error}
        </p>
        <button onClick={()=>window.location.reload()}>Retry</button>
      </div>
    );
  }
  if(!college){
    return(
      <div className="not-found-container">
        <p>College not found</p>
      </div>
    );
  }
  return(
    <>
      <Navbar/>
      <AdLayout/>
      <div className="college-details-container">
        <div className="college-header">
          <img src={college.imageUrl || "default-college.png"}
           alt={college.name}
            className="college-image" 
            onError={(e)=>{e.target.src="/edfault-ceollege.png"; 
            }}
          />
          <h1>{college.name}</h1>
          <p>{college.university}</p>
          <p>{college.location || college.address}</p>
          <a 
            href={college.website} 
            target="_blank" 
            rel="noopener noreferrer"
            className="website-link"
          >
            {college.website}
          </a>
        </div>
        <div className="college-content">
          {college.description &&(
            <>
              <h2>About the College</h2>
              <p>{college.description}</p>
            </>
          )}
          {college.programs?.length>0&&(
            <>
              <h2>Offered programs</h2>
              <ul className="programs-list">
                {college.programs.map((program, index)=>(
                  <li key={index}>
                    <strong>{program.name}</strong>
                    {program.seats && ` - ${program.seats} Seats`}
                    {program.duration && ` (${program.duration})`}
                    {program.description && <p>{program.description}</p>}
                  </li>
                ))}
              </ul>
            </>
          )}
          {college.features?.length>0 &&(
            <>
              <h2>Key features</h2>
              <ul className="features-list">
                {college.features.map((feature, index)=>(
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </>
          )}
          {college.facilities &&(
            <>
              <h2>Facilities</h2>
              <p>{college.facilities}</p>
            </>
          )}
          {college.admissionProcess &&(
            <>
            <h2>Admission process</h2>
            <p>{college.admissionProcess}</p>
            </>
          )}
        </div>
        <button className="apply-button" onClick={handleApplyClick}>
          Apply Now
        </button>

        {/* Application Form  Modal */}
        <div className={`modal-overlay ${showForm ? 'show-form' : ''}`}>
          <div className="modal-content">
            <h2>Application Form</h2>
            <form>
              <label>
                Full Name:
                <input type="text" name="fullName" required />
              </label>
              <label>
                Email:
                <input type="email" name="email" required />
              </label>
              <label>
                Contact Number:
                <input type="tel" name="contact" required />
              </label>
              {college.programs?.length > 0 && (
                <label>
                  Program:
                  <select name="program" required>
                    {college.programs.map((program, index) => (
                      <option key={index} value={program.name}>
                        {program.name}
                      </option>
                    ))}
                  </select>
                </label>
              )}
              <div className="form-actions">
                <button type="submit">Submit Application</button>
                <button type="button" onClick={closeAllModals}>Cancel</button>
              </div>
            </form>
          </div>
        </div>

        {/* Login prompts */}
        <div className={`modal-overlay ${showLoginPrompt ? 'show-form':''}`}>
          <div className="modal-content">
            <div className="login-prompt">
              <h2>Login Required</h2>
              <p>You newd to logged in to access the application form.</p>
              <div className="prompt-actions">
                <button className="primary-btn" onClick={handleNavigateToLogin}>
                Go to Login
                </button>
                <button className="secondary-btn" onClick={closeAllModals}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdLayout/>
      <Footer/>
    </>
  );

};
export default CollegeDetails;
  