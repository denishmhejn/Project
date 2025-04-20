import React from 'react'
import Puback from '../../images/Puback.jpeg';
import Pufront from '../../images/Pufront.png';
import Footer from '../Footer';
import Navbar from '../navBar';
import '../../css/University/University.css';
import { useNavigate } from 'react-router-dom';

const PuUniversityDetails = () => {
    const navigate=useNavigate();
    const handleOnClick=()=>{
        navigate('/puProgramList');
    }
    return(
        <>
        <Navbar/>
            <div className="university-details">
                <div className="content">
                    <div className="images">
                        <img src={Puback} alt="University-background" className='background-image' />
                        <img src={Pufront} alt="University front" className='front-image' />
                    </div>
                    <div className="description">
                        <p>Pokhara University (PU) was established in 1997 AD as Nepal’s fifth university. It is a non-profit autonomous institution located in Lekhnath, Kaski. The university has a vision to become a world-class university that is committed to academic excellence, innovation, and entrepreneurship. PU aims to produce skilled human resources that can contribute to the nation’s development. The university offers various undergraduate, graduate, and postgraduate programs in various disciplines.</p>
                    </div>
                    <div className="executive-council">
                        <h2>Executive Council of Pokhara University:</h2>
                        <ul>
                            <li>Chancellor: Rt. Hon. Prime Minister KP Sharma Oli</li>
                            <li>Pro Chancellor: Hon. Minister for Education, Science, and Technology</li>
                            <li>Vice-Chancellor: Prof. Dr. Prem Narayan Aryal</li>
                            <li>Registrar: Dr. Purna Bahadur Khadka</li>
                            <li>Phone: 061-504046</li>
                            <li>Fax: 061-504046</li>
                            <li>Email:info@pu.edu.np</li>
                        </ul>
                    </div>
                    <div className="councils">
                        <h2>Pokhara University operates under the guidance of several councils and bodies responsible for decision-making and policy formulation:</h2>
                        <ol>
                            <li>University Council: The highest governing body that oversees academic programs, budgets, affiliations, and policy formation.</li>
                            <li>Executive Council: Implements University Council decisions, manages finances, appoints personnel, and drafts regulations.</li>
                            <li>Academic Council: Responsible for academic policies, curricula, teaching standards, examinations, and research guidelines.</li>
                            <li>Research Committee: Coordinates research activities, approves guidelines for researchers, and oversees university-level research organizations.</li>
                            <li>Planning Council: Develops long and short-term plans for the university, evaluates implementation programs, and monitors progress.</li>
                        </ol>
                    </div>
                    <div className="faculties">
                        <h2>Faculties at Pokhara University:</h2>
                        <ul>
                            <li>Faculty of Science and Technology</li>
                            <li>Faculty of Management Studies</li>
                            <li>Faculty of Humanities and Social Sciences</li>
                            <li>Faculty of Health Sciences</li>
                            <li>Faculty of Engineering</li>
                        </ul>
                    </div>
                    <div className="institutes">
                        <h2>Instituites at Pokhara University</h2>
                        <ul>
                            <li>Engineering</li>
                            <li>Management</li>
                            <li>Health Sciences</li>
                            <li>Development Studies</li>
                            <li>Science and Technology</li>
                        </ul>
                    </div>
                    <button onClick={handleOnClick} className="university-button">See Programs</button>
                </div>
            </div>
            
            <Footer/>
        </>
    );
};

export default  PuUniversityDetails;