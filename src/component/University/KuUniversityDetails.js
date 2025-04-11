import React from 'react'
import '../../css/University/University.css';
import Kuback from '../../images/Kuback.jpg';
import kufront from '../../images/Kufront.jpg';
import Navbar from '../navBar';
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';


const KuUniversityDetails = () => {
    const navigate= useNavigate();
    const handleOnClick= ()=>{
        navigate('/kuProgramList');
    };
    return(
        <>
        <Navbar/>
            <div className="university-details">
                <div className="content">
                    <div className="images">
                        <img src={Kuback} alt="University background" className="background-image" />
                        <img src={kufront} alt="University Front" className='front-image' />
                    </div>
                    <div className="description">
                        <p>Kathmandu University (KU) is an autonomous, not-for-profit, self-funding public institution established by an Act of Parliament in December 1991. It is an institution of higher learning dedicated to maintaining the standard of academic excellence in various classical and professional disciplines. The mission statement of the University is “to provide quality education for leadership”. The vision is “to become a world-class university devoted to bringing knowledge and technology to the service of mankind”. The University aspires to serve the nation by fulfilling the needs of the society through the motto of taking knowledge and skills “from the campus to the community.” </p>

                    </div>
                    <div className="executive-council">
                        <h2>Executive Council of Kathmandu University:</h2>
                        <ul>
                            <li>Chancellor: Prime Minister of Nepal</li>
                            <li>Pro Chancellor: Minister of Education</li>
                            <li>Vice Chancellor: Prof. Dr. Ram Kantha Makaju Shrestha</li>
                            <li>Registrar: Prof. Dr. Subodh Sharma</li>
                            <li>Phone: 011-415100</li>
                            <li>Fax: 011-415011</li>
                            <li>P.O. Box: 6250</li>
                            <li>Email:info@ku.edu.np</li>
                        </ul>
                    </div>
                    <div className="councils">
                        <h2>Kathmandu University (KU) operates under a structured governance system comprising several key councils and bodies responsible for decision-making and policy formulation:</h2>
                        <ol>
                            <li>Senate: The highest governing body, chaired by the Prime Minister (Chancellor), oversees academic programs, budgets, affiliations, and policy formation.</li>
                            <li>Executive Council: Led by the Vice-Chancellor, this council implements Senate decisions, manages finances, appoints personnel, and drafts regulations.</li>
                            <li>Academic Council: Responsible for academic policies, curricula, teaching standards, examinations, and research guidelines.</li>
                            <li>Board of Trustees: Approves long-term plans, manages resources, and oversees the Vice-Chancellor's selection.</li>
                            <li>Faculty Boards & Research Committees: Headed by Deans and Department Heads, they regulate academic and research activities within respective faculties.</li>

                        </ol>
                    </div>
                    <div className="faculties">
                        <h2>Faculties at Kathmandu University:</h2>
                        <ul>
                            <li>Faculty of Humanities and Social Sciences</li>
                            <li>Faculty of Management</li>
                            <li>Faculty of Education</li>
                            <li>Faculty of Science</li>
                            <li>Faculty of Engineering</li>
                            <li>Faculty of Law</li>
                            <li>Faculty of Medical Sciences</li>
                            <li>Faculty of Arts</li>
                            <li>Faculty of Pharmacy</li>
                            <li>Faculty of Music</li>
                            <li>Faculty of Environment and Sustainable Development</li>
                        </ul>
                    </div>
                    <div className="institutes">
                        <h2>Institutes at Kathmandu University</h2>
                        <ul>
                            <li>Schoold of Arts</li>
                            <li>School of Education</li>
                            <li>School of Engineering</li>
                            <li>School of Medical Sciences</li>
                            <li>School of Science</li>
                            <li>School of Management</li>
                            <li>School of Law</li>
                            <li>School of Pharmacy</li>
                        </ul>
                    </div>
                    <button onClick={handleOnClick} className="university-button">See Programs</button>
                </div>   

            </div>
        <Footer/>
        </>
    );
};

export default  KuUniversityDetails;
 