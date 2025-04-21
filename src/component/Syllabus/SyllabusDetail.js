import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import '../../css/Syllabus/SyllabusDetail.css';
import AdLayout from '../AdLayout';
import Navbar from '../navBar';
import Footer from '../Footer';
import { fetchSyllabusById } from '../Services/apiService';

const SyllabusDetail = () => {
  const { id } = useParams();
  const[syllabus, setSyllabus]=useState(null);
  const [loading, setLoading]=useState(true);
  const [error, setError]=useState(null);

  useEffect(()=>{
    const fetchSyllabusData=async()=>{
      try {
        const response = await fetchSyllabusById(id);
        const syllabusData = response.data;
        
        // Transform API data to match your expected format
        const formattedSyllabus = {
          id: syllabusData._id || syllabusData.id,
          name: syllabusData.programName || 'Untitled Syllabus',
          creditSummary: syllabusData.creditSummary?.map(item => ({
            category: item.category || 'Uncategorized',
            creditHours: item.creditHours || 0,
            isTotal: item.isTotal || false
          })) || [],
          semesters: syllabusData.semesters?.map((semester, index) => ({
            sem: semester.semesterName || `Semester ${index + 1}`,
            courses: semester.courses?.map((course, courseIndex) => ({
              sn: courseIndex + 1,
              code: course.courseCode || 'N/A',
              title: course.courseTitle || 'Untitled Course',
              creditHrs: course.credits || 0,
              lectureHrs: course.lectureHours || 0,
              tutorialHrs: course.tutorialHours || 0,
              labHrs: course.labHours || 0
            })) || []
          })) || []
        };
        
        setSyllabus(formattedSyllabus);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch syllabus:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSyllabusData();
  }, [id]);

  // function to download specific sem syllabus
  const downloadSemesterPDF=(semester)=>{
    const {jsPDF}=require("jspdf");
    const doc= new jsPDF();
    doc.text(`Syllabus for${syllabus.name}-${semester.sem}`,10,10);
    semester.courses.forEach((course,index)=>{
      doc.text(`${course.code}:${course.title}`,10,20+(index*10));
    });
    doc.save(`${syllabus.name}_${semester.sem}_syllabus.pdf`);
  };
  if(loading)return <div className="syllabus-detail-container">Loading Syllabus...</div>;
  if(error) return <div className="syllabus-detail-container">Error:{error}</div>;
  if(!syllabus) return <div className="syllabus-detail-container">Syllabus not found</div>;

  return(
    <>
      <Navbar/>
      <AdLayout/>
      <div className="syllabus-detail-container">
        <div className="main-content">
          <h1>{syllabus.name}</h1>

          <div className="credit-summary">
            <h2>Credit hours Summary</h2>
            <table className="credit-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Credit hours</th>
                </tr>
              </thead>
              <tbody>
                {syllabus.creditSummary.map((item, index)=>(
                  <tr key={index}>
                    <td>
                      {item.isTotal?<strong>{item.category}</strong>:item.category}
                    </td>
                    <td>
                      {item.isTotal?<strong>{item.creditHours}</strong>:item.creditHours}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {syllabus.semester.map((semester,semIndex)=>(
            <div className="semester-container" key={semIndex}>
              <h2>{semester.sem}</h2>
              <table className="course-table">
                <thead>
                  <tr>
                  <th>SN</th>
                    <th>Course Code</th>
                    <th>Course Title</th>
                    <th>Credit Hrs.</th>
                    <th>Lecture Hrs.</th>
                    <th>Tutorial Hrs.</th>
                    <th>Lab Hrs.</th>
                  </tr>
                </thead>
              <tbody>
              {semester.courses.map((course,index)=>(
                <tr key={index}>
                    <td>{course.sn}</td>
                      <td>{course.code}</td>
                      <td>{course.title}</td>
                      <td>{course.creditHrs}</td>
                      <td>{course.lectureHrs}</td>
                      <td>{course.tutorialHrs}</td>
                      <td>{course.labHrs}</td>
                </tr>
              ))}
              </tbody>
            </table>

            <button className="download-button" onClick={()=>downloadSemesterPDF(semester)}>
              Download {semester.sem} Syllabus
            </button>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </>
  );
};
export default SyllabusDetail