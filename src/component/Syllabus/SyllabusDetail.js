import React from 'react';
import { useParams } from 'react-router-dom';
import { syllabusData } from '../Data/syllabusData'; // Adjust the import path as needed
import '../../css/Syllabus/SyllabusDetail.css';

import AdLayout from '../AdLayout';
import Navbar from '../navBar';
import Footer from '../Footer';

const SyllabusDetail = () => {
  const { id } = useParams();
  const syllabus = syllabusData.find(s => s.id === id);

  if (!syllabus) {
    return <div>Syllabus not found</div>;
  }

  // Function to download a specific semester's syllabus
  const downloadSemesterPDF = (semester) => {
    const { jsPDF } = require("jspdf");
    const doc = new jsPDF();
    doc.text(`Syllabus for ${syllabus.name} - ${semester.sem}`, 10, 10);
    semester.courses.forEach((course, index) => {
      doc.text(`${course.code}: ${course.title}`, 10, 20 + (index * 10));
    });
    doc.save(`${syllabus.name}_${semester.sem}_syllabus.pdf`);
  };

  return (
    <>
    <Navbar/>
      <AdLayout />
      <div className="syllabus-detail-container">
        {/* Main Content */}
        <div className="main-content">
          <h1>{syllabus.name}</h1>

          {/* Credit Hours Summary */}
          <div className="credit-summary">
            <h2>Credit Hours Summary</h2>
            <table className="credit-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Credit Hours</th>
                </tr>
              </thead>
              <tbody>
                {syllabus.creditSummary.map((item, index) => (
                  <tr key={index}>
                    <td>
                      {item.isTotal ? <strong>{item.category}</strong> : item.category}
                    </td>
                    <td>
                      {item.isTotal ? <strong>{item.creditHours}</strong> : item.creditHours}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Render Courses for Each Semester */}
          {syllabus.semesters.map((semester, semIndex) => (
            <div key={semIndex} className="semester-container">
              <h2>{semester.sem}</h2>
              <table className="courses-table">
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
                  {semester.courses.map((course, index) => (
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

              {/* Download Button for Each Semester */}
              <button
                className="download-button"
                onClick={() => downloadSemesterPDF(semester)}
              >
                Download {semester.sem} Syllabus
              </button>
            </div>
          ))}
        </div>

        {/* Ad Display on the Right */}
        {/* <AdDisplayRight /> */}
      </div>
      <Footer />
    </>
  );
};

export default SyllabusDetail;