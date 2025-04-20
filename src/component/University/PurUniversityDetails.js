import React from 'react'
import purback from '../../images/purback.jpg';
import purfront from '../../images/purfront.png';
import Footer from '../Footer';
import Navbar from '../navBar';
import { useNavigate } from 'react-router-dom';

const PurUniversityDetails = () => {
    const navigate =useNavigate();
    const handleOnClick=()=>{
        navigate('/purProgramList');
    };
    return(
        <>
        <Navbar/>
            <div className="university-details">
                <div className="content">
                    <div className="images">
                        <img src={purback} alt="" className="background-image" />
                        <img src={purfront} alt="" className="front-image" />
                    </div>
                    <div className="description">
                        <p>The establishment of Purbanchal University in 1993 was visualized as an extraordinary endeavour by the Government of Nepal to create an academic centre of excellence in the Eastern Development Region of Nepal. Its prime role was outlined to act as a catalytic agent for the promotion of socio-economic transformation in Nepal through quality education appropriate for quality life and sustainable future. Since its establishment, the university is motivated by its fundamental objective of preserving, refining, inventing, adopting, extending and transmitting knowledge in an environment that fosters free enquiry and open scholarly debate, leading to all-encompassing development of the rural people and their economies and environment.</p>

                    </div>
                    <div className="executive-council">
                        <h2>Executive Council of Purbanchal University:</h2>
                        <ul>
                            <li>Chancellor: Rt. Hon. Prime Minister KP Sharma Oli</li>
                            <li>Pro Chancellor: Hon. Minister for Education, Science, and Technology</li>
                            <li>Vice-Chancellor: Prof. Dr. Ghanashyam Lal Das</li>
                            <li>Registrar: Dr. Dilli Ram Uprety</li>
                            <li>Phone: 025-525555</li>
                            <li>Fax: 025-525555</li>
                            <li>Email:puoemgt@puexam.edu.np</li>
                        </ul>
                    </div>
                    <div className="councils">
                        <h2>Purbanchal University operates under the guidance of several councils and bodies responsible for decision-making and policy formulation:</h2>
                        <ol>
                            <li>University Council: The highest governing body that oversees academic programs, budgets, affiliations, and policy formation.</li>
                            <li>Executive Council: Implements University Council decisions, manages finances, appoints personnel, and drafts regulations.</li>
                            <li>Academic Council: Responsible for academic policies, curricula, teaching standards, examinations, and research guidelines.</li>
                            <li>Research Committee: Coordinates research activities, approves guidelines for researchers, and oversees university-level research organizations.</li>
                            <li>Planning Council: Develops long and short-term plans for the university, evaluates implementation programs, and monitors progress.</li>
                        </ol>
                    </div>
                    <div className="faculties">
                        <h2>Faculties at Purbanchal University:</h2>
                        <ul>
                            <li>Faculty of Science and Technology</li>
                            <li>Faculty of Management Studies</li>
                            <li>Faculty of Humanities and Social Sciences</li>
                            <li>Faculty of Health Sciences</li>
                            <li>Faculty of Engineering</li>
                        </ul>
                    </div>
                    <div className="institutes">
                        <h2>Institutes at Purbanchal University</h2>
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

export default PurUniversityDetails;