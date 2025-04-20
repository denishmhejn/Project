import React from 'react';
import '../../css/University/University.css';
import Tuback from '../../images/Tuback.png'; // Background image
import Tufront from '../../images/Tufront.png'; // Front image
import Navbar from '../navBar';
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';



const TuUniversityDetails = () => {
  const navigate=useNavigate();
  const handleOnClick = () => {
  navigate('/tuProgramList');
  } ;
  return (
    <>
    <Navbar/>
    <div className="university-details">
      <div className="content">
        {/* Image Section */}
        <div className="images">
          <img src={Tuback} alt="University Background" className="background-image" />
          <img src={Tufront} alt="University Front" className="front-image" />
        </div>

        {/* Description Section */}
        <div className="description">
          <p>
            Tribhuvan University, widely known as TU, was established in 1959 AD. It is located in Kirtipur, just 5 km away from Kathmandu, the capital city of Nepal. TU is the first university in Nepal and the largest university in the country, offering more than 4,400 courses at various levels. The university has over 1,000 affiliated colleges nationwide.
          </p>
        </div>

        {/* Executive Council Section */}
        <div className="executive-council">
          <h2>Executive Council of Tribhuvan University:</h2>
          <ul>
            <li>Chancellor: Rt. Hon. Prime Minister KP Sharma Oli</li>
            <li>Pro Chancellor: Hon. Minister for Education, Science, and Technology</li>
            <li>Vice-Chancellor: Prof. Dr. Dharma Kanta Baskota</li>
            <li>Registrar: Dr. Peshal Dahal</li>
            <li>Phone: 01-4330847</li>
            <li>Fax: 01-4330847</li>
            <li>Email:info@tu.edu.np</li>

          </ul>
        </div>

        {/* Councils Section */}
        <div className="councils">
          <h2>The decisions for Tribhuvan University are made by the following councils:</h2>
          <ol>
            <li>University Council: The university council assembles decisions on policies, budget, rules, and regulations for running the university. It also helps in the formation of special committees and commissions.</li>
            <li>Executive Council: The executive council makes decisions on grants, affiliation to private campuses, and appointment of the university by executing the decisions of the university council.</li>
            <li>Academic Council: The academic council is responsible for maintaining decisions on educational policies and practices. It takes responsibility for curricula, teaching, examination, and research.</li>
            <li>Research Coordination Council: The research coordination council plays a vital role in making policies on TU research activities, approves guidelines for researchers, and coordinates the functions of university-level research organizations.</li>
            <li>Planning Council: The planning council develops long and short-term plans for the university. It is responsible for developing annual programs and evaluating implementation programs.</li>
          </ol>
        </div>

        {/* Faculties Section */}
        <div className="faculties">
          <h2>Faculties at Tribhuvan University:</h2>
          <ul>
            <li>Faculty of Humanities and Social Sciences</li>
            <li>Faculty of Management</li>
            <li>Faculty of Education</li>
            <li>Faculty of Law</li>
            <li>Faculty of Engineering</li>
          </ul>
        </div>

        {/* Institutes Section */}
        <div className="institutes">
          <h2>Institutes at Tribhuvan University:</h2>
          <ul>
            <li>Institute of Agriculture and Animal Science</li>
            <li>Institute of Forestry</li>
            <li>Institute of Medicine</li>
            <li>Institute of Engineering</li>
            <li>Institute of Science and Technology</li>
          </ul>
        </div>
        <button onClick={handleOnClick} className='university-button'>See Programs</button>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default TuUniversityDetails;