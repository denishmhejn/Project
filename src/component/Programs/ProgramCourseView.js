import React from "react";
import { useParams } from "react-router-dom"; // Import useParams
import "../../css/ProgramCourseView.css"; // Update CSS import
import bca1 from "../../images/bca1.png"; // Import image for BCA program
import Navbar from "../navBar";
import Footer from "../Footer";
import SyllabusDetail from "../Syllabus/SyllabusDetail";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const ProgramCourse = () => {
  const { programId } = useParams(); // Get the program ID from the URL

  // Mock data for programs
  const programDetails = {
    "1": {
      title: "BCA in Nepal: Courses, Colleges and Admissions",
      description: "The Bachelor of Computer Application (BCA) program is one of the most sought-after degrees in Nepal...",
      overview: "This four-year program is divided into eight semesters and is designed to equip students with competencies in problem analysis, problem-solving techniques, business acumen, and software design and development.",
      curriculum: "The BCA program covers database management systems, operating systems, software engineering, web technologies, and languages like C, C++, HTML, Java, etc.",
      careerOpportunities: "BCA graduates are well-prepared to pursue careers in internet and intranet application design and development, system analysis, object-oriented programming, multimedia, software testing and quality assurance, project management, and database design and administration.",
      image:bca1,
    },
    "2": {
      title: "BE Mechanical in Nepal: Courses, Colleges and Admissions",
      description: "The Bachelor of Engineering in Mechanical Engineering (BE Mechanical) program is a popular choice for students interested in mechanical systems and design...",
      overview: "This four-year program focuses on the principles of mechanical engineering, including thermodynamics, fluid mechanics, and machine design.",
      curriculum: "The BE Mechanical program covers subjects like mechanics, materials science, manufacturing processes, and robotics.",
      careerOpportunities: "Graduates can pursue careers in automotive, aerospace, energy, and manufacturing industries.",
      image: bca1,
    },
    // Add details for other programs
  };

  const program = programDetails[programId]; // Get program details based on ID
  const navigate = useNavigate(); // Use navigate hook
  const handleButton = () => {
  navigate(`/syllabus/${programId}`); // Navigate to the syllabus page
  };

  if (!program) {
    return <div>Program not found</div>;
  }

  return (
    <>
    <Navbar/>
    <div className="program-course">
      <header className="program-header">
        <h1>{program.title}</h1>
        <img src={program.image} alt="Program" />
      </header>


      <section className="program-intro">
        <h2>{program.title.split(":")[0]}</h2>
        <p>{program.description}</p>
      </section>

      <section className="program-details">
        <h3>Program Overview</h3>
        <p>{program.overview}</p>

        <h3>Curriculum</h3>
        <p>{program.curriculum}</p>

        <h3>Career Opportunities</h3>
        <p>{program.careerOpportunities}</p>

        <h3>See Syllabus</h3>
        <button className="syllabus-button" onClick={handleButton}>syllabus</button>

        <h3>Top Colleges</h3>
      </section>
    </div>
    <Footer/>
    </>
  );
};

export default ProgramCourse;