import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../css/CollegeDetails.css";
import Navbar from "../navBar";
import AdLayout from "../AdLayout";
import Footer from "../Footer";
import acem1 from "../../images/acem1.jpg";

const CollegeDetails = () => {
  const { id } = useParams(); // Get the college ID from the URL
  const [college, setCollege] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt]=useState(false);
  const navigate= useNavigate();

  // check if user is logged in ore not
  const isLoggedIn=localStorage.getItem('authToken') || localStorage.getItem('token');

  // Mock data (replace with API call or data fetching logic)
  const colleges = [
    {
      id: 1,
      name: "Advance College of Engineering & Management",
      university: "Tribhuvan University",
      address: "Kalanki, Kathmandu, Nepal",
      image: acem1,
      discipline: "Technology",
      website: "https://acem.edu.np",
      programs: [
        { name: "Bachelor of Business Administration (BBA)", seats: 64 },
        { name: "Bachelor of Information Management (BIM)", seats: 64 },
        { name: "Bachelor of Computer Application (BCA)", seats: 35 },
      ],
      collegeInfo:
        "Advance College of Engineering & Management (acem) is a private engineering college in Nepal established in 2000 AD by a group of experienced and dedicated academicians, computer engineers, and management professionals. It is affiliated with Tribhuvan University and offers Bachelor's and Master's degrees in various disciplines.",
      features: [
        "State-of-the-art infrastructure",
        "Experienced faculty",
        "Industry collaborations",
      ],
      studentLife:
        "Thames provides a platform for students to come and start up programs that spark their interest. Whether it is managing a student club, bringing in co-curricular, extracurricular activities, recreational programs, or initiating a social project, the Office of Student Affairs ensures that students’ ideas are met with consideration.",
      inductionSeminar:
        "Students will have an opportunity to participate in an Induction Seminar which is designed to make your transition into college smooth and more enjoyable.",
      firstYearSeminar: [
        "Reading and Writing for College",
        "Academic Writing",
        "Critical Thinking",
      ],
    },
    {
      id: 2,
      name: "Orchid International College",
      university: "Purbanchal University",
      address: "Kathmandu, Nepal",
      image: acem1,
      discipline: "Business Administration",
      website: "https://www.collegesnepal.com/mba/",
      programs: [
        { name: "Master in Business Administration (MBA)", seats: 40 },
        { name: "Bachelor of Business Administration (BBA)", seats: 60 },
        { name: "Bachelor of Information Management (BIM)", seats: 48 },
      ],
      collegeInfo: "Orchid International College, established with a vision to provide quality education, is affiliated with Purbanchal University. The college offers a range of undergraduate and graduate programs, focusing on business administration and management. It is committed to fostering academic excellence and professional development among its students.",
      features: [
        "Modern facilities and resources",
        "Qualified and experienced faculty",
        "Industry-oriented curriculum",
        "Strong alumni network",
      ],
      studentLife:
        "Orchid International College encourages students to engage in various extracurricular activities, clubs, and social projects. The college provides a supportive environment for students to explore their interests and develop leadership skills through events, workshops, and seminars.",
      inductionSeminar:
        "New students are welcomed with an Induction Seminar designed to introduce them to the college's academic environment, facilities, and opportunities for personal and professional growth.",
      firstYearSeminar: [
        "Introduction to Business Management",
        "Effective Communication Skills",
        "Leadership and Team Building",
      ],
    },
    // Add other colleges here
  ];

  useEffect(() => {
    // Find the college by ID
    const selectedCollege = colleges.find((college) => college.id === parseInt(id));
    setCollege(selectedCollege);
  }, [id]);

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

  if (!college) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <AdLayout />
      <div className="college-details-container">
        <div className="college-header">
          <img src={college.image} alt={college.name} className="college-image" />
          <h1>{college.name}</h1>
          <p>{college.university}</p>
          <p>{college.address}</p>
          <a href={college.website} target="_blank" rel="noopener noreferrer">
            {college.website}
          </a>
        </div>

        <div className="college-content">
          <h2>College Introduction</h2>
          <p>{college.collegeInfo}</p>
          <h2>Offered Programs</h2>
          <ul>
            {college.programs.map((program, index) => (
              <li key={index}>
                {program.name} - {program.seats} Seats
              </li>
            ))}
          </ul>
          <br />

          <h2>Salient Features</h2>
          <ul>
            {college.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>

          <h2>Student Life</h2>
          <p>{college.studentLife}</p>
          <br />

          <h2>Induction Seminar</h2>
          <p>{college.inductionSeminar}</p>

          <h2>First Year Seminar</h2>
          <ul>
            {college.firstYearSeminar.map((seminar, index) => (
              <li key={index}>{seminar}</li>
            ))}
          </ul>
        </div>

        <button
      className="apply-button"
      onClick={handleApplyClick}
    >
      Apply
    </button>

    <div className={`modal-overlay ${showForm ? 'show-form' : ''}`}>
      <div className="modal-content">
        <h2>Application Form</h2>
        <form>
          <label>
            Full Name:
            <input type="text" name="fullName" required />
          </label>
          <br />
          <label>
            Email:
            <input type="email" name="email" required />
          </label>
          <br />
          <label>
            Contact:
            <input type="number" name="contact" required />
          </label>
          <br />
          <label>
            Program:
            <select name="program">
              {college.programs.map((program, index) => (
                <option key={index} value={program.name}>
                  {program.name}
                </option>
              ))}
            </select>
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
        <button
          className="close-button"
          onClick={closeAllModals}
        >
          Close
        </button>
      </div>
    </div>
    <div className={`modal-overlay ${showLoginPrompt ? 'show-form':''}`}>
      <div className="modal-content">
        <div className="login-prompts">
          <h2>Please Login First</h2>
          <p>You need to be logged in to access the application form</p>
          <button className="login-redirect-btn" onClick={handleNavigateToLogin}>
            Go to Login Page
          </button>
          <button className="close-button" onClick={closeAllModals}>
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
  <AdLayout />
  <Footer />
    </>
  );
};

export default CollegeDetails;