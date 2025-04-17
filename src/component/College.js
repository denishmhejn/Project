import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/College.css";
import Navbar from "./navBar";
import AdLayout from "./AdLayout";
import Footer from "./Footer";
import acem from "../images/acem.png";


export const colleges = [
  {
    id: 1,
    name: "Advance College of Engineering & Management",
    university: "Tribhuvan University",
    address: "Kalanki, Kathmandu, Nepal",
    image: acem,
    discipline: "Technology",
    website: "https://acem.edu.np",
  },
  
    {
      "id": 2,
      name: "Nepal Engineering College",
      university: "Pokhara University",
      address: "Changunarayan, Bhaktapur, Nepal",
      image: acem,
      discipline: "Engineering, Technology",
      website: "https://www.nec.edu.np/"
    },
    {
      id: 3,
      name: "The British College",
      university: "Pokhara University",
      address: "Kathmandu, Nepal",
      image: acem,
      discipline: "Business, Information Technology, Professional Courses",
      website: "https://www.collegesnepal.com/foreign-university-affiliated-colleges-and-courses-in-nepal/"
    },
    {
      id: 4,
      name: "Kathmandu University School of Management (KUSOM)",
      university: "Kathmandu University",
      address: "Balkumari, Lalitpur, Nepal",
      image: acem,
      discipline: "Management",
      website: "https://www.collegesnepal.com/mba/"
    },
    {
      id: 5,
      name: "Orchid International College",
      university: "Purbanchal University",
      address: "Kathmandu, Nepal",
      image: acem,
      discipline: "Business Administration",
      website: "https://www.collegesnepal.com/mba/"
    }
  
  
  // Add other colleges here
];

const disciplines = ["All", "Business", "Technology", "Engineering"];

const College = () => {
  const [selectedDiscipline, setSelectedDiscipline] = useState("All");

  const filteredColleges =
    selectedDiscipline === "All"
      ? colleges
      : colleges.filter((college) => college.discipline === selectedDiscipline);

  return (
    <>
      <Navbar />
      <AdLayout />
      <div className="college-container">
        <div className="filter-section">
          <label htmlFor="discipline">Discipline:</label>
          <select
            id="discipline"
            value={selectedDiscipline}
            onChange={(e) => setSelectedDiscipline(e.target.value)}
          >
            {disciplines.map((discipline, index) => (
              <option key={index} value={discipline}>
                {discipline}
              </option>
            ))}
          </select>
        </div>
        <div className="college-grid">
          {filteredColleges.map((college, index) => (
            <Link to={`/college/${college.id}`} key={college.id}>
              <div className="college-card">
                <img src={college.image} alt={college.name} className="college-image" />
                <div className="college-info">
                  <h3>{college.name}</h3>
                  <p>{college.university}</p>
                  <p>{college.address}</p>
                  <a href={`https://${college.website}`} target="_blank" rel="noopener noreferrer">
                    {college.website}
                  </a>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <AdLayout />
      <Footer/>
    </>
  );
};

export default College;