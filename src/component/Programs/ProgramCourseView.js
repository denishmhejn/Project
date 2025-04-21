import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../css/ProgramCourseView.css";
import bca1 from "../../images/bca1.png"; // Default image
import Navbar from "../navBar";
import Footer from "../Footer";
import SyllabusDetail from "../Syllabus/SyllabusDetail";
import { useNavigate } from "react-router-dom";
import { fetchCourseById } from "../Services/apiService";


const ProgramCourse = () => {
  const { programId } = useParams();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProgramDetails = async () => {
      try {
        const response = await fetchCourseById(programId);
        const courseData = response.data;
        
        // Transform API data to match your expected format
        const formattedProgram = {
          title: courseData.name || courseData.title || `Course ${programId}`,
          description: courseData.description || "No description available",
          overview: courseData.overview || "No overview available",
          curriculum: courseData.curriculum || "No curriculum information available",
          careerOpportunities: courseData.careerOpportunities || "No career information available",
          image: courseData.imageUrl || bca1 // Use default image if none provided
        };
        
        setProgram(formattedProgram);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch program details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProgramDetails();
  }, [programId]);

  const handleButton = () => {
    navigate(`/syllabus/${programId}`);
  };

  if (loading) return <div className="program-course">Loading program details...</div>;
  if (error) return <div className="program-course">Error: {error}</div>;
  if (!program) return <div className="program-course">Program not found</div>;

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