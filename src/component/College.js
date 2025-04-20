import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/College.css";
import Navbar from "./navBar";
import AdLayout from "./AdLayout";
import Footer from "./Footer";
import { fetchColleges } from "./Services/apiService";

const College = () => {
  const [selectedDiscipline, setSelectedDiscipline] = useState("All");
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Available disciplines - you might want to get these from API too
  const disciplines = ["All", "Business", "Technology", "Engineering", "Management"];

  useEffect(() => {
    const loadColleges = async () => {
      try {
        const response = await fetchColleges();
        setColleges(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
        console.error("API Error:", err);
      }
    };

    loadColleges();
  }, []);

  const filteredColleges = selectedDiscipline === "All"
    ? colleges
    : colleges.filter(college => 
        college.disciplines?.includes(selectedDiscipline) || 
        college.discipline?.includes(selectedDiscipline)
      );

  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading colleges...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <AdLayout />
      <div className="college-container">
        <div className="filter-section">
          <label htmlFor="discipline-filter">Filter by Discipline:</label>
          <select
            id="discipline-filter"
            value={selectedDiscipline}
            onChange={(e) => setSelectedDiscipline(e.target.value)}
          >
            {disciplines.map((discipline) => (
              <option key={discipline} value={discipline}>
                {discipline}
              </option>
            ))}
          </select>
        </div>

        <div className="college-grid">
          {filteredColleges.length > 0 ? (
            filteredColleges.map((college) => (
              <Link 
                to={`/college/${college.id}`} 
                key={college.id}
                className="college-card-link"
              >
                <div className="college-card">
                  <div className="college-image-container">
                    <img
                      src={college.imageUrl || '/default-college.png'}
                      alt={college.name}
                      onError={(e) => {
                        e.target.src = '/default-college.png';
                      }}
                    />
                  </div>
                  <div className="college-info">
                    <h3>{college.name}</h3>
                    <p className="university">{college.university}</p>
                    <p className="location">{college.location || college.address}</p>
                    <div className="discipline-tags">
                      {(college.disciplines || [college.discipline]).map((d, i) => (
                        <span key={i} className="discipline-tag">{d}</span>
                      ))}
                    </div>
                    <a 
                      href={college.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="website-link"
                    >
                      Visit Website
                    </a>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="no-results">
              <p>No colleges found matching your criteria</p>
            </div>
          )}
        </div>
      </div>
      <AdLayout />
      <Footer />
    </>
  );
};

export default College;